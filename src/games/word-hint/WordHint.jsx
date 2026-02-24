import React, { useEffect, useMemo, useState } from 'react';
import questions from './questions';

const isAlpha = (char) => /[A-Z]/.test(char);
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MIN_ALLOWED_LETTERS = 16;

const shuffleList = (items) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const WordHint = () => {
  const [mode, setMode] = useState('all');
  const [gameStarted, setGameStarted] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState(new Set());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [letterGuessesLeft, setLetterGuessesLeft] = useState(0);
  const [wordGuess, setWordGuess] = useState('');
  const [status, setStatus] = useState('playing');
  const [score, setScore] = useState(0);

  const filteredQuestions = useMemo(() => {
    if (mode === 'all') return questions;
    return questions.filter(questionItem => (questionItem.type || 'word') === mode);
  }, [mode]);

  const question = rounds[currentIdx];

  const answer = useMemo(() => (question?.answer || '').toUpperCase(), [question]);
  const displayLetters = useMemo(() => {
    const base = (question?.allowedLetters || []).map(letter => letter.toUpperCase());
    const uniqueBase = Array.from(new Set(base));
    if (uniqueBase.length >= MIN_ALLOWED_LETTERS) {
      return uniqueBase;
    }

    const extras = ALPHABET.filter(letter => !uniqueBase.includes(letter));
    const needed = MIN_ALLOWED_LETTERS - uniqueBase.length;
    return uniqueBase.concat(extras.slice(0, needed));
  }, [question]);

  const allowedLetters = useMemo(() => new Set(displayLetters), [displayLetters]);

  useEffect(() => {
    if (!question) return;
    setRevealedLetters(new Set());
    setGuessedLetters([]);
    setLetterGuessesLeft(question.maxLetterGuesses);
    setWordGuess('');
    setStatus('playing');
  }, [question]);

  const startGame = () => {
    const selectedRounds = mode === 'all'
      ? questions
      : questions.filter(questionItem => (questionItem.type || 'word') === mode);

    setRounds(shuffleList(selectedRounds));
    setGameStarted(true);
    setCurrentIdx(0);
    setScore(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentIdx(0);
    setScore(0);
    setRounds([]);
  };

  const isAnswerComplete = (nextRevealed) => {
    for (const char of answer) {
      if (isAlpha(char) && !nextRevealed.has(char)) {
        return false;
      }
    }
    return true;
  };

  const handleLetterGuess = (letter) => {
    if (status !== 'playing' || letterGuessesLeft <= 0) return;
    const normalized = letter.toUpperCase();

    if (!allowedLetters.has(normalized) || guessedLetters.includes(normalized)) {
      return;
    }

    const nextRevealed = new Set(revealedLetters);
    if (answer.includes(normalized)) {
      nextRevealed.add(normalized);
    }

    const nextGuesses = letterGuessesLeft - 1;
    setGuessedLetters(prev => [...prev, normalized]);
    setRevealedLetters(nextRevealed);
    setLetterGuessesLeft(nextGuesses);

    if (isAnswerComplete(nextRevealed)) {
      setStatus('won');
      setScore(prev => prev + 1);
    } else if (nextGuesses <= 0) {
      setStatus('word-guess');
    }
  };

  const handleWordGuess = (event) => {
    event.preventDefault();
    if (status !== 'word-guess') return;

    const normalized = wordGuess.trim().toUpperCase();
    if (!normalized) return;

    if (normalized === answer) {
      setStatus('won');
      setScore(prev => prev + 1);
      setRevealedLetters(new Set(answer.split('').filter(isAlpha)));
    } else {
      setStatus('lost');
    }
  };

  const handleNext = () => {
    setCurrentIdx(idx => idx + 1);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Word Hint</h2>
        <p className="text-gray-300 mb-4">Pick a mode before the game starts.</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { value: 'all', label: 'All' },
            { value: 'word', label: 'Words' },
            { value: 'phrase', label: 'Phrases' }
          ].map(option => (
            <button
              key={option.value}
              className={`py-2 rounded-lg font-semibold transition-all ${
                mode === option.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => setMode(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Word Hint</h2>
        {rounds.length > 0 ? (
          <div className="text-3xl font-bold text-green-400 mb-4">Your Score: {score} / {rounds.length}</div>
        ) : (
          <div className="text-gray-300">No rounds available for this mode yet.</div>
        )}
        <p className="text-gray-300 mb-4">Thanks for playing!</p>
        <button
          className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={resetGame}
        >
          Play Again
        </button>
      </div>
    );
  }

  const typeLabel = question.type === 'phrase' ? 'phrase' : 'word';

  const wordSlots = answer.split('').map((char, idx) => {
    const display = !isAlpha(char) ? char : revealedLetters.has(char) ? char : '_';
    return (
      <span
        key={`${char}-${idx}`}
        className={`px-3 py-2 rounded-lg border text-lg font-bold uppercase tracking-widest ${
          display === '_' ? 'bg-slate-700 border-slate-600 text-slate-400' : 'bg-indigo-600 border-indigo-400 text-white'
        }`}
      >
        {display}
      </span>
    );
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-indigo-400">Word Hint</h2>
          <span className="text-sm text-gray-300">Round {currentIdx + 1} / {rounds.length}</span>
        </div>
        <div className="text-sm text-gray-400">Mode: {mode === 'all' ? 'All' : mode === 'phrase' ? 'Phrases' : 'Words'}</div>
      </div>
      <div className="mb-4 p-4 rounded-lg bg-slate-700 border-l-4 border-indigo-500">
        <p className="text-lg font-semibold text-indigo-200">Hint</p>
        <p className="text-gray-200">{question.hint}</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {wordSlots}
      </div>

      <div className="mb-4 text-gray-300 font-medium">
        Letter guesses left: <span className="text-indigo-300">{letterGuessesLeft}</span>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {displayLetters.map(letter => {
          const normalized = letter.toUpperCase();
          const used = guessedLetters.includes(normalized);
          return (
            <button
              key={normalized}
              className={`py-2 rounded-lg font-semibold transition-all ${
                used
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              onClick={() => handleLetterGuess(normalized)}
              disabled={used || status !== 'playing'}
            >
              {normalized}
            </button>
          );
        })}
      </div>

      {status === 'word-guess' && (
        <form className="flex flex-col gap-3 mb-4" onSubmit={handleWordGuess}>
          <input
            type="text"
            value={wordGuess}
            onChange={event => setWordGuess(event.target.value)}
            placeholder={`Guess the full ${typeLabel}...`}
            className="px-4 py-2 border-2 border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Guess {typeLabel === 'phrase' ? 'Phrase' : 'Word'}
          </button>
        </form>
      )}

      {status === 'won' && (
        <div className="mb-4 p-4 rounded-lg bg-green-900 text-green-300 border border-green-700">
          Nice! You found the {typeLabel}.
        </div>
      )}

      {status === 'lost' && (
        <div className="mb-4 p-4 rounded-lg bg-red-900 text-red-300 border border-red-700">
          Not quite. The word was <span className="font-semibold">{answer}</span>.
        </div>
      )}

      {(status === 'won' || status === 'lost') && (
        <button
          className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={handleNext}
        >
          Next
        </button>
      )}

      <div className="mt-4 text-right text-sm text-gray-400">Score: {score}</div>
    </div>
  );
};

export default WordHint;
