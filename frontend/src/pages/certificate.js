import React, { useState } from 'react';
import Navbar from '../components/NavBar';

export default function CertificateFetch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === 'rk@email.com') {
      const certificateLink = 'path/to/your/certificate.pdf'; 
      window.open(certificateLink, '_blank'); 
    } else {
      alert('No certificate found for the provided email.');
    }
    
  };

  return (
    <div className='bg-gray-200 mt-0'>
      <div className="flex justify-center items-center w-full ">
        <img 
          src="/iiitn.png" 
          alt="IIIT Nagpur Logo" 
          className="w-[60%] h-auto object-cover" 
        />
      </div>
      <Navbar />
      <section className="m-3 flex flex-col  items-center justify-center  p-4">
        <h1 className="text-3xl font-bold text-center mb-6 font-[sys] mt-2">Your  Certificate</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-300 p-8 shadow-md rounded-lg">
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Student Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Certificate Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 overflow-y-scroll"
              required
            >
              <option value="">Select a category</option>
              <option value="Completion">Completion</option>
              <option value="Excellence">Excellence</option>
              <option value="Participation">Participation</option>
              <option value="Achievement">Achievement</option>
              <option value="Special Recognition">Special Recognition</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Fetch Certificate
          </button>
        </form>
      </section>
    </div>
  );
}
