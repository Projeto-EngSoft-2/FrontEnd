import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import RegisterPage from "./components/RegisterPage/RegisterPage.jsx";
import ReportsPage from "./components/ReportPage/ReportPage.jsx";
import "./styles.css";
import 'font-awesome/css/font-awesome.min.css';
import ReportCreation from "./components/ReportCreation/ReportCreation.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";

const App = () => {
  return (
    <Router>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reportpage" element={<ReportsPage />} />
            <Route path="/reportcreation" element={<ReportCreation />}/>
            <Route path="/userprofile" element={<UserProfile/>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
