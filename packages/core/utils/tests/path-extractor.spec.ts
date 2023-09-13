import { PathExtractor } from '../path-extractor';

describe('PathExtractor', () => {
  test('should extract a simple value', () => {
    const response = { key: 'value' };
    expect(PathExtractor.getValueFromPath(response, 'key')).toBe('value');
  });

  test('should extract a nested value', () => {
    const response = { outer: { inner: 'value' } };
    expect(PathExtractor.getValueFromPath(response, 'outer.inner')).toBe('value');
  });

  test('should extract a value from an array', () => {
    const response = { list: ['first', 'second'] };
    expect(PathExtractor.getValueFromPath(response, 'list[1]')).toBe('second');
  });

  test('should throw an error for invalid path', () => {
    const response = { key: 'value' };
    expect(() => {
      PathExtractor.getValueFromPath(response, 'nonexistent');
    }).toThrow('Path not found in input: nonexistent');
  });

  test('should throw an error for invalid response', () => {
    expect(() => {
      PathExtractor.getValueFromPath(null, 'key');
    }).toThrow('Input must be a non-null object');
  });

  test('should throw an error for invalid path argument', () => {
    const response = { key: 'value' };
    expect(() => {
      PathExtractor.getValueFromPath(response, '');
    }).toThrow('Path must be a non-empty string');
  });
});
