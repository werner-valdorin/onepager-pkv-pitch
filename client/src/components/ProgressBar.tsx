/**
 * ProgressBar — Visualizes time/duration comparisons
 * Swiss Data Journalism style: horizontal bars with labels
 */
import { useInView } from "@/hooks/useInView";

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  displayValue: string;
  variant?: "problem" | "solution";
  delay?: number;
}

export function ProgressBar({
  label,
  value,
  maxValue,
  displayValue,
  variant = "problem",
  delay = 0,
}: ProgressBarProps) {
  const { isInView, ref } = useInView(0.3);
  const percentage = Math.min((value / maxValue) * 100, 100);

  const bgColor =
    variant === "problem"
      ? "bg-[oklch(0.58_0.22_25)]"
      : "bg-[oklch(0.62_0.14_175)]";

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-mono text-sm font-semibold text-foreground">
          {displayValue}
        </span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${bgColor} rounded-full transition-all duration-1500 ease-out`}
          style={{
            width: isInView ? `${percentage}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
