import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './internShala/Login';
import Jobs from './internShala/Jobs'; // Assuming Jobs component is imported from the correct path
import Quiz from './internShala/Quiz'; // Assuming Jobs component is imported from the correct path
import Container from './internShala/Container'; // Your Container component
import SearchedJobs from './internShala/SearchedJobs';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route to render the Jobs component */}
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/searchedjobs" element={<SearchedJobs />} />


        {/* Route to render the Container component */}
        <Route path="/" element={<Container />} />
      </Routes>
    </Router>
  );
}

export default App;
