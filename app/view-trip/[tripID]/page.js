// app\view-trip\[tripID]\page.js
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Headerdarknext from "@/app/_components/Headerdarknxt";

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

  useEffect(() => {
    const fetchTravelPlan = async () => {
      console.log("Current tripID: ", tripID); // Log the tripID
      const docRef = doc(db, "itineraries", tripID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched document data: ", data); // Log the fetched data
        setTravelPlan(data.travelPlan); // Set the travelPlan if it exists
      } else {
        console.log("No such document!");
      }
    };

    fetchTravelPlan();
  }, [tripID]);

  return (
    <div>
      <Headerdarknext/>
    <div className="p-6 bg-[#111827]">
      <h1 className="text-2xl text-white font-semibold">Travel Plan for Trip ID: {tripID}</h1>
      {travelPlan ? (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold">Travel Plan Details</h2>
          <table className="min-w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 p-2">Field</th>
                <th className="border border-gray-300 p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through the travel plan data and display each entry */}
              {Object.entries(travelPlan).map(([key, value]) => (
                <tr key={key}>
                  <td className="border border-gray-300 p-2 font-semibold">{key.replace(/([A-Z])/g, ' $1')}</td>
                  <td className="border border-gray-300 p-2">
                    {typeof value === 'object' ? (
                      <pre className="whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading travel plan...</p>
      )}
    </div>
        </div>
  );
}

export default ViewTrip;
