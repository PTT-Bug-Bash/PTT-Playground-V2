// import node modules
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import model
import { user as userModel } from '../../models/db_models';

// import logo
import logoImage from '../../assets/images/arlogo.png';

// import api url
import { api_url, api_key } from "../../url";

const LoginComponent = (props) => {
  const { handleDisplayReset, handleDisplayRegister, authenticate } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api_url}/api/login`, {
        email,
        password,
      }, {
        headers: {
          "x-api-key": api_key
        }
      }
    );
      console.log("Response data:", response.data); // Debugging response

      const user = Object.assign({}, userModel.user);

      user.id = response.data.user.id;
      user.email = response.data.user.email;
      user.role = response.data.user.role;
      user.entity_id = response.data.user.entity_id;

      setModalMessage("Login Successful!");
      setIsSuccess(true);
      setShowModal(true);

      authenticate(user);

    } catch (error) {
      console.log('Error during login:', error);
      const errorMessage = error.response?.data?.error || error.message;
      setModalMessage("Login Failed: " + errorMessage);
      setIsSuccess(false);
      setShowModal(true);
      setPassword('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (isSuccess) {
      // Additional navigation logic could be handled here if needed
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh'
    }}>
      {showModal && (
        <ErrorModal message={modalMessage} onClose={closeModal} isSuccess={isSuccess} />
      )}
      <form onSubmit={handleLogin}>
        <div style={{
          border: '3px solid blue',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '250px'
        }}>
          <img src={logoImage} alt="Company Logo" style={{ width: '250px', marginBottom: '10px' }} />
          <h2 style={{ color: 'blue' }}>Login</h2>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            style={{ 
              marginBottom: '10px', 
              width: '100%',
              padding: '10px' 
            }} 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            style={{ 
              marginBottom: '20px', 
              width: '100%',
              padding: '10px'
            }} 
          />
          <button type="submit"
            style={{ 
              backgroundColor: 'blue', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '20px', 
              cursor: 'pointer',
              width: '100%' 
            }}>
            Login
          </button>
          <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>
            Forgot your password? <Link onClick= { () => handleDisplayReset() } style={{ color: 'blue' }}>Reset it here</Link>.
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>
            New? <Link onClick= { () => handleDisplayRegister() } style={{ color: 'blue' }}>Register here</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

const ErrorModal = ({ message, onClose, isSuccess }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: 1001,
      border: '1px solid blue',
      borderRadius: '10px'
    }}>
      <p>{message}</p>
      <button onClick={onClose} style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        OK
      </button>
    </div>
  );
};

export default LoginComponent;
