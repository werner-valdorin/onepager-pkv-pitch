/**
 * SourceTag — Inline citation tag, klickt zum externen Quellen-Artikel
 */
import { getSource } from "@/lib/sources";

interface SourceTagProps {
  number: number;
  label?: string;
}

export function SourceTag({ number, label }: SourceTagProps) {
  const src = getSource(number);
  const href = src?.url;
  const tooltip = label ?? src?.label ?? `Quelle ${number}`;

  if (!href) {
    return (
      <span
        className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground/70 bg-muted/50 rounded"
        title={tooltip}
      >
        [{number}]
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={tooltip}
      className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground/70 bg-muted/50 rounded hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
    >
      [{number}]
    </a>
  );
}
