import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  centerValue?: string;
  centerLabel?: string;
  className?: string;
}

export function DonutChart({ title, data, centerValue, centerLabel, className }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  let currentAngle = 0;
  const segments = data.map(item => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle
    };
  });

  const createPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(50, 50, 40, endAngle);
    const end = polarToCartesian(50, 50, 40, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", 40, 40, 0, largeArcFlag, 0, end.x, end.y,
      "L", 50, 50,
      "Z"
    ].join(" ");
  };

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  return (
    <div className={cn("financial-tile p-6 rounded-xl", className)}>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPath(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </svg>
          
          {centerValue && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{centerValue}</div>
                {centerLabel && (
                  <div className="text-xs text-gray-400">{centerLabel}</div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1">
                <div className="text-sm text-white">{segment.label}</div>
                <div className="text-xs text-gray-400">
                  ${segment.value.toLocaleString()} ({segment.percentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}