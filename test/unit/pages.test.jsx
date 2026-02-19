import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../src/pages/Home';
import { GAME_TYPES } from '../../src/constants/gameConstants';

describe('Page Tests', () => {
  describe('Home Page', () => {
    it('should render the game selection title', () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      const title = screen.getByText('Choose Your Game');
      expect(title).toBeInTheDocument();
    });

    it('should render all game options', () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      expect(screen.getByText('Family Feud')).toBeInTheDocument();
      expect(screen.getByText('Would You Rather')).toBeInTheDocument();
      expect(screen.getByText('Spicy Couple')).toBeInTheDocument();
      expect(screen.getByText('Truth or Dare')).toBeInTheDocument();
      expect(screen.getByText('Never Have I Ever')).toBeInTheDocument();
      expect(screen.getByText('Movie Quotes')).toBeInTheDocument();
    });

    it('should render Start Game button', () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      const startButton = screen.getByRole('button', { name: /Start Game/i });
      expect(startButton).toBeInTheDocument();
    });

    it('should have Family Feud selected by default', () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      const familyFeudButton = screen.getByText('Family Feud').closest('button');
      expect(familyFeudButton).toHaveClass('bg-indigo-600');
    });

    it('should update selected game when clicking a game option', async () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      const wouldYouRatherButton = screen.getByText('Would You Rather').closest('button');
      
      await userEvent.click(wouldYouRatherButton);
      
      expect(wouldYouRatherButton).toHaveClass('bg-indigo-600');
    });

    it('should call onStart with selected game when Start Game is clicked', async () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      
      const wouldYouRatherButton = screen.getByText('Would You Rather').closest('button');
      await userEvent.click(wouldYouRatherButton);
      
      const startButton = screen.getByRole('button', { name: /Start Game/i });
      await userEvent.click(startButton);
      
      expect(mockOnStart).toHaveBeenCalledWith(GAME_TYPES.WOULD_YOU_RATHER);
    });

    it('should deselect previously selected game when selecting new game', async () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      
      const familyFeudButton = screen.getByText('Family Feud').closest('button');
      expect(familyFeudButton).toHaveClass('bg-indigo-600');
      
      const spicyCoupleButton = screen.getByText('Spicy Couple').closest('button');
      await userEvent.click(spicyCoupleButton);
      
      expect(familyFeudButton).not.toHaveClass('bg-indigo-600');
      expect(spicyCoupleButton).toHaveClass('bg-indigo-600');
    });

    it('should call onStart with Family Feud by default', async () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      
      const startButton = screen.getByRole('button', { name: /Start Game/i });
      await userEvent.click(startButton);
      
      expect(mockOnStart).toHaveBeenCalledWith(GAME_TYPES.FAMILY_FEUD);
    });

    it('should cycle through all game options', async () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      
      const games = [
        'Family Feud',
        'Would You Rather',
        'Spicy Couple',
        'Truth or Dare',
        'Never Have I Ever',
        'Movie Quotes'
      ];
      
      for (const game of games) {
        const button = screen.getByText(game).closest('button');
        await userEvent.click(button);
        expect(button).toHaveClass('bg-indigo-600');
      }
    });

    it('should have proper button styling for unselected games', () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      const wouldYouRatherButton = screen.getByText('Would You Rather').closest('button');
      expect(wouldYouRatherButton).toHaveClass('bg-slate-700');
    });

    it('should render icons for each game', () => {
      const mockOnStart = vi.fn();
      const { container } = render(<Home onStart={mockOnStart} />);
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(6);
    });

    it('should have proper container styling', () => {
      const mockOnStart = vi.fn();
      const { container } = render(<Home onStart={mockOnStart} />);
      const gameContainer = container.querySelector('.max-w-2xl');
      expect(gameContainer).toHaveClass('bg-slate-800');
      expect(gameContainer).toHaveClass('rounded-lg');
    });

    it('should maintain game selection across multiple clicks', async () => {
      const mockOnStart = vi.fn();
      render(<Home onStart={mockOnStart} />);
      
      const truthOrDareButton = screen.getByText('Truth or Dare').closest('button');
      await userEvent.click(truthOrDareButton);
      
      const spicyCoupleButton = screen.getByText('Spicy Couple').closest('button');
      await userEvent.click(spicyCoupleButton);
      
      expect(truthOrDareButton).not.toHaveClass('bg-indigo-600');
    });
  });
});
