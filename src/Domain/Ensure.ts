export default function ensure<T>(
  argument: T | undefined | null,
  message = 'This value was promised to be there.'
): T {
  if (argument === undefined || argument === null) {
    throwExpression(message);
  }

  return argument;
}

export function throwExpression(errorMessage: string): never {
  throw new Error(errorMessage);
}
