/**
 * ProcessStep — Numbered step in the digital solution process
 */
import { useInView } from "@/hooks/useInView";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  highlight?: boolean;
}

export function ProcessStep({
  number,
  title,
  description,
  highlight = false,
}: ProcessStepProps) {
  const { isInView, ref } = useInView(0.3);

  return (
    <div
      ref={ref}
      className={`flex gap-5 transition-all duration-600 ease-out ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
      style={{ transitionDelay: `${number * 80}ms` }}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
          highlight
            ? "bg-[oklch(0.62_0.14_175)] text-white"
            : "bg-muted text-foreground"
        }`}
      >
        {number}
      </div>
      <div className="pt-1">
        <h4 className="font-serif text-xl text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
