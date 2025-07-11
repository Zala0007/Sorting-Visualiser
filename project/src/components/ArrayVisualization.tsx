import React from 'react';
import { SortingState } from '../types/sorting';

interface ArrayVisualizationProps {
  array: number[];
  sortingState: SortingState;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ array, sortingState }) => {
  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);

  const getBarHeight = (value: number): number => {
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    return Math.max(normalizedValue * 300 + 20, 20);
  };

  const getBarColor = (index: number): string => {
    if (sortingState.sortedIndices.includes(index)) {
      return 'bg-gradient-to-t from-green-500 to-green-400';
    }
    if (sortingState.comparedIndices.includes(index)) {
      return 'bg-gradient-to-t from-red-500 to-red-400';
    }
    if (sortingState.currentIndices.includes(index)) {
      return 'bg-gradient-to-t from-yellow-500 to-yellow-400';
    }
    return 'bg-gradient-to-t from-blue-500 to-blue-400';
  };

  const getBarWidth = (): number => {
    const containerWidth = 100; // percentage
    const minBarWidth = 20;
    const maxBarWidth = 40;
    const calculatedWidth = Math.max(containerWidth / array.length, minBarWidth);
    return Math.min(calculatedWidth, maxBarWidth);
  };

  const barWidth = getBarWidth();
  const gap = Math.max(0.5, barWidth * 0.1);

  return (
    <div className="relative">
      {/* Array Container */}
      <div className="flex items-end justify-center min-h-[350px] p-4 overflow-hidden">
        <div 
          className="flex items-end justify-center"
          style={{ gap: `${gap}px` }}
        >
          {array.map((value, index) => (
            <div
              key={index}
              className={`rounded-t-lg transition-all duration-300 ease-out transform hover:scale-105 shadow-lg ${getBarColor(index)}`}
              style={{
                height: `${getBarHeight(value)}px`,
                width: `${barWidth}px`,
                minWidth: '2px',
              }}
              title={`Value: ${value}, Index: ${index}`}
            >
              {/* Value display for larger bars */}
              {barWidth > 6 && (
                <div className="text-xs text-white font-semibold text-center pt-1">
                  {array.length <= 30 ? value : ''}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded"></div>
          <span className="text-gray-300">Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-t from-red-500 to-red-400 rounded"></div>
          <span className="text-gray-300">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded"></div>
          <span className="text-gray-300">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-400 rounded"></div>
          <span className="text-gray-300">Sorted</span>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualization;