import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './Signup.css';
import axios from 'axios'; // If you're using axios

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory(); // Use useHistory instead of useNavigate

  const handleInputChange =  (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password ||  !formData.phone) {
      setErrorMessage("All fields are required!");
      return;
    }
   
    try {
      const response = await axios.post(
        'http://localhost:5000/api/signup',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("response:", JSON.stringify(response.data));
      history.push("/AmmuArts"); // Navigate after successful submission
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        setErrorMessage(`Error: ${error.response.data.error || "Something went wrong"}`);
      } else if (error.request) {
        // Request was made but no response was received
        setErrorMessage("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request
        setErrorMessage("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-row">
          <label htmlFor="name">LastName:</label>
          <input type="text" id="lastName" name="lastName" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div className="form-row">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>
        <div className="form-row">
          <button type="submit" className="signup-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
