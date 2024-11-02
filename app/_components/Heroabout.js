// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Travel Hub - Conne   ct & Explore</title>
        <meta name="description" content="A platform to connect travelers and plan unforgettable trips." />
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-800">
        {/* Header */}
        <header className="bg-blue-600 text-white py-6">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold">Welcome to Travel Hub</h1>
            <p className="mt-2">Where journeys begin and stories are shared.</p>
          </div>
        </header>

        {/* About Us Section */}
        <section className="container mx-auto py-12 px-6">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">About Us</h2>
            <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
              At Travel Hub, we believe every journey is better when shared, every destination richer when explored with others, and every travel experience unforgettable when crafted uniquely for you. Founded with a passion for adventure and connection, our platform is here to bring travelers together and inspire memorable experiences.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto py-12 px-6">
          <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Our Mission</h2>
            <p className="text-lg text-center text-gray-700 max-w-2xl mx-auto">
              Our mission is to make travel planning seamless, social, and deeply personal. We connect travelers through shared interests and travel styles, fostering a community where every interaction enriches your next adventure.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto py-12 px-6">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Personalized Trip Planning</h3>
              <p className="text-gray-600">Create a tailored travel plan that suits your style, whether solo or in a group.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Connect Through Common Interests</h3>
              <p className="text-gray-600">Meet travelers who share your passions, from cultural experiences to wellness retreats.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Stories That Inspire</h3>
              <p className="text-gray-600">Explore stories from fellow travelers, share your own, and be inspired by new journeys.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Privacy-Focused</h3>
              <p className="text-gray-600">We value your privacy and offer full control over your travel experience and data.</p>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="container mx-auto py-12 px-6">
          <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Meet the Team</h2>
            <p className="text-lg text-center text-gray-700 max-w-2xl mx-auto">
              Our team comprises passionate travelers, tech enthusiasts, and community builders dedicated to making your journey seamless, connected, and unforgettable.
            </p>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="container mx-auto py-12 px-6">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">Join Us</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
              Ready to dive into a world of connections, new destinations, and shared passions? Join Travel Hub and embark on a travel experience that's as unique as you are.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Travel Hub. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
