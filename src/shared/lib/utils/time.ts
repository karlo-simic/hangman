export const printTime = (ms: number): string => {
  // Calculate the total seconds from milliseconds
  const totalSeconds = Math.floor(ms / 1000);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Pad minutes and seconds with leading zeroes if necessary
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  // Return the formatted string
  return `${paddedMinutes}:${paddedSeconds}`;
};
