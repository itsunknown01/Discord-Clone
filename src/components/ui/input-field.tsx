import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends HTMLAttributes<HTMLDivElement> {
  endIcon?: ReactNode;
  startIcon?: ReactNode;
}

export default function InputField({
  className,
  children,
  endIcon,
  startIcon,
  ...props
}: InputFieldProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
      {startIcon && (
        <div className="absolute inset-y-0 left-2.5 flex items-center text-gray-300">
            {startIcon}
        </div>
      )}
      {endIcon && (
        <div className="absolute inset-y-0 right-2.5 flex items-center text-gray-300">
            {endIcon}
        </div>
      )}
    </div>
  );
}