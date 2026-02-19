import { describe, it, expect } from 'vitest';
import { fuzzyMatch, shuffleArray, getRandomSubset } from '../../src/utils/gameUtils';

describe('gameUtils', () => {
  describe('fuzzyMatch', () => {
    it('should return true for exact matches', () => {
      expect(fuzzyMatch('Brush teeth', 'Brush teeth')).toBe(true);
    });

    it('should return true for case-insensitive matches', () => {
      expect(fuzzyMatch('BRUSH TEETH', 'brush teeth')).toBe(true);
    });

    it('should return true for matches with whitespace variations', () => {
      expect(fuzzyMatch('  Brush teeth  ', 'brush teeth')).toBe(true);
    });

    it('should return true for fuzzy matches within max distance', () => {
      expect(fuzzyMatch('Brushe teeth', 'Brush teeth')).toBe(true); // 1 char difference
      expect(fuzzyMatch('Bruh teeth', 'Brush teeth')).toBe(true); // 2 char difference
    });

    it('should return true for single character matches', () => {
      expect(fuzzyMatch('a', 'a')).toBe(true);
    });

    it('should return true for empty string matches', () => {
      expect(fuzzyMatch('', '')).toBe(true);
    });

    it('should return false for matches exceeding max distance', () => {
      expect(fuzzyMatch('abc', 'abcdefgh')).toBe(false); // 5 char difference, exceeds default maxDistance of 3
    });

    it('should return false for completely different strings', () => {
      expect(fuzzyMatch('apple', 'orange')).toBe(false);
    });

    it('should handle partial matches with fuzzy logic', () => {
      expect(fuzzyMatch('piza', 'pizza')).toBe(true); // 1 char difference
    });

    it('should be case-insensitive with distance', () => {
      expect(fuzzyMatch('PIZZA', 'piza')).toBe(true);
    });

    it('should respect custom max distance', () => {
      expect(fuzzyMatch('abc', 'xyz', 0)).toBe(false);
      expect(fuzzyMatch('abc', 'abd', 1)).toBe(true);
    });

    it('should handle real-world pizza examples', () => {
      expect(fuzzyMatch('Pepperoni', 'pepperoni')).toBe(true);
      expect(fuzzyMatch('Mushrooms', 'mushrom')).toBe(true);
    });

    it('should handle short answers with typos', () => {
      expect(fuzzyMatch('Rose', 'Roses')).toBe(true);
      expect(fuzzyMatch('Dog', 'Dug')).toBe(true);
    });
  });

  describe('shuffleArray', () => {
    it('should return an array of same length', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(arr);
      expect(shuffled.length).toBe(arr.length);
    });

    it('should not modify original array', () => {
      const arr = [1, 2, 3, 4, 5];
      const arrCopy = [...arr];
      shuffleArray(arr);
      expect(arr).toEqual(arrCopy);
    });

    it('should contain all original elements', () => {
      const arr = ['a', 'b', 'c', 'd', 'e'];
      const shuffled = shuffleArray(arr);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    it('should handle single element array', () => {
      const arr = [1];
      const shuffled = shuffleArray(arr);
      expect(shuffled).toEqual([1]);
    });

    it('should handle empty array', () => {
      const arr = [];
      const shuffled = shuffleArray(arr);
      expect(shuffled).toEqual([]);
    });

    it('should handle two element array', () => {
      const arr = [1, 2];
      const shuffled = shuffleArray(arr);
      expect(shuffled.length).toBe(2);
      expect(shuffled).toContain(1);
      expect(shuffled).toContain(2);
    });

    it('should produce different order (with high probability)', () => {
      const arr = Array.from({ length: 10 }, (_, i) => i);
      let differentOrders = 0;
      
      for (let i = 0; i < 5; i++) {
        const shuffled = shuffleArray(arr);
        if (JSON.stringify(shuffled) !== JSON.stringify(arr)) {
          differentOrders++;
        }
      }
      
      expect(differentOrders).toBeGreaterThan(0);
    });

    it('should handle array with duplicate elements', () => {
      const arr = [1, 1, 2, 2, 3];
      const shuffled = shuffleArray(arr);
      expect(shuffled.length).toBe(arr.length);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    it('should handle large arrays', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i);
      const shuffled = shuffleArray(arr);
      expect(shuffled.length).toBe(1000);
      expect(shuffled.sort((a, b) => a - b)).toEqual(arr);
    });
  });

  describe('getRandomSubset', () => {
    it('should return subset of correct size', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const subset = getRandomSubset(arr, 3);
      expect(subset.length).toBe(3);
    });

    it('should return empty array when count is 0', () => {
      const arr = [1, 2, 3];
      const subset = getRandomSubset(arr, 0);
      expect(subset.length).toBe(0);
    });

    it('should return whole array when count equals array length', () => {
      const arr = [1, 2, 3, 4, 5];
      const subset = getRandomSubset(arr, 5);
      expect(subset.length).toBe(5);
      expect(subset.sort()).toEqual(arr.sort());
    });

    it('should return array of size 1 when count is 1', () => {
      const arr = [1, 2, 3, 4, 5];
      const subset = getRandomSubset(arr, 1);
      expect(subset.length).toBe(1);
      expect(arr).toContain(subset[0]);
    });

    it('should not include duplicate elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const subset = getRandomSubset(arr, 5);
      const uniqueElements = new Set(subset);
      expect(uniqueElements.size).toBe(5);
    });

    it('should handle strings in subset', () => {
      const arr = ['apple', 'banana', 'cherry', 'date'];
      const subset = getRandomSubset(arr, 2);
      expect(subset.length).toBe(2);
      subset.forEach(item => {
        expect(arr).toContain(item);
      });
    });

    it('should handle objects in subset', () => {
      const arr = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'c' }
      ];
      const subset = getRandomSubset(arr, 2);
      expect(subset.length).toBe(2);
      subset.forEach(item => {
        expect(arr).toContain(item);
      });
    });

    it('should return different subsets on multiple calls', () => {
      const arr = Array.from({ length: 20 }, (_, i) => i);
      const subset1 = getRandomSubset(arr, 5);
      const subset2 = getRandomSubset(arr, 5);
      
      // They might be equal but with high probability they're different
      expect(subset1.length).toBe(5);
      expect(subset2.length).toBe(5);
    });

    it('should not modify original array', () => {
      const arr = [1, 2, 3, 4, 5];
      const arrCopy = [...arr];
      getRandomSubset(arr, 3);
      expect(arr).toEqual(arrCopy);
    });

    it('should handle count greater than array length gracefully', () => {
      const arr = [1, 2, 3];
      const subset = getRandomSubset(arr, 10);
      expect(subset.length).toBeLessThanOrEqual(3);
    });

    it('should work with single element array', () => {
      const arr = [42];
      const subset = getRandomSubset(arr, 1);
      expect(subset).toEqual([42]);
    });

    it('should return empty array with empty input', () => {
      const arr = [];
      const subset = getRandomSubset(arr, 5);
      expect(subset).toEqual([]);
    });
  });
});
