import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface HolographicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const HolographicButton = forwardRef<HTMLButtonElement, HolographicButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "btn-holo px-6 py-3 rounded-lg font-medium text-white transition-all",
          variant === "outline" && "border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
HolographicButton.displayName = "HolographicButton";

export { HolographicButton };
