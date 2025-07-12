import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  title: string;
  current: number;
  target: number;
  icon: ReactNode;
  color: string;
  className?: string;
}

export function ProgressBar({ title, current, target, icon, color, className }: ProgressBarProps) {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const isOverTarget = current > target;

  return (
    <div className={cn("financial-tile p-6 rounded-xl", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <span className={`text-sm px-2 py-1 rounded-full ${
          isOverTarget ? 'bg-red-400/20 text-red-400' : 'bg-blue-400/20 text-blue-400'
        }`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Current</span>
          <span className="text-white font-medium">₹{current.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Target</span>
          <span className="text-white font-medium">₹{target.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              isOverTarget ? 'bg-gradient-to-r from-red-400 to-red-600' : 
              percentage > 75 ? 'bg-gradient-to-r from-green-400 to-green-600' :
              percentage > 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
              'bg-gradient-to-r from-blue-400 to-blue-600'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}