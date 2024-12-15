import { cn } from "@/lib/utils";

type BadgeCountProps = { count?: number } & React.HTMLAttributes<HTMLDivElement>;

export default function BadgeCount({ count, className, ...props }: BadgeCountProps) {
  return (
    <span
      className={cn(
        "rounded-full bg-red-500 px-1 text-[11px] font-bold text-white transition-all",
        count ? "scale-100 opacity-100" : "hidden scale-0 opacity-0",
        className
      )}
      {...props}
    >
      {count && (count > 99 ? "99+" : count)}
    </span>
  );
}
