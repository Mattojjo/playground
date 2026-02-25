import React, { useEffect, useMemo, useState } from 'react';
import { Cat, Fish, Coins } from 'lucide-react';
import questions from './questions';
import ScoreBoard from '../../components/ScoreBoard';
import TeamSelector from '../../components/TeamSelector';

const isAlpha = (char) => /[A-Z]/.test(char);
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MIN_ALLOWED_LETTERS = 16;

const TEAMS = [
  { name: 'Cats', icon: Cat },
  { name: 'Fish', icon: Fish }
];

// Points tiers
const POINTS = {
  earlyClean: 3, // Guess Now with zero letters used
  earlyUsed: 2,  // Guess Now with at least one letter used, or solved via letter reveals
  forced: 1      // guessed after running out of letter attempts
};

const shuffleList = (items) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const WordHint = () => {
  // ── Pre-game ──────────────────────────────────────────────
  const [mode, setMode] = useState('all');
  const [gameStarted, setGameStarted] = useState(false);
  const [showCoinFlip, setShowCoinFlip] = useState(false);
  const [selectedSide, setSelectedSide] = useState(null);
  const [coinResult, setCoinResult] = useState(null);

  // ── Game state ────────────────────────────────────────────
  const [rounds, setRounds] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [teamScores, setTeamScores] = useState([0, 0]);

  // ── Round state ───────────────────────────────────────────
  const [revealedLetters, setRevealedLetters] = useState(new Set());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [letterGuessesLeft, setLetterGuessesLeft] = useState(0);
  const [wordGuess, setWordGuess] = useState('');
  // status: 'playing' | 'early-guess' | 'word-guess' | 'won' | 'lost'
  const [status, setStatus] = useState('playing');
  const [lastPoints, setLastPoints] = useState(0);

  const question = rounds[currentIdx];
  const answer = useMemo(() => (question?.answer || '').toUpperCase(), [question]);

  const displayLetters = useMemo(() => {
    const base = (question?.allowedLetters || []).map(l => l.toUpperCase());
    const uniqueBase = Array.from(new Set(base));
    if (uniqueBase.length >= MIN_ALLOWED_LETTERS) return uniqueBase;
    const extras = ALPHABET.filter(l => !uniqueBase.includes(l));
    return uniqueBase.concat(extras.slice(0, MIN_ALLOWED_LETTERS - uniqueBase.length));
  }, [question]);

  const allowedLetters = useMemo(() => new Set(displayLetters), [displayLetters]);

  // Reset round state whenever the question changes
  useEffect(() => {
    if (!question) return;
    setRevealedLetters(new Set());
    setGuessedLetters([]);
    setLetterGuessesLeft(question.maxLetterGuesses);
    setWordGuess('');
    setStatus('playing');
    setLastPoints(0);
  }, [question]);

  // ── Helpers ───────────────────────────────────────────────
  const isAnswerComplete = (revealed) => {
    for (const char of answer) {
      if (isAlpha(char) && !revealed.has(char)) return false;
    }
    return true;
  };

  const awardPoints = (pts) => {
    setTeamScores(prev => prev.map((s, i) => i === currentTeam ? s + pts : s));
    setLastPoints(pts);
  };

  const revealAnswer = () =>
    setRevealedLetters(new Set(answer.split('').filter(isAlpha)));

  // ── Actions ───────────────────────────────────────────────
  const handleLetterGuess = (letter) => {
    if (status !== 'playing' || letterGuessesLeft <= 0) return;
    const norm = letter.toUpperCase();
    if (!allowedLetters.has(norm) || guessedLetters.includes(norm)) return;

    const nextRevealed = new Set(revealedLetters);
    if (answer.includes(norm)) nextRevealed.add(norm);

    const nextGuesses = letterGuessesLeft - 1;
    setGuessedLetters(prev => [...prev, norm]);
    setRevealedLetters(nextRevealed);
    setLetterGuessesLeft(nextGuesses);

    if (isAnswerComplete(nextRevealed)) {
      awardPoints(POINTS.earlyUsed);
      setRevealedLetters(nextRevealed);
      setStatus('won');
    } else if (nextGuesses <= 0) {
      setStatus('word-guess');
    }
  };

  const handleEarlyGuess = (e) => {
    e.preventDefault();
    if (status !== 'early-guess') return;
    const norm = wordGuess.trim().toUpperCase().replace(/\s+/g, ' ');
    if (!norm) return;
    if (norm === answer) {
      const pts = guessedLetters.length === 0 ? POINTS.earlyClean : POINTS.earlyUsed;
      awardPoints(pts);
      revealAnswer();
      setStatus('won');
    } else {
      setStatus('lost');
    }
  };

  const handleForcedGuess = (e) => {
    e.preventDefault();
    if (status !== 'word-guess') return;
    const norm = wordGuess.trim().toUpperCase().replace(/\s+/g, ' ');
    if (!norm) return;
    if (norm === answer) {
      awardPoints(POINTS.forced);
      revealAnswer();
      setStatus('won');
    } else {
      setStatus('lost');
    }
  };

  const handleNext = () => {
    setCurrentIdx(i => i + 1);
    setCurrentTeam(t => (t + 1) % TEAMS.length);
  };

  // ── Coin flip ─────────────────────────────────────────────
  const flipCoin = () => {
    if (selectedSide === null || coinResult !== null) return;
    const result = Math.random() < 0.5 ? 0 : 1;
    setCoinResult(result);
    setTimeout(() => {
      setShowCoinFlip(false);
      setCurrentTeam(result);
    }, 1400);
  };

  // ── Start / reset ─────────────────────────────────────────
  const startGame = () => {
    const pool = mode === 'all'
      ? questions
      : questions.filter(q => (q.type || 'word') === mode);
    setRounds(shuffleList(pool));
    setCurrentIdx(0);
    setTeamScores([0, 0]);
    setGameStarted(true);
    setShowCoinFlip(true);
    setSelectedSide(null);
    setCoinResult(null);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowCoinFlip(false);
    setSelectedSide(null);
    setCoinResult(null);
    setCurrentIdx(0);
    setTeamScores([0, 0]);
    setRounds([]);
  };

  // ────────────────── RENDER ────────────────────────────────

  // 1 · Pre-game mode selector
  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-indigo-400">Word Hint</h2>
        <p className="text-gray-400 text-sm mb-6">Choose what type of content you want to play with.</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { value: 'all', label: 'All' },
            { value: 'word', label: 'Words only' },
            { value: 'phrase', label: 'Phrases only' }
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`py-3 rounded-lg font-semibold transition-all ${
                mode === opt.value
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mb-6 p-4 bg-slate-700 rounded-lg text-sm text-gray-300">
          <p className="font-semibold text-white mb-2">Scoring</p>
          <ul className="space-y-1">
            <li>🟣 <span className="text-indigo-300 font-bold">3 pts</span> — <em>Guess Now</em> with no letters used</li>
            <li>🟡 <span className="text-yellow-300 font-bold">2 pts</span> — <em>Guess Now</em> after using letters, or solved via reveals</li>
            <li>🟠 <span className="text-orange-300 font-bold">1 pt</span> — guessed after running out of letters</li>
          </ul>
        </div>

        <button
          onClick={startGame}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
        >
          Start Game
        </button>
      </div>
    );
  }

  // 2 · Coin flip
  if (showCoinFlip) {
    const CoinIcon0 = TEAMS[0].icon;
    const CoinIcon1 = TEAMS[1].icon;
    return (
      <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">Who goes first?</h2>
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setSelectedSide(0)}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-3 transition-all ${
              selectedSide === 0
                ? 'bg-indigo-200 text-indigo-900 ring-2 ring-indigo-500'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <CoinIcon0 className="w-7 h-7" />
            {TEAMS[0].name}
          </button>
          <button
            onClick={() => setSelectedSide(1)}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-3 transition-all ${
              selectedSide === 1
                ? 'bg-cyan-200 text-cyan-900 ring-2 ring-cyan-500'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <CoinIcon1 className="w-7 h-7" />
            {TEAMS[1].name}
          </button>
        </div>

        <button
          onClick={flipCoin}
          disabled={selectedSide === null || coinResult !== null}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
            selectedSide !== null && coinResult === null
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-slate-600 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Coins className="w-5 h-5" />
          Flip Coin
        </button>

        {coinResult !== null && (() => {
          const WinIcon = TEAMS[coinResult].icon;
          return (
            <div className="mt-6 text-center">
              <div className="flex items-center gap-3 justify-center text-2xl font-bold text-white">
                <WinIcon className="w-8 h-8" />
                {TEAMS[coinResult].name} go first!
              </div>
              <p className="mt-2 text-gray-400 text-sm">
                {selectedSide === coinResult ? 'Your team goes first!' : 'Opponent goes first!'}
              </p>
            </div>
          );
        })()}
      </div>
    );
  }

  // 3 · Game over
  if (!question) {
    const winner = teamScores[0] > teamScores[1]
      ? TEAMS[0].name
      : teamScores[1] > teamScores[0]
        ? TEAMS[1].name
        : null;
    const WinnerIcon = teamScores[0] >= teamScores[1] ? TEAMS[0].icon : TEAMS[1].icon;
    return (
      <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Game Over!</h2>
        <ScoreBoard teamScores={teamScores} teams={TEAMS} />
        {winner ? (
          <div className="flex items-center justify-center gap-3 text-2xl font-bold text-green-400 my-4">
            <WinnerIcon className="w-8 h-8" />
            {winner} win!
          </div>
        ) : (
          <div className="text-xl font-bold text-yellow-400 my-4">It&apos;s a tie!</div>
        )}
        <button
          onClick={resetGame}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          Play Again
        </button>
      </div>
    );
  }

  // 4 · Active round
  const typeLabel = question.type === 'phrase' ? 'phrase' : 'word';

  const wordSlots = answer.split('').map((char, idx) => {
    if (char === ' ') return <span key={`space-${idx}`} className="w-4" />;
    const display = !isAlpha(char) ? char : revealedLetters.has(char) ? char : '_';
    return (
      <span
        key={`${char}-${idx}`}
        className={`px-3 py-2 rounded-lg border text-lg font-bold uppercase tracking-widest ${
          display === '_'
            ? 'bg-slate-700 border-slate-600 text-slate-400'
            : 'bg-indigo-600 border-indigo-400 text-white'
        }`}
      >
        {display}
      </span>
    );
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-indigo-400">Word Hint</h2>
        <span className="text-sm text-gray-400">
          Round {currentIdx + 1} / {rounds.length} &middot; {mode === 'phrase' ? 'Phrases' : mode === 'word' ? 'Words' : 'All'}
        </span>
      </div>

      {/* Scoreboard */}
      <ScoreBoard teamScores={teamScores} teams={TEAMS} />

      {/* Current team */}
      <TeamSelector
        teams={TEAMS}
        currentTeam={currentTeam}
        onNextTeam={() => setCurrentTeam(t => (t + 1) % TEAMS.length)}
      />

      {/* Hint */}
      <div className="mb-4 p-4 rounded-lg bg-slate-700 border-l-4 border-indigo-500">
        <p className="text-sm font-semibold text-indigo-300 uppercase tracking-wide mb-1">Hint</p>
        <p className="text-gray-200">{question.hint}</p>
      </div>

      {/* Word / phrase slots */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {wordSlots}
      </div>

      {/* Letter guesses counter + scoring legend */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="text-gray-300">
          Letters left: <span className="text-indigo-300 font-bold">{letterGuessesLeft}</span>
        </span>
        <span className="text-gray-500 text-xs">
          {POINTS.earlyClean}pt no letters &middot; {POINTS.earlyUsed}pt early/reveal &middot; {POINTS.forced}pt forced
        </span>
      </div>

      {/* Letter buttons */}
      {status === 'playing' && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {displayLetters.map(letter => {
            const norm = letter.toUpperCase();
            const used = guessedLetters.includes(norm);
            return (
              <button
                key={norm}
                onClick={() => handleLetterGuess(norm)}
                disabled={used}
                className={`py-2 rounded-lg font-semibold transition-all text-sm ${
                  used
                    ? 'bg-slate-600 text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                {norm}
              </button>
            );
          })}
        </div>
      )}

      {/* "Guess Now" button — available any time while playing */}
      {status === 'playing' && (
        <button
          onClick={() => { setStatus('early-guess'); setWordGuess(''); }}
          className="w-full mb-4 py-2 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-500 transition-all"
        >
          Guess Now (+{POINTS.earlyClean}/{POINTS.earlyUsed} pts if correct)
        </button>
      )}

      {/* Early guess form */}
      {status === 'early-guess' && (
        <form onSubmit={handleEarlyGuess} className="flex flex-col gap-3 mb-4">
          <p className="text-yellow-300 text-sm font-medium">
            Guess the full {typeLabel} now for{' '}
            <span className="font-bold">{guessedLetters.length === 0 ? POINTS.earlyClean : POINTS.earlyUsed} pts</span>
            {guessedLetters.length === 0 ? ' — no letters used yet! 🟣' : ' — letters already used 🟡'}!
          </p>
          <input
            autoFocus
            type="text"
            value={wordGuess}
            onChange={e => setWordGuess(e.target.value)}
            placeholder={`Enter the ${typeLabel}…`}
            className="px-4 py-2 border-2 border-yellow-500 rounded-lg bg-slate-700 text-white focus:outline-none focus:border-yellow-400"
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-500">
              Submit Guess
            </button>
            <button
              type="button"
              onClick={() => setStatus('playing')}
              className="px-4 py-2 rounded-lg bg-slate-600 text-gray-300 hover:bg-slate-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Forced guess form (ran out of letters) */}
      {status === 'word-guess' && (
        <form onSubmit={handleForcedGuess} className="flex flex-col gap-3 mb-4">
          <p className="text-orange-300 text-sm font-medium">
            Out of letter guesses! Guess the full {typeLabel} for <span className="font-bold">{POINTS.forced} pt</span>.
          </p>
          <input
            autoFocus
            type="text"
            value={wordGuess}
            onChange={e => setWordGuess(e.target.value)}
            placeholder={`Enter the ${typeLabel}…`}
            className="px-4 py-2 border-2 border-orange-500 rounded-lg bg-slate-700 text-white focus:outline-none focus:border-orange-400"
          />
          <button type="submit" className="py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-500">
            Submit Guess
          </button>
        </form>
      )}

      {/* Result banners */}
      {status === 'won' && (
        <div className="mb-4 p-4 rounded-lg bg-green-900 text-green-300 border border-green-700 flex items-center justify-between">
          <span>
            ✅ Correct! <span className="font-semibold">{TEAMS[currentTeam].name}</span> earn{' '}
            <span className="font-bold text-green-200 text-lg">{lastPoints}</span> pts.
          </span>
          <span className="text-green-400 font-bold text-lg">{answer}</span>
        </div>
      )}

      {status === 'lost' && (
        <div className="mb-4 p-4 rounded-lg bg-red-900 text-red-300 border border-red-700 flex items-center justify-between">
          <span>❌ Wrong guess. The answer was:</span>
          <span className="font-bold text-red-200 text-lg">{answer}</span>
        </div>
      )}

      {/* Next round */}
      {(status === 'won' || status === 'lost') && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          {currentIdx + 1 < rounds.length ? 'Next Round' : 'See Results'}
        </button>
      )}
    </div>
  );
};

export default WordHint;
