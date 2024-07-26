import React, { useState } from 'react';
import { api_url, api_key } from "../../url";
//import logoImage from '../../assets/logo.png';
function SendEmail() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showModal, setShowModal] = useState(false);  // State to control the visibility of the modal

  const isValidEmail = email => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailAddresses = to.split(',').map(email => email.trim()); // Split string by commas and trim whitespace

    // Validate each email address
    if (!emailAddresses.every(isValidEmail)) {
      setResponseMessage('Please enter valid email addresses.');
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch(`${api_url}/api/send-email`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": api_key
      },
        body: JSON.stringify({ to: emailAddresses, subject, content })
      });
      const data = await response.json();
      setResponseMessage(data.message);
      setShowModal(true);  // to show the modal on successful response
      // Clear the form fields
      setTo('');
      setSubject('');
      setContent('');
    } catch (error) {
      console.error('Failed to send email:', error);
      setResponseMessage('Failed to send email.');
      setShowModal(true);  // Show the modal on error
    }
  };

  const closeModal = () => {
    setShowModal(false);  // Hide the modal
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 1000,
    width: '300px',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{border: '2px solid #007BFF', padding: '20px', borderRadius: '5px', width: '350px', margin: 'auto'}}>
        <h1 style={{color: '#007BFF', textAlign: 'center'}}>Send Email</h1>
        <div>
          <label>Email Addresses :</label>
          <input type="email" value={to} onChange={(e) => setTo(e.target.value)} required style={{width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box'}}/>
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required style={{width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box'}}/>
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required style={{width: '100%', padding: '10px', height: '250px', marginBottom: '10px', boxSizing: 'border-box'}}/>
        </div>
        <button type="submit" style={{padding: '10px 20px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', outline: 'none', float: 'right'}}>Send Email</button>
      </form>
      {showModal && (
        <>
          <div style={backdropStyle} onClick={closeModal}></div>
          <div style={modalStyle}>
            <h2>Message</h2>
            <p>{responseMessage}</p>
            <button onClick={closeModal} style={{
                backgroundColor: '#007BFF', 
                color: 'white', 
                border: 'none', 
                borderRadius: '30px', 
                padding: '10px 20px', 
                cursor: 'pointer', 
                outline: 'none', 
                }}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}

export default SendEmail;
