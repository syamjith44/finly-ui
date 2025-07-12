import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FinancialTileProps {
  title: string;
  value: string;
  change: string;
  changePositive?: boolean;
  icon: ReactNode;
  iconColor: string;
  className?: string;
}

export function FinancialTile({
  title,
  value,
  change,
  changePositive = true,
  icon,
  iconColor,
  className
}: FinancialTileProps) {
  return (
    <div className={cn("financial-tile p-6 rounded-xl", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconColor)}>
          {icon}
        </div>
        <span className={cn(
          "text-sm font-medium",
          changePositive ? "text-green-400" : "text-red-400"
        )}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-300 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
