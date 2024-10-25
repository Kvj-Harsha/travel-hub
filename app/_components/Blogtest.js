import React from "react";

function Blogtest() {
  return (
    <div>
      {" "}
      <section className="bg-[#111827] ">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="md:flex md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
                Read trusted reviews from our customers
              </h2>

              <p className="mt-6 max-w-lg leading-relaxed text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur praesentium natus sapiente commodi. Aliquid sunt
                tempore iste repellendus explicabo dignissimos placeat, autem
                harum dolore reprehenderit quis! Quo totam dignissimos earum.
              </p>
            </div>

            <a
              href="#"
              className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-600 px-5 py-3 text-rose-600 transition hover:bg-rose-600 hover:text-white md:mt-0"
            >
              <span className="font-medium"> Read all reviews </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
  {/* <!-- Blockquote 1 --> */}
  <blockquote class="gradient-border hover:scale-105 flex h-full flex-col justify-between bg-blue-50 p-6 shadow-lg rounded-lg sm:p-8 transition duration-300 ease-in-out">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">Inspiring Quote</h3>
    <p class="text-gray-700">
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
    </p>
    <footer class="mt-6 text-gray-500">
      - Steve Jobs
    </footer>
  </blockquote>

  {/* <!-- Blockquote 2 --> */}
  <blockquote class="gradient-border hover:scale-105 flex h-full flex-col justify-between bg-blue-50 p-6 shadow-lg rounded-lg sm:p-8 transition duration-300 ease-in-out">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">Motivational Quote</h3>
    <p class="text-gray-700">
      "Success is not final, failure is not fatal: It is the courage to continue that counts."
    </p>
    <footer class="mt-6 text-gray-500">
      - Winston Churchill
    </footer>
  </blockquote>

  {/* <!-- Blockquote 3 --> */}
  <blockquote class="gradient-border hover:scale-105 flex h-full flex-col justify-between bg-blue-50 p-6 shadow-lg rounded-lg sm:p-8 transition duration-300 ease-in-out">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">Wisdom Quote</h3>
    <p class="text-gray-700">
      "Life is what happens when you're busy making other plans."
    </p>
    <footer class="mt-6 text-gray-500">
      - John Lennon
    </footer>
  </blockquote>
</div>

        </div>
      </section>
    </div>
  );
}

export default Blogtest;
