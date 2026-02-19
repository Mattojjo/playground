import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeButton from './HomeButton';

describe('HomeButton Component', () => {
  const mockOnGoHome = vi.fn();

  beforeEach(() => {
    mockOnGoHome.mockClear();
  });

  it('should render a button', () => {
    render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render house icon', () => {
    const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should call onGoHome when clicked', async () => {
    render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockOnGoHome).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple clicks', async () => {
    render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    
    expect(mockOnGoHome).toHaveBeenCalledTimes(3);
  });

  it('should have proper styling classes', () => {
    const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = container.querySelector('button');
    
    expect(button).toHaveClass('bg-indigo-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('rounded-lg');
    expect(button).toHaveClass('font-bold');
  });

  it('should have hover effect styling', () => {
    const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = container.querySelector('button');
    
    expect(button).toHaveClass('hover:bg-indigo-700');
    expect(button).toHaveClass('hover:scale-125');
  });

  it('should have transition styling', () => {
    const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = container.querySelector('button');
    
    expect(button).toHaveClass('transition-all');
    expect(button).toHaveClass('duration-200');
  });

  it('should have absolute positioning', () => {
    const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = container.querySelector('button');
    
    expect(button).toHaveClass('absolute');
    expect(button).toHaveClass('top-7');
    expect(button).toHaveClass('left-6');
  });

  it('should have proper padding', () => {
    const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = container.querySelector('button');
    
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-1.5');
  });

  it('should render icon with proper classes', () => {
    const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
    const icon = container.querySelector('svg');
    
    expect(icon).toHaveClass('w-6');
    expect(icon).toHaveClass('h-6');
  });

  it('should render inline icon', () => {
    const { container } = render(<HomeButton onGoHome={mockOnGoHome} />);
    const icon = container.querySelector('svg');
    
    expect(icon).toHaveClass('inline-block');
  });

  it('should be clickable from keyboard', async () => {
    render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = screen.getByRole('button');
    
    button.focus();
    expect(button).toHaveFocus();
    
    await userEvent.keyboard('{Enter}');
    expect(mockOnGoHome).toHaveBeenCalled();
  });

  it('should respond to space key', async () => {
    render(<HomeButton onGoHome={mockOnGoHome} />);
    const button = screen.getByRole('button');
    
    button.focus();
    await userEvent.keyboard(' ');
    expect(mockOnGoHome).toHaveBeenCalled();
  });
});
