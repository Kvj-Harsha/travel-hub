"use client";
import Headerdarknext2 from '../_components/Headerdarknxt2';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { initializeApp, getApps,} from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiUZe-0sJ6_EG35BpT1zJCPCzct9UrkCc",
  authDomain: "travelhub-1.firebaseapp.com",
  projectId: "travelhub-1",
  storageBucket: "travelhub-1.appspot.com",
  messagingSenderId: "961577383911",
  appId: "1:961577383911:web:b0afb4df1d9e79a6c9af42",
};

// Initialize Firebase (only once)
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

// Predefined Interests List
const predefinedInterests = [
  "Cycling", "Biking", "Hiking", "Camping", "Travel Vlogging",
  "Backpacking", "Road Trip", "Motor Vlogging", "Photography", "Nature Walks",
  "Mountain Climbing", "Beach Holidays", "Adventure Sports", "Fishing", "Snorkeling",
  "Skydiving", "Paragliding", "Train Traveling", "Cruise Trips", "Cultural Exploration",
  "Wildlife Safari", "Volunteering Abroad", "Food Tourism", "Historical Sites", "City Tours",
  "Luxury Travel", "Eco-Tourism", "Solo Travel", "Group Tours", "Backpacking Across Europe"
];

export default function ProfilePage() {
  const { user } = useUser();
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editInterest, setEditInterest] = useState("");
  
  const startEditing = (index, interest) => {
    setEditingIndex(index);
    setEditInterest(interest);
  };
  
  const saveEdit = async () => {
    if (!editInterest.trim()) return;
  
    const docRef = doc(db, "userProfiles", user.id);
    const updatedInterests = [...interests];
    updatedInterests[editingIndex] = editInterest;
  
    await setDoc(docRef, { interests: updatedInterests });
    setInterests(updatedInterests);
    setEditingIndex(null);
    setEditInterest("");
  };

  // Fetch user-specific interests
  useEffect(() => {
    if (user) {
      const fetchInterests = async () => {
        const docRef = doc(db, "userProfiles", user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInterests(docSnap.data().interests || []);
        } else {
          await setDoc(docRef, { interests: [] });
        }
      };
      fetchInterests();
    }
  }, [user]);

  // Fetch all user profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      const querySnapshot = await getDocs(collection(db, "userProfiles"));
      const profiles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProfiles(profiles);
    };
    fetchProfiles();
  }, []);

  const addInterest = async () => {
    if (!newInterest.trim()) return;
  
    const docRef = doc(db, "userProfiles", user.id);
  
    // Update the document to add a new interest and update the username field
    await updateDoc(docRef, {
      interests: arrayUnion(newInterest),
      username: user.username, // Ensure the username is updated every time
    });
  
    // Update local state for interests
    setInterests((prev) => [...prev, newInterest]);
    setNewInterest(""); // Clear the input field
    setFilteredInterests([]); // Clear filtered interests
  };
  
  const deleteInterest = async (interest) => {
    const docRef = doc(db, "userProfiles", user.id);
    await updateDoc(docRef, { interests: arrayRemove(interest) });
    setInterests((prev) => prev.filter((item) => item !== interest));
  };

  const handleInterestInputChange = (e) => {
    setNewInterest(e.target.value);
    const filtered = predefinedInterests.filter((interest) =>
      interest.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredInterests(filtered);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Headerdarknext2/>
    <div className="min-h-screen bg-[#111827] p-8 text-gray-300">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-white">Your Profile</h1>
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Hello, {user.fullName}</h2>
          <p className="text-lg mb-6">
            <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
          </p>

          {/* Interests */}
          {/* Interests */}
<h3 className="text-xl font-semibold mb-4 text-gray-200">Your Interests</h3>
<ul className="space-y-3">
  {interests.length ? (
    interests.map((interest, index) => (
      <li
        key={index}
        className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
        >
        {editingIndex === index ? (
          <div className="flex items-center space-x-2 w-full">
            <input
              type="text"
              value={editInterest}
              onChange={(e) => setEditInterest(e.target.value)}
              className="flex-grow border-gray-600 bg-gray-900 text-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-500"
              />
            <button
              onClick={saveEdit}
              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
              >
              Save
            </button>
            <button
              onClick={() => setEditingIndex(null)}
              className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span>{interest}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(index, interest)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                Edit
              </button>
              <button
                onClick={() => deleteInterest(interest)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                Delete
              </button>
            </div>
          </div>
        )}
      </li>
    ))
  ) : (
    <p className="text-gray-400">No interests added yet.</p>
  )}
</ul>


          <div className="mt-6">
            <input
              type="text"
              placeholder="Add a new interest"
              className="border-gray-600 bg-gray-900 text-gray-300 p-3 w-full rounded-lg mb-3 focus:ring focus:ring-blue-500"
              value={newInterest}
              onChange={handleInterestInputChange}
            />
            {filteredInterests.length > 0 && (
              <div className="bg-gray-700 p-4 rounded-lg max-h-48 overflow-auto">
                <ul>
                  {filteredInterests.map((interest, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setNewInterest(interest);
                        setFilteredInterests([]);
                      }}
                      className="cursor-pointer p-2 hover:bg-gray-600 rounded-md"
                    >
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={addInterest}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-3 hover:bg-blue-600"
            >
              Add Interest
            </button>
          </div>
        </div>
      </div>

      {/* All Profiles Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          All Profiles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {allProfiles.map((profile) => (
    <div
      key={profile.id}
      className="bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
      >
      {/* User Avatar Icon */}
      <div className="bg-blue-500 w-16 h-16 flex items-center justify-center rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      </div>

      {/* Username */}
      <h3 className="text-xl font-bold text-white mb-2">
        {profile.username || "Anonymous"}
      </h3>

      {/* Interests */}
      <h4 className="text-lg font-semibold text-gray-300 mb-4">
        Interests
      </h4>
      <ul className="list-none space-y-3 text-gray-300 w-full text-left">
        {profile.interests?.length > 0 ? (
          profile.interests.map((interest, index) => (
            <li
            key={index}
              className="flex items-center bg-gray-700 p-2 rounded-lg"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  />
              </svg>
              {interest}
            </li>
          ))
        ) : (
          <p className="text-gray-400 italic">No interests listed.</p>
        )}
      </ul>

      {/* Connect Button */}
      <button
        onClick={async () => {
          const docRef = doc(db, "userProfiles", profile.id);
          await updateDoc(docRef, {
            connectionRequests: arrayUnion(user.id),
          });
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
        Connect
      </button>
    </div>
  ))}
</div>

        
      </div>
    </div>
  </div>
  );
}
