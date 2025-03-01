import React, { useState, useRef } from "react";
import axios from "axios";

const Jobs = () => {
  const [formData, setFormData] = useState({
    location: "",
    skills: "",
    job_type: "",
    job_title: "",
    fresher_or_intern: "",
  });
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  // Ref for the form section
  const formSectionRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:2000/recommend", formData);
      setRecommendations(response.data);

      if (response.data.length === 0) {
        setError("No jobs matched your criteria. Please try again.");
      }
    } catch (err) {
      setError("Error fetching recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToFormSection = () => {
    formSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans">
      {/* Navbar */}
      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <span className="p-2 fs-1 text-center logoCol text-white">CarrierConnect</span>          <ul className="flex space-x-6">
            <li className="hover:text-gray-200 cursor-pointer">Home</li>
            <li className="hover:text-gray-200 cursor-pointer">About</li>
            <li className="hover:text-gray-200 cursor-pointer">Contact</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white flex items-center justify-center text-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Job</h2>
          <p className="text-lg md:text-xl mb-6">
            Our AI-powered system matches your skills with the perfect opportunities.
          </p>
          <button
            onClick={scrollToFormSection}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formSectionRef} className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl shadow-md rounded-lg bg-white p-8">
          <h3 className="text-2xl font-semibold text-center text-blue-600 mb-6">
            Enter Your Details
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="block mb-2 text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block mb-2 text-gray-700">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Job Type Dropdown */}
            <div>
              <label className="block mb-2 text-gray-700">Job Type</label>
              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              >
                <option value="" disabled>
                  Select Job Type
                </option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>

            {/* Job Title */}
            <div>
              <label className="block mb-2 text-gray-700">Job Title</label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Fresher or Intern */}
            <div>
              <label className="block mb-2 text-gray-700">Fresher or Intern</label>
              <input
                type="text"
                name="fresher_or_intern"
                value={formData.fresher_or_intern}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-full text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Fetching..." : "Get Recommendations"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-12">
        <div className="container mx-auto max-w-6xl">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {loading && <p className="text-center">Loading...</p>}
          {!loading && recommendations.length > 0 && (
            <div>
              <h3 className="text-2xl text-center font-semibold text-blue-600 mb-6">
                Recommended Jobs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((job, index) => (
                  <div key={index} className="bg-white p-6 shadow rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-600">{job["Job Title"]}</h4>
                    <p><strong>Company:</strong> {job["Company Name"]}</p>
                    <p><strong>Location:</strong> {job["Location"]}</p>
                    <p><strong>Type:</strong> {job["Job Type"]}</p>
                    <p><strong>Salary:</strong> ₹{job["Salary (INR)"].toLocaleString()}</p>
                    <p><strong>Skills:</strong> {job["Skills Required"]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2024 Job Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Jobs;
