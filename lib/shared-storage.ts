import * as fs from 'fs';

export class SharedStorage {
  private static storage: Record<string, any> = {};

  static set(key: string, value: any) {
    SharedStorage.storage[key] = value;
  }

  static get(key: string): any {
    return SharedStorage.storage[key];
  }

  static loadJsonFile(absolutePath: string): void {
    const fileContent = fs.readFileSync(absolutePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    Object.entries(jsonData).forEach(([key, value]) => {
      SharedStorage.set(key, value);
    });
  }

  static clear() {
    SharedStorage.storage = {};
  }

  static replacePlaceholders(text: string): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const value = SharedStorage.get(key);
      if (value === undefined) {
        throw new Error(`No value found in SharedStorage for key: ${key}`);
      }
      return value;
    });
  }
}
