import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/arlogo.png';
import { api_url, api_key } from "../../url";

const RegisterComponent = (props) => {
    const { handleDisplayLogin } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [modal, setModal] = useState({ isOpen: false, message: '' });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;

    const handleRegister = async () => {
        
        if (role === "") {
            setModal({ isOpen: true, message: "Please select a role first." });
            return;
        }
        if (!emailPattern.test(email)) {
            setModal({ isOpen: true, message: "Email address is invalid" });
            return;
        }
       
        if (!passwordPattern.test(password)) {
            setModal({ isOpen: true, message: "Password must contain at least one lowercase letter, one uppercase letter, and one special character." });
            return;
        }
        
        if (password.length < 8) {
            setModal({ isOpen: true, message: "Password must be minimum 8 characters." });
            return;
        }
    
        if (password !== confirmPassword) {
            setModal({ isOpen: true, message: "Passwords do not match!" });
            return;
        }
        if (!email || !password || !firstName || !lastName || !role) {
            setModal({ isOpen: true, message: "Please fill in all required fields." });
            return;
        }
        try {
            const response = await axios.post(`${api_url}/api/register`, {
                first_name: firstName,
                last_name: lastName,
                email,
                password1: password,
                password2: confirmPassword,
                role 
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": api_key
                }
            });
            const { data } = response;
            setModal({ isOpen: true, message: data.message || "Registration successful, please check your email to verify." });

            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setRole('');

            handleDisplayLogin();
        } catch (error) {
            let errorMessage = "Registration failed due to an unknown error.";

            if (error.response) {
                // Handle 400 Bad Request
                if (error.response.status === 400) {
                    const errors = error.response.data;
                    // If the error is specific to the email field
                    if (errors.email) {
                        errorMessage = errors.email;
                    } else {
                        // If there are other validation errors, join them into a single string
                        const errorMessages = Object.values(errors).join(' ');
                        errorMessage = errorMessages;
                    }
                } 
                // Handle 500 Internal Server Error
                else if (error.response.status === 500) {
                    errorMessage = error.response.data.error || "An unexpected error occurred on the server. Please try again later.";
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            // Display the error message to the user
            setModal({ isOpen: true, message: errorMessage });
        }
    };
    
    const inputSelectStyle = {
        border: '2px solid blue', 
        padding: '10px',
        width: '100%', 
        marginBottom: '10px', 
        borderRadius: '5px' 
    };
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh' 
        }}>
            {modal.isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    border: '1px solid #ccc',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
                    zIndex: 10,
                }}>
                    <p>{modal.message}</p>
                    <button onClick={() => setModal({ isOpen: false, message: '' })} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
                        OK
                    </button>
                </div>
            )}
            <div style={{
                border: '2px solid blue',
                padding: '20px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '320px' // Adjusted width
            }}>
               <img src={logoImage} alt="Company Logo" style={{
    width: '250px',
    marginBottom: '10px',
    marginTop: '-20px'  // Moves the image up; adjust the value as needed
}} />
                <h2 style={{
    color: 'blue',
    marginTop: '-20px', // Moves the element up; adjust the value as needed
    fontSize: '24px', // Makes the font larger
    fontWeight: 'bold' // Makes the font bold
}}>
    Sign Up
</h2>
                <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    style={inputSelectStyle}
                >
                    <option value="">Select a Role</option>
                    <option value="Athlete">Athlete</option>
                    <option value="Brand">Brand</option>
                </select>
                <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name"
                    style={inputSelectStyle}
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last Name"
                    style={inputSelectStyle}
                />
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    style={inputSelectStyle}
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    style={inputSelectStyle}
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    style={inputSelectStyle}
                />
                <button onClick={handleRegister} style={{ 
                    backgroundColor: 'blue', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '30px',
                    cursor: 'pointer', 
                    width: '40%' 
                }}>
                    Register
                </button>
                <p style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                    Already registered? <Link onClick={handleDisplayLogin} style={{ color: 'blue' }}>Login here</Link>.
                </p>
                <p style={{ fontSize: '0.8rem', marginTop: '10px', textAlign: 'center' }}>
                    By submitting this form, you agree to our <a href="https://athletereserve.com/policy" style={{ color: 'blue' }}>Terms and Conditions</a>.
                </p>
            </div>
        </div>
    );
}

export default RegisterComponent;
