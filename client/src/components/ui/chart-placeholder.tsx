import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChartPlaceholderProps {
  title: string;
  icon: ReactNode;
  description: string;
  className?: string;
}

export function ChartPlaceholder({ title, icon, description, className }: ChartPlaceholderProps) {
  return (
    <div className={cn("chart-container p-6 rounded-xl", className)}>
      <h3 className="text-xl font-semibold mb-4 text-blue-400">{title}</h3>
      <div className="h-64 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-4 text-blue-400">
            {icon}
          </div>
          <p>Chart Component Placeholder</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
