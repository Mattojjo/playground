import React from 'react';

const TeamSelector = ({ teams, currentTeam, onNextTeam }) => (
  <div className="team-selector">
    <h4 className="team-selector-title">
      Current Team:
      <span className="team-selector-current">
        {teams[currentTeam].icon && (
          <img
            src={teams[currentTeam].icon}
            alt={teams[currentTeam].name}
            className="team-selector-icon"
            style={{ width: '32px', height: '32px' }}
          />
        )}
        {teams[currentTeam].name}
      </span>
    </h4>
    <button className="team-selector-next" onClick={onNextTeam}>
      Next Team
    </button>
  </div>
);

export default TeamSelector;
