"use client";
import { useState, useEffect } from "react";
import { FaHotel, FaCar, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { chatSession } from "../service/AIModal";
import Link from "next/link";  // Import Link for navigation

import { useUser } from "@clerk/nextjs";  // Assuming client-side usage

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
  const { user } = useUser();
  const username = user?.username || 'Guest';
  const [tripData, setTripData] = useState({
    source: "",
    destination: "",
    days: "",
    travelers: "",
    accommodation: "",
    transport: "",
    tripType: "", // Add tripType to the state
    budget: "",
    tripID: "",
    UserName: username // Add UserName to the state
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [travelPlan, setTravelPlan] = useState(null);
  const [docId, setDocId] = useState(null); // to store the document ID

  // Generate a unique Trip ID
  const generateTripID = () => `TRIP-${Math.floor(Math.random() * 1000000)}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tripData.destination || !tripData.days || !tripData.travelers) {
      alert("Please fill in all required fields.");
      return;
    }

    // Generate and add the tripID to tripData before saving
    const tripID = generateTripID();
    const updatedTripData = { ...tripData, tripID };
    setSubmittedData(updatedTripData);

    try {
      const docRef = await addDoc(collection(db, "itineraries"), updatedTripData);
      console.log("Document written with ID: ", docRef.id);
      setDocId(docRef.id); // Store the document ID
      alert(`Trip confirmed and saved with Trip ID: ${tripID}`);

      // Generate travel plan after successfully saving to Firestore
      await generateTravelPlan(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to save trip. Try again.");
    }
  };

  const generateTravelPlan = async (docId) => {
    const FINAL_PROMPT = `
      Generate a travel plan for a "${tripData.tripType}" trip from "${tripData.source}" to "${tripData.destination}" with ${tripData.days} days and ${tripData.travelers} traveler(s). 
      Accommodation preference is "${tripData.accommodation}" and preferred mode of transportation is "${tripData.transport}". 
      The budget for the trip is ${tripData.budget} INR. Provide a list of hotel options including HotelName, HotelAddress, Price, 
      HotelImageURL, GeoCoordinates, Rating, and Description. Additionally, create a daily itinerary that includes place names, details, 
      images, geo-coordinates, ticket pricing, travel time between locations, and recommended visit times for each of the ${tripData.days} days in JSON format.
    `;

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      setTravelPlan(responseText);

      const travelPlanData = JSON.parse(responseText);
      const itineraryDocRef = doc(db, "itineraries", docId);
      await updateDoc(itineraryDocRef, { travelPlan: travelPlanData });

      console.log("Travel plan successfully added to the document");
      alert("Travel plan saved successfully!");
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

          {[{
            icon: FaHotel,
            type: "text",
            name: "source",
            placeholder: "Source",
            required: true
          }, {
            icon: FaHotel,
            type: "text",
            name: "destination",
            placeholder: "Destination",
            required: true
          }, {
            icon: FaCalendarAlt,
            type: "number",
            name: "days",
            placeholder: "Number of Days",
            min: 1,
            required: true
          }, {
            icon: FaCar,
            type: "number",
            name: "travelers",
            placeholder: "Number of Travelers",
            min: 1,
            required: true
          }, {
            icon: FaDollarSign,
            type: "number",
            name: "budget",
            placeholder: "Budget (INR)",
            min: 0
          }].map(({ icon: Icon, ...inputProps }, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon className="text-blue-500" />
              <input
                {...inputProps}
                value={tripData[inputProps.name]}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>
          ))}

          {/* Accommodation preference dropdown */}
          <div className="flex items-center space-x-3">
            <FaHotel className="text-blue-500" />
            <select
              name="accommodation"
              value={tripData.accommodation}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select Accommodation Preference</option>
              <option value="Hotel">Hotel</option>
              <option value="Resort">Resort</option>
              <option value="Airbnb">Airbnb</option>
              <option value="Homestay">Homestay</option>
            </select>
          </div>

          {/* Preferred transport dropdown */}
          <div className="flex items-center space-x-3">
            <FaCar className="text-blue-500" />
            <select
              name="transport"
              value={tripData.transport}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select Preferred Transport</option>
              <option value="Train">Train</option>
              <option value="Bus">Bus</option>
              <option value="Car">Car</option>
              <option value="Aeroplane">Aeroplane</option>
            </select>
          </div>

          {/* Trip type dropdown */}
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500" />
            <select
              name="tripType"
              value={tripData.tripType}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select Trip Type</option>
              <option value="Single">Single</option>
              <option value="Couple">Couple</option>
              <option value="Friends">Friends</option>
              <option value="Family">Family</option>
            </select>
          </div>

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

        {travelPlan && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Travel Plan</h2>
            <pre className="text-sm text-gray-700 mt-2">{travelPlan}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
