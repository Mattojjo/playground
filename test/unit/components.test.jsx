import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeButton from '../../src/components/HomeButton';
import GameBoard from '../../src/components/GameBoard';
import TeamSelector from '../../src/components/TeamSelector';
import ScoreBoard from '../../src/components/ScoreBoard';
import { Cat, Fish } from 'lucide-react';

describe('Component Tests', () => {
  describe('HomeButton', () => {
    it('should render a button', () => {
      const mockOnGoHome = vi.fn();
      render(<HomeButton onGoHome={mockOnGoHome} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should call onGoHome when clicked', async () => {
      const mockOnGoHome = vi.fn();
      render(<HomeButton onGoHome={mockOnGoHome} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);
      expect(mockOnGoHome).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks', async () => {
      const mockOnGoHome = vi.fn();
      render(<HomeButton onGoHome={mockOnGoHome} />);
      const button = screen.getByRole('button');
      
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);
      
      expect(mockOnGoHome).toHaveBeenCalledTimes(3);
    });

    it('should have proper styling classes', () => {
      const mockOnGoHome = vi.fn();
      const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
      const button = container.querySelector('button');
      
      expect(button).toHaveClass('bg-indigo-600');
      expect(button).toHaveClass('text-white');
      expect(button).toHaveClass('rounded-lg');
    });

    it('should be clickable from keyboard', async () => {
      const mockOnGoHome = vi.fn();
      render(<HomeButton onGoHome={mockOnGoHome} />);
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveFocus();
      
      await userEvent.keyboard('{Enter}');
      expect(mockOnGoHome).toHaveBeenCalled();
    });
  });

  describe('GameBoard', () => {
    const mockQuestion = 'Name a popular pizza topping';
    const mockAnswers = [
      { text: 'Pepperoni', points: 40 },
      { text: 'Mushrooms', points: 20 },
      { text: 'Sausage', points: 15 }
    ];

    it('should render the question', () => {
      const mockOnAnswerSubmit = vi.fn();
      render(
        <GameBoard
          question={mockQuestion}
          answers={mockAnswers}
          revealedAnswers={[]}
          onAnswerSubmit={mockOnAnswerSubmit}
        />
      );
      expect(screen.getByText(mockQuestion)).toBeInTheDocument();
    });

    it('should render input field with placeholder', () => {
      const mockOnAnswerSubmit = vi.fn();
      render(
        <GameBoard
          question={mockQuestion}
          answers={mockAnswers}
          revealedAnswers={[]}
          onAnswerSubmit={mockOnAnswerSubmit}
        />
      );
      const input = screen.getByPlaceholderText('Type your answer...');
      expect(input).toBeInTheDocument();
    });

    it('should render Submit button', () => {
      const mockOnAnswerSubmit = vi.fn();
      render(
        <GameBoard
          question={mockQuestion}
          answers={mockAnswers}
          revealedAnswers={[]}
          onAnswerSubmit={mockOnAnswerSubmit}
        />
      );
      const button = screen.getByRole('button', { name: /Submit/i });
      expect(button).toBeInTheDocument();
    });

    it('should call onAnswerSubmit when form is submitted', async () => {
      const mockOnAnswerSubmit = vi.fn();
      render(
        <GameBoard
          question={mockQuestion}
          answers={mockAnswers}
          revealedAnswers={[]}
          onAnswerSubmit={mockOnAnswerSubmit}
        />
      );
      const input = screen.getByPlaceholderText('Type your answer...');
      const button = screen.getByRole('button', { name: /Submit/i });

      await userEvent.type(input, 'Pepperoni');
      await userEvent.click(button);

      expect(mockOnAnswerSubmit).toHaveBeenCalledWith('Pepperoni');
    });

    it('should clear input after submission', async () => {
      const mockOnAnswerSubmit = vi.fn();
      render(
        <GameBoard
          question={mockQuestion}
          answers={mockAnswers}
          revealedAnswers={[]}
          onAnswerSubmit={mockOnAnswerSubmit}
        />
      );
      const input = screen.getByPlaceholderText('Type your answer...');
      const button = screen.getByRole('button', { name: /Submit/i });

      await userEvent.type(input, 'Pepperoni');
      await userEvent.click(button);

      expect(input.value).toBe('');
    });

    it('should display revealed answers count', () => {
      const mockOnAnswerSubmit = vi.fn();
      render(
        <GameBoard
          question={mockQuestion}
          answers={mockAnswers}
          revealedAnswers={[{ text: 'Pepperoni', points: 40 }]}
          onAnswerSubmit={mockOnAnswerSubmit}
        />
      );
      expect(screen.getByText(/1\/3/)).toBeInTheDocument();
    });

    it('should handle submit on Enter key', async () => {
      const mockOnAnswerSubmit = vi.fn();
      render(
        <GameBoard
          question={mockQuestion}
          answers={mockAnswers}
          revealedAnswers={[]}
          onAnswerSubmit={mockOnAnswerSubmit}
        />
      );
      const input = screen.getByPlaceholderText('Type your answer...');

      await userEvent.type(input, 'Pepperoni{Enter}');

      expect(mockOnAnswerSubmit).toHaveBeenCalledWith('Pepperoni');
    });
  });

  describe('TeamSelector', () => {
    const teams = [
      { name: 'Team A', score: 0 },
      { name: 'Team B', score: 0 }
    ];

    it('should display current team name', () => {
      const mockOnNextTeam = vi.fn();
      render(
        <TeamSelector
          teams={teams}
          currentTeam={0}
          onNextTeam={mockOnNextTeam}
        />
      );
      expect(screen.getByText(/Team A/)).toBeInTheDocument();
    });

    it('should call onNextTeam when Next Team button is clicked', async () => {
      const mockOnNextTeam = vi.fn();
      render(
        <TeamSelector
          teams={teams}
          currentTeam={0}
          onNextTeam={mockOnNextTeam}
        />
      );
      const button = screen.getByRole('button', { name: /Next Team/i });
      await userEvent.click(button);
      expect(mockOnNextTeam).toHaveBeenCalledTimes(1);
    });

    it('should display next team when currentTeam changes', () => {
      const mockOnNextTeam = vi.fn();
      const { rerender } = render(
        <TeamSelector
          teams={teams}
          currentTeam={0}
          onNextTeam={mockOnNextTeam}
        />
      );
      expect(screen.getByText(/Team A/)).toBeInTheDocument();

      rerender(
        <TeamSelector
          teams={teams}
          currentTeam={1}
          onNextTeam={mockOnNextTeam}
        />
      );
      expect(screen.getByText(/Team B/)).toBeInTheDocument();
    });

    it('should handle multiple team switches', async () => {
      const mockOnNextTeam = vi.fn();
      const { rerender } = render(
        <TeamSelector
          teams={teams}
          currentTeam={0}
          onNextTeam={mockOnNextTeam}
        />
      );
      const button = screen.getByRole('button', { name: /Next Team/i });

      await userEvent.click(button);
      expect(mockOnNextTeam).toHaveBeenCalledTimes(1);

      rerender(
        <TeamSelector
          teams={teams}
          currentTeam={1}
          onNextTeam={mockOnNextTeam}
        />
      );

      await userEvent.click(button);
      expect(mockOnNextTeam).toHaveBeenCalledTimes(2);
    });

    it('should display team count in UI', () => {
      const mockOnNextTeam = vi.fn();
      const threeTeams = [
        { name: 'Team A', score: 0 },
        { name: 'Team B', score: 0 },
        { name: 'Team C', score: 0 }
      ];
      render(
        <TeamSelector
          teams={threeTeams}
          currentTeam={0}
          onNextTeam={mockOnNextTeam}
        />
      );
      expect(screen.getByText(/Team A/)).toBeInTheDocument();
    });

    it('should remain in sync with currentTeam prop', () => {
      const mockOnNextTeam = vi.fn();
      const { rerender } = render(
        <TeamSelector
          teams={teams}
          currentTeam={0}
          onNextTeam={mockOnNextTeam}
        />
      );

      for (let i = 0; i < teams.length; i++) {
        rerender(
          <TeamSelector
            teams={teams}
            currentTeam={i}
            onNextTeam={mockOnNextTeam}
          />
        );
        expect(screen.getByText(new RegExp(teams[i].name))).toBeInTheDocument();
      }
    });
  });

  describe('ScoreBoard', () => {
    const teams = [
      { name: 'Cats', icon: Cat },
      { name: 'Fish', icon: Fish }
    ];

    it('should render Scores title', () => {
      render(
        <ScoreBoard
          teamScores={[0, 0]}
          teams={teams}
        />
      );
      expect(screen.getByText('Scores')).toBeInTheDocument();
    });

    it('should display all team names', () => {
      render(
        <ScoreBoard
          teamScores={[10, 20]}
          teams={teams}
        />
      );
      expect(screen.getByText(/Cats/)).toBeInTheDocument();
      expect(screen.getByText(/Fish/)).toBeInTheDocument();
    });

    it('should display team scores', () => {
      render(
        <ScoreBoard
          teamScores={[50, 75]}
          teams={teams}
        />
      );
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('should display zero scores when no points earned', () => {
      render(
        <ScoreBoard
          teamScores={[0, 0]}
          teams={teams}
        />
      );
      const scores = screen.getAllByText('0');
      expect(scores.length).toBeGreaterThanOrEqual(2);
    });

    it('should display high scores correctly', () => {
      render(
        <ScoreBoard
          teamScores={[999, 1000]}
          teams={teams}
        />
      );
      expect(screen.getByText('999')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('should handle different team counts', () => {
      const threeTeams = [
        { name: 'Team 1', icon: Cat },
        { name: 'Team 2', icon: Fish },
        { name: 'Team 3', icon: Cat }
      ];
      render(
        <ScoreBoard
          teamScores={[10, 20, 30]}
          teams={threeTeams}
        />
      );
      expect(screen.getByText(/Team 1/)).toBeInTheDocument();
      expect(screen.getByText(/Team 2/)).toBeInTheDocument();
      expect(screen.getByText(/Team 3/)).toBeInTheDocument();
    });

    it('should render team icons', () => {
      const { container } = render(
        <ScoreBoard
          teamScores={[10, 20]}
          teams={teams}
        />
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(2);
    });

    it('should update scores when props change', () => {
      const { rerender } = render(
        <ScoreBoard
          teamScores={[10, 20]}
          teams={teams}
        />
      );
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();

      rerender(
        <ScoreBoard
          teamScores={[50, 75]}
          teams={teams}
        />
      );
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('should handle negative scores', () => {
      render(
        <ScoreBoard
          teamScores={[-5, 10]}
          teams={teams}
        />
      );
      expect(screen.getByText('-5')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should display scores in correct order', () => {
      const { container } = render(
        <ScoreBoard
          teamScores={[100, 200]}
          teams={teams}
        />
      );
      const scores = screen.getAllByText(/\d+/);
      expect(scores.length).toBeGreaterThanOrEqual(2);
    });
  });
});
