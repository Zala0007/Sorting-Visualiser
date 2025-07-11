export interface SortingState {
  isActive: boolean;
  isCompleted: boolean;
  currentIndices: number[];
  comparedIndices: number[];
  sortedIndices: number[];
}

export interface Algorithm {
  name: string;
  key: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface SortingStats {
  comparisons: number;
  swaps: number;
  time: number;
}

export interface SortingConfig {
  array: number[];
  updateArray: (array: number[]) => void;
  updateSortingState: (state: Partial<SortingState>) => void;
  updateStats: (stats: Partial<SortingStats>) => void;
  speed: number;
  sleep: (ms: number) => Promise<void>;
}