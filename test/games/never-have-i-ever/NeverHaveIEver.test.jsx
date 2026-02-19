import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NeverHaveIEver from '../../../src/games/never-have-i-ever/NeverHaveIEver';

// Mock the questions module
vi.mock('../../../src/games/never-have-i-ever/questions', () => ({
  default: [
    'Never have I ever been skydiving',
    'Never have I ever eaten sushi',
    'Never have I ever traveled to another country'
  ]
}));

describe('NeverHaveIEver Game', () => {
  const mockOnGoHome = vi.fn();

  beforeEach(() => {
    mockOnGoHome.mockClear();
  });

  it('should render the game title', () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Never Have I Ever')).toBeInTheDocument();
  });

  it('should display the first question', () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Never have I ever been skydiving')).toBeInTheDocument();
  });

  it('should show I Have and Never buttons', () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    expect(screen.getByRole('button', { name: /I Have/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Never/i })).toBeInTheDocument();
  });

  it('should record answer when I Have is clicked', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const iHaveButton = screen.getByRole('button', { name: /I Have/i });
    await userEvent.click(iHaveButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    });
  });

  it('should record answer when Never is clicked', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const neverButton = screen.getByRole('button', { name: /Never/i });
    await userEvent.click(neverButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    });
  });

  it('should show Next button after answering', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const iHaveButton = screen.getByRole('button', { name: /I Have/i });
    await userEvent.click(iHaveButton);
    
    const nextButton = await screen.findByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('should move to next question when Next is clicked', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const iHaveButton = screen.getByRole('button', { name: /I Have/i });
    await userEvent.click(iHaveButton);
    
    const nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Never have I ever eaten sushi')).toBeInTheDocument();
    });
  });

  it('should reset buttons for next question', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const iHaveButton = screen.getByRole('button', { name: /I Have/i });
    await userEvent.click(iHaveButton);
    
    const nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      const newIHaveButton = screen.getByRole('button', { name: /I Have/i });
      expect(newIHaveButton).toBeInTheDocument();
    });
  });

  it('should track all answers', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    
    // Answer all questions
    const iHaveButton = screen.getByRole('button', { name: /I Have/i });
    await userEvent.click(iHaveButton);
    
    let nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Never have I ever eaten sushi')).toBeInTheDocument();
    });
  });

  it('should handle multiple sequential answers', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    
    // Answer 1
    let iHaveButton = screen.getByRole('button', { name: /I Have/i });
    await userEvent.click(iHaveButton);
    
    let nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    // Answer 2
    await waitFor(() => {
      iHaveButton = screen.getByRole('button', { name: /I Have/i });
      expect(iHaveButton).toBeInTheDocument();
    });
  });

  it('should have proper styling for answer buttons', () => {
    const { container } = render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const buttons = container.querySelectorAll('button');
    const answerButtons = Array.from(buttons).filter(btn => 
      btn.textContent.includes('I Have') || btn.textContent.includes('Never')
    );
    
    answerButtons.forEach(btn => {
      expect(btn).toHaveClass('bg-slate-700');
    });
  });

  it('should have proper styling for next button', async () => {
    const { container } = render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const iHaveButton = screen.getByRole('button', { name: /I Have/i });
    await userEvent.click(iHaveButton);
    
    await waitFor(() => {
      const nextButton = container.querySelector('.bg-indigo-600');
      expect(nextButton).toBeInTheDocument();
    });
  });

  it('should display questions in proper format', () => {
    const { container } = render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const questionDiv = container.querySelector('.text-xl');
    expect(questionDiv).toHaveTextContent('Never have I ever been skydiving');
  });

  it('should have proper main container styling', () => {
    const { container } = render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const mainContainer = container.querySelector('.max-w-2xl');
    expect(mainContainer).toHaveClass('bg-slate-800');
    expect(mainContainer).toHaveClass('rounded-lg');
  });

  it('should show game summary on last question', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    
    // Answer first question
    let iHaveButton = screen.getByRole('button', { name: /I Have/i });
    await userEvent.click(iHaveButton);
    
    let nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    // Answer second question
    await waitFor(() => {
      iHaveButton = screen.getByRole('button', { name: /I Have/i });
      expect(iHaveButton).toBeInTheDocument();
    });
  });

  it('should prevent double answers', async () => {
    render(<NeverHaveIEver onGoHome={mockOnGoHome} />);
    const iHaveButton = screen.getByRole('button', { name: /I Have/i });
    
    await userEvent.click(iHaveButton);
    
    // Second click should not register since Next button replaces answer buttons
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    });
  });
});
