
import React, { useState } from "react";
import questions from "./questions";
import HomeButton from "../../components/HomeButton";
import "./NeverHaveIEver.css";

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
    <div className="nhie-mobile-container">
      <HomeButton onGoHome={onGoHome} />
      <h2 className="nhie-title">Never Have I Ever</h2>
      <div className="nhie-question">{question}</div>
      {!showNext ? (
        <div className="nhie-btn-group">
          <button className="nhie-btn" onClick={() => handleAnswer(true)}>
            I Have
          </button>
          <button className="nhie-btn" onClick={() => handleAnswer(false)}>
            Never
          </button>
        </div>
      ) : (
        <button className="nhie-next-btn" onClick={handleNext}>Next</button>
      )}
      {currentIdx === questions.length - 1 && answers.length === questions.length && (
        <div className="nhie-summary">
          <h3>Your Answers:</h3>
          <ul className="nhie-summary-list">
            {answers.map((a, idx) => (
              <li key={idx} className="nhie-summary-item">
                <strong>{a.question}</strong><br />
                <span className={a.haveDone ? "nhie-have" : "nhie-never"}>
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
