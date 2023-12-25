export class DeepPartialMatcher {
  static containsPartialDeep(actual, expected) {
    let match = false;

    if (actual instanceof Object && expected instanceof Object) {
      match = this.isPartialDeepMatch(actual, expected);
    } else {
      match = actual === expected;
    }

    if (!match) {
      const errorMessage = `Mismatch found! 
      Actual object: ${actual instanceof Object ? JSON.stringify(actual) : actual}
      Expected object: ${expected instanceof Object ? JSON.stringify(expected) : expected}
      `;
      throw new Error(errorMessage);
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
