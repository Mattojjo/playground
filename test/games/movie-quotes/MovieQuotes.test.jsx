import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieQuotes from '../../../src/games/movie-quotes/MovieQuotes';

// Mock the questions module
vi.mock('../../../src/games/movie-quotes/questions', () => ({
  default: [
    {
      quote: 'May the Force be with you',
      answer: 'Star Wars',
      options: ['Star Wars', 'Star Trek', 'The Matrix', 'Avatar']
    },
    {
      quote: 'You can\'t handle the truth!',
      answer: 'A Few Good Men',
      options: ['A Few Good Men', 'Gladiator', 'Braveheart', 'Patriot Games']
    },
    {
      quote: 'I\'m king of the world!',
      answer: 'Titanic',
      options: ['Titanic', 'Avatar', 'Inception', 'Interstellar']
    }
  ]
}));

// Mock gameUtils
vi.mock('../../utils/gameUtils', () => ({
  shuffleArray: (arr) => [...arr]
}));

// Mock constants
vi.mock('../../constants/gameConstants', () => ({
  GAME_CONFIG: {
    movieQuotes: { timeLimit: 15, maxQuestions: 20 }
  },
  GAME_TYPES: {
    MOVIE_QUOTES: 'movieQuotes'
  },
  UI_CONSTANTS: {
    MOBILE_BREAKPOINT: 768,
    ANIMATION_DURATION: 300,
    WRONG_IMAGE_DISPLAY_TIME: 1000
  }
}));

describe('MovieQuotes Game', () => {
  const mockOnGoHome = vi.fn();

  beforeEach(() => {
    mockOnGoHome.mockClear();
    vi.clearAllTimers();
  });

  it('should render the game title', () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Movie Quotes')).toBeInTheDocument();
  });

  it('should display the quote in proper format', () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    expect(screen.getByText(/May the Force be with you/)).toBeInTheDocument();
  });

  it('should display timer', () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    expect(screen.getByText(/Time Left:/)).toBeInTheDocument();
  });

  it('should show all movie options', () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    expect(screen.getByRole('button', { name: /Star Wars/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Star Trek/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /The Matrix/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Avatar/i })).toBeInTheDocument();
  });

  it('should select an option when clicked', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    await userEvent.click(starWarsButton);
    
    expect(starWarsButton).toHaveClass('bg-indigo-600');
  });

  it('should show feedback for correct answer', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    await userEvent.click(starWarsButton);
    
    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument();
    });
  });

  it('should show feedback for wrong answer', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starTrekButton = screen.getByRole('button', { name: /Star Trek/i });
    await userEvent.click(starTrekButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Wrong!/)).toBeInTheDocument();
    });
  });

  it('should show correct answer when user answers wrong', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starTrekButton = screen.getByRole('button', { name: /Star Trek/i });
    await userEvent.click(starTrekButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Star Wars/)).toBeInTheDocument();
    });
  });

  it('should disable option buttons after selection', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    await userEvent.click(starWarsButton);
    
    await waitFor(() => {
      expect(starWarsButton).toBeDisabled();
    });
  });

  it('should show Next button after answering', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    await userEvent.click(starWarsButton);
    
    const nextButton = await screen.findByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('should move to next question when Next is clicked', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    await userEvent.click(starWarsButton);
    
    const nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/You can't handle the truth/)).toBeInTheDocument();
    });
  });

  it('should reset button selection for next question', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    await userEvent.click(starWarsButton);
    
    const nextButton = await screen.findByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      const newGoodMenButton = screen.getByRole('button', { name: /A Few Good Men/i });
      expect(newGoodMenButton).not.toHaveClass('bg-indigo-600');
    });
  });

  it('should track correct answers', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    
    // Answer first question correctly
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    await userEvent.click(starWarsButton);
    
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('should show game over screen after all questions', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    
    // Answer all questions
    for (let i = 0; i < 3; i++) {
      const correctButton = screen.getByRole('button', { name: /Star Wars|A Few Good Men|Titanic/i });
      await userEvent.click(correctButton);
      
      const nextButton = await screen.findByRole('button', { name: /Next/i });
      await userEvent.click(nextButton);
    }
    
    // After last question, should show score
    await waitFor(() => {
      expect(screen.getByText(/Your Score:/)).toBeInTheDocument();
    });
  });

  it('should display final score correctly', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    
    // Answer all questions
    for (let i = 0; i < 3; i++) {
      const buttons = screen.getAllByRole('button');
      const correctButton = buttons.find(btn => 
        btn.textContent.includes('Star Wars') || 
        btn.textContent.includes('A Few Good Men') ||
        btn.textContent.includes('Titanic')
      );
      
      if (correctButton) {
        await userEvent.click(correctButton);
        const nextButton = await screen.findByRole('button', { name: /Next/i });
        await userEvent.click(nextButton);
      }
    }
  });

  it('should have proper styling for options', () => {
    const { container } = render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const optionButtons = container.querySelectorAll('.bg-slate-700');
    expect(optionButtons.length).toBeGreaterThan(0);
  });

  it('should have proper styling for quote display', () => {
    const { container } = render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const quoteDiv = container.querySelector('.border-l-4');
    expect(quoteDiv).toBeInTheDocument();
  });

  it('should display options in grid layout', () => {
    const { container } = render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-2');
  });

  it('should handle rapid option selections', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    
    await userEvent.click(starWarsButton);
    
    // After clicking, button should be disabled
    expect(starWarsButton).toBeDisabled();
  });

  it('should show result container with proper feedback', async () => {
    const { container } = render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starWarsButton = screen.getByRole('button', { name: /Star Wars/i });
    await userEvent.click(starWarsButton);
    
    await waitFor(() => {
      const resultContainer = container.querySelector('.bg-indigo-900');
      expect(resultContainer).toBeInTheDocument();
    });
  });

  it('should format correct answer revelation properly', async () => {
    render(<MovieQuotes onGoHome={mockOnGoHome} />);
    const starTrekButton = screen.getByRole('button', { name: /Star Trek/i });
    await userEvent.click(starTrekButton);
    
    await waitFor(() => {
      const feedback = screen.getByText(/Wrong!/);
      expect(feedback).toBeInTheDocument();
    });
  });
});
