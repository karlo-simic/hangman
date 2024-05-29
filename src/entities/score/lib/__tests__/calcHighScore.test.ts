import { describe, it, expect } from "vitest";

import { calcHighScore } from "../calcHighScore";

describe("calcHighScore", () => {
  it("should return 0 when time taken (T) is 0 to avoid division by zero", () => {
    expect(calcHighScore(10, 5, 2, 0)).toBe(0);
  });

  it("should return a higher score for fewer errors", () => {
    const scoreWithFewErrors = calcHighScore(10, 5, 1, 10);
    const scoreWithMoreErrors = calcHighScore(10, 5, 2, 10);
    expect(scoreWithFewErrors).toBeGreaterThan(scoreWithMoreErrors);
  });

  it("should return a higher score for more unique letters given the same number of errors", () => {
    const scoreWithMoreUniqueLetters = calcHighScore(10, 6, 2, 10);
    const scoreWithFewerUniqueLetters = calcHighScore(10, 5, 2, 10);
    expect(scoreWithMoreUniqueLetters).toBeGreaterThan(
      scoreWithFewerUniqueLetters
    );
  });

  it("should return a higher score for longer quotes given the same number of errors and unique letters", () => {
    const scoreWithLongerQuote = calcHighScore(12, 5, 2, 10);
    const scoreWithShorterQuote = calcHighScore(10, 5, 2, 10);
    expect(scoreWithLongerQuote).toBeGreaterThan(scoreWithShorterQuote);
  });

  it("should return a higher score for faster solutions given the same number of errors, unique letters, and quote length", () => {
    const scoreWithFasterSolution = calcHighScore(10, 5, 2, 8);
    const scoreWithSlowerSolution = calcHighScore(10, 5, 2, 10);
    expect(scoreWithFasterSolution).toBeGreaterThan(scoreWithSlowerSolution);
  });

  it("should handle large values correctly", () => {
    const score = calcHighScore(1000, 26, 0, 1);
    expect(score).toBeGreaterThan(0);
  });

  it("should return a consistent score for the same inputs", () => {
    const score1 = calcHighScore(10, 5, 2, 10);
    const score2 = calcHighScore(10, 5, 2, 10);
    expect(score1).toStrictEqual(score2);
  });
});
