import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // If you're using axios

import { ConfigContext } from '../ConfigContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login  } = useContext(UserContext); // Access context
  const navigate = useNavigate(); // Use useHistory instead of useNavigate
  const config = useContext(ConfigContext);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to validate credentials
      const response = await axios.post(
        `${config.NODE_SERVICE}/api/login`,{
        email,
        password,
      },{ withCredentials: true });

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.NODE_SERVICE}/api/forgot-password`, 
        {email: resetEmail},
        { withCredentials: true }
      );
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: resetEmail }),
      // });

      if (!response.ok) {
        throw new Error('Failed to send reset email.');
      }

      setResetMessage('Reset link sent to your email.');
    } catch (error) {
      setResetMessage('Error: Unable to send reset email.');
      console.error(error);
    }
  };

  return (
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!showResetForm ? (
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
          <button type="submit" style={{ backgroundColor: 'green' }}>
            Login
          </button>
          <button
            type="button"
            style={{ backgroundColor: 'blue', marginLeft: '10px' }}
            onClick={() => setShowResetForm(true)}
          >
            Forgot Password
          </button>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <div>
            <label>Enter your email: </label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ backgroundColor: 'orange' }}>
            Send Reset Link
          </button>
          <button
            type="button"
            style={{ backgroundColor: 'gray', marginLeft: '10px' }}
            onClick={() => setShowResetForm(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {resetMessage && <p className="reset-message">{resetMessage}</p>}
    </div>
  );
}

export default Login;
