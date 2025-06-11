import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function DetailData({ alldata }) {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack=()=>{
    navigate('/dashboard')
  }

  const mydata = alldata?.find((item, key) => key === Number(id));

  if (!mydata) {
    return(
       <div className="flex justify-center items-center min-h-screen">
        <Box sx={{ width: 300 }}>
          <Skeleton height={40} />
          <Skeleton animation="wave" height={40} />
          <Skeleton animation={false} height={40} />
        </Box>
      </div>
    )
  }

  return (
    <div>
         <div className="max-w-5xl mx-auto p-4 space-y-8">
    <div className="flex justify-end mb-4">
  <button
    onClick={handleBack}
    className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition"
  >
    <svg
      className="w-5 h-5 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
    Back
  </button>
</div>
  <section>
  <div className="flex justify-center">
    <h2 className="text-2xl font-bold mb-4 text-black-900">{mydata.goal}</h2>
  </div>
</section>

      {/* ROADMAP */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">📅 Learning Roadmap</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {mydata.roadmap.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-lg">Day {item.day}</h3>
              <p className="text-sm mt-1 text-gray-700">
                <strong>Topics:</strong> {item.topics.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Estimated Time:</strong> {item.estimated_time}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* YOUTUBE RESOURCES */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-red-600">🎥 YouTube Resources</h2>
        <ul className="list-disc list-inside space-y-2">
          {mydata.resources.youtube.map((link, idx) => (
            <li key={idx}>
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* BOOKS */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-green-700">📚 Recommended Books</h2>
        <ul className="list-disc list-inside space-y-1">
          {mydata.resources.books.map((book, idx) => (
            <li key={idx} className="text-gray-800">{book}</li>
          ))}
        </ul>
      </section>

      {/* ADDITIONAL SUGGESTIONS */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-purple-700">✨ Additional Suggestions</h2>
        <ul className="flex flex-wrap gap-2">
          {mydata.additionalSuggestions.map((suggestion, idx) => (
            <li key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {suggestion}
            </li>
          ))}
        </ul>
      </section>


    </div>
    </div>
  );
}

export default DetailData;
