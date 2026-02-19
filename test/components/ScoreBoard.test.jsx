import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoreBoard from '../../src/components/ScoreBoard';
import { Cat, Fish } from 'lucide-react';

describe('ScoreBoard Component', () => {
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

  it('should have proper container styling', () => {
    const { container } = render(
      <ScoreBoard
        teamScores={[10, 20]}
        teams={teams}
      />
    );
    const scoreboardDiv = container.querySelector('.bg-slate-700');
    expect(scoreboardDiv).toBeInTheDocument();
    expect(scoreboardDiv).toHaveClass('rounded-4xl');
  });

  it('should display scores in orange color', () => {
    const { container } = render(
      <ScoreBoard
        teamScores={[50, 75]}
        teams={teams}
      />
    );
    const orangeScores = container.querySelectorAll('.text-orange-500');
    expect(orangeScores.length).toBeGreaterThanOrEqual(2);
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
        teamScores={[100, 200]}
        teams={teams}
      />
    );
    
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('should handle equal scores', () => {
    render(
      <ScoreBoard
        teamScores={[50, 50]}
        teams={teams}
      />
    );
    const fifties = screen.getAllByText('50');
    expect(fifties.length).toBe(2);
  });

  it('should handle winning score difference', () => {
    render(
      <ScoreBoard
        teamScores={[100, 10]}
        teams={teams}
      />
    );
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
