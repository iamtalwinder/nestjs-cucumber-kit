export class DeepPartialMatcher {
  static containsPartialDeep(actual, expected) {
    const match = this.isPartialDeepMatch(actual, expected);

    if (!match) {
      throw new Error(`Mismatch found. Actual object: ${JSON.stringify(actual)}`);
    }

    if (Array.isArray(expected)) {
      if (!Array.isArray(actual)) {
        throw new Error('Expected an array for deep partial matching.');
      }

      let arrayMatch = true;
      expected.forEach(expectedItem => {
        const matchingItem = actual.find(actualItem => this.isPartialDeepMatch(actualItem, expectedItem));
        if (!matchingItem) {
          arrayMatch = false;
        }
      });

      if (!arrayMatch) {
        throw new Error(`Array mismatch. Actual array: ${JSON.stringify(actual)}`);
      }
    }
  }

  static isPartialDeepMatch(obj, source) {
    return Object.keys(source).every(key => {
      if (source[key] === '*') {
        return true;
      }

      if (source[key] instanceof Object && obj[key] instanceof Object) {
        return this.isPartialDeepMatch(obj[key], source[key]);
      }
      return obj[key] === source[key];
    });
  }
}
