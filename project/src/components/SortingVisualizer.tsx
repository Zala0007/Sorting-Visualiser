import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Shuffle, Settings, Info } from 'lucide-react';
import ArrayVisualization from './ArrayVisualization';
import Controls from './Controls';
import AlgorithmInfo from './AlgorithmInfo';
import StatsPanel from './StatsPanel';
import { generateRandomArray, sleep } from '../utils/helpers';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { insertionSort } from '../algorithms/insertionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';
import { heapSort } from '../algorithms/heapSort';
import { SortingState, Algorithm, SortingStats } from '../types/sorting';

const algorithms: Algorithm[] = [
  { name: 'Bubble Sort', key: 'bubble', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
  { name: 'Selection Sort', key: 'selection', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
  { name: 'Insertion Sort', key: 'insertion', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
  { name: 'Merge Sort', key: 'merge', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)' },
  { name: 'Quick Sort', key: 'quick', timeComplexity: 'O(n log n)', spaceComplexity: 'O(log n)' },
  { name: 'Heap Sort', key: 'heap', timeComplexity: 'O(n log n)', spaceComplexity: 'O(1)' },
];

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [sortingState, setSortingState] = useState<SortingState>({
    isActive: false,
    isCompleted: false,
    currentIndices: [],
    comparedIndices: [],
    sortedIndices: [],
  });
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('bubble');
  const [arraySize, setArraySize] = useState<number>(50);
  const [speed, setSpeed] = useState<number>(50);
  const [stats, setStats] = useState<SortingStats>({
    comparisons: 0,
    swaps: 0,
    time: 0,
  });
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setOriginalArray([...newArray]);
    setSortingState({
      isActive: false,
      isCompleted: false,
      currentIndices: [],
      comparedIndices: [],
      sortedIndices: [],
    });
    setStats({ comparisons: 0, swaps: 0, time: 0 });
  }, [arraySize]);

  const updateArray = useCallback((newArray: number[]) => {
    setArray([...newArray]);
  }, []);

  const updateSortingState = useCallback((newState: Partial<SortingState>) => {
    setSortingState(prev => ({ ...prev, ...newState }));
  }, []);

  const updateStats = useCallback((newStats: Partial<SortingStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  }, []);

  const sleepFunction = useCallback(async (ms: number) => {
    await new Promise(resolve => setTimeout(resolve, ms));
  }, []);

  const startSorting = async () => {
    if (sortingState.isActive || sortingState.isCompleted) return;

    setSortingState(prev => ({ ...prev, isActive: true }));
    const startTime = Date.now();
    
    const sortConfig = {
      array: [...array],
      updateArray,
      updateSortingState,
      updateStats,
      speed: 301 - speed,
      sleep: sleepFunction,
    };

    try {
      switch (selectedAlgorithm) {
        case 'bubble':
          await bubbleSort(sortConfig);
          break;
        case 'selection':
          await selectionSort(sortConfig);
          break;
        case 'insertion':
          await insertionSort(sortConfig);
          break;
        case 'merge':
          await mergeSort(sortConfig);
          break;
        case 'quick':
          await quickSort(sortConfig);
          break;
        case 'heap':
          await heapSort(sortConfig);
          break;
      }
    } catch (error) {}

    const endTime = Date.now();
    setStats(prev => ({ ...prev, time: endTime - startTime }));
    setSortingState(prev => ({ 
      ...prev, 
      isActive: false, 
      isCompleted: true,
      sortedIndices: Array.from({ length: array.length }, (_, i) => i)
    }));
  };

  const tryAnotherOne = () => {
    window.location.reload();
  };

  const currentAlgorithm = algorithms.find(alg => alg.key === selectedAlgorithm);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Sorting Visualizer
          </h1>
          <p className="text-gray-300 text-lg">
            Watch sorting algorithms come to life with beautiful animations
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Visualization Area */}
          <div className="xl:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <ArrayVisualization
                array={array}
                sortingState={sortingState}
              />
            </div>
          </div>

          {/* Controls and Info */}
          <div className="xl:col-span-1 space-y-6">
            {/* Controls */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <Controls
                algorithms={algorithms}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                arraySize={arraySize}
                setArraySize={setArraySize}
                speed={speed}
                setSpeed={setSpeed}
                onGenerate={generateNewArray}
                onStart={startSorting}
                onTryAnother={tryAnotherOne}
                sortingState={sortingState}
              />
            </div>

            {/* Stats Panel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <StatsPanel
                stats={stats}
                algorithm={currentAlgorithm}
                isActive={sortingState.isActive}
                isCompleted={sortingState.isCompleted}
              />
            </div>

            {/* Algorithm Info Toggle */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Info className="w-5 h-5" />
              {showInfo ? 'Hide' : 'Show'} Algorithm Info
            </button>
          </div>
        </div>

        {/* Algorithm Information */}
        {showInfo && (
          <div className="mt-6">
            <AlgorithmInfo algorithm={currentAlgorithm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingVisualizer;