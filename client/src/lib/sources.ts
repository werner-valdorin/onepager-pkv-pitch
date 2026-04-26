/**
 * Sources — vom Valdorin Research-Agent verifizierte Quellen
 * Single Source of Truth: ~/Valdorin/QUELLEN.md
 */
export interface Source {
  id: number;
  label: string;
  url: string;
}

export const sources: Source[] = [
  {
    id: 1,
    label: "McKinsey: Future of AI in Insurance",
    url: "https://www.mckinsey.com/industries/financial-services/our-insights/the-future-of-ai-in-the-insurance-industry",
  },
  {
    id: 2,
    label: "Insurance Asia: McKinsey 10–20 % AI-Lift (verifizierter Beleg)",
    url: "https://insuranceasia.com/insurance/news/mckinsey-finds-insurers-lagging-peers-miss-out-ai-led-gains",
  },
];

export function getSource(id: number): Source | undefined {
  return sources.find((s) => s.id === id);
}
