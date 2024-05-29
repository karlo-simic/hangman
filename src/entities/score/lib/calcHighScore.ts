/**
 * Calculates the high score for a Hangman game based on various factors.
 *
 * @param L - Length of the quote
 * @param U - Number of unique letters in the quote
 * @param E - Number of errors made while solving
 * @param T - Time taken to solve the quote
 * @returns A positive number representing the score. Higher numbers mean better scores.
 */
export const calcHighScore = (
  L: number,
  U: number,
  E: number,
  T: number
): number => {
  if (T === 0) {
    // Avoid division by zero
    return 0;
  }
  const scalingFactor = 100000;
  return Math.round((L * U * scalingFactor) / ((E + 1) * T));
};
