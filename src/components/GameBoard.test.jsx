import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameBoard from './GameBoard';

describe('GameBoard Component', () => {
  const mockOnAnswerSubmit = vi.fn();
  const mockQuestion = 'Name a popular pizza topping';
  const mockAnswers = [
    { text: 'Pepperoni', points: 40 },
    { text: 'Mushrooms', points: 20 },
    { text: 'Sausage', points: 15 }
  ];

  beforeEach(() => {
    mockOnAnswerSubmit.mockClear();
  });

  it('should render the question', () => {
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
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should render all answers as hidden initially', () => {
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    const hiddenAnswers = screen.getAllByText('???');
    expect(hiddenAnswers.length).toBe(3);
  });

  it('should call onAnswerSubmit when Submit is clicked', async () => {
    mockOnAnswerSubmit.mockReturnValue({ correct: true, feedback: 'Correct!' });
    
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const input = screen.getByPlaceholderText('Type your answer...');
    await userEvent.type(input, 'Pepperoni');
    
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
    
    expect(mockOnAnswerSubmit).toHaveBeenCalledWith('Pepperoni');
  });

  it('should clear input after submission', async () => {
    mockOnAnswerSubmit.mockReturnValue({ correct: true, feedback: 'Correct!' });
    
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const input = screen.getByPlaceholderText('Type your answer...');
    await userEvent.type(input, 'Pepperoni');
    
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('should display feedback message on correct answer', async () => {
    const feedbackMsg = 'Correct! "Pepperoni" (+40 points)';
    mockOnAnswerSubmit.mockReturnValue({ correct: true, feedback: feedbackMsg });
    
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const input = screen.getByPlaceholderText('Type your answer...');
    await userEvent.type(input, 'Pepperoni');
    
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(feedbackMsg)).toBeInTheDocument();
    });
  });

  it('should display feedback message on wrong answer', async () => {
    const feedbackMsg = 'No match. Turn passes to the other team!';
    mockOnAnswerSubmit.mockReturnValue({ correct: false, feedback: feedbackMsg });
    
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const input = screen.getByPlaceholderText('Type your answer...');
    await userEvent.type(input, 'Wrong answer');
    
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(feedbackMsg)).toBeInTheDocument();
    });
  });

  it('should show revealed answers with points', () => {
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[0, 1]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    expect(screen.getByText('Pepperoni (40)')).toBeInTheDocument();
    expect(screen.getByText('Mushrooms (20)')).toBeInTheDocument();
    expect(screen.getByText('???')).toBeInTheDocument();
  });

  it('should disable input when all answers are revealed', () => {
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[0, 1, 2]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const input = screen.getByPlaceholderText('Type your answer...');
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    
    expect(input).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it('should disable input during wrong answer animation', async () => {
    mockOnAnswerSubmit.mockReturnValue({ 
      correct: false, 
      feedback: 'Wrong answer' 
    });
    
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const input = screen.getByPlaceholderText('Type your answer...');
    await userEvent.type(input, 'Wrong');
    
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
    
    // Input should be disabled during animation
    await waitFor(() => {
      expect(input).toBeDisabled();
    });
  });

  it('should have proper styling for revealed answers', () => {
    const { container } = render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[0]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const revealedItem = container.querySelector('li.bg-green-900');
    expect(revealedItem).toBeInTheDocument();
  });

  it('should have proper styling for hidden answers', () => {
    const { container } = render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const hiddenItem = container.querySelector('li.bg-gray-700');
    expect(hiddenItem).toBeInTheDocument();
  });

  it('should handle empty answers array', () => {
    const { container } = render(
      <GameBoard
        question={mockQuestion}
        answers={[]}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const list = container.querySelector('ul');
    expect(list.children.length).toBe(0);
  });

  it('should handle large number of answers', () => {
    const manyAnswers = Array.from({ length: 10 }, (_, i) => ({
      text: `Answer ${i + 1}`,
      points: (i + 1) * 10
    }));
    
    render(
      <GameBoard
        question={mockQuestion}
        answers={manyAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const hiddenAnswers = screen.getAllByText('???');
    expect(hiddenAnswers.length).toBe(10);
  });

  it('should prevent form submission with Enter key', async () => {
    mockOnAnswerSubmit.mockReturnValue({ correct: true, feedback: 'Correct!' });
    
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
    
    expect(mockOnAnswerSubmit).toHaveBeenCalled();
  });

  it('should accept multiple sequential submissions', async () => {
    mockOnAnswerSubmit.mockReturnValue({ correct: true, feedback: 'Correct!' });
    
    render(
      <GameBoard
        question={mockQuestion}
        answers={mockAnswers}
        revealedAnswers={[]}
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const input = screen.getByPlaceholderText('Type your answer...');
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    
    await userEvent.type(input, 'Pepperoni');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
    
    await userEvent.type(input, 'Mushrooms');
    await userEvent.click(submitButton);
    
    expect(mockOnAnswerSubmit).toHaveBeenCalledTimes(2);
  });
});
