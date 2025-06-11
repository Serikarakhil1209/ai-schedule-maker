import React, { useEffect, useState } from 'react';
import { getDoc, doc } from "firebase/firestore";
import { db } from '../../../Config/Config';
import { useNavigate } from 'react-router-dom';

function Goals() {
  const [data, setData] = useState([]);
  const [completionStatus, setCompletionStatus] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleCompleteClick = (index) => {
    setCompletionStatus((prevStatus) =>
      prevStatus.map((status, i) => (i === index ? !status : status))
    );
  };
  

  useEffect(() => {
    const GettingData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const user_id = user.user.uid;

        const docRef = doc(db, "users", user_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const docData = docSnap.data();
          const goals = docData.Goal || [];
          setData(goals);
          console.log(goals)
          
          setCompletionStatus(new Array(goals.length).fill(false));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    GettingData();
  }, []);

    

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">User Goals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2
              className="text-xl font-semibold text-blue-700 cursor-pointer"
              onClick={() => navigate(`DetailData/${index}`)}
            >
              {item.goal}
            </h2>
            <button
              onClick={() => handleCompleteClick(index)}
              className={`mt-2 px-3 py-1 rounded text-white ${
                completionStatus[index] ? 'bg-green-600' : 'bg-yellow-600'
              }`}
            >
              {completionStatus[index] ? 'Completed' : 'Pending'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goals;
