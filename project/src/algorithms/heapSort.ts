import { SortingConfig } from '../types/sorting';
import { swap } from '../utils/helpers';

export const heapSort = async (config: SortingConfig): Promise<void> => {
  const { array, updateArray, updateSortingState, updateStats, speed, sleep } = config;
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;

  const heapify = async (n: number, i: number): Promise<void> => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    updateSortingState({
      currentIndices: [i],
      comparedIndices: [],
    });

    await sleep(speed);

    if (left < n) {
      updateSortingState({
        currentIndices: [i],
        comparedIndices: [left],
      });

      comparisons++;
      updateStats({ comparisons });

      await sleep(speed);

      if (array[left] > array[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      updateSortingState({
        currentIndices: [i],
        comparedIndices: [right],
      });

      comparisons++;
      updateStats({ comparisons });

      await sleep(speed);

      if (array[right] > array[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      swap(array, i, largest);
      swaps++;
      updateStats({ swaps });
      updateArray(array);
      await sleep(speed);

      await heapify(n, largest);
    }
  };

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    swap(array, 0, i);
    swaps++;
    updateStats({ swaps });
    updateArray(array);

    updateSortingState({
      sortedIndices: Array.from({ length: n - i }, (_, k) => n - 1 - k),
      currentIndices: [],
      comparedIndices: [],
    });

    await sleep(speed);

    await heapify(i, 0);
  }

  // Mark all elements as sorted
  updateSortingState({
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    currentIndices: [],
    comparedIndices: [],
  });
};