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
        "max-w-full flex flex-col items-center justify-center gap-y-4",
        className
      )}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
