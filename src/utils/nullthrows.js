// @flow

export default function nullthrows<T>(
  value: ?T,
  message?: string = 'Cannot be null or undefined',
): T {
  if (value != null) {
    return value;
  }

  throw new Error(message);
}
