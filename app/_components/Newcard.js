import React from 'react';
import {  FaEnvelope } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { DiNodejsSmall } from 'react-icons/di';
import { SiFirebase, SiTailwindcss, SiVercel } from 'react-icons/si';
import { TbBrandNextjs } from "react-icons/tb";

function NewCard() {
  return (
    <div className="flex justify-center items-center h-[70vh] bg-[#111827]">
      <div className="flex items-center bg-[#111827] text-white p-8 rounded-md border border-white/[0.2] w-[90%] sm:w-3/4 lg:w-2/3 xl:w-1/2 h-auto transition-transform transform hover:scale-105 hover:shadow-lg duration-300">

        <div className="flex flex-col justify-start pl-8 pr-8">

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 text-center tracking-wide">
            Travel Hub
          </h1>

          {/* Description */}
          <p className="text-gray-300 mb-6 text-sm md:text-base">
          Travel Hub is your one-stop destination for all your travel needs. Plan your trips, connect with like-minded travelers, and explore trending travel blogs—all in one place!
          <br/><br/>This is a group project done for the course CS210 at IIIT Raichur.
          </p>

          {/* Tech Stack */}
          <h2 className="text-xl font-semibold mb-4">Tech Stack Used</h2>
          <ul className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
            <li className="flex items-center gap-2">
              <TbBrandNextjs  className="h-6 w-6" />
              Next Js
            </li>
            <li className="flex items-center gap-2">
              <DiNodejsSmall className="h-6 w-6" />
              Node.js
            </li>
            <li className="flex items-center gap-2">
              <SiFirebase className="h-6 w-6" />
              Firebase
            </li>
            <li className="flex items-center gap-2">
              <SiTailwindcss className="h-6 w-6" />
              Tailwind CSS
            </li>
            <li className="flex items-center gap-2">
              <SiVercel className="h-6 w-6" />
              Vercel
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex gap-6">
            {/* GitHub Button */}
            <a
              href="https://github.com/Kvj-Harsha/travel-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              <AiFillGithub className="h-6 w-6" />
              <span>GitHub Project</span>
            </a>

            {/* Contact Button */}
            <a
              href="mailto:cs23b1034@iiitr.ac.in"
              className="flex items-center gap-3 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
            >
              <FaEnvelope className="h-6 w-6" />
              <span>Contact Developer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCard;
