/**
 * Common constants used across game components
 */

// Game types
export const GAME_TYPES = {
  FAMILY_FEUD: 'familyFeud',
  WOULD_YOU_RATHER: 'wouldYouRather',
  SPICY_COUPLE: 'spicyCouple',
  TRUTH_OR_DARE: 'truthOrDare',
  NEVER_HAVE_I_EVER: 'neverHaveIEver',
  MOVIE_QUOTES: 'movieQuotes'
};

// Game configurations
export const GAME_CONFIG = {
  [GAME_TYPES.MOVIE_QUOTES]: {
    timeLimit: 15, // seconds
    maxQuestions: 20
  },
  [GAME_TYPES.WOULD_YOU_RATHER]: {
    maxQuestions: 20
  },
  [GAME_TYPES.TRUTH_OR_DARE]: {
    maxTruths: 20,
    maxDares: 20
  }
};

// Team configurations
export const TEAMS = {
  TOTORO: { name: 'Team Totoro', color: '#4f46e5' },
  PONYO: { name: 'Team Ponyo', color: '#06b6d4' }
};

// UI Constants
export const UI_CONSTANTS = {
  MOBILE_BREAKPOINT: 768,
  ANIMATION_DURATION: 300,
  WRONG_IMAGE_DISPLAY_TIME: 1000 // 1 second
};

// Color palette
export const COLORS = {
  primary: '#6366f1',
  secondary: '#374151',
  background: '#1e1e1e',
  surface: '#2d2d2d',
  text: {
    primary: '#f8fafc',
    secondary: '#d1d5db',
    accent: '#6366f1'
  },
  status: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b'
  }
};