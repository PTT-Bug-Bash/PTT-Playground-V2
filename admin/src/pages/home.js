import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

function HomePage() {
    const location = useLocation();
    const [showVerify, setShowVerify] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [token, setToken] = useState('');  

    useEffect(() => {
        
        const queryParams = new URLSearchParams(location.search);
        const tokenFromURL = queryParams.get('token'); 
        const mode = queryParams.get('mode'); 

       
        if (tokenFromURL && mode) {
            setToken(tokenFromURL); 
            setShowVerify(mode === 'verify');
            setShowResetPassword(mode === 'reset');
        }
    }, [location]);

    return (
        <div className="App">
            <Box display="grid" gridTemplateColumns="repeat(8, 1fr)" gap={2}>
                <Box gridColumn="span 8"><a href="/map">Map</a></Box>
                <Box gridColumn="span 8"><a href="/athlete">Athlete Form</a></Box>
                <Box gridColumn="span 8"><a href="/brand">Business Form</a></Box>
                <Box gridColumn="span 8"><a href="/dashboard">Dashboard</a></Box>
                {showResetPassword && (
                    <Box gridColumn="span 8"><a href={`/reset-password/${token}`}>Reset Password</a></Box>
                )}
                {showVerify && (
                    <Box gridColumn="span 8"><a href={`/verify/${token}`}>Verify Email</a></Box>
                )}
            </Box>
        </div>
    );
}

export default HomePage;
