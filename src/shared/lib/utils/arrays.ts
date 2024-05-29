export const arePrimitiveArraysEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) return false;

  arr1.forEach((el, i) => {
    if (el !== arr2[i]) {
      return false;
    }
  });

  return true;
};
