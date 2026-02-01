
import React, { useState } from 'react';
import './Home.css';
import { GAME_TYPES } from '../constants/gameConstants';

// List of available games with icons
const gameOptions = [
  { key: GAME_TYPES.FAMILY_FEUD, label: 'Family Feud', icon: '🧑‍👩‍👧‍👦' },
  { key: GAME_TYPES.WOULD_YOU_RATHER, label: 'Would You Rather', icon: '🤔' },
  { key: GAME_TYPES.SPICY_COUPLE, label: 'Spicy Couple', icon: '🌶️' },
  { key: GAME_TYPES.TRUTH_OR_DARE, label: 'Truth or Dare', icon: '🎲' },
  { key: GAME_TYPES.NEVER_HAVE_I_EVER, label: 'Never Have I Ever', icon: '🙊' },
  { key: GAME_TYPES.MOVIE_QUOTES, label: 'Movie Quotes', icon: '🎬' },
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
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(opt.key); }}
          >
            <div className="card-icon" aria-hidden>{opt.icon}</div>
            <div className="card-label">{opt.label}</div>
            <div className="card-meta">Tap to select — fun for groups</div>
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
