// src/hooks/useFlightSearch.js
import { useState } from "react";
import axios from "axios";

const SEARCH_URL = "https://travel.axievadev.com:8533/kiu/v1/getAvailability";
const BOOK_URL   = "https://travel.axievadev.com:8533/kiu/v1/createBooking";
const API_TOKEN  = "B5BC0CD62803A992208CFCFE92827C35";

export default function useFlightSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postReq = async (url, payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(url, payload,{
        headers:{
          "Content-Type":"application/json",
          "KIU-API-Token":API_TOKEN
        }
      });
      setLoading(false);
      return res.data;
    } catch(err){
      setError(err);
      setLoading(false);
      return null;
    }
  };

  return {
    searchFlights:(p)=>postReq(SEARCH_URL,p),
    createBooking:(p)=>postReq(BOOK_URL,p),
    loading,
    error
  };
}

// import { useState } from "react";
// import axios from "axios";

// const API_URL = "https://travel.axievadev.com:8533/kiu/v1/getAvailability"; 
// const API_TOKEN = "B5BC0CD62803A992208CFCFE92827C35"; 

// export default function useFlightSearch() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const searchFlights = async (payload) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(API_URL, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           "KIU-API-Token": API_TOKEN   // <--- FIXED
//         },
//       });

//       setLoading(false);
//       return response.data;   // we will send this to ResultsPage
//     } catch (err) {
//       setError(err);
//       setLoading(false);
//       console.error("Flight search failed:", err);
//       return null;
//     }
//   };

//   return { searchFlights, loading, error };
// }

