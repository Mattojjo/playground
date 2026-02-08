import { House } from 'lucide-react';
import React from 'react';

const HomeButton = ({ onGoHome }) => {
  return (
    <button 
      className="absolute top-7 left-6 px-4 py-1.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 hover:scale-125 transition-all duration-200 md:px-6 md:py-3" 
      onClick={onGoHome}
    >
      <House className="w-6 h-6 inline-block" />
    </button>
  );
};

export default HomeButton;
