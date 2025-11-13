import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchRoutes,
} from "react-router-dom";
import Navbar from "../components/Navbar";

// ✅ Import your pages & components
import Login from "../components/Login";
import Signup from "../components/Signup";
import ResetPassword from "../components/ResetPassword";
import ForgotPassword from "../components/ForgotPassword";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";
import ServicesPage from "../pages/Services";
import NotFound from "../components/NotFound";
import AddUser from "../pages/AddUser"; // ✅ NEW

const AuthRoutes = () => {
  const location = useLocation();

  // ✅ Define all valid routes
  const routes = [
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/home", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/contact", element: <ContactPage /> },
    { path: "/services", element: <ServicesPage /> },
    { path: "/", element: <Navigate to="/home" /> },
    { path: "/add-user", element: <AddUser /> }, // ✅ NEW ROUTE
    {path: "/edit-user/:id", element: <AddUser />}
  ];

  // ✅ Detect invalid (404) route
  const matchedRoute = matchRoutes(routes, location);
  const is404 = !matchedRoute;

  // ✅ Routes that should NOT show Navbar
  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  // ✅ Hide Navbar for Auth routes + 404
  const shouldHideNavbar =
    hideNavbarRoutes.some((route) => location.pathname.startsWith(route)) ||
    is404;

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* ===== Auth Pages (No Navbar) ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* ===== Main Pages (With Navbar) ===== */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/add-user" element={<AddUser />} /> {/* ✅ NEW */}
        <Route path="/edit-user/:id" element={<AddUser />} />
        {/* ===== 404 Page (No Navbar) ===== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
