import React from 'react';
import questions from './questions';
import ScoreBoard from '../../components/ScoreBoard';
import TeamSelector from '../../components/TeamSelector';
import GameBoard from '../../components/GameBoard';
import { fuzzyMatch } from '../../utils/gameUtils';
import { Coins, Cat, Fish } from 'lucide-react';

const teams = [
  { name: 'Cats', icon: Cat },
  { name: 'Fish', icon: Fish }
];

const FamilyFeud = ({}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [revealedAnswers, setRevealedAnswers] = React.useState([]);
  const [teamScores, setTeamScores] = React.useState([0, 0]);
  const [currentTeam, setCurrentTeam] = React.useState(null);
  const [showCoinFlip, setShowCoinFlip] = React.useState(true);
  const [coinResult, setCoinResult] = React.useState(null);
  const [selectedSide, setSelectedSide] = React.useState(null);

  const currentQuestion = questions[currentQuestionIdx];
  if (!currentQuestion) {
    return (
      <div className="ff-mobile-container">
        <div style={{ textAlign: 'center', marginTop: '48px', fontSize: '1.2rem', color: '#d7263d' }}>
          No more questions available.<br />
          <span style={{ fontSize: '2rem' }}>🏁</span>
        </div>
      </div>
    );
  }
  const { question, answers } = currentQuestion;

  const handleAnswerSubmit = (input) => {
    let foundIdx = -1;
    for (let i = 0; i < answers.length; i++) {
      if (!revealedAnswers.includes(i) && fuzzyMatch(input, answers[i].text)) {
        foundIdx = i;
        break;
      }
    }
    if (foundIdx !== -1) {
      setRevealedAnswers([...revealedAnswers, foundIdx]);
      setTeamScores(teamScores.map((score, idx) =>
        idx === currentTeam ? score + answers[foundIdx].points : score
      ));
      return { feedback: `Correct! "${answers[foundIdx].text}" (+${answers[foundIdx].points} points) - Keep guessing!` };
    } else {
      setCurrentTeam((currentTeam + 1) % teams.length);
      return { feedback: 'No match. Turn passes to the other team!' };
    }
  };

  const handleNextTeam = () => {
    setCurrentTeam((currentTeam + 1) % teams.length);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIdx(currentQuestionIdx + 1);
    setRevealedAnswers([]);
    setCurrentTeam(0);
  };

  const flipCoin = () => {
    const result = Math.random() < 0.5 ? 0 : 1;
    setCoinResult(result);
    setTimeout(() => {
      setShowCoinFlip(false);
      setCurrentTeam(result);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto my-6 bg-white text-gray-900 rounded-lg p-3">
      {showCoinFlip && (
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Flip a coin to see which team starts!</h2>
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setSelectedSide(0)}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-3 ${
                selectedSide === 0 
                  ? 'bg-blue-200 border-2 border-blue-400' 
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              <Cat className="w-8 h-8" />
              {teams[0].name}
            </button>
            <button
              onClick={() => setSelectedSide(1)}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-3 ${
                selectedSide === 1 
                  ? 'bg-red-200 border-2 border-red-400' 
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              <Fish className="w-8 h-8" />
              {teams[1].name}
            </button>
          </div>
          <button
            onClick={flipCoin}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              selectedSide !== null && coinResult === null
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={selectedSide === null || coinResult !== null}
          >
            <Coins className="w-5 h-5" />
            Flip Coin
          </button>
          {coinResult !== null && (() => {
            const Icon = teams[coinResult].icon;
            return (
              <div className="mt-6 text-center">
                <div className="flex items-center gap-3 justify-center text-2xl font-bold">
                  <Icon className="w-8 h-8" />
                  {teams[coinResult].name} starts!
                </div>
                <p className="mt-2 text-gray-600">
                  {selectedSide === coinResult ? 'Your team goes first!' : 'Opponent team goes first!'}
                </p>
              </div>
            );
          })()}
        </div>
      )}
      {!showCoinFlip && (
        <>
          <ScoreBoard teamScores={teamScores} teams={teams} />
          <TeamSelector teams={teams} currentTeam={currentTeam} onNextTeam={handleNextTeam} />
          <GameBoard
            question={question}
            answers={answers}
            revealedAnswers={revealedAnswers}
            onAnswerSubmit={handleAnswerSubmit}
          />
          {revealedAnswers.length === answers.length && currentQuestionIdx < questions.length - 1 && (
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
          {revealedAnswers.length < answers.length && (
            <button onClick={() => {
              setRevealedAnswers(answers.map((_, idx) => idx));
              setTimeout(() => handleNextQuestion(), 3200);
            }} className="w-full mt-2 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600">
              Skip Round
            </button>
          )}
          {currentQuestionIdx === questions.length - 1 && revealedAnswers.length === answers.length && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg text-green-900 font-bold text-center">
              Game Over! Winner: {teamScores[0] > teamScores[1] ? teams[0].name : teams[1].name}
            </div>
          )}
          <div className="text-right text-sm text-gray-500 mt-2">
            Question {currentQuestionIdx + 1} / {questions.length}
          </div>
        </>
      )}
    </div>
  );
}

export default FamilyFeud;
