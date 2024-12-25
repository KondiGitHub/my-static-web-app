import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // If you're using axios
import Header from "./Header";

import { ConfigContext } from '../ConfigContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login  } = useContext(UserContext); // Access context
  const navigate = useNavigate(); // Use useHistory instead of useNavigate
  const config = useContext(ConfigContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to validate credentials
      const response = await axios.post(
        `${config.NODE_SERVICE}/api/login`,{
        email,
        password,
      });

      // If login is successful, set user and navigate
      if (response.status === 200) {
        const { user } = response.data; // Assume API returns user data in `data.user`
        login(user);
        //setUser(user); // Update context with user details
        //navigate(0);
        navigate("/AmmuArts"); // Navigate to another page
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials or server issues)
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Invalid credentials');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Header title="Login"  showCart={false}/>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit" style={{ "background-color": "green" }}>Login</button>
      </form>
    </div>
  );
}

export default Login;
