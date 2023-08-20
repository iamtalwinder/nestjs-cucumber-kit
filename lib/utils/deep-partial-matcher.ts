export class DeepPartialMatcher {
  static containsPartialDeep(actual, expected) {
    if (Array.isArray(expected)) {
      if (!Array.isArray(actual)) {
        throw new Error('Expected an array for deep partial matching.');
      }
      expected.forEach(expectedItem => {
        const matchingItem = actual.find(actualItem => this.isPartialDeepMatch(actualItem, expectedItem));
        if (!matchingItem) {
          throw new Error(`Expected item not found: ${JSON.stringify(expectedItem)}`);
        }
      });
    } else if (expected instanceof Object) {
      if (!this.isPartialDeepMatch(actual, expected)) {
        throw new Error(`Expected object not found: ${JSON.stringify(expected)}`);
      }
    } else {
      throw new Error('Invalid type for deep partial matching.');
    }
  }

  static isPartialDeepMatch(obj, source) {
    return Object.keys(source).every(key => {
      if (source[key] instanceof Object && obj[key] instanceof Object) {
        return this.isPartialDeepMatch(obj[key], source[key]);
      }
      return obj[key] === source[key];
    });
  }
}
