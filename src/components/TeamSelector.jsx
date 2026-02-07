import React from 'react';

const TeamSelector = ({ teams, currentTeam, onNextTeam }) => (
  <div className="bg-slate-700 rounded-lg p-4 mb-4">
    <div className="flex items-center gap-2 mb-3">
      <span className="font-semibold">Current Team:</span>
      {teams[currentTeam].icon && (
        <img src={teams[currentTeam].icon} alt={teams[currentTeam].name} className="w-8 h-8" />
      )}
      <span className="text-indigo-400 font-bold">{teams[currentTeam].name}</span>
    </div>
    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" onClick={onNextTeam}>
      Next Team
    </button>
  </div>
);

export default TeamSelector;
