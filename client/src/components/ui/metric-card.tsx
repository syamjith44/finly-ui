import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon: ReactNode;
  iconColor: string;
  subtitle?: string;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changePositive = true, 
  icon, 
  iconColor, 
  subtitle,
  className 
}: MetricCardProps) {
  return (
    <div className={cn("financial-tile p-6 rounded-xl", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        {change && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            changePositive ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
          }`}>
            {change}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}