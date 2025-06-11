import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const API_Context = createContext();

export const API_Provider = ({ children }) => {
  const [res, SetRes] = useState("");

 

  const generateContent = async (data) => {
     const prompt = `
You are an expert learning assistant.

The user has provided the following details:
- Goal: ${data.goal}
- Days to study: ${data.days}
- Time per day: ${data.timePerDay} hours
- Other commitments: ${data.otherWorks}
- Topics to learn: ${data.topics}

Create a personalized learning schedule based on the above inputs.

⚠️ Strict Output Format (in JSON):

{
  "goal":"write here what he wanted to become in single word only like goal what he has ",
  "roadmap": [
    { "day": 1, "topics": ["..."], "estimated_time": "X hours" },
    ...
  ],
  "resources": {
    "youtube": ["https://www.youtube.com/...", "..."],
    "books": ["Book Title by Author", "..."]
  },
  "additionalSuggestions": [
    "Technology 1",
    "Technology 2"
  ]
}

Make sure the roadmap fits into the user's available days and time per day.
Suggest only relevant and beginner-friendly YouTube channels and books.
Also, recommend other technologies/tools the user should explore to complement their learning goal.

Only respond with the JSON. Do not include any explanation or extra text.
`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDQAYjbj00Q1wXITr20zDZnm-lFAutbydc`,
        {
          contents: [
            {
              parts: [
                {
                  text:  prompt || "Explain how AI works in a few words",
                },
              ],
            },
          ],
        }
      );

      const reply =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      

      // console.log("Generated:", reply);
      const cleanedReply = reply.replace(/```json|```/g, "").trim();
      try{
      data = JSON.parse(cleanedReply)
      SetRes(data)
      }
      catch{
        console.log("error")
      }  
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };
// useEffect(() => {
//   console.log("Updated res:", res);
// }, [res]);

  return (
    <API_Context.Provider value={{ res, generateContent }}>
      {children}
    </API_Context.Provider>
  );
};
