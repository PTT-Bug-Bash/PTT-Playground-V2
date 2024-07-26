import React, { useState } from 'react';
import axios from 'axios';
import logoImage from '../../assets/images/arlogo.png';
import { api_url, api_key } from "../../url";
import { Button } from '@mui/material';

const ForgotPasswordComponent = (props) => {
  const { handleDisplayLogin } = props;
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${api_url}/api/forgot`, { 
        email
      }, {
        headers: {
          "x-api-key": api_key
        }
      });

      console.log(response.data);
      alert("Please check your email to reset your password!");
    } catch (error) {
      alert("Failed to send reset password email: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <div style={{
        border: '2px solid blue',
        borderRadius: '10px',
        padding: '20px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img src={logoImage} alt="Company Logo" style={{ width: '250px', marginBottom: '10px' }} />
        <h2 style={{ color: 'blue', margin: '0 0 20px 0' }}>Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px'
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={handleForgotPassword} >Submit</Button>
          <Button variant="contained" color="warning" onClick={ () => handleDisplayLogin() } >Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;

