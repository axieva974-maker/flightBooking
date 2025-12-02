// import React, { useState, useEffect, useRef } from "react";
// import Header from "../components/Header";
// import TravelSlider from "../components/TravelSlider";
// import {
//   FaPlane,
//   FaPlaneDeparture,
//   FaPlaneArrival,
//   FaCalendarAlt,
//   FaUsers,
//   FaTicketAlt,
//   FaChevronDown,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import useFlightSearch from "../hooks/post"; // ✅ import your hook

// function useQuery() {
//   return new URLSearchParams(window.location.search);
// }

// const AIRPORTS = [
//   {
//     code: "DAR",
//     name: "Mwalimu Julius K. Nyerere International Airport",
//     city: "Dar es Salaam",
//   },
//   { code: "ZNZ", name: "Zanzibar – ZNZ", city: "Zanzibar" },
// ];

// export default function TravelHome() {
//   const q = useQuery();

//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
  
//   // show only once after fresh login
//   const [showSlider, setShowSlider] = useState(false);

//   useEffect(() => {
//     const shown = localStorage.getItem("sliderShown");
//     if (shown !== "true") {
//       setShowSlider(true);
//       localStorage.setItem("sliderShown", "true");
//     }
//   }, []);

//   const [tripType, setTripType] = useState("ONE_WAY");
//   const [from, setFrom] = useState(AIRPORTS[0]);
//   const [to, setTo] = useState(AIRPORTS[1]);
//   const [departureDate, setDepartureDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [passengerQty, setPassengerQty] = useState(1);
//   const [travelClass, setTravelClass] = useState("Economy");

//   // API session info
//   const [sessionId] = useState("4321");
//   const [userId] = useState("Anubhav");
//   const [customerId] = useState("255754111111");
//   const [phone] = useState("255754111111");

//   const navigate = useNavigate();
//   const { searchFlights, loading } = useFlightSearch(); // ✅ use hook

//   const swap = () => {
//     setFrom((prev) => {
//       const old = prev;
//       setTo(old === from ? to : from);
//       return to;
//     });
//   };

//   const handleSearchFlights = async () => {
//     if (!departureDate) return alert("Please select departure date");
//     if (tripType === "ROUND_TRIP" && !returnDate)
//       return alert("Please select return date");

//     const payload = {
//       sessionId,
//       userId,
//       tripType,
//       customerId,
//       originLocationCode: from.code,
//       destinationlocationCode: to.code,
//       departureDateTime: departureDate,
//       returnDateTime: tripType === "ROUND_TRIP" ? returnDate : null,
//       phoneNumber: phone,
//       passengers: [{ type: "ADLT", quantity: Number(passengerQty) }],
//     };

//     const flightsData = await searchFlights(payload);

//     if (flightsData) {
//       navigate("/results", {
//         state: { data: flightsData, from, to, departureDate, returnDate, tripType },
//       });
//     } else {
//       alert("Failed to fetch flights.");
//     }
//   };

//   // Location
//   const [location, setLocation] = useState({ lat: null, lng: null });

//   useEffect(() => {
//     const t = q.get("token");
//     const u = q.get("user");

//     if (t) setToken(t);
//     if (u) {
//       try {
//         setUser(JSON.parse(decodeURIComponent(u)));
//       } catch {
//         setUser(null);
//       }
//     }
//   }, []);

//   // Receive data from React Native
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

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center">
//       <div className="w-full max-w-md">
//         <Header title="Home" user={user?.name ? user.name : "User"} />
//         {showSlider && <TravelSlider onFinish={() => setShowSlider(false)} />}

//         {/* banner */}
//         <div className="bg-red-600 text-white rounded-b-3xl px-5 py-4">
//           <div className="flex justify-between items-start">
//             <h1 className="text-base font-semibold">Travel Booking</h1>
//             <div className="opacity-90 text-xs">•••</div>
//           </div>

//           <div className="mt-3">
//             <h2 className="text-sm font-bold leading-5">
//               Unlock a new level of convenience by booking your flights directly
//               through M-Pesa
//             </h2>

//             <div className="mt-3 bg-white rounded-xl p-2 flex justify-between items-center text-center shadow-sm">
//               <div
//                 className="w-1/4 text-xs cursor-pointer"
//                 onClick={() => navigate("/flightdetailsMain")}
//               >
//                 <div className="bg-white inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 shadow-sm">
//                   <FaPlane className="text-red-600 size-5" />
//                 </div>
//                 <div className="text-[10px] text-black font-semibold">Flights</div>
//               </div>
//               <div
//                 className="w-1/4 text-xs cursor-pointer"
//                 onClick={() => navigate("/bookingDetails")}
//               >
//                 <div className="bg-white inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 shadow-sm">
//                   <FaTicketAlt className="text-red-600 size-5" />
//                 </div>
//                 <div className="text-[10px] text-black font-semibold">Bookings</div>
//               </div>
//               <div
//                 className="w-1/4 text-xs cursor-pointer"
//                 onClick={() => navigate("/Profile")}
//               >
//                 <div className="bg-white inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 shadow-sm">
//                   <FaUsers className="text-red-600 size-5" />
//                 </div>
//                 <div className="text-[10px] text-black font-semibold">Profile</div>
//               </div>
//               <div
//                 className="w-1/4 text-xs cursor-pointer"
//                 onClick={() => navigate("/helpingDesk")}
//               >
//                 <div className="bg-white inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 shadow-sm">
//                   <FaCalendarAlt className="text-red-600 size-5" />
//                 </div>
//                 <div className="text-[10px] text-black font-semibold">Helpdesk</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* tabs */}
//         <div className="px-4 mt-4">
//           <div className="flex gap-3">
//             <button
//               onClick={() => setTripType("ONE_WAY")}
//               className={`flex-1 rounded-full py-2 text-sm font-semibold ${
//                 tripType === "ONE_WAY"
//                   ? "bg-red-600 text-white"
//                   : "bg-white border"
//               }`}
//             >
//               ONE WAY
//             </button>

//             <button
//               onClick={() => setTripType("ROUND_TRIP")}
//               className={`flex-1 rounded-full py-2 text-sm font-semibold ${
//                 tripType === "ROUND_TRIP"
//                   ? "bg-red-600 text-white"
//                   : "bg-white border"
//               }`}
//             >
//               ROUND TRIP
//             </button>
//           </div>
//         </div>

//         {/* search card */}
//         <div className="bg-white mx-4 mt-4 rounded-xl shadow-md overflow-hidden">
//           {/* FROM row */}
//           <div className="px-4 py-3 border-b flex items-start gap-3">
//             <div className="pt-1">
//               <div className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center text-red-600">
//                 <FaPlaneDeparture />
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="text-xs font-medium text-gray-500">FROM</div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-semibold text-gray-900">{from.name}</div>
//                   <div className="text-xs text-gray-500 mt-0.5">
//                     {from.city}{" "}
//                     <span className="ml-2 text-xs font-bold text-red-600">{from.code}</span>
//                   </div>
//                 </div>
//                 <div className="text-gray-400">
//                   <FaChevronDown />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* TO row */}
//           <div className="px-4 py-3 border-b flex items-start gap-3">
//             <div className="pt-1">
//               <div className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center text-red-600">
//                 <FaPlaneArrival />
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="text-xs font-medium text-gray-500">TO</div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-semibold text-gray-900">{to.name}</div>
//                   <div className="text-xs text-gray-500 mt-0.5">
//                     {to.city}{" "}
//                     <span className="ml-2 text-xs font-bold text-red-600">{to.code}</span>
//                   </div>
//                 </div>
//                 <div className="text-gray-400">
//                   <FaChevronDown />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* dates -> two columns */}
//           <div className="px-4 py-3 border-b grid grid-cols-2 gap-3">
//             <div>
//               <div className="text-xs text-gray-500">DEPARTURE DATE</div>
//               <div className="mt-2 bg-gray-50 p-3 rounded-md flex items-center">
//                 <FaCalendarAlt className="text-red-600 mr-3" />
//                 <input
//                   type="date"
//                   value={departureDate}
//                   onChange={(e) => setDepartureDate(e.target.value)}
//                   className="bg-transparent outline-none text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="text-xs text-gray-500">RETURN DATE</div>
//               <div className="mt-2 bg-gray-50 p-3 rounded-md flex items-center">
//                 <FaCalendarAlt className="text-red-600 mr-3" />
//                 <input
//                   type="date"
//                   value={returnDate}
//                   onChange={(e) => setReturnDate(e.target.value)}
//                   disabled={tripType === "ONE_WAY"}
//                   className={`bg-transparent outline-none text-sm ${
//                     tripType === "ONE_WAY" ? "opacity-60" : ""
//                   }`}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* travellers & class */}
//           <div className="px-4 py-3 border-b flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center text-red-600">
//                 <FaUsers />
//               </div>
//               <div>
//                 <div className="text-xs text-gray-500">TRAVELLER & CLASS</div>
//                 <div className="text-sm font-semibold">
//                   {passengerQty} Traveller · {travelClass}
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <select
//                 value={passengerQty}
//                 onChange={(e) => setPassengerQty(Number(e.target.value))}
//                 className="border rounded px-2 py-1 text-sm"
//               >
//                 {[1, 2, 3, 4, 5].map((n) => (
//                   <option key={n} value={n}>
//                     {n}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={travelClass}
//                 onChange={(e) => setTravelClass(e.target.value)}
//                 className="border rounded px-2 py-1 text-sm"
//               >
//                 <option>Economy</option>
//                 <option>Business</option>
//                 <option>First</option>
//               </select>
//             </div>
//           </div>

//           {/* special discount / promo chips */}
//           <div className="px-4 py-3">
//             <div className="text-xs font-semibold text-red-600">
//               SPECIAL DISCOUNT
//             </div>
//             <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
//               <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-semibold">
//                 TZS15K
//               </div>
//               <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-semibold">
//                 PW20%
//               </div>
//               <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-semibold">
//                 SEP OFFER
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* search button */}
//         <div className="w-full px-4 pb-6 pt-4">
//           <button
//             onClick={handleSearchFlights}
//             disabled={loading}
//             className="w-full bg-red-600 text-white rounded-full py-3 font-bold text-sm shadow-lg active:scale-95"
//           >
//             {loading ? "Searching..." : "SEARCH FLIGHTS"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TravelSlider from "../components/TravelSlider";
import {
  FaPlane,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFlightSearch from "../hooks/post";

function useQuery() {
  return new URLSearchParams(window.location.search);
}

const AIRPORTS = [
  {
    code: "DAR",
    name: "Mwalimu Julius K. Nyerere International Airport",
    city: "Dar es Salaam",
  },
  { code: "ZNZ", name: "Zanzibar – ZNZ", city: "Zanzibar" },
];

export default function TravelHome() {
  const q = useQuery();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("sliderShown");
    if (shown !== "true") {
      setShowSlider(true);
      localStorage.setItem("sliderShown", "true");
    }
  }, []);

  const [tripType, setTripType] = useState("ONE_WAY");
  const [from, setFrom] = useState(AIRPORTS[0]);
  const [to, setTo] = useState(AIRPORTS[1]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengerQty, setPassengerQty] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const [sessionId] = useState("4321");
  const [userId] = useState("Anubhav");
  const [customerId] = useState("255754111111");
  const [phone] = useState("255754111111");

  const navigate = useNavigate();
  const { searchFlights, loading } = useFlightSearch();

  // Swap FROM <-> TO
  const swap = () => {
    const prevFrom = from;
    setFrom(to);
    setTo(prevFrom);
  };

  const handleSearchFlights = async () => {
    if (!departureDate) return alert("Please select departure date");
    if (tripType === "ROUND_TRIP" && !returnDate)
      return alert("Please select return date");

    const payload = {
      sessionId,
      userId,
      tripType,
      customerId,
      originLocationCode: from.code,
      destinationlocationCode: to.code,
      departureDateTime: departureDate,
      returnDateTime: tripType === "ROUND_TRIP" ? returnDate : null,
      phoneNumber: phone,
      passengers: [{ type: "ADLT", quantity: Number(passengerQty) }],
    };

    const flightsData = await searchFlights(payload);

    if (flightsData) {
      navigate("/results", {
        state: {
          data: flightsData,
          from,
          to,
          departureDate,
          returnDate,
          tripType,
        },
      });
    } else {
      alert("Failed to fetch flights.");
    }
  };

  // ✅ LOCATION COMMENT FIXED
  // Location (if needed later)
  const [location] = useState({ lat: null, lng: null });

  // Read user/token from URL
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md">

        {/* ✅ HEADER WITH USERNAME */}
        <Header title="Home" user={`Hi, ${user?.name || "User"}`} />

        {showSlider && <TravelSlider onFinish={() => setShowSlider(false)} />}

        {/* banner */}
        <div className="bg-red-600 text-white rounded-b-3xl px-5 py-4">
          <div className="flex justify-between items-start">
            <h1 className="text-base font-semibold">Travel Booking</h1>
            <div className="opacity-90 text-xs">•••</div>
          </div>

          <div className="mt-3">
            <h2 className="text-sm font-bold leading-5">
              Unlock a new level of convenience by booking your flights directly
              through M-Pesa
            </h2>

            <div className="mt-3 bg-white rounded-xl p-2 flex justify-between items-center text-center shadow-sm">
              <div
                className="w-1/4 text-xs cursor-pointer"
                onClick={() => navigate("/flightdetailsMain")}
              >
                <div className="bg-white inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 shadow-sm">
                  <FaPlane className="text-red-600 size-5" />
                </div>
                <div className="text-[10px] text-black font-semibold">
                  Flights
                </div>
              </div>

              <div
                className="w-1/4 text-xs cursor-pointer"
                onClick={() => navigate("/bookingDetails")}
              >
                <div className="bg-white inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 shadow-sm">
                  <FaTicketAlt className="text-red-600 size-5" />
                </div>
                <div className="text-[10px] text-black font-semibold">
                  Bookings
                </div>
              </div>

              <div
                className="w-1/4 text-xs cursor-pointer"
                onClick={() => navigate("/Profile")}
              >
                <div className="bg-white inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 shadow-sm">
                  <FaUsers className="text-red-600 size-5" />
                </div>
                <div className="text-[10px] text-black font-semibold">
                  Profile
                </div>
              </div>

              <div
                className="w-1/4 text-xs cursor-pointer"
                onClick={() => navigate("/helpingDesk")}
              >
                <div className="bg-white inline-flex items-center justify-center w-10 h-10 rounded-full mb-1 shadow-sm">
                  <FaCalendarAlt className="text-red-600 size-5" />
                </div>
                <div className="text-[10px] text-black font-semibold">
                  Helpdesk
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="px-4 mt-4">
          <div className="flex gap-3">
            <button
              onClick={() => setTripType("ONE_WAY")}
              className={`flex-1 rounded-full py-2 text-sm font-semibold ${
                tripType === "ONE_WAY"
                  ? "bg-red-600 text-white"
                  : "bg-white border"
              }`}
            >
              ONE WAY
            </button>

            <button
              onClick={() => setTripType("ROUND_TRIP")}
              className={`flex-1 rounded-full py-2 text-sm font-semibold ${
                tripType === "ROUND_TRIP"
                  ? "bg-red-600 text-white"
                  : "bg-white border"
              }`}
            >
              ROUND TRIP
            </button>
          </div>
        </div>

        {/* search card */}
        <div className="bg-white mx-4 mt-4 rounded-xl shadow-md overflow-hidden">

          {/* FROM row */}
          <div className="px-4 py-3 border-b flex items-start gap-3">
            <div className="pt-1">
              <div className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center text-red-600">
                <FaPlaneDeparture />
              </div>
            </div>

            <div className="flex-1">
              <div className="text-xs font-medium text-gray-500">FROM</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {from.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {from.city}
                    <span className="ml-2 text-xs font-bold text-red-600">
                      {from.code}
                    </span>
                  </div>
                </div>
                <div className="text-gray-400">
                  <FaChevronDown />
                </div>
              </div>
            </div>
          </div>

          {/* TO row */}
          <div className="px-4 py-3 border-b flex items-start gap-3">
            <div className="pt-1">
              <div className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center text-red-600">
                <FaPlaneArrival />
              </div>
            </div>

            <div className="flex-1">
              <div className="text-xs font-medium text-gray-500">TO</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {to.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {to.city}
                    <span className="ml-2 text-xs font-bold text-red-600">
                      {to.code}
                    </span>
                  </div>
                </div>
                <div className="text-gray-400">
                  <FaChevronDown />
                </div>
              </div>
            </div>
          </div>

          {/* dates */}
          <div className="px-4 py-3 border-b grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500">DEPARTURE DATE</div>
              <div className="mt-2 bg-gray-50 p-3 rounded-md flex items-center">
                <FaCalendarAlt className="text-red-600 mr-3" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">RETURN DATE</div>
              <div className="mt-2 bg-gray-50 p-3 rounded-md flex items-center">
                <FaCalendarAlt className="text-red-600 mr-3" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  disabled={tripType === "ONE_WAY"}
                  className={`bg-transparent outline-none text-sm ${
                    tripType === "ONE_WAY" ? "opacity-60" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* travellers & class */}
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center text-red-600">
                <FaUsers />
              </div>
              <div>
                <div className="text-xs text-gray-500">TRAVELLER & CLASS</div>
                <div className="text-sm font-semibold">
                  {passengerQty} Traveller · {travelClass}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={passengerQty}
                onChange={(e) => setPassengerQty(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>

          {/* special discount */}
          <div className="px-4 py-3">
            <div className="text-xs font-semibold text-red-600">
              SPECIAL DISCOUNT
            </div>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-semibold">
                TZS15K
              </div>
              <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-semibold">
                PW20%
              </div>
              <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs font-semibold">
                SEP OFFER
              </div>
            </div>
          </div>
        </div>

        {/* search button */}
        <div className="w-full px-4 pb-6 pt-4">
          <button
            onClick={handleSearchFlights}
            disabled={loading}
            className="w-full bg-red-600 text-white rounded-full py-3 font-bold text-sm shadow-lg active:scale-95"
          >
            {loading ? "Searching..." : "SEARCH FLIGHTS"}
          </button>
        </div>
      </div>
    </div>
  );
}







