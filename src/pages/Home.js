
import React, { useState } from 'react';
import './Home.css';
import { GAME_TYPES } from '../constants/gameConstants';

// List of available games
const gameOptions = [
  { key: GAME_TYPES.FAMILY_FEUD, label: 'Family Feud' },
  { key: GAME_TYPES.WOULD_YOU_RATHER, label: 'Would You Rather' },
  { key: GAME_TYPES.SPICY_COUPLE, label: 'Spicy Couple' },
  { key: GAME_TYPES.TRUTH_OR_DARE, label: 'Truth or Dare' },
  { key: GAME_TYPES.NEVER_HAVE_I_EVER, label: 'Never Have I Ever' },
  { key: GAME_TYPES.MOVIE_QUOTES, label: 'Movie Quotes' },
];

// Home page for selecting a game
const Home = ({ onStart }) => {
  const [selectedGame, setSelectedGame] = useState(gameOptions[0].key);

  // Handle game card click
  const handleCardClick = (key) => {
    setSelectedGame(key);
  };

  // Handle start button click
  const handleStart = () => {
    onStart(selectedGame);
  };

  return (
    <div className="home">
      <h1 className="home-title">Choose Your Game</h1>
      <div className="game-card-list">
        {gameOptions.map(opt => (
          <div
            key={opt.key}
            className={`game-card${selectedGame === opt.key ? ' selected' : ''}`}
            onClick={() => handleCardClick(opt.key)}
          >
            {opt.label}
          </div>
        ))}
      </div>
      <button
        className="home-start-btn"
        onClick={handleStart}
        disabled={!selectedGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
