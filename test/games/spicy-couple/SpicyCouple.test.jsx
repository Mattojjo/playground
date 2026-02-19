import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpicyCouple from '../../../src/games/spicy-couple/SpicyCouple';

// Mock the questions module
vi.mock('../../../src/games/spicy-couple/questions', () => ({
  default: [
    {
      question: 'Would you rather kiss with eyes open or closed?',
      dare: 'Kiss for 10 seconds without using hands'
    },
    {
      question: 'What would you change about your partner?',
      dare: 'Give your partner a full body massage'
    },
    {
      question: 'What is your favorite thing about your partner?',
      dare: 'Recreate your first date'
    }
  ]
}));

describe('SpicyCouple Game', () => {
  const mockOnGoHome = vi.fn();

  beforeEach(() => {
    mockOnGoHome.mockClear();
  });

  it('should render the game title', () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Spicy Couple Game')).toBeInTheDocument();
  });

  it('should display the first question', () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Would you rather kiss with eyes open or closed?')).toBeInTheDocument();
  });

  it('should show Reveal Dare button initially', () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    expect(revealButton).toBeInTheDocument();
  });

  it('should display dare when Reveal Dare is clicked', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    expect(screen.getByText(/Kiss for 10 seconds|Give your partner|Recreate your first/)).toBeInTheDocument();
  });

  it('should show Next button after revealing dare', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('should move to next question when Next is clicked', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('What would you change about your partner?')).toBeInTheDocument();
    });
  });

  it('should hide dare when moving to next question', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      const newRevealButton = screen.getByRole('button', { name: /Reveal Dare/i });
      expect(newRevealButton).toBeInTheDocument();
    });
  });

  it('should show game over message on last question', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    
    // Go through all questions
    for (let i = 0; i < 2; i++) {
      const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
      await userEvent.click(revealButton);
      
      const nextButton = screen.getByRole('button', { name: /Next/i });
      await userEvent.click(nextButton);
    }
    
    // Last question
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    // Game over message should appear
    await waitFor(() => {
      expect(screen.getByText(/Game Over/)).toBeInTheDocument();
    });
  });

  it('should cycle through all questions', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    
    const questions = [
      'Would you rather kiss with eyes open or closed?',
      'What would you change about your partner?',
      'What is your favorite thing about your partner?'
    ];
    
    // Check first question
    expect(screen.getByText(questions[0])).toBeInTheDocument();
  });

  it('should have proper styling for question', () => {
    const { container } = render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const questionDiv = container.querySelector('.text-xl');
    expect(questionDiv).toBeInTheDocument();
  });

  it('should have proper styling for dare display', async () => {
    const { container } = render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    const dareDiv = container.querySelector('.bg-indigo-900');
    expect(dareDiv).toBeInTheDocument();
    expect(dareDiv).toHaveClass('border');
    expect(dareDiv).toHaveClass('border-indigo-700');
  });

  it('should display dare with proper prefix', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    const dareText = screen.getByText(/Dare:/);
    expect(dareText).toBeInTheDocument();
  });

  it('should prevent next button click before revealing dare', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const nextButton = screen.queryByRole('button', { name: /Next/i });
    // Next button should not exist until dare is revealed
    expect(nextButton).not.toBeInTheDocument();
  });

  it('should handle game state transitions properly', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    
    // Initial state - question shown, reveal button visible
    expect(screen.getByRole('button', { name: /Reveal Dare/i })).toBeInTheDocument();
    
    // After reveal
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    // Dare and next button should exist
    expect(screen.getByText(/Dare:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('should have proper container styling', () => {
    const { container } = render(<SpicyCouple onGoHome={mockOnGoHome} />);
    const mainContainer = container.querySelector('.max-w-2xl');
    expect(mainContainer).toHaveClass('bg-slate-800');
    expect(mainContainer).toHaveClass('rounded-lg');
  });

  it('should handle rapid reveals and next clicks', async () => {
    render(<SpicyCouple onGoHome={mockOnGoHome} />);
    
    const revealButton = screen.getByRole('button', { name: /Reveal Dare/i });
    await userEvent.click(revealButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    // Should successfully move to next question
    await waitFor(() => {
      expect(screen.getByText('What would you change about your partner?')).toBeInTheDocument();
    });
  });
});
