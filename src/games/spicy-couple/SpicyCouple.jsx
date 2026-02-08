import React, { useState } from 'react';
import questions from './questions';

const SpicyCouple = ({ onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showDare, setShowDare] = useState(false);
  const { question, dare } = questions[currentIdx];

  const handleNext = () => {
    setShowDare(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-indigo-400">Spicy Couple Game</h2>
      <div className="text-xl mb-6">{question}</div>
      {!showDare && (
        <button
          className="w-full py-3 px-6 rounded-lg bg-slate-700 hover:bg-slate-600 font-medium"
          onClick={() => setShowDare(true)}
        >
          Reveal Dare
        </button>
      )}
      {showDare && (
        <div className="p-4 rounded-lg bg-indigo-900 border border-indigo-700">
          <p className="text-indigo-300 mb-4">Dare: {dare}</p>
          <button
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
      {currentIdx === questions.length - 1 && showDare && (
        <div className="mt-4 p-4 bg-green-900 rounded-lg border border-green-700">
          <h3 className="font-bold">Game Over! Try again or make up your own dares!</h3>
        </div>
      )}
    </div>
  );
};

export default SpicyCouple;
