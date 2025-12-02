import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(window.location.search);
}

const Profile = () => {
  const navigate = useNavigate();
  const q = useQuery();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const user = {
    name: "Anubhav",
    mobile: "+91 9917677253",
  };


  useEffect(() => {
    const t = q.get("token");
    const u = q.get("user");

    if (t) setToken(t);
    if (u) {
      try {
        setUser(JSON.parse(decodeURIComponent(u)));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Receive data from React Native
  useEffect(() => {
    window.onNativeMessage = (msg) => {
      if (msg.type === "AUTH_DATA") {
        setToken(msg.token);
        setUser(msg.user);
      }
    };

    if (!token && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "REQUEST_AUTH_DATA" })
      );
    }
  }, [token]);


  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <>
      {/* ---------- UI + Animations ---------- */}
      <style>{`
        body {
          margin:0;
          padding:0;
          font-family: Arial, sans-serif;
          background:#f5f6fa;
        }

        .profile-page {
          min-height:100vh;
          background:#f6f7fc;
        }

        /* White card sliding from bottom */
        .profile-info {
          background:white;
          margin-top:-40px;
          border-radius:30px 30px 0 0;
          padding:30px 20px;
          text-align:center;
          box-shadow:0 -5px 22px rgba(0,0,0,0.10);
          animation:slideUp 0.6s ease forwards;
          opacity:0;
        }

        @keyframes slideUp {
          from {opacity:0; transform:translateY(30px);}
          to {opacity:1; transform:translateY(0);}
        }

        .profile-name {
          font-size:26px;
          font-weight:700;
          margin-bottom:6px;
        }

        .profile-number {
          color:#666;
          font-size:14.5px;
          margin-bottom:22px;
        }

        /* Buttons styling */
        .profile-links button {
          width:100%;
          background:#fff;
          padding:14px;
          border-radius:14px;
          border:1px solid #e5e5e5;
          font-weight:600;
          font-size:15px;
          transition:0.25s ease;
        }

        .profile-links button:hover {
          background:#ff0000;
          color:#fff;
          transform:translateY(-2px);
          box-shadow:0 4px 14px rgba(255,0,0,0.3);
        }

        .logout-btn {
          background:#ff3232 !important;
          color:#fff !important;
          border:none !important;
          box-shadow:0 4px 10px rgba(255,0,0,0.4);
        }

        .logout-btn:hover {
          background:#e00000 !important;
          transform:scale(1.03);
        }
      `}</style>

      {/* ---------- PAGE UI ---------- */}
      <div className="profile-page">
        <Header title="Profile" showBack={true} />

        {/* Top Red Header */}
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
          <FaPlane size={50} />
        </div>

        {/* Profile Card */}
        <div className="profile-info">
          <h2 className="profile-name">{user?.name }</h2>
          <p className="profile-number">{user.mobile}</p>

          <div className="profile-links" style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <button>Terms & Conditions</button>
            <button>Privacy Policy</button>
            <button>FAQs</button>
            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;




// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import { FaPlane } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function useQuery() {
//   return new URLSearchParams(window.location.search);
// }

// const Profile = () => {
//   const navigate = useNavigate();
//   const q = useQuery();

//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState({
//     name: "User",
//     mobile: "+25509098890",
//   });

//   // -----------------------------
//   // READ TOKEN + USER FROM URL
//   // -----------------------------
//   useEffect(() => {
//     const t = q.get("token");
//     const u = q.get("user");

//     if (t) setToken(t);

//     if (u) {
//       try {
//         const parsedUser = JSON.parse(decodeURIComponent(u));
//         setUser(parsedUser);
//       } catch (err) {
//         console.log("Failed to parse user from URL:", err);
//       }
//     }
//   }, []);

//   // -----------------------------
//   // RECEIVE AUTH FROM React Native
//   // -----------------------------
//   useEffect(() => {
//     window.onNativeMessage = (msg) => {
//       if (msg.type === "AUTH_DATA") {
//         setToken(msg.token);
//         setUser(msg.user);
//       }
//     };

//     if (!token && window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage(
//         JSON.stringify({ type: "REQUEST_AUTH_DATA" })
//       );
//     }
//   }, [token]);

//   // -----------------------------
//   // LOGOUT HANDLER
//   // -----------------------------
//   const handleLogout = () => {
//     localStorage.removeItem("loggedIn");

//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage(
//         JSON.stringify({ type: "LOGOUT" })
//       );
//     }

//     navigate("/");
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           margin:0;
//           padding:0;
//           font-family: Arial, sans-serif;
//           background:#f5f6fa;
//         }

//         .profile-page {
//           min-height:100vh;
//           background:#f6f7fc;
//         }

//         .profile-info {
//           background:white;
//           margin-top:-40px;
//           border-radius:30px 30px 0 0;
//           padding:30px 20px;
//           text-align:center;
//           box-shadow:0 -5px 22px rgba(0,0,0,0.10);
//           animation:slideUp 0.6s ease forwards;
//           opacity:0;
//         }

//         @keyframes slideUp {
//           from {opacity:0; transform:translateY(30px);}
//           to {opacity:1; transform:translateY(0);}
//         }

//         .profile-name {
//           font-size:26px;
//           font-weight:700;
//           margin-bottom:6px;
//         }

//         .profile-number {
//           color:#666;
//           font-size:14.5px;
//           margin-bottom:22px;
//         }

//         .profile-links button {
//           width:100%;
//           background:#fff;
//           padding:14px;
//           border-radius:14px;
//           border:1px solid #e5e5e5;
//           font-weight:600;
//           font-size:15px;
//           transition:0.25s ease;
//         }

//         .profile-links button:hover {
//           background:#ff0000;
//           color:#fff;
//           transform:translateY(-2px);
//           box-shadow:0 4px 14px rgba(255,0,0,0.3);
//         }

//         .logout-btn {
//           background:#ff3232 !important;
//           color:#fff !important;
//           border:none !important;
//           box-shadow:0 4px 10px rgba(255,0,0,0.4);
//         }

//         .logout-btn:hover {
//           background:#e00000 !important;
//           transform:scale(1.03);
//         }
//       `}</style>

//       <div className="profile-page">
//         <Header title="Profile" showBack={true} />

//         {/* RED TOP HEADER */}
//         <div
//           className="profile-header"
//           style={{
//             backgroundColor: "#FF0000",
//             height: "25vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             color: "#fff",
//           }}
//         >
//           <FaPlane size={50} />
//         </div>

//         {/* WHITE PROFILE CARD */}
//         <div className="profile-info">
//           <h2 className="profile-name">{user?.name || "User"}</h2>
//           <p className="profile-number">{user?.mobile || ""}</p>

//           <div
//             className="profile-links"
//             style={{ display: "flex", flexDirection: "column", gap: "12px" }}
//           >
//             <button>Terms & Conditions</button>
//             <button>Privacy Policy</button>
//             <button>FAQs</button>

//             <button className="logout-btn" onClick={handleLogout}>
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;




