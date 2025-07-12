import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LineChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
  }>;
  color?: string;
  icon?: ReactNode;
  className?: string;
}

export function LineChart({ title, data, color = "rgb(59, 130, 246)", icon, className }: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={cn("financial-tile p-6 rounded-xl", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {icon && (
          <div className="w-8 h-8 text-blue-400">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="relative h-32">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={color} stopOpacity="0"/>
              </linearGradient>
            </defs>
            
            {/* Area under the line */}
            <polygon
              points={`0,100 ${points} 100,100`}
              fill="url(#lineGradient)"
            />
            
            {/* Line */}
            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            
            {/* Data points */}
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((item.value - minValue) / range) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2"
                  fill={color}
                  className="hover:r-3 transition-all"
                />
              );
            })}
          </svg>
        </div>
        
        <div className="flex justify-between text-xs text-gray-400">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div>{item.label}</div>
              <div className="text-white font-medium">₹{item.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}