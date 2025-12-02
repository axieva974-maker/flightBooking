// import React, { useState } from "react";
// import { FaPlane } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const FIXED_EMAIL = "admin@gmail.com";
//   const FIXED_PASSWORD = "1";

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
//       setError("");
//       navigate("/TravelHome");
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div style={styles.container}>

//       {/* 🔴 Red Header */}
//       <div style={styles.header}>
//         <FaPlane size={55} />
//         <h2 style={styles.brand}>MiniTravel</h2>
//       </div>

//       {/* White Card */}
//       <div style={{ ...styles.card, animation: "slideUp 0.7s ease" }}>
//         <h3 style={styles.heading}>Sign in to Continue</h3>

//         <form onSubmit={handleLogin}>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Email Address</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e)=>setEmail(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e)=>setPassword(e.target.value)}
//               style={styles.input}
//               required
//             />
//           </div>

//           {error && <p style={styles.error}>{error}</p>}

//           <button type="submit" style={{ ...styles.btn, animation: "glow 1.6s infinite" }}>
//             Login
//           </button>

//         </form>
//       </div>

//       {/* 🔥 ANIMATIONS KEPT INSIDE SAME FILE */}
//       <style>{`
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes glow {
//           0% { box-shadow: 0 0 10px rgba(255,0,0,0.4); }
//           100% { box-shadow: 0 0 20px rgba(255,0,0,0.9); }
//         }
//       `}</style>

//     </div>
//   );
// };

// export default Login;



// /* =============== INLINE CSS OBJECTS ================= */

// const styles = {
//   container: {
//     height: "100vh",
//     background: "#f8f8f8",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },

//   header: {
//     background: "#ff0000",
//     height: "28vh",
//     width: "100%",
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     color: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   brand: {
//     fontSize: 26,
//     fontWeight: 700,
//     marginTop: 8,
//     letterSpacing: 1,
//   },

//   card: {
//     width: "88%",
//     background: "#fff",
//     marginTop: -50,
//     borderRadius: 18,
//     padding: 26,
//     boxShadow: "0px 6px 25px rgba(0,0,0,0.10)",
//     textAlign: "center",
//   },

//   heading: {
//     fontSize: 22,
//     fontWeight: 700,
//     marginBottom: 20,
//   },

//   inputGroup: {
//     marginBottom: 14,
//     textAlign: "left",
//   },

//   label: {
//     fontSize: 14,
//     fontWeight: 600,
//     marginBottom: 5,
//     color: "#333",
//     display: "block",
//   },

//   input: {
//     width: "100%",
//     padding: 11,
//     borderRadius: 10,
//     border: "1px solid #ccc",
//     fontSize: 15,
//     outline: "none",
//     transition: "0.3s",
//   },

//   error: {
//     color: "red",
//     marginBottom: 12,
//     fontSize: 14,
//     fontWeight: 600,
//   },

//   btn: {
//     width: "100%",
//     padding: 13,
//     background: "#ff0000",
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: 700,
//     border: "none",
//     borderRadius: 10,
//     cursor: "pointer",
//     marginTop: 6,
//     transition: "0.3s",
//   }
// };


import React, { useState } from "react";
import { FaPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const FIXED_EMAIL = "admin@gmail.com";
  const FIXED_PASSWORD = "1";

  // 🔹 Pre-filled default values
  const [email, setEmail] = useState(FIXED_EMAIL);
  const [password, setPassword] = useState(FIXED_PASSWORD);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
      localStorage.setItem("sliderShown", "false"); // will show only once
      navigate("/TravelHome");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen bg-[#f8f8f8] flex flex-col items-center">

      {/* 🔴 Red Header */}
      <div className="bg-red-600 h-[28vh] w-full rounded-b-[30px] text-white flex flex-col justify-center items-center">
        <FaPlane size={55} />
        <h2 className="text-[26px] font-bold tracking-wide mt-2">MiniTravel</h2>
      </div>

      {/* White Card */}
      <div className="w-[88%] bg-white mt-[-50px] rounded-[18px] p-[26px] shadow-[0px_6px_25px_rgba(0,0,0,0.10)] text-center animate-[slideUp_0.7s_ease]">
        <h3 className="text-[22px] font-bold mb-5">Sign in to Continue</h3>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-4 text-left">
            <label className="block text-[14px] font-semibold mb-1 text-[#333]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-[11px] rounded-[10px] border border-gray-300 text-[15px] outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="mb-4 text-left">
            <label className="block text-[14px] font-semibold mb-1 text-[#333]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-[11px] rounded-[10px] border border-gray-300 text-[15px] outline-none"
            />
          </div>

          {error && <p className="text-red-600 font-semibold mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full p-[13px] bg-red-600 text-white text-[16px] font-bold rounded-[10px] mt-2 cursor-pointer animate-[glow_1.6s_infinite]"
          >
            Login
          </button>

        </form>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0% { box-shadow: 0 0 10px rgba(255,0,0,0.4); }
          100% { box-shadow: 0 0 20px rgba(255,0,0,0.9); }
        }
      `}</style>
    </div>
  );
};

export default Login;
