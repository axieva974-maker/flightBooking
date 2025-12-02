import React from "react";
import Header from "../components/Header";
import { FaPlane } from "react-icons/fa";

const Helpdesk = () => {
  return (
    <>
      {/* ====== PAGE CSS (Improved UI below red header) ====== */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        .helpdesk-container {
          background:#f8f9fb;
          min-height:100vh;
        }

        /* White curved card below red banner */
        .helpdesk-content {
          background:#fff;
          margin-top:-40px;
          border-radius:25px 25px 0 0;
          padding:25px;
          box-shadow:0 -4px 10px rgba(0,0,0,0.08);
          animation:fadeIn 0.45s ease-in-out;
        }

        /* Section Title */
        .section-title {
          font-size:19px;
          font-weight:700;
          color:#222;
          margin-bottom:14px;
          text-transform: uppercase;
        }

        /* Contact Cards */
        .contact-card {
          background:#ffffff;
          border-radius:15px;
          padding:18px;
          margin-bottom:22px;
          box-shadow:0 4px 10px rgba(0,0,0,0.10);
          border:1px solid #e9e9e9;
        }

        .contact-row {
          display:flex;
          justify-content:space-between;
          padding:10px 0;
          font-size:15px;
          border-bottom:1px solid #eeeeee;
        }

        .contact-row:last-child {
          border-bottom:none;
        }

        .contact-row strong { color:#111;font-weight:600; }
        .contact-row span { color:#444; }

        .contact-card p {
          font-size:15px;
          color:#333;
          line-height:1.6;
        }

        @keyframes fadeIn {
          from{ opacity:0; transform:translateY(10px);}
          to{ opacity:1; transform: translateY(0);}
        }
      `}</style>

      <div className="helpdesk-container">

        {/* Header remains SAME */}
        <Header title="Help Desk" showBack={true} />

        {/* RED Banner */}
        <div
          className="profile-header"
          style={{
            backgroundColor: "#FF0000",
            height: "25vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <FaPlane size={48} />
        </div>

        {/* Content Below Banner (Now Styled Nicely) */}
        <div className="helpdesk-content">

          <h3 className="section-title">Contact Information</h3>
          <div className="contact-card">
            <div className="contact-row"><strong>Customer Support:</strong> <span>+255 712 345 678</span></div>
            <div className="contact-row"><strong>Email:</strong> <span>support@mpesaflights.com</span></div>
            <div className="contact-row"><strong>WhatsApp:</strong> <span>+255 712 000 111</span></div>
            <div className="contact-row"><strong>Working Hours:</strong> <span>Mon - Sun, 8:00 AM - 10:00 PM</span></div>
          </div>

          <h3 className="section-title">Office Address</h3>
          <div className="contact-card">
            <p>
              M-Pesa Flight Booking Center <br />
              2nd Floor, ABC Plaza <br />
              Samora Avenue, Dar es Salaam, Tanzania
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Helpdesk;
