"use client";

import { useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiUZe-0sJ6_EG35BpT1zJCPCzct9UrkCc",
  authDomain: "travelhub-1.firebaseapp.com",
  projectId: "travelhub-1",
  storageBucket: "travelhub-1.appspot.com",
  messagingSenderId: "961577383911",
  appId: "1:961577383911:web:b0afb4df1d9e79a6c9af42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);

  // Fetch all profiles from Firestore
  const fetchProfiles = async () => {
    setLoading(true);
    const profilesRef = collection(db, "userProfiles");
    const querySnapshot = await getDocs(profilesRef);
    const allProfiles = [];
    querySnapshot.forEach((doc) => {
      allProfiles.push({ id: doc.id, ...doc.data() });
    });
    setProfiles(allProfiles);
    setLoading(false);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const results = profiles.filter((profile) => {
      const usernameMatch = profile.username
        ? profile.username.toLowerCase().includes(searchTerm.toLowerCase())
        : false;
      const interestsMatch = profile.interests
        ? profile.interests.some((interest) =>
            interest.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : false;
      return usernameMatch || interestsMatch;
    });

    setSearchResults(results);
  };

  // Run fetchProfiles when component mounts
  useState(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Search Profiles</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Search by username or interest..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-full mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Search
        </button>

        {loading && <p className="text-gray-500 mt-4">Loading profiles...</p>}

        {searchResults.length > 0 ? (
          <ul className="mt-4">
            {searchResults.map((profile) => (
              <li key={profile.id} className="p-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold">Username: {profile.username}</h2>

                <p className="mt-2">
                  <strong>Interests:</strong> {profile.interests.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
}
