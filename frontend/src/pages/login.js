import React, { useState } from "react";

export default function LoginForm() {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (e) => setRole(e.target.value);
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* User Role */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-600 font-medium mb-2">User Role</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a role</option>
            <option value="student">Student</option>
            <option value="teacher">Instructor</option>
            <option value="super_admin">Super Administrator</option>
            <option value="user_admin">User Administrator</option>
            <option value="course_admin">Course Administrator</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">User Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        {(role === "student" ||
          role === "teacher" ||
          role === "super_admin" ||
          role === "user_admin" ||
          role === "course_admin") && (
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
