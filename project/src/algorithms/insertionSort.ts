import { SortingConfig } from '../types/sorting';

export const insertionSort = async (config: SortingConfig): Promise<void> => {
  const { array, updateArray, updateSortingState, updateStats, speed, sleep } = config;
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    updateSortingState({
      currentIndices: [i],
      comparedIndices: [],
    });

    await sleep(speed);

    while (j >= 0 && array[j] > key) {
      updateSortingState({
        currentIndices: [i],
        comparedIndices: [j],
      });

      comparisons++;
      updateStats({ comparisons });

      await sleep(speed);

      array[j + 1] = array[j];
      swaps++;
      updateStats({ swaps });
      updateArray(array);
      j--;

      await sleep(speed);
    }

    array[j + 1] = key;
    updateArray(array);

    updateSortingState({
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      currentIndices: [],
      comparedIndices: [],
    });

    await sleep(speed);
  }

  // Mark all elements as sorted
  updateSortingState({
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    currentIndices: [],
    comparedIndices: [],
  });
};