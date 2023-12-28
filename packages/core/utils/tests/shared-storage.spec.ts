import * as path from 'path';
import { SharedStorage } from '../shared-storage';

describe('SharedStorage', () => {
  beforeEach(() => {
    SharedStorage.clear();
  });

  describe('set and get methods', () => {
    it('should store and retrieve a value', () => {
      SharedStorage.set('testKey', 'testValue');
      expect(SharedStorage.get('testKey')).toBe('testValue');
    });
  });

  describe('clear method', () => {
    it('should clear all stored values', () => {
      SharedStorage.set('testKey', 'testValue');
      SharedStorage.clear();
      expect(SharedStorage.get('testKey')).toBeUndefined();
    });
  });

  describe('loadJsonFile method', () => {
    it('should load and store values from a JSON file', () => {
      const filePath = path.join(__dirname, 'data', 'test.json');

      SharedStorage.loadJsonFile(filePath);

      expect(SharedStorage.get('key1')).toBe('value1');
      expect(SharedStorage.get('key2')).toBe('value2');
    });
  });

  describe('replacePlaceholders method', () => {
    it('should replace placeholders with stored values', () => {
      SharedStorage.set('key1', 'value1');
      const result = SharedStorage.replacePlaceholders('This is a {{key1}}');
      expect(result).toBe('This is a value1');
    });

    it('should replace placeholders with nested stored values', () => {
      const filePath = path.join(__dirname, 'data', 'test.json');

      SharedStorage.loadJsonFile(filePath);
      const result = SharedStorage.replacePlaceholders('This is a {{key3[0].item}}');
      expect(result).toBe('This is a 1');
    });

    it('should throw an error for undefined keys', () => {
      expect(() => {
        SharedStorage.replacePlaceholders('This is a {{key2}}');
      }).toThrow();
    });
  });
});
