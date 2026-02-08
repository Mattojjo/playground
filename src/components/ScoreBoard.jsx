import React from 'react';

const ScoreBoard = ({ teamScores, teams }) => (
  <div className="bg-slate-700 rounded-4xl p-4 mb-4">
    <h3 className="text-xl text-white font-bold mb-2">Scores</h3>
    <div className="flex gap-8 justify-center md:gap-32">
      {teamScores.map((score, idx) => {
        const Icon = teams[idx].icon;
        return (
          <div key={idx} className="flex items-center gap-2">
            <Icon className="w-8 h-8 rounded-4xl" />
            <span className="font-semibold text-white">{teams[idx].name}: <span className="font-bold text-orange-500 text-xl">{score}</span></span>
          </div>
        );
      })}
    </div>
  </div>
);

export default ScoreBoard;
