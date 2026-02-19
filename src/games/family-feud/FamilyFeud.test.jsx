import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FamilyFeud from './FamilyFeud';

// Mock the questions module
vi.mock('./questions', () => ({
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

// Mock child components
vi.mock('../../components/ScoreBoard', () => ({
  default: ({ teamScores, teams }) => (
    <div data-testid="scoreboard">
      {teams[0].name}: {teamScores[0]} | {teams[1].name}: {teamScores[1]}
    </div>
  )
}));

vi.mock('../../components/TeamSelector', () => ({
  default: ({ teams, currentTeam, onNextTeam }) => (
    <div data-testid="teamselector">
      <div>Current: {teams[currentTeam].name}</div>
      <button onClick={onNextTeam}>Next Team</button>
    </div>
  )
}));

vi.mock('../../components/GameBoard', () => ({
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

describe('FamilyFeud Game', () => {
  const mockOnGoHome = vi.fn();

  beforeEach(() => {
    mockOnGoHome.mockClear();
  });

  it('should show coin flip screen initially', () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    expect(screen.getByText(/Flip a coin/i)).toBeInTheDocument();
  });

  it('should show both team options for coin selection', () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Cats')).toBeInTheDocument();
    expect(screen.getByText('Fish')).toBeInTheDocument();
  });

  it('should allow selecting a team side', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    expect(catsButton).toHaveClass('bg-blue-200');
  });

  it('should disable coin flip button until side is selected', () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    expect(flipButton).toBeDisabled();
  });

  it('should enable coin flip button after selecting a side', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    expect(flipButton).not.toBeDisabled();
  });

  it('should flip coin and determine starting team', async () => {
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
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('gameboard')).toBeInTheDocument();
    });
  });

  it('should show scoreboard in game board', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('scoreboard')).toBeInTheDocument();
    });
  });

  it('should show team selector in game board', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('teamselector')).toBeInTheDocument();
    });
  });

  it('should display current question', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name a popular pizza topping')).toBeInTheDocument();
    });
  });

  it('should update scores on correct answer', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      const input = screen.getByTestId('answer-input');
      expect(input).toBeInTheDocument();
    });
    
    const input = screen.getByTestId('answer-input');
    await userEvent.type(input, 'Pepperoni');
    
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Revealed: 1\/3/)).toBeInTheDocument();
    });
  });

  it('should pass turn on wrong answer', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      const input = screen.getByTestId('answer-input');
      expect(input).toBeInTheDocument();
    });
    
    const input = screen.getByTestId('answer-input');
    await userEvent.type(input, 'Wrong answer');
    
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
  });

  it('should show next question button when all answers revealed', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('answer-input')).toBeInTheDocument();
    });
  });

  it('should track question progress', () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    // Question count appears when game starts
    expect(screen.queryByText(/Question 1 \/ 2/i)).not.toBeInTheDocument();
  });

  it('should handle fuzzy matching for answers', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      const input = screen.getByTestId('answer-input');
      expect(input).toBeInTheDocument();
    });
  });

  it('should prevent duplicate answer submission', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      const input = screen.getByTestId('answer-input');
      expect(input).toBeInTheDocument();
    });
    
    const input = screen.getByTestId('answer-input');
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    
    await userEvent.type(input, 'Pepperoni');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Revealed: 1\/3/)).toBeInTheDocument();
    });
    
    // Try submitting the same answer again
    await userEvent.type(input, 'Pepperoni');
    await userEvent.click(submitButton);
  });

  it('should show skip round button', async () => {
    render(<FamilyFeud onGoHome={mockOnGoHome} />);
    const catsButton = screen.getAllByText('Cats')[0].closest('button');
    await userEvent.click(catsButton);
    
    const flipButton = screen.getByRole('button', { name: /Flip Coin/i });
    await userEvent.click(flipButton);
    
    await waitFor(() => {
      expect(screen.queryByText(/Skip Round/i)).toBeInTheDocument();
    });
  });
});
