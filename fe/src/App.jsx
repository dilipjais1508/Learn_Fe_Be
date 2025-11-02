import { useState } from 'react'
import React from 'react'
import AuthRoutes from './routes/AuthRoutes'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, useLocation } from "react-router-dom";


function App() {
  const location = useLocation();

  // ✅ Define routes where Navbar should NOT appear
  const hideNavbarRoutes = ["/login", "/signup", "/forgot-password", "/reset-password/:token"];

  return (
   <div>
     {/* Show Navbar only when not in auth routes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      {/* Render all routes (auth + pages) */}
    <AuthRoutes/>
   </div>
  )
}

export default App
