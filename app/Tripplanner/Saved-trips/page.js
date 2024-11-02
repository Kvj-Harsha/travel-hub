//app\Tripplanner\Saved-trips\page.js
"use client";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import Link from "next/link";

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

export default function SavedTrips() {
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedTrips = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "itineraries"));
        const trips = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSavedTrips(trips);
      } catch (error) {
        console.error("Error fetching saved trips: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTrips();
  }, []);

  const handleDeleteTrip = async (id) => {
    try {
      await deleteDoc(doc(db, "itineraries", id));
      setSavedTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
      alert("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip: ", error);
      alert("Failed to delete trip. Try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div className="min-h-screen bg-[#111827] flex flex-col  p-6">
      <h1 className="text-3xl font-semibold text-white mb-8">My Saved Trips</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl w-full">
        {savedTrips.length === 0 ? (
          <p className="text-gray-400">No saved trips found.</p>
        ) : (
          savedTrips.map(trip => (
            <div
              key={trip.id}
              className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-between transition transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{trip.destinations}</h2>
                <div className="text-gray-700 grid grid-cols-2 gap-y-1">
                  <span className="text-sm">Trip ID:</span>
                  <span className="font-medium">{trip.tripID}</span>
                  <span className="text-sm">Days:</span>
                  <span className="font-medium">{trip.days}</span>
                  <span className="text-sm">Travelers:</span>
                  <span className="font-medium">{trip.travelers}</span>
                  <span className="text-sm">Accommodation:</span>
                  <span className="font-medium">{trip.accommodation}</span>
                  <span className="text-sm">Transport:</span>
                  <span className="font-medium">{trip.transport}</span>
                  <span className="text-sm">Budget:</span>
                  <span className="font-medium">${trip.budget}</span>
                  <span className="text-sm">Notes:</span>
                  <span className="font-medium">{trip.additionalNotes}</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6 w-full">
                <Link href={`/view-trip/${trip.id}`} passHref>
                  <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg transition hover:bg-blue-600">
                    View Trip
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteTrip(trip.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg transition hover:bg-red-600"
                >
                  Delete Trip
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
          </div>
  );
}
