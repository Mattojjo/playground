import { House } from 'lucide-react';
import React from 'react';

const HomeButton = ({ onGoHome }) => {
  return (
    <button 
      className="fixed top-12 right-16 px-16 py-6 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 z-50" 
      onClick={onGoHome}
    >
      <House className="w-6 h-6 inline-block mr-2" />
      Home
    </button>
  );
};

export default HomeButton;
