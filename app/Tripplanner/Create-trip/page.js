// pages/itineraryForm.js
"use client"
import { useState } from "react";
import { FaPlane, FaHotel, FaCar, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { DatePicker } from "@headlessui/react";

export default function ItineraryForm() {
  const [budget, setBudget] = useState(500);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Trip Itinerary Planner</h1>

        {/* Basic Trip Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500" />
            <input
              type="text"
              placeholder="Trip Name"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaPlane className="text-blue-500" />
            <input
              type="text"
              placeholder="Destination(s)"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500" />
            <input
              type="date"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              placeholder="Start Date"
            />
          </div>
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-500" />
            <input
              type="date"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              placeholder="End Date"
            />
          </div>
        </div>

        {/* Traveler Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Traveler Information</h2>
          <div className="flex items-center space-x-3">
            <BsCheckCircle className="text-blue-500" />
            <input
              type="number"
              placeholder="Number of Travelers"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Accommodation */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Accommodation</h2>
          <div className="flex items-center space-x-3">
            <FaHotel className="text-blue-500" />
            <select
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              defaultValue=""
            >
              <option value="" disabled>
                Select Accommodation Type
              </option>
              <option value="hotel">Hotel</option>
              <option value="airbnb">Airbnb</option>
              <option value="hostel">Hostel</option>
            </select>
          </div>
        </div>

        {/* Transportation */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Transportation</h2>
          <div className="flex items-center space-x-3">
            <FaCar className="text-blue-500" />
            <select
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              defaultValue=""
            >
              <option value="" disabled>
                Preferred Mode of Transportation
              </option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="bus">Bus</option>
              <option value="car">Car Rental</option>
            </select>
          </div>
        </div>

        {/* Activities and Dining */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Activities and Dining</h2>
          <div>
            <input
              type="text"
              placeholder="Desired Activities (e.g., sightseeing, hiking)"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Cuisine Preferences"
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Budget Slider */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Budget</h2>
          <div className="flex items-center space-x-3">
            <FaDollarSign className="text-blue-500" />
            <input
              type="range"
              min="100"
              max="10000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full"
            />
            <span className="ml-2 text-gray-700">${budget}</span>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Additional Notes</h2>
          <textarea
            placeholder="Any additional requests or notes"
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200">
            Submit Itinerary
          </button>
        </div>
      </div>
    </div>
  );
}
