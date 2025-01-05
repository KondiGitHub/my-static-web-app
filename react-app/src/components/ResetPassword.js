import React, { useState, useContext } from 'react';
import { ConfigContext } from '../ConfigContext';
import axios from 'axios'; // If you're using axios
import { useNavigate } from 'react-router-dom';
import './ResetPAssword.css'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token] = useState(new URLSearchParams(window.location.search).get('token'));
    const config = useContext(ConfigContext);
    const navigate = useNavigate(); // Use useHistory instead of useNavigate

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(`${config.NODE_SERVICE}/api/reset-password`,
                { token: token, newPassword: newPassword },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setMessage('Password updated successfully.');
                navigate("/AmmuArts");
            } else {
                setMessage(`Password updated successfully. ${response.data}`);
            }


        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleResetPassword}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
