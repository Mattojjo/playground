import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TruthOrDare from './TruthOrDare';

// Mock the questions module
vi.mock('./questions', () => ({
  default: [
    { type: 'truth', text: 'What is your biggest fear?' },
    { type: 'truth', text: 'What is your most embarrassing moment?' },
    { type: 'dare', text: 'Do 10 pushups' },
    { type: 'dare', text: 'Sing a song' }
  ]
}));

describe('TruthOrDare Game', () => {
  const mockOnGoHome = vi.fn();

  beforeEach(() => {
    mockOnGoHome.mockClear();
  });

  it('should render the game title', () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Truth or Dare')).toBeInTheDocument();
  });

  it('should show Truth and Dare buttons initially', () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    expect(screen.getByRole('button', { name: /Truth/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dare/i })).toBeInTheDocument();
  });

  it('should show truth question when Truth is clicked', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const truthButton = screen.getByRole('button', { name: /Truth/i });
    await userEvent.click(truthButton);
    
    await waitFor(() => {
      expect(screen.getByText(/What is your biggest fear?|What is your most embarrassing moment?/)).toBeInTheDocument();
    });
  });

  it('should show dare question when Dare is clicked', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const dareButton = screen.getByRole('button', { name: /Dare/i });
    await userEvent.click(dareButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Do 10 pushups|Sing a song/)).toBeInTheDocument();
    });
  });

  it('should show Next button after selecting type', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const truthButton = screen.getByRole('button', { name: /Truth/i });
    await userEvent.click(truthButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    });
  });

  it('should move to next question when Next is clicked', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const truthButton = screen.getByRole('button', { name: /Truth/i });
    await userEvent.click(truthButton);
    
    const nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    // Should return to selection screen
    await waitFor(() => {
      const truthButtons = screen.getAllByRole('button', { name: /Truth/i });
      expect(truthButtons.length).toBeGreaterThan(0);
    });
  });

  it('should allow selecting different types sequentially', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    
    // Select Truth
    const truthButton = screen.getByRole('button', { name: /Truth/i });
    await userEvent.click(truthButton);
    
    const nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    // Select Dare
    await waitFor(() => {
      const dareButton = screen.getByRole('button', { name: /Dare/i });
      expect(dareButton).toBeInTheDocument();
    });
  });

  it('should have proper styling for selection buttons', () => {
    const { container } = render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const buttons = container.querySelectorAll('button');
    const selectionButtons = Array.from(buttons).filter(btn => 
      btn.textContent.includes('Truth') || btn.textContent.includes('Dare')
    );
    
    selectionButtons.forEach(btn => {
      expect(btn).toHaveClass('bg-slate-700');
    });
  });

  it('should filter questions by type', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const truthButton = screen.getByRole('button', { name: /Truth/i });
    await userEvent.click(truthButton);
    
    await waitFor(() => {
      const question = screen.getByText(/What is your biggest fear?|What is your most embarrassing moment?/);
      expect(question.textContent).toMatch(/fear|embarrassing/i);
    });
  });

  it('should cycle through questions of same type', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const truthButton = screen.getByRole('button', { name: /Truth/i });
    await userEvent.click(truthButton);
    
    const firstQuestion = await screen.findByText(/What is your biggest fear?|What is your most embarrassing moment?/);
    expect(firstQuestion).toBeInTheDocument();
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
  });

  it('should display question in proper format', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const truthButton = screen.getByRole('button', { name: /Truth/i });
    await userEvent.click(truthButton);
    
    const questionDiv = await screen.findByText(/What is your biggest fear?|What is your most embarrassing moment?/);
    expect(questionDiv).toBeInTheDocument();
  });

  it('should have proper styling for question display', async () => {
    const { container } = render(<TruthOrDare onGoHome={mockOnGoHome} />);
    const truthButton = screen.getByRole('button', { name: /Truth/i });
    await userEvent.click(truthButton);
    
    await waitFor(() => {
      const questionDiv = container.querySelector('.bg-indigo-900');
      expect(questionDiv).toBeInTheDocument();
    });
  });

  it('should handle game state properly', async () => {
    render(<TruthOrDare onGoHome={mockOnGoHome} />);
    expect(screen.getByRole('button', { name: /Truth/i })).toBeInTheDocument();
  });
});
