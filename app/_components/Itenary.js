"use client";
import { useState } from "react";
import { FaCalendarAlt, FaHotel, FaCar, FaDollarSign } from "react-icons/fa";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { chatSession } from "../service/AIModal";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiUZe-0sJ6_EG35BpT1zJCPCzct9UrkCc",
  authDomain: "travelhub-1.firebaseapp.com",
  projectId: "travelhub-1",
  storageBucket: "travelhub-1.appspot.com",
  messagingSenderId: "961577383911",
  appId: "1:961577383911:web:b0afb4df1d9e79a6c9af42"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Itinerary() {
  const [tripData, setTripData] = useState({
    tripName: "",
    destinations: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    accommodation: "",
    transport: "",
    activities: "",
    cuisine: "",
    additionalNotes: "",
    budget: 500,
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tripData.tripName || !tripData.destinations || !tripData.startDate || !tripData.endDate || !tripData.travelers) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmittedData(tripData);

    try {
      const docRef = await addDoc(collection(db, "itineraries"), tripData);
      console.log("Document written with ID: ", docRef.id);
      alert("Trip confirmed and saved!");

      // Generate travel plan after successfully saving to Firestore
      await generateTravelPlan();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to save trip. Try again.");
    }
  };

  const generateTravelPlan = async () => {
    const days = (new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24);
    const FINAL_PROMPT = `
      Generate a travel plan for a trip named "${tripData.tripName}" to the destination(s) "${tripData.destinations}" from ${tripData.startDate} to ${tripData.endDate}, 
      with ${tripData.travelers} traveler(s). Accommodation preference is "${tripData.accommodation}" and preferred mode of transportation is "${tripData.transport}". 
      The budget for the trip is ${tripData.budget} USD. Provide a hotel options list including HotelName, HotelAddress, Price, HotelImageURL, 
      GeoCoordinates, Rating, and Description. Additionally, create a daily itinerary that includes place names, details, images, geo-coordinates, 
      ticket pricing, travel time between locations, and recommended visit times for each of the ${days} days in JSON format.
    `;

    console.log("Sending prompt to Gemini API:", FINAL_PROMPT); // Debugging log

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      console.log("Travel plan response from Gemini API:", responseText);
    } catch (error) {
      console.error("Error generating travel plan: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Trip Itinerary Planner</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold">Trip Details</h2>

          {[
            { icon: FaCalendarAlt, type: "text", name: "tripName", placeholder: "Trip Name", required: true },
            { icon: FaHotel, type: "text", name: "destinations", placeholder: "Destinations", required: true },
            { icon: FaCalendarAlt, type: "date", name: "startDate", required: true },
            { icon: FaCalendarAlt, type: "date", name: "endDate", required: true },
            { icon: FaCar, type: "number", name: "travelers", placeholder: "Number of Travelers", min: 1, required: true },
            { icon: FaHotel, type: "text", name: "accommodation", placeholder: "Accommodation Preference" },
            { icon: FaCar, type: "text", name: "transport", placeholder: "Preferred Transport" },
            { icon: FaCalendarAlt, type: "text", name: "activities", placeholder: "Activities" },
            { icon: FaCalendarAlt, type: "text", name: "cuisine", placeholder: "Cuisine Preferences" },
            { icon: FaCalendarAlt, type: "textarea", name: "additionalNotes", placeholder: "Additional Notes" },
            { icon: FaDollarSign, type: "number", name: "budget", placeholder: "Budget (USD)", min: 0 },
          ].map(({ icon: Icon, ...inputProps }, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon className="text-blue-500" />
              {inputProps.type === "textarea" ? (
                <textarea
                  {...inputProps}
                  value={tripData[inputProps.name]}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                />
              ) : (
                <input
                  {...inputProps}
                  value={tripData[inputProps.name]}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            Confirm Trip
          </button>
        </form>

        {submittedData && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Trip Data Summary</h2>
            <div className="text-sm text-gray-700 mt-2">
              {Object.entries(submittedData).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong> {value}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
