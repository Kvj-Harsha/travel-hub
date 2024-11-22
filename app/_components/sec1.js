import React from "react";

function Sec1() {
  return (
    <div>
      <section className="bg-gray-900 text-white">
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What makes us special
            </h2>

            <p className="mt-4 text-gray-300">
              Discover why Travel Hub is the ultimate companion for every traveler. We bring together unique features tailored to create unforgettable journeys.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            
            {/* Travel Connections */}
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h2.586l-3.293 3.293a1 1 0 001.414 1.414l4.707-4.707a1 1 0 000-1.414l-4.707-4.707a1 1 0 00-1.414 1.414L17.586 10H15a1 1 0 000 2z"></path>
                </svg>
              </span>
              <div>
                <h2 className="text-lg font-bold">Travel Connections</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Connect with fellow travelers based on shared interests and destinations.
                </p>
              </div>
            </div>

            {/* Trip Planner */}
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13v6a2 2 0 002 2h3v2H2V2h4.586A1.992 1.992 0 019 3.414L12.586 7H17v6z"></path>
                </svg>
              </span>
              <div>
                <h2 className="text-lg font-bold">Trip Planner</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Customize and plan your itinerary with local and long-distance travel options.
                </p>
              </div>
            </div>

            {/* Destination Guides */}
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8l-9-4-9 4v6a9.006 9.006 0 0012.585 8.029"></path>
                </svg>
              </span>
              <div>
                <h2 className="text-lg font-bold">Destination Guides</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Access detailed guides, local tips, and must-see spots for each destination.
                </p>
              </div>
            </div>

            {/* Blogs and Travel Stories */}
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11v4h4m4 0v-4h-4m2-10h5a2 2 0 012 2v11h1a2 2 0 002 2H5a2 2 0 01-2-2V4a2 2 0 012-2h5m3 0v2m0 16v2"></path>
                </svg>
              </span>
              <div>
                <h2 className="text-lg font-bold">Blogs and Travel Stories</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Share and read travel experiences to inspire your next adventure.
                </p>
              </div>
            </div>

            {/* Local Experiences */}
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12l4 4v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"></path>
                </svg>
              </span>
              <div>
                <h2 className="text-lg font-bold">Local Experiences</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Discover and book unique local activities to enrich your travel experience.
                </p>
              </div>
            </div>

            {/* Personalized Itineraries */}
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7V3a1 1 0 011-1h2a1 1 0 011 1v4m0 0h-6M8 5v6h8m-4-1a2 2 0 11-4 0m0 0a2 2 0 114 0M2 17h18"></path>
                </svg>
              </span>
              <div>
                <h2 className="text-lg font-bold">Personalized Itineraries</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Enjoy itineraries tailored to your preferences, curated just for you.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Sec1;
