import React, { useState } from 'react';
import Home from './pages/Home';
import FamilyFeud from './games/family-feud/FamilyFeud';
import WouldYouRather from './games/would-you-rather/WouldYouRather';
import SpicyCouple from './games/spicy-couple/SpicyCouple';
import TruthOrDare from './games/truth-or-dare/TruthOrDare';
import NeverHaveIEver from './games/never-have-i-ever/NeverHaveIEver';
import MovieQuotes from './games/movie-quotes/MovieQuotes';
import { GAME_TYPES } from './constants/gameConstants';
import HomeButton from './components/HomeButton';
import './App.css';
import './styles/animations.css';

function App() {
  const [started, setStarted] = useState(false);
  const [selectedGame, setSelectedGame] = useState(GAME_TYPES.FAMILY_FEUD);

  const handleStart = (gameType) => {
    setSelectedGame(gameType);
    setStarted(true);
  };

  const handleGoHome = () => {
    setStarted(false);
    setSelectedGame(GAME_TYPES.FAMILY_FEUD);
  };

  return (
    <div className="App">
      <header className="site-header">
        <div className="site-brand">
          <svg className="brand-mark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" opacity="0.12" />
            <path d="M6 10h12v4H6z" fill="currentColor" />
          </svg>
          <h1 className="site-title">PartyPlay</h1>
        </div>
      </header>

      {!started ? (
        <Home onStart={handleStart} />
      ) : (
        <>
          <HomeButton onGoHome={handleGoHome} />
          {selectedGame === GAME_TYPES.FAMILY_FEUD && <FamilyFeud onGoHome={handleGoHome} />}
          {selectedGame === GAME_TYPES.WOULD_YOU_RATHER && <WouldYouRather onGoHome={handleGoHome} />}
          {selectedGame === GAME_TYPES.SPICY_COUPLE && <SpicyCouple onGoHome={handleGoHome} />}
          {selectedGame === GAME_TYPES.TRUTH_OR_DARE && <TruthOrDare onGoHome={handleGoHome} />}
          {selectedGame === GAME_TYPES.NEVER_HAVE_I_EVER && <NeverHaveIEver onGoHome={handleGoHome} />}
          {selectedGame === GAME_TYPES.MOVIE_QUOTES && <MovieQuotes onGoHome={handleGoHome} />}
        </>
      )}
    </div>
  );
}

export default App;
