import React, { createContext, useState, useContext } from 'react';

 export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false); 

  const toggleTheme = () => setDarkTheme(prev => !prev); 

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children} 
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
