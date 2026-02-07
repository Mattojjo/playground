import React from 'react';
import './HomeButton.css';

const HomeButton = ({ onGoHome }) => {
  return (
    <button 
      className="home-button" 
      onClick={onGoHome}
      aria-label="Go back to home page"
    >
      <svg 
        className="home-icon" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
      Home
    </button>
  );
};

export default HomeButton;
