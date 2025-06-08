import React, { useState } from "react";

function Main() {
  const [model, setModel] = useState(false);
  const [formdata, setFormdata] = useState({
    goal: "",
    days: "",
    timePerDay: "",
    otherWorks: "",
    topics: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formdata);
    // Here you can send data to Firestore or Gemini API


    setFormdata({
    goal: "",
    days: "",
    timePerDay: "",
    otherWorks: "",
    topics: "",
  });
    setModel(false);
    document.getElementById("my_modal_5").close();
  };

  return (
    <div className="flex flex-col items-center h-full px-4 py-6 max-w-3xl mx-auto">
      <div className="border-2 border-black rounded-lg p-6 w-full max-w-md bg-white shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 animate-bounce text-center">
          👋 Hey there! ✨ Start your journey 🚀
        </h2>

        <p className="text-gray-700 italic mb-6 animate-pulse text-center text-sm sm:text-base">
          "A goal without a plan is just a wish."
        </p>

        <div className="flex justify-center w-full">
          <button
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-500 transition w-full sm:w-auto text-center"
            onClick={() => {
              setModel(true);
              document.getElementById("my_modal_5").showModal();
            }}
          >
            {model ? "Close Modal" : "🗓️ Create Schedule"}
          </button>
        </div>

       {/* model form which i have imported from daisy ui */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle w-65 ">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Create Your Learning Schedule</h3>
            <form method="dialog" onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="goal"
                placeholder="🎯 What is your main goal?"
                className="input input-bordered w-full"
                value={formdata.goal}
                onChange={(e) =>
                  setFormdata({ ...formdata, [e.target.name]: e.target.value })
                }
                required
              />

              <input
                type="number"
                name="days"
                placeholder="📅 How many days can you commit?"
                className="input input-bordered w-full"
                value={formdata.days}
                onChange={(e) =>
                  setFormdata({ ...formdata, [e.target.name]: e.target.value })
                }
                required
              />

              <input
                type="text"
                name="timePerDay"
                placeholder="⏱️ Hours per day you can spend"
                className="input input-bordered w-full"
                value={formdata.timePerDay}
                onChange={(e) =>
                  setFormdata({ ...formdata, [e.target.name]: e.target.value })
                }
                required
              />

              <input
                type="text"
                name="otherWorks"
                placeholder="📚 Any other major commitments (e.g., college, job)?"
                className="input input-bordered w-full"
                value={formdata.otherWorks}
                onChange={(e) =>
                  setFormdata({ ...formdata, [e.target.name]: e.target.value })
                }
              />

              <textarea
                name="topics"
                placeholder="📘 What topics/skills do you want to learn?"
                className="textarea textarea-bordered w-full"
                value={formdata.topics}
                onChange={(e) =>
                  setFormdata({ ...formdata, [e.target.name]: e.target.value })
                }
                required
              />

              <div className="modal-action flex justify-between">
                <button
                  type="button"
                  className="btn  bg-black text-white ml-5 mb-5  rounded-md"
                  onClick={() => {
                    setModel(false);
                    document.getElementById("my_modal_5").close();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary bg-black text-white mr-5 mb-5 rounded-md">
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Main;
