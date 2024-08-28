import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className='px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 transition duration-300'
    >
      {isDarkMode ? (
        <span className="text-white">🌙</span>  // Moon icon for dark mode
      ) : (
        <span className="text-gray-800">☀️</span>  // Sun icon for light mode
      )}
    </button>
  );
};

export default DarkModeToggle;
