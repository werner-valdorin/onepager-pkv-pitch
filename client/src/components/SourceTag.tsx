/**
 * SourceTag — Small inline citation tag
 */
interface SourceTagProps {
  number: number;
  label?: string;
}

export function SourceTag({ number, label }: SourceTagProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground/70 bg-muted/50 rounded cursor-help"
      title={label}
    >
      [{number}]
    </span>
  );
}
