import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TeamSelector from './TeamSelector';
import { Cat, Fish } from 'lucide-react';

describe('TeamSelector Component', () => {
  const mockOnNextTeam = vi.fn();
  const teams = [
    { name: 'Cats', icon: Cat },
    { name: 'Fish', icon: Fish }
  ];

  beforeEach(() => {
    mockOnNextTeam.mockClear();
  });

  it('should render "Current Team:" label', () => {
    render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    expect(screen.getByText('Current Team:')).toBeInTheDocument();
  });

  it('should display the current team name', () => {
    render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    expect(screen.getByText('Cats')).toBeInTheDocument();
  });

  it('should display the other team name when currentTeam is 1', () => {
    render(
      <TeamSelector
        teams={teams}
        currentTeam={1}
        onNextTeam={mockOnNextTeam}
      />
    );
    expect(screen.getByText('Fish')).toBeInTheDocument();
  });

  it('should render Next Team button', () => {
    render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    const button = screen.getByRole('button', { name: /Next Team/i });
    expect(button).toBeInTheDocument();
  });

  it('should call onNextTeam when button is clicked', async () => {
    render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    const button = screen.getByRole('button', { name: /Next Team/i });
    await userEvent.click(button);
    expect(mockOnNextTeam).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple button clicks', async () => {
    render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    const button = screen.getByRole('button', { name: /Next Team/i });
    
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    
    expect(mockOnNextTeam).toHaveBeenCalledTimes(3);
  });

  it('should have proper styling for the container', () => {
    const { container } = render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    const containerDiv = container.querySelector('.bg-slate-700');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('rounded-4xl');
    expect(containerDiv).toHaveClass('p-4');
  });

  it('should render team icon', () => {
    const { container } = render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should have proper team name styling', () => {
    const { container } = render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    const teamName = container.querySelector('.text-red-400');
    expect(teamName).toBeInTheDocument();
  });

  it('should have proper button styling', () => {
    const { container } = render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-indigo-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('rounded-4xl');
  });

  it('should handle teams with different names', () => {
    const customTeams = [
      { name: 'Team Alpha', icon: Cat },
      { name: 'Team Beta', icon: Fish }
    ];
    render(
      <TeamSelector
        teams={customTeams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    expect(screen.getByText('Team Alpha')).toBeInTheDocument();
  });

  it('should handle switching between teams', async () => {
    const { rerender } = render(
      <TeamSelector
        teams={teams}
        currentTeam={0}
        onNextTeam={mockOnNextTeam}
      />
    );
    expect(screen.getByText('Cats')).toBeInTheDocument();
    
    rerender(
      <TeamSelector
        teams={teams}
        currentTeam={1}
        onNextTeam={mockOnNextTeam}
      />
    );
    expect(screen.getByText('Fish')).toBeInTheDocument();
  });
});
