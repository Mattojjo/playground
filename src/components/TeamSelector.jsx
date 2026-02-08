import React from 'react';

const TeamSelector = ({ teams, currentTeam, onNextTeam }) => {
  const Icon = teams[currentTeam].icon;
  return (
    <div className="bg-slate-700 rounded-4xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-semibold text-white text-xl">Current Team:</span>
        <Icon className="w-8 h-8 rounded-4xl" />
        <span className="text-red-400 font-bold text-xl">{teams[currentTeam].name}</span>
      </div>
      <button className="ml-4 px-6 py-2 bg-indigo-600 text-white text-xl font-bold rounded-4xl hover:bg-indigo-700 md:ml-100" onClick={onNextTeam}>
        Next Team
      </button>
    </div>
  );
};

export default TeamSelector;
