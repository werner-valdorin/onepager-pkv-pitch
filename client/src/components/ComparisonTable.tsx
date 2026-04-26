/**
 * ComparisonTable — Side-by-side comparison
 * Swiss Data Journalism style: clean table with color-coded values
 */
import { useInView } from "@/hooks/useInView";

interface ComparisonRow {
  metric: string;
  traditional: string;
  digital: string;
  improvement: string;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
}

export function ComparisonTable({ rows }: ComparisonTableProps) {
  const { isInView, ref } = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`overflow-x-auto transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-foreground">
            <th className="py-4 pr-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Metrik
            </th>
            <th className="py-4 pr-6 text-sm font-semibold uppercase tracking-wider text-[oklch(0.58_0.22_25)]">
              Traditionell
            </th>
            <th className="py-4 pr-6 text-sm font-semibold uppercase tracking-wider text-[oklch(0.62_0.14_175)]">
              Digital
            </th>
            <th className="py-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Verbesserung
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border transition-all duration-500"
              style={{
                transitionDelay: `${i * 100}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0)" : "translateX(-20px)",
              }}
            >
              <td className="py-4 pr-6 font-medium text-foreground">
                {row.metric}
              </td>
              <td className="py-4 pr-6 font-mono text-sm text-[oklch(0.58_0.22_25)]">
                {row.traditional}
              </td>
              <td className="py-4 pr-6 font-mono text-sm text-[oklch(0.62_0.14_175)]">
                {row.digital}
              </td>
              <td className="py-4 font-semibold text-foreground">
                {row.improvement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
