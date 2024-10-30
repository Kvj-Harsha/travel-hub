"use client";
import { useState } from "react";
import { FaPlane, FaHotel, FaCar, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!tripData.tripName || !tripData.destinations || !tripData.startDate || !tripData.endDate || !tripData.travelers) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Trip Data:", JSON.stringify(tripData, null, 2));
    setSubmittedData(tripData); // Display data in JSON format

    try {
      const docRef = await addDoc(collection(db, "itineraries"), tripData);
      console.log("Document written with ID: ", docRef.id);
      alert("Trip confirmed and saved!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to save trip. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Trip Itinerary Planner</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold">Trip Details</h2>
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500" />
            <input
              type="text"
              name="tripName"
              value={tripData.tripName}
              onChange={handleInputChange}
              placeholder="Trip Name"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaPlane className="text-blue-500" />
            <input
              type="text"
              name="destinations"
              value={tripData.destinations}
              onChange={handleInputChange}
              placeholder="Destination(s)"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500" />
            <input
              type="date"
              name="startDate"
              value={tripData.startDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500" />
            <input
              type="date"
              name="endDate"
              value={tripData.endDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex items-center space-x-3">
            <BsCheckCircle className="text-blue-500" />
            <input
              type="number"
              name="travelers"
              value={tripData.travelers}
              onChange={handleInputChange}
              placeholder="Number of Travelers"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaHotel className="text-blue-500" />
            <select
              name="accommodation"
              value={tripData.accommodation}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            >
              <option value="" disabled>Select Accommodation Type</option>
              <option value="hotel">Hotel</option>
              <option value="airbnb">Airbnb</option>
              <option value="hostel">Hostel</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <FaCar className="text-blue-500" />
            <select
              name="transport"
              value={tripData.transport}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              required
            >
              <option value="" disabled>Preferred Mode of Transportation</option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="bus">Bus</option>
              <option value="car">Car Rental</option>
            </select>
          </div>
          <input
            type="text"
            name="activities"
            value={tripData.activities}
            onChange={handleInputChange}
            placeholder="Desired Activities (e.g., sightseeing, hiking)"
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            name="cuisine"
            value={tripData.cuisine}
            onChange={handleInputChange}
            placeholder="Cuisine Preferences"
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
          />
          <div className="flex items-center space-x-3">
            <FaDollarSign className="text-blue-500" />
            <input
              type="range"
              name="budget"
              min="100"
              max="10000"
              value={tripData.budget}
              onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
              className="w-full"
            />
            <span className="ml-2 text-gray-700">${tripData.budget}</span>
          </div>
          <textarea
            name="additionalNotes"
            value={tripData.additionalNotes}
            onChange={handleInputChange}
            placeholder="Any additional requests or notes"
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            rows="4"
          ></textarea>

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
            <pre className="text-sm text-gray-700 mt-2">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
