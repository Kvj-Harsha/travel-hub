// pages/profile.js
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

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

export default function ProfilePage() {
  const { user } = useUser();
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");

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

  const addInterest = async () => {
    if (!newInterest.trim()) return;

    const docRef = doc(db, "userProfiles", user.id);
    await updateDoc(docRef, { interests: arrayUnion(newInterest) });
    setInterests((prev) => [...prev, newInterest]);
    setNewInterest("");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Hello, {user.fullName}</h2>
        <p className="text-lg mb-4">
          <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Your Interests</h3>
          <ul className="list-disc pl-6 mb-4">
            {interests.length ? (
              interests.map((interest, index) => (
                <li key={index} className="text-gray-700">
                  {interest}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No interests added yet.</p>
            )}
          </ul>
          <input
            type="text"
            placeholder="Add a new interest"
            className="border rounded-md p-2 w-full mb-2"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
          />
          <button
            onClick={addInterest}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
          >
            Add Interest
          </button>
        </div>
      </div>
    </div>
  );
}
