import React from 'react';
import { Activity, Clock, GitCompare, RefreshCw } from 'lucide-react';
import { Algorithm, SortingStats } from '../types/sorting';

interface StatsPanelProps {
  stats: SortingStats;
  algorithm?: Algorithm;
  isActive: boolean;
  isCompleted: boolean;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  stats,
  algorithm,
  isActive,
  isCompleted,
}) => {
  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Statistics</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Current Algorithm Info */}
      {algorithm && (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="font-semibold text-white mb-2">{algorithm.name}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Time:</span>
              <span className="text-purple-300 font-mono">{algorithm.timeComplexity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Space:</span>
              <span className="text-purple-300 font-mono">{algorithm.spaceComplexity}</span>
            </div>
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <GitCompare className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Comparisons</span>
          </div>
          <div className="text-xl font-bold text-white">{stats.comparisons.toLocaleString()}</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Swaps</span>
          </div>
          <div className="text-xl font-bold text-white">{stats.swaps.toLocaleString()}</div>
        </div>
      </div>

      {/* Time Display */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-300">Time Elapsed</span>
        </div>
        <div className="text-xl font-bold text-white">{formatTime(stats.time)}</div>
      </div>

      {/* Status Indicator */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-gray-300">Status</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            isCompleted ? 'bg-green-500' : 
            isActive ? 'bg-yellow-500 animate-pulse' : 
            'bg-gray-500'
          }`}></div>
          <span className="text-white font-semibold">
            {isCompleted ? 'Completed' : isActive ? 'Sorting...' : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;