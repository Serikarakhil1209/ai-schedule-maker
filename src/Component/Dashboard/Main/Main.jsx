import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_Context } from "../../../Context/Api";

function Main() {
  const navigate = useNavigate();
  const { generateContent } = useContext(API_Context);

  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    goal: "",
    days: "",
    timePerDay: "",
    otherWorks: "",
    topics: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Data:", formData);
    generateContent(formData);

    // Reset form
    setFormData({
      goal: "",
      days: "",
      timePerDay: "",
      otherWorks: "",
      topics: "",
    });

    setModal(false);
    navigate("Shedule");
  };

  return (
    <div className="flex flex-col items-center h-full px-4 py-6 max-w-3xl mx-auto">
      <div className="border-2 border-black rounded-lg p-6 w-full max-w-md bg-white shadow-lg">
        <h2 className="text-sm sm:text-2xl font-bold mb-4 animate-bounce text-center text-black">
          👋 Hey there! ✨ Start your journey 🚀
        </h2>

        <p className="text-gray-700 italic mb-6 animate-pulse text-center text-sm sm:text-base">
          "A goal without a plan is just a wish."
        </p>

        <div className="flex justify-center w-full">
          <button
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-all w-full sm:w-auto text-center"
            onClick={() => setModal(!modal)}
          >
            {modal ? "Close Modal" : "🗓️ Create Schedule"}
          </button>
        </div>

        {/* Custom Modal */}
        {modal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out">
              <h3 className="font-bold text-2xl mb-4 text-center text-gray-800">
                Create Your Learning Schedule
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="goal"
                  placeholder="🎯 What is your main goal?"
                  className="input input-bordered w-full text-lg p-4 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="days"
                  placeholder="📅 How many days can you commit?"
                  className="input input-bordered w-full text-lg p-4 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={formData.days}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="timePerDay"
                  placeholder="⏱️ Hours per day you can spend"
                  className="input input-bordered w-full text-lg p-4 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={formData.timePerDay}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="otherWorks"
                  placeholder="📚 Any other major commitments (e.g., college, job)?"
                  className="input input-bordered w-full text-lg p-4 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={formData.otherWorks}
                  onChange={handleChange}
                />

                <textarea
                  name="topics"
                  placeholder="📘 What topics/skills do you want to learn?"
                  className="textarea textarea-bordered w-full text-lg p-4 border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  value={formData.topics}
                  onChange={handleChange}
                  required
                />

                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    className="btn bg-gray-500 text-white rounded-md w-32 py-2 text-lg hover:bg-gray-400 transition-all"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn bg-blue-600 text-white rounded-md w-32 py-2 text-lg hover:bg-blue-500 transition-all"
                  >
                    Save Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
