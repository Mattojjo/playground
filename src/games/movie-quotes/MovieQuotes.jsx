import React, { useState, useEffect } from "react";
import questions from "./questions";
import "./MovieQuotes.css";
import wrongImg from "../../img/wrong.jpeg";
import HomeButton from "../../components/HomeButton";
import { shuffleArray } from "../../utils/gameUtils";
import { GAME_CONFIG, GAME_TYPES, UI_CONSTANTS } from "../../constants/gameConstants";

// MovieQuotes game component
const MovieQuotes = ({ onGoHome }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(GAME_CONFIG[GAME_TYPES.MOVIE_QUOTES].timeLimit);
  const [answers, setAnswers] = useState([]);
  const [showWrongImage, setShowWrongImage] = useState(false);

  const question = questions[currentIdx];
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Shuffle options when question changes
  useEffect(() => {
    if (question) {
      setShuffledOptions(shuffleArray([...question.options]));
    }
  }, [question]);

  // Timer logic
  useEffect(() => {
    if (!showResult && timer > 0) {
      const interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !showResult) {
      setShowResult(true);
      setAnswers([...answers, { correct: false, timedOut: true }]);
    }
  }, [timer, showResult, answers]);

  // Handle option selection
  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    const isCorrect = opt === question.answer;
    
    if (!isCorrect) {
      // Show wrong image for 1 second
      setShowWrongImage(true);
      setTimeout(() => {
        setShowWrongImage(false);
        setShowResult(true);
      }, UI_CONSTANTS.WRONG_IMAGE_DISPLAY_TIME);
    } else {
      setShowResult(true);
    }
    
    setScore(s => isCorrect ? s + 1 : s);
    setAnswers([...answers, { correct: isCorrect, timedOut: false }]);
  };

  // Handle next question
  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    setShowWrongImage(false);
    setTimer(GAME_CONFIG[GAME_TYPES.MOVIE_QUOTES].timeLimit);
    setCurrentIdx(idx => idx + 1);
  };

  if (currentIdx >= questions.length) {
    return (
      <div className="mq-mobile-container">
        <h2 className="mq-title">Movie Quotes</h2>
        <div className="mq-score">Your Score: {score} / {questions.length}</div>
        <ul className="mq-answers">
          {answers.map((a, idx) => (
            <li key={idx} className={a.correct ? "mq-correct" : a.timedOut ? "mq-timedout" : "mq-wrong"}>
              {a.correct ? "Correct" : a.timedOut ? "Timed Out" : "Wrong"}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mq-mobile-container">
      <HomeButton onGoHome={onGoHome} />
      {showWrongImage && (
        <div className="wrong-overlay">
          <img src={wrongImg} alt="Wrong Answer" className="wrong-image" />
        </div>
      )}
      <h2 className="mq-title">Movie Quotes</h2>
      <div className="mq-timer">Time Left: {timer}s</div>
      <div className="mq-quote">"{question.quote}"</div>
      <div className="mq-options">
        {shuffledOptions.map(opt => (
          <button
            key={opt}
            className={`mq-option-btn${selectedOption === opt ? " selected" : ""}`}
            onClick={() => handleOptionClick(opt)}
            disabled={showResult || showWrongImage}
          >
            {opt}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mq-result">
          {selectedOption === question.answer
            ? "Correct!"
            : selectedOption === null
              ? "Time's up!"
              : `Wrong! The correct answer was "${question.answer}."`}
          <button className="mq-next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieQuotes;
