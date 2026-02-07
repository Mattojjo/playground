import React from 'react';

const HomeButton = ({ onGoHome }) => {
  return (
    <button 
      className="fixed top-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 z-50" 
      onClick={onGoHome}
    >
      🏠 Home
    </button>
  );
};

export default HomeButton;
