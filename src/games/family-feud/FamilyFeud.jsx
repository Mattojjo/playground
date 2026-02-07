import React from 'react';
import questions from './questions';
import ScoreBoard from '../../components/ScoreBoard';
import TeamSelector from '../../components/TeamSelector';
import GameBoard from '../../components/GameBoard';
import HomeButton from '../../components/HomeButton';
import { fuzzyMatch } from '../../utils/gameUtils';
import totoroImg from '../../img/totoro.png';
import ponyoImg from '../../img/ponyo.png';

const teams = [
  { name: 'Team Totoro', icon: totoroImg },
  { name: 'Team Ponyo', icon: ponyoImg }
];

const FamilyFeud = ({ onGoHome }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [revealedAnswers, setRevealedAnswers] = React.useState([]);
  const [teamScores, setTeamScores] = React.useState([0, 0]);
  const [currentTeam, setCurrentTeam] = React.useState(null); // null until coin flip
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

  // Handle text input answer
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

  // Coin flip logic
  const flipCoin = () => {
    const result = Math.random() < 0.5 ? 0 : 1;
    setCoinResult(result);
    setTimeout(() => {
      setShowCoinFlip(false);
      setCurrentTeam(result);
    }, 1200);
  };

  return (
    <div className="game" style={{
      maxWidth: '480px',
      margin: '48px auto',
      background: '#fff',
      borderRadius: '18px',
      boxShadow: '0 2px 24px rgba(0,0,0,0.08)',
      padding: '40px 28px',
      position: 'relative',
      fontFamily: 'Inter, Arial, sans-serif',
      letterSpacing: '0.01em',
    }}>
      <HomeButton onGoHome={onGoHome} />
      {showCoinFlip && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          boxShadow: '0 0 0 100vmax rgba(255,255,255,0.92)',
          animation: 'fadeIn 0.7s',
          paddingTop: '56px',
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '28px',
            color: '#222',
            fontWeight: 600,
            textShadow: 'none',
            letterSpacing: '0.01em',
            textAlign: 'center',
            maxWidth: '90%',
            lineHeight: '1.3',
            wordBreak: 'break-word',
          }}>
            Flip a coin to see which team starts!
          </div>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '32px' }}>
            <button
              onClick={() => setSelectedSide(0)}
              style={{
                fontSize: '1.3rem',
                padding: '14px 24px',
                borderRadius: '12px',
                background: selectedSide === 0 ? '#e0e7ef' : '#fff',
                color: '#222',
                border: selectedSide === 0 ? '2px solid #a3bffa' : '2px solid #e0e7ef',
                cursor: 'pointer',
                boxShadow: selectedSide === 0 ? '0 2px 12px rgba(163,191,250,0.10)' : 'none',
                fontWeight: 500,
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <img src={totoroImg} alt="Totoro" width="32" height="32" />
              {teams[0].name}
            </button>
            <button
              onClick={() => setSelectedSide(1)}
              style={{
                fontSize: '1.3rem',
                padding: '14px 24px',
                borderRadius: '12px',
                background: selectedSide === 1 ? '#e0e7ef' : '#fff',
                color: '#222',
                border: selectedSide === 1 ? '2px solid #faaca8' : '2px solid #e0e7ef',
                cursor: 'pointer',
                boxShadow: selectedSide === 1 ? '0 2px 12px rgba(250,172,168,0.10)' : 'none',
                fontWeight: 500,
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <img src={ponyoImg} alt="Ponyo" width="32" height="32" />
              {teams[1].name}
            </button>
          </div>
          <button
            onClick={flipCoin}
            style={{
              fontSize: '1.1rem',
              padding: '14px 32px',
              borderRadius: '24px',
              background: selectedSide !== null && coinResult === null ? 'linear-gradient(90deg, #a3bffa 0%, #faaca8 100%)' : '#e0e7ef',
              color: selectedSide !== null && coinResult === null ? '#fff' : '#aaa',
              border: 'none',
              cursor: selectedSide !== null && coinResult === null ? 'pointer' : 'not-allowed',
              boxShadow: selectedSide !== null && coinResult === null ? '0 2px 12px #a3bffa33' : 'none',
              marginBottom: '28px',
              fontWeight: 600,
              transition: 'background 0.2s',
              letterSpacing: '0.02em',
            }}
            disabled={selectedSide === null || coinResult !== null}
          >
            🪙 Flip Coin
          </button>
          {coinResult !== null && (
            <div style={{ fontSize: '2rem', marginTop: '18px', color: '#222', fontWeight: 600, animation: 'popIn 0.7s', display: 'flex', alignItems: 'center', gap: '18px' }}>
              <img src={teams[coinResult].icon} alt={teams[coinResult].name} width="32" height="32" />
              {teams[coinResult].name} starts!
              <div style={{ fontSize: '1rem', marginTop: '8px', color: '#555', fontWeight: 400 }}>
                {selectedSide === coinResult ? 'Your team goes first!' : 'Opponent team goes first!'}
              </div>
            </div>
          )}
          {/* Keyframes moved to FamilyFeud.css */}
        </div>
      )}
      {!showCoinFlip && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <ScoreBoard teamScores={teamScores} teams={teams} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TeamSelector teams={teams} currentTeam={currentTeam} onNextTeam={handleNextTeam} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <GameBoard
              question={question}
              answers={answers}
              revealedAnswers={revealedAnswers}
              onAnswerSubmit={handleAnswerSubmit}
            />
          </div>
          {revealedAnswers.length === answers.length && currentQuestionIdx < questions.length - 1 && (
            <button onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
          {/* Skip Round button, shown if question is not fully revealed */}
          {revealedAnswers.length < answers.length && (
            <button onClick={() => {
              // Reveal all answers before skipping
              setRevealedAnswers(answers.map((_, idx) => idx));
              setTimeout(() => {
                handleNextQuestion();
              }, 3200);
            }} style={{ marginTop: '12px' }}>
              Skip Round
            </button>
          )}
          {currentQuestionIdx === questions.length - 1 && revealedAnswers.length === answers.length && (
            <div style={{
              marginTop: '24px',
              padding: '18px',
              background: '#e0e7ef',
              borderRadius: '10px',
              color: '#222',
              fontWeight: 600,
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px #a3bffa22',
              textAlign: 'center',
            }}>
              Game Over! Winner: {teamScores[0] > teamScores[1] ? teams[0].name : teams[1].name}
            </div>
          )}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '20px',
            fontSize: '0.95rem',
            color: '#bbb',
            fontWeight: 400,
          }}>
            Question {currentQuestionIdx + 1} / {questions.length}
          </div>
        </>
      )}
    </div>
  );
}

export default FamilyFeud;
