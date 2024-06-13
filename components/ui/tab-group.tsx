import { cn } from "@/lib/utils";

interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: string;
}

export function TabGroup({ gap = "4", className, ...props }: TabGroupProps) {
  return <div className={cn(`flex gap-${gap}`, className)} {...props} />;
}

interface TabGroupButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function TabGroupButton({
  active,
  className,
  ...props
}: TabGroupButtonProps) {
  return (
    <button
      className={cn(
        "rounded px-2 py-0.5 text-sm hover:bg-gray-800/50",
        "active:bg-gray-800 active:text-gray-100",
        active
          ? "cursor-default bg-gray-800 text-gray-100"
          : "text-gray-300 hover:text-gray-200",
        className
      )}
      {...props}
    />
  );
}
