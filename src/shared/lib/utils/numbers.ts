/**
 * Returns a random integer within the specified range [min, max].
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random integer between min (inclusive) and max (inclusive).
 */
export const getRandomIntegerInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
