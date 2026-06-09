import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProjectDashboard from "./components/ProjectDashboard";

// Custom CSS can be kept or tweaked as you style your components
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Root Pathway: Points directly to your professional Portfolio Homepage */}
        <Route path="/" element={<Home />} />

        {/* 2. Authentication Pathway: Points to your Sign-In/Register screen */}
        <Route path="/auth" element={<Auth />} />

        {/* 3. Core Portal Pathway: Points to your Role-Based Management System */}
        <Route path="/portal" element={<ProjectDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
