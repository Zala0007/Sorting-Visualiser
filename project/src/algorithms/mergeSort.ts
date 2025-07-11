import { SortingConfig } from '../types/sorting';

export const mergeSort = async (config: SortingConfig): Promise<void> => {
  const { array, updateArray, updateSortingState, updateStats, speed, sleep } = config;
  let comparisons = 0;
  let swaps = 0;

  const merge = async (left: number, mid: number, right: number): Promise<void> => {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      updateSortingState({
        comparedIndices: [left + i, mid + 1 + j],
        currentIndices: [k],
      });

      comparisons++;
      updateStats({ comparisons });

      await sleep(speed);

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }
      
      swaps++;
      updateStats({ swaps });
      updateArray(array);
      k++;

      await sleep(speed);
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      updateArray(array);
      i++;
      k++;
      swaps++;
      updateStats({ swaps });
      await sleep(speed);
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      updateArray(array);
      j++;
      k++;
      swaps++;
      updateStats({ swaps });
      await sleep(speed);
    }
  };

  const mergeSortHelper = async (left: number, right: number): Promise<void> => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await mergeSortHelper(0, array.length - 1);

  // Mark all elements as sorted
  updateSortingState({
    sortedIndices: Array.from({ length: array.length }, (_, i) => i),
    currentIndices: [],
    comparedIndices: [],
  });
};