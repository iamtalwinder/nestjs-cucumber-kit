export class GqlErrorFormatter {
  public static formatError(error: any): any {
    return {
      message: error.extensions?.originalError?.message || error.message,
      statusCode: error.extensions?.originalError?.statusCode,
      error: error.extensions?.originalError?.error,
      path: error.path,
    };
  }
}
