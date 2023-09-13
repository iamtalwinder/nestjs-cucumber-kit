export class PathExtractor {
  static getValueFromPath(input: any, path: string) {
    if (typeof input !== 'object' || input === null) {
      throw new Error('Input must be a non-null object');
    }

    if (typeof path !== 'string' || path.trim() === '') {
      throw new Error('Path must be a non-empty string');
    }

    const pathSegments = path.split('.').reduce((segments, segment) => {
      // Split segments further if they contain array indices (e.g., data[0])
      if (segment.includes('[')) {
        const arraySegment = segment.replace(/\]/g, '').split('[');
        return segments.concat(arraySegment);
      }
      return segments.concat(segment);
    }, []);

    let value = input;
    for (let segment of pathSegments) {
      if (segment.match(/^\d+$/)) {
        // Check if segment is an array index
        segment = parseInt(segment, 10); // Convert index to an integer
      }

      value = value[segment];
      if (value === undefined) {
        throw new Error(`Path not found in input: ${path}`);
      }
    }
    return value;
  }
}
