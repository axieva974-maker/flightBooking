import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useFlightSearch from "../hooks/post";
import Header from "../components/Header";

export default function FlightDetails() {
  const { state } = useLocation();
  const flight = state?.flight;
  const { createBooking, loading } = useFlightSearch();

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("M");

  // Format DOB to DDMMMYY
  const formatDOB = (dobString) => {
    if (!dobString) return "";
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const d = new Date(dobString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = months[d.getMonth()];
    const year = String(d.getFullYear()).slice(-2);
    return `${day}${month}${year}`;
  };

  const handleSubmit = async () => {
    if (!flight) return alert("No flight selected");
    if (!email || !mobile || !firstName || !lastName || !dob) {
      return alert("Please fill all required fields");
    }

    const echoToken = flight.echoToken || "DOB_TESTXX";
    const sessionId = flight.sessionId || "4321";

    const payload = {
      sessionId,
      userId: "Anubhav",
      date_time: new Date().toISOString(),
      echo_token: echoToken,
      point_of_sale: {
        user: "PW",
        kiu_device_id: "DAR00PWC01",
        agent_id: "DAR00PWMB",
        preferred_display_currency: "USD",
        country: "TZ"
      },
      passenger_information: [
        {
          passenger_reference_order: 1,
          surname: lastName.toUpperCase(),
          name: firstName.toUpperCase(),
          gender,
          foid_type: "PP",
          foid_id: "11123334",
          date_of_birth: formatDOB(dob),
          passenger_type_code: "ADT",
          baggage_information: [
            {
              weight: 23,
              weightUnit: "K",
              off_point: flight.route?.from,
              on_point: flight.route?.to,
              flight_order: 1
            }
          ]
        }
      ],
      air_price: true,
      air_itinerary_information: [
        {
          order: 1,
          flight_number: flight.flightNumber.toString().padStart(4, "0"),
          carrier: flight.airline?.designator,
          reservation_booking_designator_code: flight.rbd || "GPROWTZ",
          number_in_party: 1,
          departure_information: {
            location_code: flight.route?.from,
            date: flight.STD?.split("T")[0] || new Date().toISOString().split("T")[0],
            time: flight.STD?.split("T")[1]?.replace(":", "").slice(0, 4) || "1130"
          },
          arrival_information: {
            location_code: flight.route?.to,
            date: flight.STA?.split("T")[0] || new Date().toISOString().split("T")[0],
            time: flight.STA?.split("T")[1]?.replace(":", "").slice(0, 4) || "1200"
          }
        }
      ],
      contact_information: {
        email_list: [{ email_address: email }],
        mobile_list: [{ mobile_number: Number(mobile), language_code: "EN" }]
      },
      time_limits_criteria: {
        booking_ticket_time_limit: {
          auto_cancel: true,
          creation_date: { hour: true, time_quantity: 1 }
        }
      },
      date: flight.STD?.split("T")[0] || new Date().toISOString().split("T")[0],
      time: flight.STD?.split("T")[1]?.replace(":", "").slice(0, 4) || "1130"
    };

    console.log("Booking Payload:", payload);

    try {
      const res = await createBooking(payload);
      console.log("Booking Response:", res);

      if (res) {
        alert("Booking Successful ✔");
      } else {
        alert("Booking failed. Check console for details.");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert("An error occurred during booking. Please try again.");
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans pb-28">
      <Header title="Travel Booking" showBack={true} />
      <h2 className="text-[14px] font-bold mt-3 ms-3">TRIP DETAILS (TP)</h2>

      {/* Flight Card */}
      <div className="bg-white mx-3 mt-2 rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
        <p className="font-semibold text-[15px]">{flight?.airline?.name}</p>
        <div className="flex justify-between items-center mt-1 text-[13px] font-semibold">
          <span>{flight.route.from}</span>
          <span>{new Date(flight.route.STD).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <div className="flex justify-between items-center text-[13px] font-semibold mt-1">
          <span>{flight.route.to}</span>
          <span>{new Date(flight.route.STA).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <p className="mt-2 text-xs text-gray-500">1 Stop</p>
        <p className="text-[11px] text-gray-500 font-semibold">Economy · {flight.flightNumber}</p>
      </div>

      <p className="text-[12px] mt-5 ms-4 underline text-gray-700 font-semibold">Terms and Conditions</p>

      {/* Contact Section */}
      <p className="font-bold text-[13px] text-gray-700 mt-5 ms-4">Contact information</p>
      <p className="text-[11px] text-gray-500 ms-4">Your travel details will be sent here</p>
      <div className="mx-4 mt-3 space-y-4">
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border-b-2 border-red-500 py-1 text-[14px] focus:outline-none"
        />
        <input
          placeholder="Mobile No (974712xxxx)"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          className="w-full border-b-2 border-red-500 py-1 text-[14px] focus:outline-none"
        />
      </div>

      {/* Adult Form */}
      <p className="font-bold text-[13px] text-gray-700 mt-8 ms-4">ADULT 1</p>
      <div className="mx-4 mt-3 space-y-4">
        <input
          placeholder="First & Middle Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="w-full border-b-2 border-red-500 py-1 text-[14px] focus:outline-none"
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className="w-full border-b-2 border-red-500 py-1 text-[14px] focus:outline-none"
        />
        <div className="border-b-2 border-red-500 flex justify-between items-center pb-1 text-[14px]">
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="w-full bg-transparent focus:outline-none"
          />
          <span className="text-red-500 text-[18px]">📅</span>
        </div>
        <select
          value={gender}
          onChange={e => setGender(e.target.value)}
          className="w-full border-b-2 border-red-500 py-1 text-[14px] bg-transparent focus:outline-none"
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-xl">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 text-white text-[16px] font-bold rounded-md py-3 active:scale-95 transition"
        >
          {loading ? "Processing..." : "CONTINUE"}
        </button>
      </div>
    </div>
  );
}


