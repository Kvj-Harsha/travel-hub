"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  collection,
  getDocs,
  arrayUnion,
} from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// ConnectedUsers component
export default function ConnectedUsers() {
  const { user } = useUser();
  const [connections, setConnections] = useState([]);
  const [requests, setRequests] = useState([]);

  // Fetching the usernames of connected users
  const getUsername = async (userId) => {
    const userDocRef = doc(db, "userProfiles", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data().username;
    }
    return null; // return null if username doesn't exist
  };

  useEffect(() => {
    if (user) {
      const fetchConnections = async () => {
        const userDocRef = doc(db, "userProfiles", user.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const connectionsList = userData.connections || [];
          const connectionUsernames = await Promise.all(
            connectionsList.map(async (connectionId) => {
              const username = await getUsername(connectionId);
              return { id: connectionId, username };
            })
          );
          setConnections(connectionUsernames);

          const requestsList = userData.connectionRequests || [];
          const requestUsernames = await Promise.all(
            requestsList.map(async (requestId) => {
              const username = await getUsername(requestId);
              return { id: requestId, username };
            })
          );
          setRequests(requestUsernames);
        }
      };
      fetchConnections();
    }
  }, [user]);

  const removeConnection = async (connectionId) => {
    if (!user) return;

    const userDocRef = doc(db, "userProfiles", user.id);
    const connectionDocRef = doc(db, "userProfiles", connectionId);

    // Remove connection from the current user's connections
    await updateDoc(userDocRef, {
      connections: arrayRemove(connectionId),
    });

    // Remove the current user from the other user's connections
    await updateDoc(connectionDocRef, {
      connections: arrayRemove(user.id),
    });

    // Update the state
    setConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
  };

  const handleAcceptRequest = async (requestId) => {
    if (!user) return;
  
    const userDocRef = doc(db, "userProfiles", user.id);
    const requestDocRef = doc(db, "userProfiles", requestId);
  
    // Add to connections for both users
    await updateDoc(userDocRef, {
      connections: arrayUnion(requestId),
      connectionRequests: arrayRemove(requestId),
    });
    await updateDoc(requestDocRef, {
      connections: arrayUnion(user.id),
    });
  
    // Fetch the username for the new connection
    const username = await getUsername(requestId);
  
    // Update the state after the username is fetched
    setConnections((prev) => [...prev, { id: requestId, username }]);
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
  };
  
  const handleRejectRequest = async (requestId) => {
    if (!user) return;

    const userDocRef = doc(db, "userProfiles", user.id);

    // Remove from connection requests
    await updateDoc(userDocRef, {
      connectionRequests: arrayRemove(requestId),
    });

    // Update the state
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#111827] p-8 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Your Connections
      </h1>

      {/* Connections Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Connections</h2>
        {connections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {connection.username || "Anonymous"}
                </h3>
                <button
                  onClick={() => removeConnection(connection.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove Connection
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No connections yet.</p>
        )}
      </div>

      {/* Connection Requests Section */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Connection Requests
        </h2>
        {requests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {request.username || "Anonymous"}
                </h3>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No connection requests.</p>
        )}
      </div>
    </div>
  );
}
