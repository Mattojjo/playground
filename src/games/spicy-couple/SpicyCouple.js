
import React, { useState } from 'react';
import questions from './questions';
import HomeButton from '../../components/HomeButton';
import './SpicyCouple.css';

// SpicyCouple game component
const SpicyCouple = ({ onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showDare, setShowDare] = useState(false);
  const { question, dare } = questions[currentIdx];

  // Handle next question
  const handleNext = () => {
    setShowDare(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <div className="sc-mobile-container">
      <HomeButton onGoHome={onGoHome} />
      <h2 className="sc-title">Spicy Couple Game</h2>
      <div className="sc-question">{question}</div>
      {!showDare && (
        <button
          className="sc-reveal-btn"
          onClick={() => setShowDare(true)}
        >
          Reveal Dare
        </button>
      )}
      {showDare && (
        <div className="sc-dare">
          Dare: {dare}
          <div className="sc-next-btn-wrap">
            <button
              className="sc-next-btn"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentIdx === questions.length - 1 && showDare && (
        <div className="sc-summary">
          <h3>Game Over! Try again or make up your own dares!</h3>
        </div>
      )}
    </div>
  );
};

export default SpicyCouple;
