import Navbar from '../components/NavBar';
import React, { useState,useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function ContactUs() {

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
    <div>
             <div className="flex justify-center items-center w-full md:m-2">
                <img 
                    src="/iiitn.png" 
                    alt="IIIT Nagpur Logo" 
                    className="w-[60%] h-auto object-cover" 
                />
            </div>
            <div className={isNavFixed ? "fixed top-0 w-full z-10" : "relative"}>
                <Navbar />
            </div>
      
    </div>

    <div className="flex justify-center items-center h-screen bg-gray-100">
      <section className="max-w-5xl m-3 py-12 px-6 md:px-12 bg-[#fd7e14] rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8 p-2 font-serif border-b-[2px]">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form 
          action="https://formsubmit.co/a0aaae740966ea828d3a90c15b80afbe" method="POST" 
          className="bg-rose-300 p-8 shadow-md rounded-lg">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"

                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"

                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
              <textarea
                name="message"

                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information and Social Links */}
        <div className="flex flex-col justify-between">
            <div className="flex flex-col justify-between">
            {/* Contact Information */}
            <div className="bg-white font-sans p-8 shadow-md rounded-lg mb-8 md:mb-0 ">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-4">Feel free to reach us at any time. We're here to help you!</p>
                <p className="text-gray-700 mb-2"><span className="font-bold">Email:</span> demo@example.com</p>
                <p className="text-gray-700 mb-2"><span className="font-bold">Phone:</span> +9123 456 7890</p>
                <p className="text-gray-700"><span className="font-bold">Address:</span> IIIT Nagpur, Butibori, Nagpur,Maharashtra</p>
            </div>

            {/* Social Media Heading */}


            {/* Social Media Links */}
            <div className="flex justify-center space-x-6  m-4 bg-slate-200 p-3 rounded-md content-center">
                <p>
                <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800 transition duration-300">
                <i className="fab fa-facebook fa-2x"></i> {/* Facebook Icon */}
                </a>
                </p>

                <p>
                <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600 transition duration-300">
                <i className="fab fa-twitter fa-2x"></i> {/* Twitter Icon */}
                </a>
                </p>

                <p>
                <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900 transition duration-300">
                <i className="fab fa-linkedin fa-2x"></i> {/* LinkedIn Icon */}
                </a>
                </p>

                <p>
                <a href="https://instagram.com" className="text-pink-500 hover:text-pink-700 transition duration-300">
                <i className="fab fa-instagram fa-2x"></i> {/* Instagram Icon */}
                </a>
                </p>

            </div>
            </div>

            </div>

        </div>
      </section>
    </div>
    </div>
  );
}
