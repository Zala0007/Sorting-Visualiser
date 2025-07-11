import React from 'react';
import { Algorithm } from '../types/sorting';

interface AlgorithmInfoProps {
  algorithm?: Algorithm;
}

const algorithmDescriptions: Record<string, {
  description: string;
  howItWorks: string;
  advantages: string[];
  disadvantages: string[];
}> = {
  bubble: {
    description: 'Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    howItWorks: 'The algorithm compares adjacent elements and swaps them if they are in the wrong order. This process is repeated until the entire array is sorted. Each pass through the array moves the largest unsorted element to its correct position.',
    advantages: ['Simple to understand and implement', 'No additional memory space needed', 'Stable sorting algorithm'],
    disadvantages: ['Very inefficient for large datasets', 'O(n²) time complexity in worst case', 'More writes compared to selection sort'],
  },
  selection: {
    description: 'Selection Sort divides the input list into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region.',
    howItWorks: 'The algorithm maintains two subarrays: sorted and unsorted. It repeatedly finds the minimum element from the unsorted subarray and places it at the beginning of the sorted subarray.',
    advantages: ['Simple implementation', 'Minimum number of swaps', 'Works well for small datasets'],
    disadvantages: ['O(n²) time complexity', 'Not stable', 'Poor performance on large lists'],
  },
  insertion: {
    description: 'Insertion Sort builds the final sorted array one element at a time, inserting each element into its correct position among the previously sorted elements.',
    howItWorks: 'The algorithm takes each element from the unsorted portion and finds its correct position in the sorted portion by comparing with elements from right to left.',
    advantages: ['Efficient for small datasets', 'Adaptive - performs well on nearly sorted data', 'Stable and in-place'],
    disadvantages: ['O(n²) time complexity in worst case', 'Inefficient for large datasets', 'More writes than selection sort'],
  },
  merge: {
    description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them separately, and then merges them back together.',
    howItWorks: 'The algorithm recursively divides the array into two halves until each subarray has one element, then merges the subarrays back together in sorted order.',
    advantages: ['Guaranteed O(n log n) time complexity', 'Stable sorting algorithm', 'Predictable performance'],
    disadvantages: ['O(n) extra space required', 'More complex implementation', 'Slower than quicksort in practice'],
  },
  quick: {
    description: 'Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array around it, then recursively sorts the subarrays.',
    howItWorks: 'The algorithm chooses a pivot element, partitions the array so that elements smaller than the pivot are on the left and larger elements are on the right, then recursively sorts both partitions.',
    advantages: ['Average O(n log n) time complexity', 'In-place sorting', 'Cache-efficient'],
    disadvantages: ['O(n²) worst-case time complexity', 'Not stable', 'Performance depends on pivot selection'],
  },
  heap: {
    description: 'Heap Sort uses a binary heap data structure to sort elements. It first builds a max heap from the array, then repeatedly extracts the maximum element.',
    howItWorks: 'The algorithm builds a max heap from the input array, then repeatedly swaps the first element (maximum) with the last element of the heap and reduces the heap size.',
    advantages: ['Guaranteed O(n log n) time complexity', 'In-place sorting', 'Not affected by input distribution'],
    disadvantages: ['Not stable', 'Poor cache performance', 'More complex implementation'],
  },
};

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  if (!algorithm) return null;

  const info = algorithmDescriptions[algorithm.key];
  if (!info) return null;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{algorithm.name}</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="bg-purple-500/20 px-3 py-1 rounded-full">
            <span className="text-purple-300">Time: {algorithm.timeComplexity}</span>
          </div>
          <div className="bg-blue-500/20 px-3 py-1 rounded-full">
            <span className="text-blue-300">Space: {algorithm.spaceComplexity}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
          <p className="text-gray-300 mb-4">{info.description}</p>
          
          <h4 className="text-lg font-semibold text-white mb-3">How It Works</h4>
          <p className="text-gray-300">{info.howItWorks}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Advantages</h4>
          <ul className="text-gray-300 mb-4 space-y-1">
            {info.advantages.map((advantage, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-400 text-sm">✓</span>
                <span>{advantage}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold text-white mb-3">Disadvantages</h4>
          <ul className="text-gray-300 space-y-1">
            {info.disadvantages.map((disadvantage, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-400 text-sm">✗</span>
                <span>{disadvantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;