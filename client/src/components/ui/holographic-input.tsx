import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface HolographicInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const HolographicInput = forwardRef<HTMLInputElement, HolographicInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "input-holo w-full px-4 py-3 rounded-lg text-white placeholder-gray-400",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
HolographicInput.displayName = "HolographicInput";

export { HolographicInput };
