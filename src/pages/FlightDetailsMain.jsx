import React from "react";
import Header from "../components/Header";
import { FaPlane } from "react-icons/fa";

const flights = [
  {
    airline: "Ethiopian Airlines",
    flightNumber: "ET 826",
    date: "21 Nov, 2025",
    departureTime: "05:05",
    arrivalTime: "07:50",
    from: "DAR",
    to: "ADD",
    price: "TZS 979,040",
    pax: 1,
    seats: 7,
    class: "Economy",
    best: true,
  },
  {
    airline: "Ethiopian Airlines",
    flightNumber: "ET 602",
    date: "21 Nov, 2025",
    departureTime: "10:30",
    arrivalTime: "15:45",
    from: "DAR",
    to: "DXB",
    price: "TZS 1,200,000",
    pax: 1,
    seats: 5,
    class: "Economy",
    best: false,
  },
  {
    airline: "Kenya Airways",
    flightNumber: "KQ 458",
    date: "21 Nov, 2025",
    departureTime: "05:00",
    arrivalTime: "06:25",
    from: "DAR",
    to: "NBO",
    price: "TZS 850,000",
    pax: 1,
    seats: 3,
    class: "Economy",
    best: true,
  },
];

const FlightDetailsMain = () => {
  return (
    <>
      <style>{`
        .bookings-container { max-width:480px; margin:auto; background:#f5f5f7; min-height:100vh; padding-bottom:40px; }
        .bookings-banner {background:#FF0000; height:25vh; display:flex; justify-content:center; align-items:center; color:#fff; border-radius:0 0 22px 22px;}
        .flight-card {background:#fff; border-radius:16px; padding:14px; margin:12px 14px; box-shadow:0 6px 20px rgba(0,0,0,0.06); animation:fadeIn 0.4s ease-in-out; cursor:pointer;}
        .flight-card:hover {box-shadow:0 10px 24px rgba(0,0,0,0.12);}
        .flight-row {display:flex; justify-content:space-between; margin-bottom:6px;}
        .flight-row strong {color:#222;}
        .flight-info {font-size:13px; color:#555;}
        .flight-price {margin-top:8px; font-weight:700; color:#ff3b3b;}
        .best-tag {background:#ff3b3b; color:#fff; font-size:10px; font-weight:700; padding:2px 6px; border-radius:6px; margin-left:6px;}
        .add-btn {margin-top:8px; padding:8px 12px; background:#ff3b3b; color:#fff; border:none; border-radius:8px; font-weight:600; cursor:pointer;}
        @keyframes fadeIn {from{opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);}}
      `}</style>

      <div className="bookings-container">
        <Header title="Travel Booking" showBack={true} />

        <div className="bookings-banner">
          <FaPlane size={48} />
        </div>

        {flights.map((f, idx) => (
          <div className="flight-card" key={idx}>
            <div className="flight-row">
              <strong>{f.airline}</strong>
              {f.best && <span className="best-tag">BEST</span>}
              <span className="flight-info">{f.class}</span>
            </div>
            <div className="flight-row">
              <span>Flight Number: {f.flightNumber}</span>
              <span>{f.date}</span>
            </div>
            <div className="flight-row">
              <span>{f.departureTime}</span>
              <span>{f.arrivalTime}</span>
            </div>
            <div className="flight-row">
              <span>{f.from}</span>
              <span>{f.to}</span>
            </div>
            <div className="flight-row flight-price">{f.price}</div>
            <button className="add-btn">ADD</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlightDetailsMain;
