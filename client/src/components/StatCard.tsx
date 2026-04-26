/**
 * StatCard — Swiss Data Journalism style
 * Large animated numbers with contextual labels
 * Uses DM Serif Display for numbers, Source Sans 3 for labels
 * Color: problem (red) or solution (teal)
 */
import { useCountUp } from "@/hooks/useCountUp";

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  variant?: "problem" | "solution" | "neutral";
  source?: string;
}

export function StatCard({
  value,
  suffix = "%",
  prefix = "",
  label,
  sublabel,
  variant = "neutral",
  source,
}: StatCardProps) {
  const { count, ref } = useCountUp(value, 2200);

  const colorClass =
    variant === "problem"
      ? "text-[oklch(0.58_0.22_25)]"
      : variant === "solution"
        ? "text-[oklch(0.62_0.14_175)]"
        : "text-foreground";

  return (
    <div ref={ref} className="group">
      <div
        className={`font-serif text-6xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-none ${colorClass} transition-transform duration-500`}
      >
        {prefix}
        {count}
        <span className="text-4xl sm:text-5xl lg:text-6xl opacity-70">
          {suffix}
        </span>
      </div>
      <p className="mt-3 text-lg sm:text-xl font-semibold text-foreground leading-snug">
        {label}
      </p>
      {sublabel && (
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          {sublabel}
        </p>
      )}
      {source && (
        <p className="mt-2 text-xs text-muted-foreground/60 font-mono tracking-wide uppercase">
          {source}
        </p>
      )}
    </div>
  );
}
