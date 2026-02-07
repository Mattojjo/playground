import React, { useState } from 'react';
import questions from './questions';
import HomeButton from '../../components/HomeButton';
import './WouldYouRather.css';

const WouldYouRather = ({ onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { question, options } = questions[currentIdx];
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNext, setShowNext] = useState(false);

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedOption(option);
    setAnswers([...answers, { question, answer: option.text, funFact: option.funFact }]);
    setShowNext(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowNext(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <div className="wyr-mobile-container">
      <HomeButton onGoHome={onGoHome} />
      <h2 className="wyr-title">Would You Rather...</h2>
      <div className="wyr-question">{question}</div>
      <div className="wyr-options">
        {options.map(opt => (
          <button
            key={opt.text}
            className="wyr-option-btn"
            onClick={() => handleSelect(opt)}
            disabled={!!selectedOption}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {selectedOption && (
        <div className="wyr-fun-fact">
          Fun Fact: {selectedOption.funFact}
          {showNext && (
            <div className="wyr-next-wrap">
              <button
                className="wyr-next-btn"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      {currentIdx === questions.length - 1 && answers.length === questions.length && (
        <div style={{ marginTop: '24px', fontSize: '1.1rem', color: '#222', fontWeight: 500 }}>
          <h3>Your Answers:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {answers.map((a, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                <strong>{a.question}</strong><br />
                <span style={{ color: '#a3bffa' }}>{a.answer}</span><br />
                <span style={{ color: '#555', fontSize: '0.95em' }}>Fun Fact: {a.funFact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WouldYouRather;
