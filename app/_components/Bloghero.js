"use client"
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useState } from "react";

export default function Bloghero() {
  const [expandedImage, setExpandedImage] = useState(null);

  const blogPosts = [
    {
      title: "Exploring the Alps",
      description: "Discover breathtaking views and thrilling adventures in the Alps.",
      date: "September 21, 2024",
      location: "Switzerland",
      imageUrl: "/1.jpg",
    },
    {
      title: "A Journey through Kyoto",
      description: "Experience the rich culture and serene beauty of Kyoto.",
      date: "October 10, 2024",
      location: "Japan",
      imageUrl: "/2.jpg",
    },
    {
      title: "Safari Adventures in Kenya",
      description: "Get up close with wildlife on an unforgettable Kenyan safari.",
      date: "November 5, 2024",
      location: "Kenya",
      imageUrl: "/3.jpg",
    },
    {
      title: "Exploring the Alps",
      description: "Discover breathtaking views and thrilling adventures in the Alps.",
      date: "September 21, 2024",
      location: "Switzerland",
      imageUrl: "/4.jpg",
    },
    {
      title: "A Journey through Kyoto",
      description: "Experience the rich culture and serene beauty of Kyoto.",
      date: "October 10, 2024",
      location: "Japan",
      imageUrl: "/5.jpg",
    },
    {
      title: "Safari Adventures in Kenya",
      description: "Get up close with wildlife on an unforgettable Kenyan safari.",
      date: "November 5, 2024",
      location: "Kenya",
      imageUrl: "/6.jpg",
    },
    {
      title: "Exploring the Alps",
      description: "Discover breathtaking views and thrilling adventures in the Alps.",
      date: "September 21, 2024",
      location: "Switzerland",
      imageUrl: "/7.jpg",
    },
    {
      title: "A Journey through Kyoto",
      description: "Experience the rich culture and serene beauty of Kyoto.",
      date: "October 10, 2024",
      location: "Japan",
      imageUrl: "/8.jpg",
    },
    {
      title: "Safari Adventures in Kenya",
      description: "Get up close with wildlife on an unforgettable Kenyan safari.",
      date: "November 5, 2024",
      location: "Kenya",
      imageUrl: "/9.jpg",
    },
  ];

  const handleImageClick = (imageUrl) => {
    setExpandedImage(imageUrl);
  };

  const closeImage = () => {
    setExpandedImage(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 font-sans">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800">Travel Blogs</h1>
        <p className="mt-2 text-gray-500 italic">Stories from around the globe</p>
      </header>
      
      <div className="container mx-autohero px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover rounded cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => handleImageClick(post.imageUrl)}
              />
              <h2 className="text-xl font-semibold text-gray-800 mt-4">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <div className="flex items-center justify-between text-gray-500 mt-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span className="text-sm">{post.location}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span className="text-sm">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Expanded Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <img
            src={expandedImage}
            alt="Expanded"
            className="w-auto h-auto max-w-3xl max-h-full rounded-lg"
          />
        </div>
      )}

      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">© 2024 Travel Blogs. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
