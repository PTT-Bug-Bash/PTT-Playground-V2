import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../assets/logo.png';
import { api_url, api_key } from "../../url";

const ResetPasswordComponent = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setModalMessage("Please fill in all fields.");
      setShowModal(true);
      return;
    }
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setShowModal(true);
      return;
    }
    if (!passwordPattern.test(password)) {
      setModalMessage("Password must contain at least one lowercase letter, one uppercase letter, a special character, and be at least 8 characters long.");
      setShowModal(true);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${api_url}/api/reset_password/${token}`, { 
        password1: password, 
        password2: confirmPassword
      },{
        headers: {
          "x-api-key": api_key
        }
      });
      setPassword('');
      setConfirmPassword('');
      setModalMessage("Password reset successfully! Would you like to login now?");
      setShowModal(true);
    } catch (error) {
      setModalMessage("Failed to reset password: " + (error.response?.data?.message || error.message));
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setShowModal(false);

  const handleLoginRedirect = () => {
    closeModal();
    navigate('/dashboard');
  };

  const renderModalContent = () => {
    return modalMessage.includes("successfully") ? (
      <div>
        <p>{modalMessage}</p>
        <button onClick={handleLoginRedirect} style={buttonStyle("blue")}>Yes</button>
        <button onClick={closeModal} style={buttonStyle("Blue")}>No</button>
      </div>
    ) : (
      <div>
        <p>{modalMessage}</p>
        <button onClick={closeModal} style={buttonStyle("blue")}>OK</button>
      </div>
    );
  };

  const buttonStyle = (color) => ({
    backgroundColor: color,
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    margin: '5px'
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: 'auto'
    }}>
      {showModal && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {renderModalContent()}
        </div>
      )}
      <div style={{
        border: '2px solid blue',
        borderRadius: '10px',
        padding: '20px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img src={logoImage} alt="Company Logo" style={{ width: '150px', marginBottom: '10px' }} />
        <h2 style={{ color: 'blue' }}>Reset Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px'
          }}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px'
          }}
        />
        <button
          onClick={handleResetPassword}
          disabled={isLoading}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            width: '80%'
          }}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
