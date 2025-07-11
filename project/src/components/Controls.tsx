import React from 'react';
import { Play, Pause, RotateCcw, Shuffle, Settings } from 'lucide-react';
import { Algorithm, SortingState } from '../types/sorting';

interface ControlsProps {
  algorithms: Algorithm[];
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algorithm: string) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  onGenerate: () => void;
  onStart: () => void;
  onTryAnother: () => void;
  sortingState: SortingState;
}

const Controls: React.FC<ControlsProps> = ({
  algorithms,
  selectedAlgorithm,
  setSelectedAlgorithm,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  onGenerate,
  onStart,
  onTryAnother,
  sortingState,
}) => {
  const isDisabled = sortingState.isActive;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Controls</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Algorithm Selection */}
      <div className="space-y-2">
        <label className="block text-white font-medium">Algorithm</label>
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          disabled={isDisabled}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
        >
          {algorithms.map((algorithm) => (
            <option key={algorithm.key} value={algorithm.key} className="bg-gray-800">
              {algorithm.name}
            </option>
          ))}
        </select>
      </div>

      {/* Array Size */}
      <div className="space-y-2">
        <label className="block text-white font-medium">
          Array Size: {arraySize}
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={isDisabled}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>10</span>
          <span>100</span>
        </div>
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <label className="block text-white font-medium">
          Speed: {speed}%
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onGenerate}
          disabled={isDisabled}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle className="w-5 h-5" />
          Generate Array
        </button>

        <button
          onClick={onStart}
          disabled={sortingState.isActive || sortingState.isCompleted}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5" />
          Start Sorting
        </button>

        <button
          onClick={onTryAnother}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          Try Another One
        </button>
      </div>
    </div>
  );
};

export default Controls;