// app/view-trip/[tripID]/page.js
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Headerdarknext from "@/app/_components/Headerdarknxt";
import { FaHotel, FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

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

function ViewTrip() {
  const { tripID } = useParams();
  const [travelPlan, setTravelPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelPlan = async () => {
      try {
        const docRef = doc(db, "itineraries", tripID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Sort itinerary by day if it exists and is an array
          if (data.travelPlan && Array.isArray(data.travelPlan.itinerary)) {
            data.travelPlan.itinerary = data.travelPlan.itinerary.sort((a, b) => {
              const dayA = parseInt(a.day.match(/\d+/)[0], 10); // Extract number from "Day X"
              const dayB = parseInt(b.day.match(/\d+/)[0], 10);
              return dayA - dayB; // Sort numerically
            });
          }
          setTravelPlan(data.travelPlan);
        } else {
          setError("No travel plan found.");
        }
      } catch (err) {
        setError("Failed to fetch travel plan.");
      }
    };

    fetchTravelPlan();
  }, [tripID]);

  const renderField = (key, value) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 pl-4 border-l-4 border-gray-300">
            {key.replace(/([A-Z])/g, ' $1')}
          </h3>
          <div className="ml-6">
            {Object.entries(value).map(([nestedKey, nestedValue]) =>
              renderField(nestedKey, nestedValue)
            )}
          </div>
        </div>
      );
    } else if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 pl-4 border-l-4 border-gray-300">
            {key.replace(/([A-Z])/g, ' $1')}
          </h3>
          <div className="flex flex-wrap gap-4 ml-6">
            {value.map((item, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-md w-full md:w-48">
                {typeof item === 'object' ? renderField("", item) : <p className="break-words">{item}</p>}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Handling for specific fields
      if (key.toLowerCase().includes("location") && typeof value === "string") {
        const coordinates = value.split(','); // Assuming value is in "latitude,longitude" format
        if (coordinates.length === 2) {
          const latitude = coordinates[0].trim();
          const longitude = coordinates[1].trim();
          const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          return (
            <div key={key} className="flex items-start py-2">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              <span className="font-medium text-gray-600 mr-4">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <a href={googleMapsLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                View on Google Maps
              </a>
            </div>
          );
        }
      }

      if (key.toLowerCase().includes("imageURL")) {
        const placeholderImage = "https://via.placeholder.com/150"; // Placeholder image URL
        return (
          <div key={key} className="flex items-start py-2">
            <span className="font-medium text-gray-600 mr-4">{key.replace(/([A-Z])/g, ' $1')}:</span>
            <img src={placeholderImage} alt="Placeholder" className="w-24 h-24 object-cover mr-2" />
            <a href={value} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              View Image
            </a>
          </div>
        );
      }

      return (
        <div key={key} className="flex items-start py-2">
          {key.toLowerCase().includes("hotel") && <FaHotel className="mr-2 text-blue-500" />}
          {key.toLowerCase().includes("date") && <FaCalendarAlt className="mr-2 text-green-500" />}
          {key.toLowerCase().includes("time") && <FaClock className="mr-2 text-purple-500" />}
          <span className="font-medium text-gray-600 mr-4">{key.replace(/([A-Z])/g, ' $1')}:</span>
          <span className="text-gray-800 break-words">{value}</span>
        </div>
      );
    }
  };

  return (
    <div>
      <Headerdarknext />
      <div className="p-8 bg-[#111827] min-h-screen">
        <h1 className="text-3xl text-white font-bold mb-6">Travel Plan for Trip ID: {tripID}</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : travelPlan ? (
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Travel Plan Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(travelPlan).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  {renderField(key, value)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white text-lg">Loading travel plan...</p>
        )}
      </div>
    </div>
  );
}

export default ViewTrip;
