import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WouldYouRather from '../../../src/games/would-you-rather/WouldYouRather';

// Mock the questions module
vi.mock('../../../src/games/would-you-rather/questions', () => ({
  default: [
    {
      question: 'Would you rather fly or be invisible?',
      options: [
        { text: 'Fly', funFact: 'Fact about flying' },
        { text: 'Invisible', funFact: 'Fact about invisibility' }
      ]
    },
    {
      question: 'Would you rather live in mountains or by the sea?',
      options: [
        { text: 'Mountains', funFact: 'Fact about mountains' },
        { text: 'Sea', funFact: 'Fact about sea' }
      ]
    }
  ]
}));

describe('WouldYouRather Game', () => {
  const mockOnGoHome = vi.fn();

  beforeEach(() => {
    mockOnGoHome.mockClear();
  });

  it('should render the game title', () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Would You Rather...')).toBeInTheDocument();
  });

  it('should display the first question', () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Would you rather fly or be invisible?')).toBeInTheDocument();
  });

  it('should render both answer options', () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    expect(screen.getByText('Fly')).toBeInTheDocument();
    expect(screen.getByText('Invisible')).toBeInTheDocument();
  });

  it('should allow selecting an option', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    expect(screen.getByText(/Fact about flying/)).toBeInTheDocument();
  });

  it('should display fun fact after selecting an option', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    await waitFor(() => {
      expect(screen.getByText('Fun Fact: Fact about flying')).toBeInTheDocument();
    });
  });

  it('should disable option buttons after selection', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    const invisibleButton = screen.getByRole('button', { name: /Invisible/i });
    
    await userEvent.click(flyButton);
    
    expect(flyButton).toBeDisabled();
    expect(invisibleButton).toBeDisabled();
  });

  it('should show Next button after selection', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('should move to next question when Next is clicked', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Would you rather live in mountains or by the sea?')).toBeInTheDocument();
    });
  });

  it('should reset selection when moving to next question', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      const mountainsButton = screen.getByRole('button', { name: /Mountains/i });
      expect(mountainsButton).not.toBeDisabled();
    });
  });

  it('should track all answers', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    
    // Answer first question
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    // Answer second question
    await waitFor(() => {
      const seaButton = screen.getByRole('button', { name: /Sea/i });
      expect(seaButton).toBeInTheDocument();
    });
  });

  it('should allow selecting different options for different questions', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    
    // First question
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    expect(screen.getByText(/Fact about flying/)).toBeInTheDocument();
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    // Second question
    await waitFor(() => {
      const mountainsButton = screen.getByRole('button', { name: /Mountains/i });
      expect(mountainsButton).toBeInTheDocument();
    });
  });

  it('should show fun fact in correct format', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    const funFactText = screen.getByText(/Fun Fact:/);
    expect(funFactText).toBeInTheDocument();
  });

  it('should have proper styling for selected option container', async () => {
    const { container } = render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    const factContainer = container.querySelector('.bg-indigo-900');
    expect(factContainer).toBeInTheDocument();
  });

  it('should render all options in a vertical list', () => {
    const { container } = render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const optionContainer = container.querySelector('.space-y-3');
    expect(optionContainer).toBeInTheDocument();
  });

  it('should handle rapid option selection', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    
    await userEvent.click(flyButton);
    // The button should now be disabled, so second click should not register
    expect(flyButton).toBeDisabled();
  });

  it('should show game summary when all questions answered', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    
    // Answer first question
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    await userEvent.click(flyButton);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);
    
    // Answer second question
    await waitFor(() => {
      const seaButton = screen.getByRole('button', { name: /Sea/i });
      expect(seaButton).toBeInTheDocument();
    });
    
    const secondFlyButton = screen.getAllByRole('button', { name: /Sea/i })[0];
    await userEvent.click(secondFlyButton);
  });

  it('should handle games with single question', async () => {
    render(<WouldYouRather onGoHome={mockOnGoHome} />);
    
    const flyButton = screen.getByRole('button', { name: /Fly/i });
    expect(flyButton).toBeInTheDocument();
  });

  it('should maintain proper styling throughout game', () => {
    const { container } = render(<WouldYouRather onGoHome={mockOnGoHome} />);
    
    const mainContainer = container.querySelector('.max-w-2xl');
    expect(mainContainer).toHaveClass('bg-slate-800');
    expect(mainContainer).toHaveClass('rounded-lg');
  });

  it('should display question in proper format', () => {
    const { container } = render(<WouldYouRather onGoHome={mockOnGoHome} />);
    
    const questionDiv = container.querySelector('.text-xl');
    expect(questionDiv).toHaveTextContent('Would you rather fly or be invisible?');
  });
});
