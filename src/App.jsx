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
    <div className="min-h-screen p-4 text-center">
      <header className="bg-slate-800 rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-bold text-white">🎮 PartyPlay</h1>
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
