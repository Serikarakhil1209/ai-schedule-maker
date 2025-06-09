import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './Component/ThemeContext/ThemeContext.jsx';
import { API_Provider } from './Context/Api.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <API_Provider>
        <App />
        </API_Provider>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
