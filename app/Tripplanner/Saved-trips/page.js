"use client";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link"; // Ensure Link is imported

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
    <div className="min-h-screen bg-[#111827] flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold text-white mb-4">My Saved Trips</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl w-full">
        {savedTrips.length === 0 ? (
          <p className="text-gray-600">No saved trips found.</p>
        ) : (
          savedTrips.map(trip => (
            <div key={trip.id} className="border rounded-lg p-4 bg-white shadow-md">
              <h2 className="text-lg font-semibold">{trip.destinations}</h2>
              <p><strong>Trip ID:</strong> {trip.tripID}</p>
              <p><strong>Days:</strong> {trip.days}</p>
              <p><strong>Travelers:</strong> {trip.travelers}</p>
              <p><strong>Accommodation:</strong> {trip.accommodation}</p>
              <p><strong>Transport:</strong> {trip.transport}</p>
              <p><strong>Budget:</strong> ${trip.budget}</p>
              <p><strong>Additional Notes:</strong> {trip.additionalNotes}</p>
              <div className="flex justify-between mt-4">
                <Link href={`/view-trip/${trip.tripID}`} passHref>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                        View Trip
                    </button>
                </Link>
                <button
                  onClick={() => handleDeleteTrip(trip.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete Trip
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
