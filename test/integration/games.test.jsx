import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FamilyFeud from '../../src/games/family-feud/FamilyFeud';
import WouldYouRather from '../../src/games/would-you-rather/WouldYouRather';
import SpicyCouple from '../../src/games/spicy-couple/SpicyCouple';
import TruthOrDare from '../../src/games/truth-or-dare/TruthOrDare';
import NeverHaveIEver from '../../src/games/never-have-i-ever/NeverHaveIEver';
import MovieQuotes from '../../src/games/movie-quotes/MovieQuotes';

// Mock questions for all games with inline definitions
vi.mock('../../src/games/family-feud/questions', () => ({
  default: [
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
        { text: 'Brush teeth', points: 35 },
        { text: 'Read', points: 20 }
      ]
    }
  ]
}));

vi.mock('../../src/games/would-you-rather/questions', () => ({
  default: [
    {
      question: 'Would you rather fly or be invisible?',
      options: [
        { text: 'Fly', funFact: 'Fact about flying' },
        { text: 'Invisible', funFact: 'Fact about invisibility' }
      ]
    }
  ]
}));

vi.mock('../../src/games/spicy-couple/questions', () => ({
  default: [
    {
      question: 'Would you rather kiss with eyes open or closed?',
      dare: 'Kiss for 10 seconds without using hands'
    }
  ]
}));

vi.mock('../../src/games/truth-or-dare/questions', () => ({
  default: [
    { type: 'truth', text: 'What is your biggest fear?' },
    { type: 'truth', text: 'What is your most embarrassing moment?' },
    { type: 'dare', text: 'Do 10 pushups' },
    { type: 'dare', text: 'Sing a song' }
  ]
}));

vi.mock('../../src/games/never-have-i-ever/questions', () => ({
  default: [
    'Never have I ever been skydiving',
    'Never have I ever eaten sushi',
    'Never have I ever traveled to another country'
  ]
}));

vi.mock('../../src/games/movie-quotes/questions', () => ({
  default: [
    {
      quote: 'May the Force be with you',
      answer: 'Star Wars',
      options: ['Star Wars', 'Star Trek', 'The Matrix', 'Avatar']
    },
    {
      quote: "You can't handle the truth!",
      answer: 'A Few Good Men',
      options: ['A Few Good Men', 'Scream', 'The Sixth Sense', 'Gladiator']
    }
  ]
}));

// Mock child components for FamilyFeud
vi.mock('../../src/components/ScoreBoard', () => ({
  default: ({ teamScores, teams }) => (
    <div data-testid="scoreboard">
      {teams[0].name}: {teamScores[0]} | {teams[1].name}: {teamScores[1]}
    </div>
  )
}));

vi.mock('../../src/components/TeamSelector', () => ({
  default: ({ teams, currentTeam, onNextTeam }) => (
    <div data-testid="teamselector">
      <div>Current: {teams[currentTeam].name}</div>
      <button onClick={onNextTeam}>Next Team</button>
    </div>
  )
}));

vi.mock('../../src/components/GameBoard', () => ({
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
      <div>Revealed: {revealedAnswers.length}/{answers.length}</div>
    </div>
  )
}));

describe('Integration Tests - Games', () => {
  describe('FamilyFeud Game', () => {
    it('should show coin flip screen initially', () => {
      const mockOnGoHome = vi.fn();
      render(<FamilyFeud onGoHome={mockOnGoHome} />);
      expect(screen.getByText(/Flip a coin/i)).toBeInTheDocument();
    });

    it('should show both team options for coin selection', () => {
      const mockOnGoHome = vi.fn();
      render(<FamilyFeud onGoHome={mockOnGoHome} />);
      expect(screen.getByText('Cats')).toBeInTheDocument();
      expect(screen.getByText('Fish')).toBeInTheDocument();
    });

    it('should allow selecting a team side', async () => {
      const mockOnGoHome = vi.fn();
      render(<FamilyFeud onGoHome={mockOnGoHome} />);
      const catsButton = screen.getAllByText('Cats')[0].closest('button');
      await userEvent.click(catsButton);
      expect(catsButton).toHaveClass('bg-blue-200');
    });

    it('should disable coin flip button until side is selected', () => {
      const mockOnGoHome = vi.fn();
      render(<FamilyFeud onGoHome={mockOnGoHome} />);
      const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
      expect(flipButton).toBeDisabled();
    });

    it('should enable coin flip button after selecting a side', async () => {
      const mockOnGoHome = vi.fn();
      render(<FamilyFeud onGoHome={mockOnGoHome} />);
      const catsButton = screen.getAllByText('Cats')[0].closest('button');
      await userEvent.click(catsButton);
      
      const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
      expect(flipButton).not.toBeDisabled();
    });

    it('should flip coin and determine starting team', async () => {
      const mockOnGoHome = vi.fn();
      render(<FamilyFeud onGoHome={mockOnGoHome} />);
      const catsButton = screen.getAllByText('Cats')[0].closest('button');
      await userEvent.click(catsButton);
      
      const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
      await userEvent.click(flipButton);
      
      await waitFor(() => {
        expect(screen.getByText(/starts!/i)).toBeInTheDocument();
      });
    });

    it('should show game board after coin flip', async () => {
      const mockOnGoHome = vi.fn();
      render(<FamilyFeud onGoHome={mockOnGoHome} />);
      const catsButton = screen.getAllByText('Cats')[0].closest('button');
      await userEvent.click(catsButton);
      
      const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
      await userEvent.click(flipButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('gameboard')).toBeInTheDocument();
      });
    });

    it('should display current question after coin flip', async () => {
      const mockOnGoHome = vi.fn();
      render(<FamilyFeud onGoHome={mockOnGoHome} />);
      const catsButton = screen.getAllByText('Cats')[0].closest('button');
      await userEvent.click(catsButton);
      
      const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
      await userEvent.click(flipButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name a popular pizza topping')).toBeInTheDocument();
      });
    });
  });

  describe('WouldYouRather Game', () => {
    it('should render game title', () => {
      const mockOnGoHome = vi.fn();
      render(<WouldYouRather onGoHome={mockOnGoHome} />);
      expect(screen.getByText(/Would You Rather/i)).toBeInTheDocument();
    });

    it('should display a question', () => {
      const mockOnGoHome = vi.fn();
      render(<WouldYouRather onGoHome={mockOnGoHome} />);
      expect(screen.getByText('Would you rather fly or be invisible?')).toBeInTheDocument();
    });

    it('should display both options', () => {
      const mockOnGoHome = vi.fn();
      render(<WouldYouRather onGoHome={mockOnGoHome} />);
      expect(screen.getByText('Fly')).toBeInTheDocument();
      expect(screen.getByText('Invisible')).toBeInTheDocument();
    });

    it('should handle option selection', async () => {
      const mockOnGoHome = vi.fn();
      render(<WouldYouRather onGoHome={mockOnGoHome} />);
      const flyButton = screen.getByText('Fly').closest('button');
      await userEvent.click(flyButton);
      expect(flyButton).toHaveClass('bg-indigo-600');
    });

    it('should show next button after selection', async () => {
      const mockOnGoHome = vi.fn();
      render(<WouldYouRather onGoHome={mockOnGoHome} />);
      const flyButton = screen.getByText('Fly').closest('button');
      await userEvent.click(flyButton);
      
      const nextButton = screen.getByRole('button', { name: /Next/i });
      expect(nextButton).toBeInTheDocument();
    });
  });

  describe('SpicyCouple Game', () => {
    it('should render game title', () => {
      const mockOnGoHome = vi.fn();
      render(<SpicyCouple onGoHome={mockOnGoHome} />);
      expect(screen.getByText(/Spicy Couple/i)).toBeInTheDocument();
    });

    it('should display question/dare divider', () => {
      const mockOnGoHome = vi.fn();
      render(<SpicyCouple onGoHome={mockOnGoHome} />);
      expect(screen.getByText('or')).toBeInTheDocument();
    });

    it('should toggle between question and dare', async () => {
      const mockOnGoHome = vi.fn();
      render(<SpicyCouple onGoHome={mockOnGoHome} />);
      const revealButton = screen.getByRole('button', { name: /Reveal/i });
      
      await userEvent.click(revealButton);
      await waitFor(() => {
        expect(screen.getByText(/Kiss/i)).toBeInTheDocument();
      });
    });
  });

  describe('TruthOrDare Game', () => {
    it('should render game title', () => {
      const mockOnGoHome = vi.fn();
      render(<TruthOrDare onGoHome={mockOnGoHome} />);
      expect(screen.getByText(/Truth or Dare/i)).toBeInTheDocument();
    });

    it('should show Truth and Dare buttons', () => {
      const mockOnGoHome = vi.fn();
      render(<TruthOrDare onGoHome={mockOnGoHome} />);
      expect(screen.getByRole('button', { name: /Truth/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Dare/i })).toBeInTheDocument();
    });

    it('should display truth question when Truth is clicked', async () => {
      const mockOnGoHome = vi.fn();
      render(<TruthOrDare onGoHome={mockOnGoHome} />);
      const truthButton = screen.getByRole('button', { name: /Truth/i });
      await userEvent.click(truthButton);
      
      await waitFor(() => {
        expect(screen.getByText(/What is your biggest fear?/)).toBeInTheDocument();
      });
    });

    it('should display dare when Dare is clicked', async () => {
      const mockOnGoHome = vi.fn();
      render(<TruthOrDare onGoHome={mockOnGoHome} />);
      const dareButton = screen.getByRole('button', { name: /Dare/i });
      await userEvent.click(dareButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Do 10 pushups|Sing a song/)).toBeInTheDocument();
      });
    });
  });

  describe('NeverHaveIEver Game', () => {
    it('should render game title', () => {
      const mockOnGoHome = vi.fn();
      render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
      expect(screen.getByText(/Never Have I Ever/i)).toBeInTheDocument();
    });

    it('should display a statement', () => {
      const mockOnGoHome = vi.fn();
      render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
      expect(
        screen.getByText(/Never have I ever been skydiving|Never have I ever eaten sushi/)
      ).toBeInTheDocument();
    });

    it('should show I Have and I Have Not buttons', () => {
      const mockOnGoHome = vi.fn();
      render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
      expect(screen.getByRole('button', { name: /I Have/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /I Have Not/i })
      ).toBeInTheDocument();
    });
  });

  describe('MovieQuotes Game', () => {
    it('should render game title', () => {
      const mockOnGoHome = vi.fn();
      render(<MovieQuotes onGoHome={mockOnGoHome} />);
      expect(screen.getByText(/Movie Quotes/i)).toBeInTheDocument();
    });

    it('should display a quote', () => {
      const mockOnGoHome = vi.fn();
      render(<MovieQuotes onGoHome={mockOnGoHome} />);
      expect(screen.getByText(/May the Force be with you|You can't handle the truth!/)).toBeInTheDocument();
    });

    it('should display answer options', () => {
      const mockOnGoHome = vi.fn();
      render(<MovieQuotes onGoHome={mockOnGoHome} />);
      expect(screen.getByText('Star Wars')).toBeInTheDocument();
    });

    it('should allow selecting an answer', async () => {
      const mockOnGoHome = vi.fn();
      render(<MovieQuotes onGoHome={mockOnGoHome} />);
      const starWarsButton = screen.getByText('Star Wars').closest('button');
      await userEvent.click(starWarsButton);
      expect(starWarsButton).toHaveClass('bg-indigo-600');
    });

    it('should show timer', () => {
      const mockOnGoHome = vi.fn();
      render(<MovieQuotes onGoHome={mockOnGoHome} />);
      expect(screen.getByText(/Time:/i)).toBeInTheDocument();
    });
  });
});
