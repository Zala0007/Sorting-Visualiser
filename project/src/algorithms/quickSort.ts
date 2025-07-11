import { SortingConfig } from '../types/sorting';
import { swap } from '../utils/helpers';

export const quickSort = async (config: SortingConfig): Promise<void> => {
  const { array, updateArray, updateSortingState, updateStats, speed, sleep } = config;
  let comparisons = 0;
  let swaps = 0;

  const partition = async (low: number, high: number): Promise<number> => {
    const pivot = array[high];
    let i = low - 1;

    updateSortingState({
      currentIndices: [high],
      comparedIndices: [],
    });

    for (let j = low; j < high; j++) {
      updateSortingState({
        currentIndices: [high],
        comparedIndices: [j],
      });

      comparisons++;
      updateStats({ comparisons });

      await sleep(speed);

      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          swap(array, i, j);
          swaps++;
          updateStats({ swaps });
          updateArray(array);
          await sleep(speed);
        }
      }
    }

    swap(array, i + 1, high);
    swaps++;
    updateStats({ swaps });
    updateArray(array);
    await sleep(speed);

    return i + 1;
  };

  const quickSortHelper = async (low: number, high: number): Promise<void> => {
    if (low < high) {
      const pivotIndex = await partition(low, high);
      
      await quickSortHelper(low, pivotIndex - 1);
      await quickSortHelper(pivotIndex + 1, high);
    }
  };

  await quickSortHelper(0, array.length - 1);

  // Mark all elements as sorted
  updateSortingState({
    sortedIndices: Array.from({ length: array.length }, (_, i) => i),
    currentIndices: [],
    comparedIndices: [],
  });
};