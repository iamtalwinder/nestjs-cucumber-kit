import { DeepPartialMatcher } from '../deep-partial-matcher';

describe('DeepPartialMatcher', () => {
  describe('containsPartialDeep', () => {
    it('should match an object with the same structure', () => {
      const actual = { id: '1', name: 'test' };
      const expected = { id: '1', name: 'test' };
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).not.toThrow();
    });

    it('should match an object with additional properties', () => {
      const actual = { id: '1', name: 'test', extra: 'field' };
      const expected = { id: '1', name: 'test' };
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).not.toThrow();
    });

    it('should throw an error for non-matching objects', () => {
      const actual = { id: '2' };
      const expected = { id: '1' };
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).toThrow();
    });

    it('should match arrays of objects', () => {
      const actual = [{ id: '1', name: 'test' }];
      const expected = [{ id: '1' }];
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).not.toThrow();
    });

    it('should throw an error for non-matching arrays', () => {
      const actual = [{ id: '2', name: 'test' }];
      const expected = [{ id: '1' }];
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).toThrow();
    });

    it('should handle nested objects', () => {
      const actual = { id: '1', details: { age: 30, city: 'New York' } };
      const expected = { id: '1', details: { age: 30 } };
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).not.toThrow();
    });

    it('should match with a wildcard for dynamic values', () => {
      const actual = { id: '123', name: 'test' };
      const expected = { id: '*', name: 'test' };
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).not.toThrow();
    });

    it('should match nested objects with a wildcard', () => {
      const actual = { id: '1', details: { age: 30, city: 'New York' } };
      const expected = { id: '1', details: { age: '*', city: 'New York' } };
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).not.toThrow();
    });

    it('should match in arrays with a wildcard', () => {
      const actual = [
        { id: '1', name: 'test' },
        { id: '2', name: 'example' },
      ];
      const expected = [{ id: '*', name: 'test' }];
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).not.toThrow();
    });

    it('should throw an error for non-matching arrays with a wildcard', () => {
      const actual = [{ id: '2', name: 'example' }];
      const expected = [{ id: '*', name: 'test' }];
      expect(() => DeepPartialMatcher.containsPartialDeep(actual, expected)).toThrow();
    });
  });
});
