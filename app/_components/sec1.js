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
              Travel Hub is your ultimate companion for connecting with other travelers,
              planning trips, and discovering unique local experiences. We bring 
              everything you need for a memorable journey into one place.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                {/* SVG Icon */}
              </span>

              <div>
                <h2 className="text-lg font-bold">Connect with Travelers</h2>

                <p className="mt-1 text-sm text-gray-300">
                  Build connections with like-minded travelers, share experiences, 
                  and explore destinations together for a richer, more personalized journey.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                {/* SVG Icon */}
              </span>

              <div>
                <h2 className="text-lg font-bold">Customizable Itineraries</h2>

                <p className="mt-1 text-sm text-gray-300">
                  Our itinerary planner allows you to personalize every step, 
                  with options for local transportation and destination-specific 
                  activities tailored to your interests.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                {/* SVG Icon */}
              </span>

              <div>
                <h2 className="text-lg font-bold">Comprehensive Destination Guides</h2>

                <p className="mt-1 text-sm text-gray-300">
                  Access a wealth of information on destinations worldwide, including 
                  top attractions, local tips, and hidden gems curated by experts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                {/* SVG Icon */}
              </span>

              <div>
                <h2 className="text-lg font-bold">Budget-Friendly Planning</h2>

                <p className="mt-1 text-sm text-gray-300">
                  Set your travel budget with ease using our budget slider, 
                  and find options that match your financial plans without 
                  sacrificing quality or comfort.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                {/* SVG Icon */}
              </span>

              <div>
                <h2 className="text-lg font-bold">Save and Access Trips</h2>

                <p className="mt-1 text-sm text-gray-300">
                  Save your trips with a username and Gmail, making it easy to 
                  access and filter through your travel plans anytime, anywhere.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                {/* SVG Icon */}
              </span>

              <div>
                <h2 className="text-lg font-bold">Community Interactions</h2>

                <p className="mt-1 text-sm text-gray-300">
                  Engage with the travel community through blogs, forums, and 
                  shared experiences, fostering a sense of belonging while you explore.
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
