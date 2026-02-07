import React, { useState } from "react";
import questions from "./questions";
import HomeButton from "../../components/HomeButton";

// TruthOrDare game component
const TruthOrDare = ({ onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  // Handle type selection
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowAnswer(true);
  };

  // Handle next question
  const handleNext = () => {
    setCurrentIdx((idx) => (idx + 1) % questions.length);
    setShowAnswer(false);
    setSelectedType(null);
  };

  // Filter questions by selected type
  const filteredQuestions = questions.filter(q => q.type === selectedType);
  const question = filteredQuestions[currentIdx % filteredQuestions.length];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
      <HomeButton onGoHome={onGoHome} />
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Truth or Dare</h2>
      {!showAnswer ? (
        <div className="flex gap-4">
          <button className="flex-1 py-4 px-6 rounded-lg bg-slate-700 hover:bg-slate-600 font-medium" onClick={() => handleTypeSelect("truth")}>Truth</button>
          <button className="flex-1 py-4 px-6 rounded-lg bg-slate-700 hover:bg-slate-600 font-medium" onClick={() => handleTypeSelect("dare")}>Dare</button>
        </div>
      ) : (
        <div>
          <div className="text-lg mb-4 p-4 bg-indigo-900 rounded-lg border border-indigo-700">{question.text}</div>
          <button className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700" onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default TruthOrDare;
