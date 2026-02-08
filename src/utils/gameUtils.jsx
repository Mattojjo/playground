export function fuzzyMatch(input, answer, maxDistance = 3) {
  const a = input.trim().toLowerCase();
  const b = answer.trim().toLowerCase();
  
  if (a === b) return true;
  
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

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomSubset(array, count) {
  return shuffleArray(array).slice(0, count);
}
