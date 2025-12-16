/**
 * Utility functions for string matching and validation
 */

/**
 * Fuzzy match function: returns true if two strings are similar enough
 * Uses Levenshtein distance algorithm to allow for minor misspellings
 * @param {string} input - The input string to match
 * @param {string} answer - The target string to match against
 * @param {number} maxDistance - Maximum allowed edit distance (default: 3)
 * @returns {boolean} - True if strings are similar enough
 */
export function fuzzyMatch(input, answer, maxDistance = 3) {
  const a = input.trim().toLowerCase();
  const b = answer.trim().toLowerCase();
  
  if (a === b) return true;
  
  // Calculate Levenshtein distance
  function levenshtein(s, t) {
    const d = [];
    for (let i = 0; i <= s.length; i++) d[i] = [i];
    for (let j = 0; j <= t.length; j++) d[0][j] = j;
    
    for (let i = 1; i <= s.length; i++) {
      for (let j = 1; j <= t.length; j++) {
        d[i][j] = Math.min(
          d[i - 1][j] + 1,
          d[i][j - 1] + 1,
          d[i - 1][j - 1] + (s[i - 1] === t[j - 1] ? 0 : 1)
        );
      }
    }
    return d[s.length][t.length];
  }
  
  return levenshtein(a, b) <= maxDistance;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get a random subset of items from an array
 * @param {Array} array - Source array
 * @param {number} count - Number of items to select
 * @returns {Array} - Random subset
 */
export function getRandomSubset(array, count) {
  return shuffleArray(array).slice(0, count);
}