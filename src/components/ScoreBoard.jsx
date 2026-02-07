import React from 'react';

const ScoreBoard = ({ teamScores, teams }) => (
  <div className="bg-slate-700 rounded-lg p-4 mb-4">
    <h3 className="text-xl font-bold mb-2">Scores</h3>
    <div className="flex gap-4 justify-center">
      {teamScores.map((score, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {teams[idx].icon && (
            <img src={teams[idx].icon} alt={teams[idx].name} className="w-8 h-8" />
          )}
          <span className="font-semibold">{teams[idx].name}: {score}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ScoreBoard;
