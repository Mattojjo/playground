import React from 'react';
import { vi } from 'vitest';

/**
 * Mock factories for reusable component mocks
 */

export const createScoreBoardMock = () => ({
  default: ({ teams, currentTeam }) => (
    <div data-testid="scoreboard">
      {teams?.map((team, idx) => (
        <div key={idx} data-testid={`team-${idx}`}>
          <span>{team.name}</span>
          <span>{team.score}</span>
        </div>
      ))}
    </div>
  )
});

export const createTeamSelectorMock = () => ({
  default: ({ teams, currentTeam, onNextTeam }) => (
    <div data-testid="teamselector">
      <div>Current: {teams?.[currentTeam]?.name}</div>
      <button onClick={onNextTeam}>Next Team</button>
    </div>
  )
});

export const createGameBoardMock = () => ({
  default: ({ question, answers, revealedAnswers, onAnswerSubmit }) => (
    <div data-testid="gameboard">
      <h2>{question}</h2>
      <input
        data-testid="answer-input"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            const input = e.target.value;
            onAnswerSubmit(input);
            e.target.value = '';
          }
        }}
        placeholder="Type answer"
      />
      <button
        onClick={() => {
          const input = document.querySelector('[data-testid="answer-input"]').value;
          onAnswerSubmit(input);
          document.querySelector('[data-testid="answer-input"]').value = '';
        }}
      >
        Submit
      </button>
      <div>Revealed: {revealedAnswers?.length || 0}/{answers?.length || 0}</div>
    </div>
  )
});

export const createHomeMock = () => ({
  default: ({ onStart }) => (
    <div data-testid="home">
      <h2>Choose Your Game</h2>
      <button onClick={() => onStart('family-feud')}>Family Feud</button>
      <button onClick={() => onStart('would-you-rather')}>Would You Rather</button>
      <button onClick={() => onStart('spicy-couple')}>Spicy Couple</button>
      <button onClick={() => onStart('truth-or-dare')}>Truth or Dare</button>
      <button onClick={() => onStart('never-have-i-ever')}>Never Have I Ever</button>
      <button onClick={() => onStart('movie-quotes')}>Movie Quotes</button>
    </div>
  )
});

/**
 * Question mocks for games
 */

export const familyFeudQuestions = [
  {
    question: 'Name a popular pizza topping',
    answers: [
      { text: 'Pepperoni', points: 40 },
      { text: 'Mushrooms', points: 20 },
      { text: 'Sausage', points: 15 }
    ]
  },
  {
    question: 'Name something you do before bed',
    answers: [
      { text: 'Brush teeth', points: 50 },
      { text: 'Shower', points: 30 },
      { text: 'Read', points: 20 }
    ]
  }
];

export const wouldYouRatherQuestions = [
  {
    question: 'Would you rather fly or be invisible?',
    options: [
      { text: 'Fly', funFact: 'Fact about flying' },
      { text: 'Invisible', funFact: 'Fact about invisibility' }
    ]
  },
  {
    question: 'Would you rather always be cold or always be hot?',
    options: [
      { text: 'Cold', funFact: 'Fact about cold' },
      { text: 'Hot', funFact: 'Fact about hot' }
    ]
  }
];

export const spicyCoupleQuestions = [
  {
    question: 'Would you rather kiss with eyes open or closed?',
    dare: 'Kiss for 10 seconds without using hands'
  },
  {
    question: 'What would you change about your partner?',
    dare: 'Give your partner a shoulder massage for one minute'
  }
];

export const truthOrDareQuestions = [
  { type: 'truth', text: 'What is your biggest fear?' },
  { type: 'truth', text: 'What is your most embarrassing moment?' },
  { type: 'dare', text: 'Do 10 pushups' },
  { type: 'dare', text: 'Sing a song' }
];

export const neverHaveIEverQuestions = [
  'Never have I ever been skydiving',
  'Never have I ever eaten sushi',
  'Never have I ever traveled to another country'
];

export const movieQuotesQuestions = [
  {
    quote: 'May the Force be with you',
    answer: 'Star Wars',
    options: ['Star Wars', 'Star Trek', 'The Matrix', 'Avatar']
  },
  {
    quote: 'You can\'t handle the truth!',
    answer: 'A Few Good Men',
    options: ['A Few Good Men', 'Scream', 'The Sixth Sense', 'Gladiator']
  }
];
