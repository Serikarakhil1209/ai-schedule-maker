import { useContext, useEffect, useState } from "react";
import { API_Context } from "../../../Context/Api";
import { db } from "../../../Config/Config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Shedule() {
  const [load, setLoad] = useState(true);
  const { res } = useContext(API_Context);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user?.uid;

  const handleSave = async () => {
    try {
      const docref = doc(db, "users", user_id);
      await updateDoc(docref, {
        Goal: arrayUnion(res),
      });
      alert("Saved successfully!");
      navigate('/dashboard');
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Failed to save data.");
    }
  };

  useEffect(() => {
    if (res?.roadmap) {
      setLoad(false);
      console.log(res);
    }
  }, [res]);

  if (load) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Box sx={{ width: 300 }}>
          <Skeleton height={40} />
          <Skeleton animation="wave" height={40} />
          <Skeleton animation={false} height={40} />
        </Box>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      {/* Back Button */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Goal Display */}
      <section>
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-4 text-black">{res.goal}</h2>
        </div>
      </section>

      {/* Roadmap */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">📅 Learning Roadmap</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {res.roadmap.map((item, index) => (
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

      {/* YouTube Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-red-600">🎥 YouTube Resources</h2>
        <ul className="list-disc list-inside space-y-2">
          {res.resources.youtube.map((link, idx) => (
            <li key={idx}>
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Books */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-green-700">📚 Recommended Books</h2>
        <ul className="list-disc list-inside space-y-1">
          {res.resources.books.map((book, idx) => (
            <li key={idx} className="text-gray-800">{book}</li>
          ))}
        </ul>
      </section>

      {/* Suggestions */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-purple-700">✨ Additional Suggestions</h2>
        <ul className="flex flex-wrap gap-2">
          {res.additionalSuggestions.map((suggestion, idx) => (
            <li key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {suggestion}
            </li>
          ))}
        </ul>
      </section>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          className="bg-black text-white py-2 px-6 text-sm rounded-md hover:bg-gray-800 active:scale-95 transition transform"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Shedule;
