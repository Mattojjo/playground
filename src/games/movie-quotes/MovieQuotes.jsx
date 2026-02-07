import React, { useState, useEffect } from "react";
import questions from "./questions";
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
      <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Movie Quotes</h2>
        <div className="text-3xl font-bold text-green-400 mb-4">Your Score: {score} / {questions.length}</div>
        <ul className="space-y-2">
          {answers.map((a, idx) => (
            <li key={idx} className={`p-3 rounded-lg font-medium ${
              a.correct ? 'bg-green-900 text-green-300' : a.timedOut ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
            }`}>
              {a.correct ? "Correct" : a.timedOut ? "Timed Out" : "Wrong"}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
      <HomeButton onGoHome={onGoHome} />
      {showWrongImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img src={wrongImg} alt="Wrong Answer" className="max-w-xs rounded-lg" />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-indigo-400">Movie Quotes</h2>
      <div className="text-lg text-green-400 mb-4 font-medium">Time Left: {timer}s</div>
      <div className="text-xl mb-6 p-4 bg-slate-700 rounded-lg border-l-4 border-indigo-500 italic">"{question.quote}"</div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {shuffledOptions.map(opt => (
          <button
            key={opt}
            className={`py-3 px-4 rounded-lg font-medium ${
              selectedOption === opt 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
            onClick={() => handleOptionClick(opt)}
            disabled={showResult || showWrongImage}
          >
            {opt}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="p-4 rounded-lg bg-indigo-900 border border-indigo-700">
          <p className="mb-4">
            {selectedOption === question.answer
              ? "Correct!"
              : selectedOption === null
                ? "Time's up!"
                : `Wrong! The correct answer was "${question.answer}."`}
          </p>
          <button className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieQuotes;
