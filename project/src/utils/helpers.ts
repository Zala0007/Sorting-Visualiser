export const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 400) + 10);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const swap = (arr: number[], i: number, j: number): void => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};