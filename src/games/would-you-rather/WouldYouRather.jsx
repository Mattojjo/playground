import React, { useState } from 'react';
import questions from './questions';

const WouldYouRather = ({ onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { question, options } = questions[currentIdx];
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNext, setShowNext] = useState(false);

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
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-indigo-400">Would You Rather...</h2>
      <div className="text-xl mb-6">{question}</div>
      <div className="space-y-3 mb-6">
        {options.map(opt => (
          <button
            key={opt.text}
            className="w-full py-4 px-4 rounded-lg bg-slate-700 hover:bg-slate-600 font-medium disabled:opacity-50"
            onClick={() => handleSelect(opt)}
            disabled={!!selectedOption}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {selectedOption && (
        <div className="p-4 rounded-lg bg-indigo-900 border border-indigo-700">
          <p className="text-indigo-300 mb-4">Fun Fact: {selectedOption.funFact}</p>
          {showNext && (
            <button
              className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      )}
      {currentIdx === questions.length - 1 && answers.length === questions.length && (
        <div className="mt-4 p-4 bg-slate-700 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Your Answers:</h3>
          <ul className="space-y-2">
            {answers.map((a, idx) => (
              <li key={idx} className="text-sm">
                <strong>{a.question}</strong><br />
                <span className="text-blue-400">{a.answer}</span><br />
                <span className="text-gray-400">Fun Fact: {a.funFact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WouldYouRather;
