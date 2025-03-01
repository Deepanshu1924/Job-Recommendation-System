import React, { useState } from 'react';
import axios from 'axios';

const quizData = [
  // Round 1: General Questions
  { question: "Which of the following is the correct definition of a linked list?", options: ["a. A collection of nodes", "b. A collection of arrays", "c. A stack of elements", "d. A queue of elements"], answer: "a" },
  { question: "Which data structure uses LIFO (Last In First Out) principle?", options: ["a. Queue", "b. Stack", "c. Linked List", "d. Tree"], answer: "b" },
  { question: "What does the binary search algorithm do?", options: ["a. Finds the maximum element", "b. Finds an element in a sorted array", "c. Sorts an array", "d. Finds the middle element"], answer: "b" },
  { question: "Which of the following is not a type of tree?", options: ["a. Binary Tree", "b. Binary Search Tree", "c. Heap", "d. Graph"], answer: "d" },
  { question: "What is the time complexity of inserting an element in a hash table?", options: ["a. O(1)", "b. O(n)", "c. O(log n)", "d. O(n^2)"], answer: "a" },
  // Round 3: Field Selection and Specific Questions
  { question: "Which of the following is used to style HTML documents?", options: ["a. CSS", "b. JavaScript", "c. HTML", "d. PHP"], answer: "a", field: "Frontend Developer" },
  { question: "Which HTML tag is used to define an internal style sheet?", options: ["a. <script>", "b. <style>", "c. <css>", "d. <head>"], answer: "b", field: "Frontend Developer" },
  { question: "What does CSS stand for?", options: ["a. Color Style Sheets", "b. Cascading Style Sheets", "c. Computer Style Sheets", "d. Creative Style Sheets"], answer: "b", field: "Frontend Developer" },
  { question: "Which of these is a JavaScript framework?", options: ["a. React", "b. Bootstrap", "c. Angular", "d. All of the above"], answer: "d", field: "Frontend Developer" },
  { question: "Which method is used to add an element to an array in JavaScript?", options: ["a. push()", "b. pop()", "c. shift()", "d. unshift()"], answer: "a", field: "Frontend Developer" },
  { question: "Which of the following is used to create APIs?", options: ["a. Django", "b. Node.js", "c. Flask", "d. All of the above"], answer: "d", field: "Backend Developer" },
  // Add more questions for other fields as needed
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', age: '', email: '' });

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (quizData[currentQuestion].field) {
      setSelectedField(quizData[currentQuestion].field);
    }
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async () => {
    // Calculate scores
    const scores = {
      Aptitude: answers.slice(0, 5).filter((ans, index) => ans === quizData[index].answer).length,
      DSA: answers.slice(5, 10).filter((ans, index) => ans === quizData[index + 5].answer).length,
      Field: answers.slice(10).filter((ans, index) => ans === quizData[index + 10].answer).length,
    };

    try {
      const response = await axios.post('http://127.0.0.1:4000/quiz', { scores });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setQuizStarted(true)}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Enter Your Details</h2>
        <div className="mt-8 space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userDetails.name}
            onChange={handleInputChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={userDetails.age}
            onChange={handleInputChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={handleInputChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button
            onClick={handleSubmit}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Recommendations
          </button>
        </div>
        {recommendations.length > 0 && (
          <div className="mt-12 w-full max-w-6xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Recommended Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((job, index) => (
                <div key={index} className="bg-white p-6 shadow rounded-lg">
                  <h4 className="text-lg font-semibold text-indigo-600">{job["Job_Title"]}</h4>
                  <p><strong>Company:</strong> {job["Company_Name"]}</p>
                  <p><strong>Location:</strong> {job["Location"]}</p>
                  <p><strong>Salary:</strong> ₹{job["Salary"].toLocaleString()}</p>
                  <p><strong>Skills:</strong> {job["Skills_Required"]}</p>
                  <p><strong>Description:</strong> {job["Job_Description"]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Quiz</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <p className="text-lg font-medium text-gray-900">{quizData[currentQuestion].question}</p>
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;