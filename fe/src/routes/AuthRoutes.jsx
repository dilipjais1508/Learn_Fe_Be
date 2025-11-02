import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ResetPassword from "../components/ResetPassword";
import ForgotPassword from "../components/ForgotPassword"; 
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact"
import ServicesPage from "../pages/Services";


const AuthRoutes = () => {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/services" element={<ServicesPage/>} />
      
    </Routes>
  );
};

export default AuthRoutes;
