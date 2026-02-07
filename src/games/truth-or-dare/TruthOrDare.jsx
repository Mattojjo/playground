import React, { useState } from "react";
import questions from "./questions";
import HomeButton from "../../components/HomeButton";
import "./TruthOrDare.css";

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
    <div className="tod-mobile-container">
      <HomeButton onGoHome={onGoHome} />
      <h2 className="tod-title">Truth or Dare</h2>
      {!showAnswer ? (
        <div className="tod-type-select">
          <button className="tod-btn" onClick={() => handleTypeSelect("truth")}>Truth</button>
          <button className="tod-btn" onClick={() => handleTypeSelect("dare")}>Dare</button>
        </div>
      ) : (
        <div className="tod-question-section">
          <div className="tod-question">{question.text}</div>
          <button className="tod-next-btn" onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default TruthOrDare;
