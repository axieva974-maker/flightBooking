import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlane } from "react-icons/fa";
import Header from "../components/Header";

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state?.data;
  const flights = data?.precision?.flights?.flights || [];

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-3 font-sans">

      {/* Header */}
      <Header title="Travel Booking" showBack={true} />

      {/* Summary */}
      <div className="bg-white p-3 rounded-xl shadow-sm text-sm mb-4">
        <p><b>Session:</b> {data?.sessionId}</p>
        <p><b>User:</b> {data?.userId}</p>
        <p><b>Total Flights:</b> {data?.precision?.flights?.count}</p>
      </div>

      {flights.length === 0 && (
        <p className="text-center text-red-600 font-semibold">No Flights Found ⚠</p>
      )}

      {/* Flight Cards */}
      {flights.map((f, i) => (
        <div
          key={i}
          onClick={() => navigate("/flight-details", { state: { flight: f }})}
          className="bg-white rounded-xl border border-gray-300 p-4 shadow-sm mb-4 cursor-pointer active:scale-[0.98] transition"
        >
          {/* Header Row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaPlane className="text-red-600" />
              <p className="font-semibold text-sm text-gray-800 uppercase">
                {f?.tripType || "ONE WAY"}
              </p>
            </div>
            <p className="font-bold text-red-600">
              {f?.airline?.designator} #{f?.flightNumber}
            </p>
          </div>

          {/* Route Info */}
          <div className="grid grid-cols-2 mt-4 text-sm font-semibold">

            {/* Departure */}
            <div>
              <p className="text-xs text-gray-500">Departure</p>
              <p className="text-red-600">{f?.route?.from}</p>
              <p className="text-xs text-gray-500 mt-2">Departure Date</p>
              <p className="text-red-600">
                {new Date(f.route.STD).toDateString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">Time</p>
              <p className="text-red-600">
                {new Date(f.route.STD).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}
              </p>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <p className="text-xs text-gray-500">Arrival</p>
              <p className="text-red-600">{f?.route?.to}</p>
              <p className="text-xs text-gray-500 mt-2">Arrival Date</p>
              <p className="text-red-600">
                {new Date(f.route.STA).toDateString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">Time</p>
              <p className="text-red-600">
                {new Date(f.route.STA).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}
              </p>
            </div>
          </div>

          {/* Stops / Via */}
          {f?.via && (
            <p className="text-xs text-gray-600 mt-3 border-t pt-2">
              ✈ {f.via}
            </p>
          )}

        </div>
      ))}
    </div>
  );
}
