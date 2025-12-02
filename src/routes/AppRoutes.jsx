// src/routes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TravelHome from "../pages/HomeScreen";
import Profile from "../pages/Profile";
import Bookings from "../pages/BookingDetails";
import Helpdesk from "../pages/HelpingDesk";
import Login from "../pages/Login";
import FlightDetails from "../pages/FlightDetails";
import ResultsPage from "../pages/ResultsPage";
import PaymentPage from "../pages/PaymentsPage";
import FlightDetailsMain from "../pages/FlightDetailsMain";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
         {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<TravelHome />} />
        {/* <Route path="/TravelHome" element={<TravelHome />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookingDetails" element={<Bookings/>} />
        <Route path="/helpingDesk" element={<Helpdesk/>} />
        <Route path="/flight-details" element={<FlightDetails/>} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/flightdetailsMain" element={<FlightDetailsMain/>} />
        
        <Route path="/paymentsPage" element={<PaymentPage />} />


      </Routes>
    </Router>
  );
};

export default AppRoutes;
