import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const API_Context = createContext();

export const API_Provider = ({ children }) => {
  const [res, SetRes] = useState("");


  const generateContent = async (data) => {
const prompt = `
You are an expert AI learning assistant.

The user has shared the following information:
- Goal: ${data.goal}
- Available Days: ${data.days}
- Daily Study Time: ${data.timePerDay} hours
- Other Commitments: ${data.otherWorks}
- Topics to Learn: ${data.topics}

Based on this, create a **personalized learning plan**.

🛑 Strict Output Format (respond in pure JSON only):

{
  "goal": "One-word representation of the user's goal (e.g., 'developer', 'designer')",
  "roadmap": [
    { "day": 1, "topics": ["Topic A", "Topic B"], "estimated_time": "X hours" },
    ...
  ],
  "resources": {
    "youtube": ["https://www.youtube.com/...", "https://..."],
    "books": ["Book Title by Author", "Another Book Title"]
  },
  "additionalSuggestions": [
    "Technology 1",
    "Technology 2"
  ]
}

✅ Guidelines:
- Ensure the roadmap fits within the user's available days and daily study hours.
- Recommend only **beginner-friendly**, **relevant**, and **trusted** YouTube channels and books.
- Suggest other useful technologies/tools that align with the user's goal.
- Respond in **valid JSON only**, without any extra explanation or formatting.
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
