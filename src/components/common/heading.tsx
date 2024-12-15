import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export default function Heading({
  className,
  title,
  description,
}: HeadingProps) {
  return (
    <div
      className={cn(
        "max-w-full flex flex-col items-center justify-center gap-y-2",
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <p className="text-muted-foreground text-white">{description}</p>
    </div>
  );
}
