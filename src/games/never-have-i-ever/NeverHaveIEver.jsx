import React, { useState } from "react";
import questions from "./questions";
import HomeButton from "../../components/HomeButton";

// NeverHaveIEver game component
const NeverHaveIEver = ({ onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const question = questions[currentIdx];
  const [showNext, setShowNext] = useState(false);

  // Handle answer selection
  const handleAnswer = (haveDone) => {
    setAnswers([...answers, { question, haveDone }]);
    setShowNext(true);
  };

  // Handle next question
  const handleNext = () => {
    setShowNext(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
      <HomeButton onGoHome={onGoHome} />
      <h2 className="text-2xl font-bold mb-4 text-indigo-400">Never Have I Ever</h2>
      <div className="text-xl mb-6">{question}</div>
      {!showNext ? (
        <div className="flex gap-4">
          <button className="flex-1 py-3 px-6 rounded-lg bg-slate-700 hover:bg-slate-600 font-medium" onClick={() => handleAnswer(true)}>
            I Have
          </button>
          <button className="flex-1 py-3 px-6 rounded-lg bg-slate-700 hover:bg-slate-600 font-medium" onClick={() => handleAnswer(false)}>
            Never
          </button>
        </div>
      ) : (
        <button className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700" onClick={handleNext}>Next</button>
      )}
      {currentIdx === questions.length - 1 && answers.length === questions.length && (
        <div className="mt-4 p-4 bg-slate-700 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Your Answers:</h3>
          <ul className="space-y-2">
            {answers.map((a, idx) => (
              <li key={idx} className="p-2 bg-slate-600 rounded text-left">
                <strong>{a.question}</strong><br />
                <span className={a.haveDone ? 'text-green-400' : 'text-yellow-400'}>
                  {a.haveDone ? "I Have" : "Never"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NeverHaveIEver;
