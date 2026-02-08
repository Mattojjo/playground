import React, { useState } from 'react';

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
    <div className="bg-slate-800 rounded-4xl p-6 mb-4">
      {showWrongImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-9xl text-red-500 animate-pulse">❌</div>
        </div>
      )}
      <h2 className="mb-4 text-xl font-bold text-indigo-400">{question}</h2>
      <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your answer..."
          className="flex-1 px-4 py-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          disabled={revealedAnswers.length === answers.length || showWrongImage}
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={revealedAnswers.length === answers.length || showWrongImage}
        >
          Submit
        </button>
      </form>
      {feedback && !showWrongImage && <div className="mb-4 px-4 py-2 rounded-lg bg-indigo-900 text-indigo-300 border border-indigo-700">{feedback}</div>}
      <ul className="space-y-2">
        {answers.map((answer, idx) => (
          <li
            key={idx}
            className={`p-3 rounded-lg font-medium ${
              revealedAnswers.includes(idx) 
                ? 'bg-green-900 text-green-300 border-2 border-green-600' 
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {revealedAnswers.includes(idx) ? `${answer.text} (${answer.points})` : '???'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameBoard;
