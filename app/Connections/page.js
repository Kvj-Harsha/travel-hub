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
      Figuring out Connections!!
    </div>
  );
}
