import React from 'react';
import { currentUser } from "@clerk/nextjs/server";
import Finalcard from './Finalcard';

// Reusable Card Component
function DashboardCard({ href, borderColor, title, description }) {
  return (
    <a href={href} className="group relative block h-64 sm:h-80 lg:h-96 text-black">
      <span className={`absolute inset-0 border-2 border-dashed ${borderColor}`}></span>
      <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-10 sm:size-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-medium sm:text-2xl">{title}</h2>
        </div>
        <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
          <h3 className="mt-4 text-xl font-medium sm:text-2xl">{title}</h3>
          <p className="mt-4 text-sm sm:text-base">{description}</p>
          <p className="mt-8 font-bold">Read more</p>
        </div>
      </div>
    </a>
  );
}

export default async function Herodash() {
  const user = await currentUser();
  const username = user?.username || 'Guest';
  return (
    <div>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-10 lg:flex lg:h-screen lg:items-start">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Welcome, {username}!
              <span className="sm:block"> Dashboard </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Explore the three features!
            </p>
              <Finalcard/>
          </div>
        </div>
      </section>
    </div>
  );
}
