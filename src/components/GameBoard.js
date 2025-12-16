
import React, { useState } from 'react';
import wrongImg from '../img/wrong.jpeg';

// GameBoard displays the current question, input for answers, and revealed answers
const GameBoard = ({ question, answers, revealedAnswers, onAnswerSubmit }) => {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showWrongImage, setShowWrongImage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onAnswerSubmit(input);
    setInput('');
    
    if (!result.correct && result.feedback.includes('Wrong') || result.feedback.includes('Not found')) {
      setShowWrongImage(true);
      setTimeout(() => {
        setShowWrongImage(false);
        setFeedback(result.feedback);
      }, 1000);
    } else {
      setFeedback(result.feedback);
    }
  };

  return (
    <div className="game-board">
      {showWrongImage && (
        <div className="wrong-overlay">
          <img src={wrongImg} alt="Wrong Answer" className="wrong-image" />
        </div>
      )}
      <h2 className="game-board-title">{question}</h2>
      <form className="game-board-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your answer..."
          className="game-board-input"
          disabled={revealedAnswers.length === answers.length || showWrongImage}
          style={{ width: '100%', height: '40px', fontSize: '16px' }}
        />
        <button
          type="submit"
          className="game-board-submit"
          disabled={revealedAnswers.length === answers.length || showWrongImage}
        >
          Submit
        </button>
      </form>
      {feedback && !showWrongImage && <div className="game-board-feedback">{feedback}</div>}
      <ul className="game-board-answers">
        {answers.map((answer, idx) => (
          <li
            key={idx}
            className={`game-board-answer${revealedAnswers.includes(idx) ? ' revealed' : ''}`}
          >
            {revealedAnswers.includes(idx) ? `${answer.text} (${answer.points})` : '???'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameBoard;
