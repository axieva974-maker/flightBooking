import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaCreditCard, FaArrowLeft } from "react-icons/fa";

export default function PaymentPage() {
  const { state } = useLocation();          // ✈ Flight Data From Results Page
  const navigate = useNavigate();
  const flight = state?.flight;

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [processing, setProcessing] = useState(false);

  // **If page opened directly without flight → Redirect back**
  useEffect(() => {
    if (!flight) navigate("/");
  }, [flight, navigate]);

  const handlePay = () => {
    if (!user.fullName || !user.email || !user.phone) {
      alert("Please fill all details before payment!");
      return;
    }

    setProcessing(true);

    // Save Booking Locally (Until API Ready)
    const booking = {
      ...user,
      flight,
      bookingRef: "AXIEVA-" + Math.floor(Math.random() * 999999),
      paymentStatus: "Success",
    };
    localStorage.setItem("booking", JSON.stringify(booking));

    setTimeout(() => {
      navigate("/payment-success", { state: { booking } });
    }, 1200);
  };

  if (!flight) return null;

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <h2 style={styles.title}>Flight Payment</h2>

      {/* Flight Summary */}
      <div style={styles.card}>
        <h3>Flight Summary</h3>
        <p><b>{flight.airline}</b> — {flight.flightNumber}</p>
        <p>{flight.from} ➜ {flight.to}</p>
        <p>Date: {flight.date}</p>
        <p><b>Fare:</b> ₹{flight.price}</p>
      </div>

      {/* Passenger Details */}
      <div style={styles.card}>
        <h3><FaUser /> Passenger Details</h3>
        
        <input
          type="text"
          placeholder="Full Name"
          value={user.fullName}
          onChange={(e)=>setUser({...user, fullName:e.target.value})}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e)=>setUser({...user, email:e.target.value})}
          style={styles.input}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={user.phone}
          onChange={(e)=>setUser({...user, phone:e.target.value})}
          style={styles.input}
        />
      </div>

      {/* Payment Button */}
      <button style={styles.payBtn} onClick={handlePay} disabled={processing}>
        <FaCreditCard size={18}/>
        {processing ? "Processing..." : `Pay ₹${flight.price}`}
      </button>
    </div>
  );
}

const styles = {
  container:{padding:"20px",maxWidth:"520px",margin:"auto",fontFamily:"sans-serif"},
  title:{textAlign:"center",fontSize:"26px",marginBottom:"15px"},
  card:{padding:"15px",borderRadius:"12px",border:"1px solid #ddd",marginBottom:"18px"},
  input:{width:"100%",padding:"10px",margin:"7px 0",borderRadius:"6px",border:"1px solid #aaa"},
  payBtn:{
    width:"100%",padding:"12px",fontSize:"18px",fontWeight:"bold",
    background:"#0A7FF5",color:"#fff",borderRadius:"10px",border:"none",
    display:"flex",justifyContent:"center",gap:"8px",alignItems:"center"
  },
  backBtn:{border:"none",background:"none",marginBottom:"15px",fontSize:"16px",cursor:"pointer"}
};
