import {
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';
import { useState,useContext } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { USA_STATES } from '../constants/Constant';
import { UserContext } from '../UserContext';

import { ConfigContext } from '../ConfigContext';

import axios from 'axios'; // If you're using axios

export default function CheckoutForm({ orderNumber }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const config = useContext(ConfigContext);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
  });

  const { user  } = useContext(UserContext); // Access context


  // State for address form
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return digits;

    const [, areaCode, prefix, lineNumber] = match;

    if (lineNumber) {
      return `(${areaCode}) ${prefix}-${lineNumber}`;
    }
    if (prefix) {
      return `(${areaCode}) ${prefix}`;
    }
    if (areaCode) {
      return `(${areaCode}`;
    }

    return '';
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
    setFormData({ ...formData, [name]: value });
    
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setFullName(value);
  };
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    setFormData({ ...formData, [name]: value });
     // Reset validation message
     setErrors({ ...errors, [name]: '' });
  };
  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    setPhoneNumber(value);
    setFormData({ ...formData, [name]: value });
     // Reset validation message
     setErrors({ ...errors, [name]: '' });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        return;
      }
      if (!validateForm()) {
        console.log('Form has errors:', formData);
        return;
      }
  
      console.log("orderNumber ",orderNumber)
  
      setIsLoading(true);
      const cust_Address = JSON.stringify(address);
      console.log(cust_Address);
  
      const orderResponse = await axios.put(
        `${config.NODE_SERVICE}/api/order/${orderNumber}`, {
          shippingAddress: address,
          name: fullName,
          email: email,
          userEmail: user ? user.email : 'Guest',
          phoneNumber: formatPhoneNumber(phoneNumber),
          purchaseStatus: "purchase started"
        }
      );
  
      //const { orderNumber } = orderResponse.data;
      console.log("orderNumber",JSON.stringify(orderResponse));
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/completion/?orderNumber=${orderNumber}`,
        },
      });
  
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
        const orderResponse = await axios.put(
          `${config.NODE_SERVICE}/api/order/${orderNumber}`, {
            purchaseStatus: `purchase failed due to ${error.message}`
          }
        );
        console.log("orderNumber",orderResponse.data);
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    } catch (err) {
      setMessage(err.message); // Handle errors
      setIsLoading(false);;
    }

    
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* Address Form Fields */}
      <div className="address-fields">
        <h3>Shipping Address</h3>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="fullname"
            value={fullName}
            onChange={handleNameChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your Email"
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your full name"
            required
          />
          {errors.phoneNumber && (
          <p className="error-message">{errors.phoneNumber}</p>
        )}
        </div>
        <div className="form-group">
          <label htmlFor="street">Street Address</label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            placeholder="Enter your street address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
          id="state"
          name="state"
          value={address.state}
          onChange={handleAddressChange}
          required
        >
          <option value="" disabled>
            -- Select a state --
          </option>
          {USA_STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name} ({state.code})
            </option>
          ))}
        </select>
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleAddressChange}
            placeholder="Enter your postal code"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleAddressChange}
            placeholder="Enter your country"
            required
          />
        </div>
      </div>

      {/* Payment Form */}
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="pay-now">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );

  
}
