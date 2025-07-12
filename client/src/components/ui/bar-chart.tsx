import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BarChartProps {
  title: string;
  data: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  icon?: ReactNode;
  className?: string;
}

export function BarChart({ title, data, icon, className }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

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
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-sm font-medium text-white">
                  ₹{item.value.toLocaleString()}
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 ease-out rounded-full"
                  style={{ 
                    width: `${percentage}%`,
                    background: item.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}