import { SortingConfig } from '../types/sorting';
import { swap } from '../utils/helpers';

export const bubbleSort = async (config: SortingConfig): Promise<void> => {
  const { array, updateArray, updateSortingState, updateStats, speed, sleep } = config;
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight elements being compared
      updateSortingState({
        comparedIndices: [j, j + 1],
        currentIndices: [],
      });

      comparisons++;
      updateStats({ comparisons });

      await sleep(speed);

      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        swaps++;
        updateStats({ swaps });
        updateArray(array);
        await sleep(speed);
      }
    }
    
    // Mark the last element as sorted
    updateSortingState({
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
      comparedIndices: [],
    });
  }

  // Mark all elements as sorted
  updateSortingState({
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    comparedIndices: [],
    currentIndices: [],
  });
};