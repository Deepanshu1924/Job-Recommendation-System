import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchedJobs= () =>{
  const location = useLocation();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/search', { query: location.state.query });
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [location.state.query]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Job Recommendations</h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((job, index) => (
              <div key={index} className="bg-white p-6 shadow rounded-lg">
                <h4 className="text-lg font-semibold text-indigo-600">{job["Job Title"]}</h4>
                <p><strong>Company:</strong> {job["Company Name"]}</p>
                <p><strong>Location:</strong> {job["Location"]}</p>
                <p><strong>Type:</strong> {job["Job Type"]}</p>
                <p><strong>Salary:</strong> ₹{job["Salary (INR)"].toLocaleString()}</p>
                <p><strong>Skills:</strong> {job["Skills Required"]}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No recommendations found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchedJobs;