import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import logoImage from '../../assets/logo.png';  
import { api_url, api_key } from "../../url";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.get(`${api_url}/api/verify/${token}`, {
        headers: {
          "x-api-key": api_key
        }
      });
      
      setMessage(response.data.message || "Your email has been successfully verified! You may now log in.");
    } catch (error) {
      setMessage("Failed to verify email: " + (error.response?.data?.message || error.message));
    }
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
    navigate('/dashboard'); 
  };

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
          <p>{message}</p>
          <button onClick={closeModal} style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>OK</button>
        </div>
      )}
      <button onClick={verifyEmail} style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        width: '60%'
      }}>
        Verify Email
      </button>
    </div>
  );
};

export default EmailVerification;
