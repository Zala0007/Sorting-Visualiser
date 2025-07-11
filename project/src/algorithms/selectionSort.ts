import { SortingConfig } from '../types/sorting';
import { swap } from '../utils/helpers';

export const selectionSort = async (config: SortingConfig): Promise<void> => {
  const { array, updateArray, updateSortingState, updateStats, speed, sleep } = config;
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    updateSortingState({
      currentIndices: [i],
      comparedIndices: [],
    });

    for (let j = i + 1; j < n; j++) {
      updateSortingState({
        currentIndices: [minIndex],
        comparedIndices: [j],
      });

      comparisons++;
      updateStats({ comparisons });

      await sleep(speed);

      if (array[j] < array[minIndex]) {
        minIndex = j;
        updateSortingState({
          currentIndices: [minIndex],
          comparedIndices: [j],
        });
      }
    }

    if (minIndex !== i) {
      swap(array, i, minIndex);
      swaps++;
      updateStats({ swaps });
      updateArray(array);
      await sleep(speed);
    }

    updateSortingState({
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      currentIndices: [],
      comparedIndices: [],
    });
  }

  // Mark all elements as sorted
  updateSortingState({
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    currentIndices: [],
    comparedIndices: [],
  });
};