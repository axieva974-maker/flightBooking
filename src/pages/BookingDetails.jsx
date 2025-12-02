import React from "react";
import Header from "../components/Header";
import { FaPlane } from "react-icons/fa";

const Bookings = () => {
  const bookings = [
    { id: 1, flight: "DAR → DXB", date: "2025-12-05", traveller: "John Doe", status: "Confirmed" },
    { id: 2, flight: "NBO → ZNZ", date: "2025-12-10", traveller: "John Doe", status: "Pending" },
  ];

  return (
    <>
      {/* ====== SAME UI AS HELP DESK BANNER + CURVED WHITE SECTION ====== */}
      <style>{`
        .bookings-page {
          background:#f8f9fb;
          min-height:100vh;
        }

        /* White curved container like Helpdesk */
        .booking-content {
          background:#fff;
          margin-top:-40px;
          border-radius:25px 25px 0 0;
          padding:26px;
          box-shadow:0 -4px 12px rgba(0,0,0,0.08);
          animation:fadeIn .45s ease;
        }

        .booking-title {
          font-size:20px;
          font-weight:700;
          text-align:center;
          margin-bottom:18px;
        }

        /* Booking Cards (better UI than before) */
        .booking-card {
          background:#fff;
          border-radius:14px;
          padding:18px;
          margin-bottom:16px;
          border:1px solid #ececec;
          box-shadow:0 3px 10px rgba(0,0,0,0.08);
          transition:0.35s;
        }

        .booking-card:hover {
          transform:translateY(-5px);
          box-shadow:0 10px 18px rgba(0,0,0,0.15);
        }

        .data-row {
          margin:5px 0;
          font-size:15px;
        }

        .status-tag {
          padding:5px 10px;
          border-radius:6px;
          color:#fff;
          font-weight:bold;
        }

        .Confirmed { background:#0bb300; }
        .Pending { background:#ff9800; }

        @keyframes fadeIn {
          from{opacity:0;transform:translateY(10px);}
          to{opacity:1;transform:translateY(0);}
        }
      `}</style>

      <div className="bookings-page">

        {/* Header same as other pages */}
        <Header title="Bookings" showBack={true} />

        {/* 🔴 Matching Red Plane Banner  */}
        <div
          style={{
            background:"#FF0000",
            height:"25vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            color:"#fff",
          }}
        >
          <FaPlane size={50}/>
        </div>

        {/* White Curved Section (SAME AS HELP DESK STYLE) */}
        <div className="booking-content">
          <h2 className="booking-title">Your Bookings</h2>

          {bookings.map(b => (
            <div key={b.id} className="booking-card">
              <p className="data-row"><strong>Flight:</strong> {b.flight}</p>
              <p className="data-row"><strong>Date:</strong> {b.date}</p>
              <p className="data-row"><strong>Traveller:</strong> {b.traveller}</p>
              <p className="data-row">
                <strong>Status:</strong> 
                <span className={`status-tag ${b.status}`}> {b.status} </span>
              </p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Bookings;
