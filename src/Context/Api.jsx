import React, { createContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const API_Context = createContext();

export const API_Provider = ({ children }) => {
  const [res, Setres] = useState("");

  const api_key = import.meta.env.VITE_GEMINI_API_KEY;

  const ai = new GoogleGenerativeAI({ apiKey: api_key });

  const generateContent = async () => {
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent([
        {
          role: "user",
          parts: [
            {
              text:
                res ||
                "how you prepare a schedule for my goal always use the input of users",
            },
          ],
        },
      ]);

      const outputText = result.text || "";
      Setres(outputText);
      console.log(outputText);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <API_Context.Provider value={{ res, Setres, generateContent }}>
      {children}
    </API_Context.Provider>
  );
};
