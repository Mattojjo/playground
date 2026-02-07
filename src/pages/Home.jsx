import React, { useState } from 'react';
import { GAME_TYPES } from '../constants/gameConstants';

const gameOptions = [
  { key: GAME_TYPES.FAMILY_FEUD, label: 'Family Feud', icon: '🧑‍👩‍👧‍👦' },
  { key: GAME_TYPES.WOULD_YOU_RATHER, label: 'Would You Rather', icon: '🤔' },
  { key: GAME_TYPES.SPICY_COUPLE, label: 'Spicy Couple', icon: '🌶️' },
  { key: GAME_TYPES.TRUTH_OR_DARE, label: 'Truth or Dare', icon: '🎲' },
  { key: GAME_TYPES.NEVER_HAVE_I_EVER, label: 'Never Have I Ever', icon: '🙊' },
  { key: GAME_TYPES.MOVIE_QUOTES, label: 'Movie Quotes', icon: '🎬' },
];

const Home = ({ onStart }) => {
  const [selectedGame, setSelectedGame] = useState(gameOptions[0].key);

  const handleCardClick = (key) => {
    setSelectedGame(key);
  };

  const handleStart = () => {
    onStart(selectedGame);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
      <h1 className="mb-6 text-3xl font-bold text-white">Choose Your Game</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {gameOptions.map(opt => (
          <button
            key={opt.key}
            className={`p-6 rounded-lg font-semibold text-center transition-all ${
              selectedGame === opt.key 
                ? 'bg-indigo-600 text-white scale-105' 
                : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
            }`}
            onClick={() => handleCardClick(opt.key)}
          >
            <div className="text-4xl mb-2">{opt.icon}</div>
            <div>{opt.label}</div>
          </button>
        ))}
      </div>
      <button
        className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        onClick={handleStart}
        disabled={!selectedGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
