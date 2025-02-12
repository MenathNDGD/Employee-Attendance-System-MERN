import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Overview from "./pages/OverviewPage/Overview";
import AdminDashboard from "./pages/AdminDashboardPage/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Overview />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
