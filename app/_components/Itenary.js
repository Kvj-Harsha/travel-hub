"use client";
import { useState, useEffect } from "react";
import { FaHotel, FaCar, FaDollarSign, FaCalendarAlt, FaPlane, FaRupeeSign } from "react-icons/fa";
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
    tripType: "",
    budget: "",
    tripID: "",
    UserName: username
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [travelPlan, setTravelPlan] = useState(null);
  const [docId, setDocId] = useState(null);

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

    const tripID = generateTripID();
    const updatedTripData = { ...tripData, tripID };
    setSubmittedData(updatedTripData);

    try {
      const docRef = await addDoc(collection(db, "itineraries"), updatedTripData);
      console.log("Document written with ID: ", docRef.id);
      setDocId(docRef.id);
      alert(`Trip confirmed and saved with Trip ID: ${tripID}`);

      await generateTravelPlan(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to save trip. Try again.");
    }
  };

  const generateTravelPlan = async (docId) => {
    const FINAL_PROMPT = `
      Generate a travel plan for a "${tripData.tripType}" trip from "${tripData.source}" to "${tripData.destination}" with ${tripData.days} days and ${tripData.travelers} traveler(s). 
      Accommodation preference is "${tripData.accommodation}", with local transportation by "${tripData.localTransport}" 
      and travel from the source to the destination by "${tripData.travelMode}". 
      Budget is "${tripData.budget}". 
      Provide a list of hotel options including HotelName, HotelAddress, Price, 
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
            label: "Source",
            icon: FaHotel,
            type: "text",
            name: "source",
            placeholder: "Enter source",
            required: true
          }, {
            label: "Destination",
            icon: FaHotel,
            type: "text",
            name: "destination",
            placeholder: "Enter destination",
            required: true
          }, {
            label: "Number of Days",
            icon: FaCalendarAlt,
            type: "number",
            name: "days",
            placeholder: "Enter number of days",
            min: 1,
            required: true
          }, {
            label: "Number of Travelers",
            icon: FaCar,
            type: "number",
            name: "travelers",
            placeholder: "Enter number of travelers",
            min: 1,
            required: true
          }, {
            label: "Budget (INR)",
            icon: FaRupeeSign,
            type: "number",
            name: "budget",
            placeholder: "Enter budget",
            min: 0
          }].map(({ label, icon: Icon, ...inputProps }, index) => (
            <div key={index} className="space-y-2">
              <label className="block font-medium text-gray-700">{label}</label>
              <div className="flex items-center space-x-3">
                <Icon className="text-blue-500" />
                <input
                  {...inputProps}
                  value={tripData[inputProps.name]}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
          ))}

          {/* Dropdowns for Accommodation, Mode of Travel, Local Transport, and Trip Type */}
          {[{
            label: "Accommodation Preference",
            name: "accommodation",
            options: ["Select Accommodation Preference", "Hotel", "Resort", "Airbnb", "Homestay"],
            icon: FaHotel
          }, {
            label: "Mode of Travel",
            name: "travelMode",
            options: ["Select Mode of Travel", "Train", "Cruise", "Aeroplane"],
            icon: FaPlane
          }, {
            label: "Local Transport",
            name: "localTransport",
            options: ["Select Local Transport", "Train", "Bus", "Car"],
            icon: FaCar
          }, {
            label: "Trip Type",
            name: "tripType",
            options: ["Select Trip Type", "Single", "Couple", "Friends", "Family"],
            icon: FaCalendarAlt
          }].map(({ label, name, options, icon: Icon }, index) => (
            <div key={index} className="space-y-2">
              <label className="block font-medium text-gray-700">{label}</label>
              <div className="flex items-center space-x-3">
                <Icon className="text-blue-500" />
                <select
                  name={name}
                  value={tripData[name]}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
                  required
                >
                  {options.map((option, i) => (
                    <option key={i} value={i === 0 ? "" : option}>{option}</option>
                  ))}
                </select>
              </div>
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

        {travelPlan && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Travel Plan</h2>
            <pre className="text-sm text-gray-700 mt-2">{JSON.stringify(travelPlan, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
