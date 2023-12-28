import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div style={{ background: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#333',minHeight:'100vh' }}>
        {/* Add a button to toggle dark mode */}
        <button onClick={toggleDarkMode} style={{ position: 'fixed', top: '10px', right: '10px', cursor: 'pointer',color:'black' }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <Routes>
          <Route path="/" element={<Login darkMode={darkMode}/>} />
          <Route path="/signup" element={<Register darkMode={darkMode} />} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
