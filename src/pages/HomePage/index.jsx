import React from 'react';
import { Link } from 'react-router-dom';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Navbar from './components/Navbar';

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        src="public/videos/hp-vid1.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 -z-10"></div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section 
          className="min-h-screen flex flex-col items-center justify-center text-white text-center px-8"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Capture Your Memories, One Photo at a Time
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl">
            Welcome to Snap Diary, the perfect place to document and reflect on your special moments.
          </p>
          <Link 
            to="/signup"
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-orange-100 transition-colors"
          >
            Get Started
          </Link>
        </section>

        <Features />

        {/* Call to Action */}
        <section 
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-20 px-8 text-center"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Journal?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            Sign up today and begin capturing memories!
          </p>
          <Link 
            to="/signup"
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-orange-100 transition-colors"
          >
            Sign Up Now
          </Link>
        </section>

        <Testimonials />
      </div>
    </div>
  );
};

export default HomePage;