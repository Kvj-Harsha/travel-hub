"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Headerdarknext from '../_components/Headerdarknxt';
import { db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "@clerk/clerk-react";
import { AiOutlineCalendar, AiOutlineUser, AiOutlinePicture } from "react-icons/ai";

export default function Home() {
  const [tab, setTab] = useState("Latest");
  const [latestPosts, setLatestPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", image: null });
  const [uploading, setUploading] = useState(false);

  const { user } = useUser();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const latestSnapshot = await getDocs(collection(db, "latest"));
      const posts = latestSnapshot.docs.map((doc) => doc.data());
      setLatestPosts(posts);
    };

    fetchPosts();
  }, []);

  // Handle image upload
  const handleImageUpload = async (file) => {
    if (!file || file.size > 10 * 1024 * 1024) {
      alert("Image size must be under 10MB");
      return null;
    }

    const fileRef = ref(storage, `images/${file.name}-${Date.now()}`);
    setUploading(true);
    try {
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Handle publish
  const handlePublish = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      return alert("Please fill all fields");
    }

    const imageUrl = newPost.image
      ? await handleImageUpload(newPost.image)
      : null;

    const postData = {
      title: newPost.title,
      content: newPost.content,
      author: user?.fullName || "Anonymous",
      date: serverTimestamp(),
      imageUrl,
    };

    await addDoc(collection(db, "latest"), postData);
    setNewPost({ title: "", content: "", image: null });
    alert("Blog published!");
  };

  return (
    <div>
      <Headerdarknext />
    <div className="min-h-screen bg-[#111827] text-gray-800">
      <header className="bg-[#111827] text-white shadow-lg p-6">
        <h1 className="text-3xl font-extrabold tracking-wide">Travel Blog</h1>
        <nav className="flex mt-4 space-x-4">
          {["Latest", "Write Blog"].map((item) => (
            <button
              key={item}
              className={`py-2 px-6 rounded-full transition-all duration-300 ${
                tab === item
                  ? "bg-white text-blue-600 shadow-md"
                  : "bg-blue-400 hover:bg-blue-300"
              }`}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <main className="p-6 bg-[#111827]">
        {tab === "Latest" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {latestPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <AiOutlineUser className="mr-1" />
                    {post.author || "Unknown"}
                  </span>
                  <span className="flex items-center">
                    <AiOutlineCalendar className="mr-1" />
                    {new Date(post.date?.seconds * 1000).toLocaleDateString() || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === "Write Blog" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto"
          >
            <form onSubmit={handlePublish} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  rows="4"
                  placeholder="Enter blog content"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-blue-600"
              >
                Publish
              </button>
            </form>
          </motion.div>
        )}
      </main>
    </div>
    </div>
  );
}
