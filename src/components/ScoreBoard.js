
import React from 'react';

// ScoreBoard displays the scores for each team
const ScoreBoard = ({ teamScores, teams }) => (
  <div className="score-board">
    <h3 className="score-board-title" style={ { fontSize: '1.7em' } }>Scores</h3>
    <div className="score-board-list">
      {teamScores.map((score, idx) => (
        <span key={idx} className="score-board-team">
          {teams[idx].icon && (
            <img
              src={teams[idx].icon}
              alt={teams[idx].name}
              className="score-board-icon"
              style={ { width: '32px', height: '32px' } }
            />
          )}
          {teams[idx].name}: {score}
        </span>
      ))}
    </div>
  </div>
);

export default ScoreBoard;
