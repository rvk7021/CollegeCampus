import Navbar from '../components/NavBar';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function AboutUs() {
  const [isNavFixed, setIsNavFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className={isNavFixed ? "fixed top-0 w-full z-10" : "relative"}>
        <Navbar />
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <section className="max-w-5xl m-3 py-12 px-6 md:px-12 bg-[#fd7e14] rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8 p-2 font-serif border-b-[2px]">About Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* About Us Content */}
            <div className="bg-white p-8 shadow-md rounded-lg">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Our mission is to empower students and educators by creating a platform that makes learning engaging and accessible to everyone. We believe in leveraging technology to bridge educational gaps and foster a thriving learning community.
              </p>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-6">Our Values</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><span className="font-bold">Innovation:</span> We constantly improve our platform with new features to enhance learning.</li>
                <li><span className="font-bold">Accessibility:</span> We strive to ensure all users have access to quality resources.</li>
                <li><span className="font-bold">Community:</span> We build a supportive space where students and educators collaborate.</li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col justify-between">
              <div className="bg-slate-200 p-8 rounded-lg mb-8 md:mb-0 shadow-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h2>
                <p className="text-gray-700 mb-4">Stay connected with us through our social media channels:</p>
                <div className="flex justify-center space-x-6">
                  <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800 transition duration-300">
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                  <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600 transition duration-300">
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                  <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900 transition duration-300">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                  <a href="https://instagram.com" className="text-pink-500 hover:text-pink-700 transition duration-300">
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
