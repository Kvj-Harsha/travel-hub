import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Hero() {
  return (
    <div>
      {/* <UserButton /> */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center lg:justify-center" style={{ height: '60vh' }}>
          <div className="text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              Travel Hub.

              <span className="sm:block"> Discover - Explore - Connect </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              "Plan, connect, and explore with ease—Travel Hub brings all your travel needs into one seamless app, crafted for wanderers like you."
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/Home"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/About"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero;
