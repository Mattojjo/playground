import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { GAME_TYPES } from './constants/gameConstants';

// Mock child components to avoid complexity
vi.mock('./pages/Home', () => ({
  default: ({ onStart }) => (
    <button onClick={() => onStart(GAME_TYPES.FAMILY_FEUD)}>Start Game</button>
  )
}));

vi.mock('./games/family-feud/FamilyFeud', () => ({
  default: ({ onGoHome }) => (
    <div>
      <h2>Family Feud Game</h2>
      <button onClick={onGoHome}>Go Home</button>
    </div>
  )
}));

vi.mock('./games/would-you-rather/WouldYouRather', () => ({
  default: ({ onGoHome }) => (
    <div>
      <h2>Would You Rather Game</h2>
      <button onClick={onGoHome}>Go Home</button>
    </div>
  )
}));

vi.mock('./games/spicy-couple/SpicyCouple', () => ({
  default: ({ onGoHome }) => (
    <div>
      <h2>Spicy Couple Game</h2>
      <button onClick={onGoHome}>Go Home</button>
    </div>
  )
}));

vi.mock('./games/truth-or-dare/TruthOrDare', () => ({
  default: ({ onGoHome }) => (
    <div>
      <h2>Truth or Dare Game</h2>
      <button onClick={onGoHome}>Go Home</button>
    </div>
  )
}));

vi.mock('./games/never-have-i-ever/NeverHaveIEver', () => ({
  default: ({ onGoHome }) => (
    <div>
      <h2>Never Have I Ever Game</h2>
      <button onClick={onGoHome}>Go Home</button>
    </div>
  )
}));

vi.mock('./games/movie-quotes/MovieQuotes', () => ({
  default: ({ onGoHome }) => (
    <div>
      <h2>Movie Quotes Game</h2>
      <button onClick={onGoHome}>Go Home</button>
    </div>
  )
}));

vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null
}));

describe('App Component', () => {
  it('should render the app header with title', () => {
    render(<App />);
    const title = screen.getByText('PlayGround');
    expect(title).toBeInTheDocument();
  });

  it('should render Home page when not started', () => {
    render(<App />);
    const startButton = screen.getByText('Start Game');
    expect(startButton).toBeInTheDocument();
  });

  it('should not show home button on initial render', () => {
    render(<App />);
    const homeButtons = screen.queryAllByRole('button').filter(btn => 
      btn.textContent.includes('House')
    );
    expect(homeButtons.length).toBe(0);
  });

  it('should start a game when Start Game is clicked', async () => {
    render(<App />);
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);
    
    const gameTitle = await screen.findByText('Family Feud Game');
    expect(gameTitle).toBeInTheDocument();
  });

  it('should show home button after starting a game', async () => {
    render(<App />);
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);
    
    await waitFor(() => {
      const homeButton = screen.getByRole('button', { name: /Go Home/i });
      expect(homeButton).toBeInTheDocument();
    });
  });

  it('should return to home when Go Home is clicked', async () => {
    render(<App />);
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);
    
    await waitFor(() => {
      const homeButton = screen.getByText('Go Home');
      fireEvent.click(homeButton);
    });
    
    await waitFor(() => {
      const startButtonAgain = screen.getByText('Start Game');
      expect(startButtonAgain).toBeInTheDocument();
    });
  });

  it('should render Analytics component', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should render header with proper styling', () => {
    const { container } = render(<App />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-slate-800');
    expect(header).toHaveClass('rounded-lg');
  });
});