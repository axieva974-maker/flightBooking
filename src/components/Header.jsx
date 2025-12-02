import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Header({ title = "Travel Booking", showBack = false }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-black py-4 px-6 text-lg font-semibold shadow-md flex items-center">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-black flex items-center"
        >
          <FaArrowLeft className="mr-2" />
         
        </button>
      )}
      <span>{title}</span>
    </div>
  );
}
