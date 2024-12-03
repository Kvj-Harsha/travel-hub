import React from 'react';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import { SiNextdotjs, SiFirebase, SiNodeDotJs, SiTailwindcss, SiVercel } from 'react-icons/si';
import { GrLock } from 'react-icons/gr'; // Import additional icons for tech stack

function Aboutmyproject() {
  return (
    <div className="flex justify-center items-center h-[60vh] bg-[#111827]">
      <div className="flex items-center bg-[#1f2937] text-white p-8 rounded-md border border-white/[0.2] w-[90%] sm:w-3/4 lg:w-2/3 xl:w-1/2 h-auto transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
        
        {/* Left Section: Logo */}
        <div className="flex-shrink-0">
          <img
            src="/1.jpg" // Replace with actual logo path
            alt="Travel Hub Logo"
            className="rounded-full w-32 h-32 object-cover border-4 border-white"
          />
        </div>

        {/* Right Section: Content */}
        <div className="ml-8 flex flex-col justify-center">
          
          {/* Title */}
          <h1 className="text-3xl font-bold mb-2 text-center tracking-wide">
            Travel Hub
          </h1>

          {/* Description */}
          <p className="text-gray-300 mb-4 text-sm">
            Travel Hub is a platform that helps users find the best travel destinations, guides, and recommendations. It integrates real-time data for flights, accommodation, and activities to plan your perfect getaway.
          </p>

          {/* Tech Stack */}
          <h2 className="text-lg font-semibold mb-2">Tech Stack Used</h2>
          <ul className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
            <li className="flex items-center gap-2">
              <SiNextdotjs className="h-5 w-5 text-blue-500" />
              Next.js
            </li>
            <li className="flex items-center gap-2">
              <SiFirebase className="h-5 w-5 text-yellow-500" />
              Firebase
            </li>
            <li className="flex items-center gap-2">
              <SiNodeDotJs className="h-5 w-5 text-green-500" />
              Node.js
            </li>
            <li className="flex items-center gap-2">
              <GrLock className="h-5 w-5 text-purple-600" />
              Clerk Auth
            </li>
            <li className="flex items-center gap-2">
              <SiTailwindcss className="h-5 w-5 text-cyan-500" />
              Tailwind CSS
            </li>
            <li className="flex items-center gap-2">
              <img src="https://cdn.jsdelivr.net/npm/@aceternity/ui/dist/aceternity-ui-logo.svg" alt="Aceternity UI" className="h-5 w-5" />
              Aceternity UI
            </li>
            <li className="flex items-center gap-2">
              <img src="https://hyperui.dev/favicon.ico" alt="Hyper UI" className="h-5 w-5" />
              Hyper UI
            </li>
            <li className="flex items-center gap-2">
              <SiVercel className="h-5 w-5 text-black" />
              Vercel
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex gap-4">
            {/* GitHub Button */}
            <a
              href="https://github.com/yourusername/travel-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub Project</span>
            </a>

            {/* Contact Button */}
            <a
              href="mailto:developer@example.com"
              className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
            >
              <FaEnvelope className="h-5 w-5" />
              <span>Contact Developer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutmyproject;
