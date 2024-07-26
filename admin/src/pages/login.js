// import node modules
import { useState } from "react";

// import components
import LoginComponent from "../components/User/LoginComponent";
import RegisterComponent from "../components/User/RegisterComponent";
import ForgotPasswordComponent from "../components/User/ForgotPasswordComponent";

const Login = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const authenticate = (user) => {
    props.authenticate(user);
  }

  const handleDisplayLogin = () => {
    setShowReset(false);
    setShowRegister(false);
    setShowLogin(true);
  }

  const handleDisplayReset = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowReset(true);
  }

  const handleDisplayRegister = () => {
    setShowReset(false);
    setShowLogin(false);
    setShowRegister(true);
  }

  if (showLogin)
    return (
      <LoginComponent 
        handleDisplayReset = { handleDisplayReset }
        handleDisplayRegister = { handleDisplayRegister }
        authenticate = { authenticate } 
      />
    )

  if (showRegister)
    return (
      <RegisterComponent 
        handleDisplayLogin = { handleDisplayLogin } 
      />
    )

  if (showReset)
    return (
      <ForgotPasswordComponent 
        handleDisplayLogin = { handleDisplayLogin } 
      />
    )
}

export default Login;
