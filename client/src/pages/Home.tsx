/**
 * Home.tsx — PKV-Prozessanalyse v4
 * Design: Swiss Data Journalism — DM Serif Display + Source Sans 3
 * Struktur:
 *   1. McKinsey +24% Hero (Kernaussage über allem)
 *   2. Der aktuelle Prozess (IST) mit Sanduhr-Animation
 *   3. Der neue Prozess (SOLL)
 *   4. Realistisches Potenzial + Fazit
 */
import { SectionReveal } from "@/components/SectionReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock,
  FileSearch,
  FileText,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  PenTool,
  Send,
  Smartphone,
  UserCheck,
  Zap,
} from "lucide-react";

/* ── Image constants ── */
const PROCESS_BROKEN_IMG =
  "https://d36hbw14aib5lz.cloudfront.net/310519663419733308/mhJ3vRtJruixtTdRqiUfDR/process-broken-Np5TEpoN9ettXbam3kNnin.webp?Expires=1807958515&Signature=ufNREQmYledgGsn456wnuhLJHMvYyRydYFJncP7irnzweS~grPl3DKwnMNjH4jxRySG3-eH0J8aLwJlKSdtjgXW0pcfFc0EBza3MpMbYj~8g0qtGPDggs8nx9O~Sz01PX50y-7-FPZPeHhLV6ZBUn~Zf2aph0OigW813dlJSTrzqxZrLF5hRqvE7PCwqMPoAUbRm3DyUqUw5~yfcSWzy6g-D5djX-WELpRpHdaKMZAlNeq0UB8SXJridxa5T9r78sFK9fmzY~9mtUkUZsA4R~e~jkeVjDygW-adu2o0RMivu04ZdJzDhKe7GKTKm8DJil8dneUySxx3EyFllk42tqQ__&Key-Pair-Id=K1MP89RTKNH4J";

const PROCESS_DIGITAL_IMG =
  "https://d36hbw14aib5lz.cloudfront.net/310519663419733308/mhJ3vRtJruixtTdRqiUfDR/process-digital-j3tKsvJCw9FfjbFin5McJ9.webp?Expires=1807958517&Signature=uKEbASDipIQWzeBd9jWLs2Qx4Uaiq0VRQxhxiDbWcUKvF3N56Ct9ExgX8j7jygnfVKiRSJE5I-g-gci~wEk68wkXMbjYkhaLfMi9DiiRHFp9I~91L0yI9nCcAngjBnGUPwpTj4thOuVDqobliOrIHk2zc6KNocDRZQ1YxUL--K7CF4rgg-IbAR6Z7KQV9JIsIWYPQ-7wTgi6ORjEDr0td~8Ff0WT1vpKggYCEEzpSf2SUGo5Z1G51bzRhlkzQp2kHNTsgrknUXGlNd0w-XQlZLlL3u2sBSpT~2f2Z3RKGNPkpxUFakkdTM58NwuakLV8759SM5Z1E4OO9JBT4Ol5bw__&Key-Pair-Id=K1MP89RTKNH4J";

/* ── Colors ── */
const RED = "oklch(0.58 0.22 25)";
const TEAL = "oklch(0.52 0.14 175)";

/* ── Animated number ── */
function BigNumber({
  value,
  suffix = "%",
  prefix = "",
  color = "foreground",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  color?: string;
}) {
  const { count, ref } = useCountUp(value, 2000);
  const colorMap: Record<string, string> = {
    problem: `text-[${RED}]`,
    solution: `text-[${TEAL}]`,
    foreground: "text-foreground",
    white: "text-white",
  };
  return (
    <span ref={ref} className={`font-serif ${colorMap[color] || colorMap.foreground}`}>
      {prefix}{count}{suffix}
    </span>
  );
}

/* ── Source inline tag ── */
function Src({ n, label }: { n: number; label?: string }) {
  return (
    <sup className="text-[10px] text-muted-foreground/50 ml-0.5 cursor-help" title={label || `Quelle ${n}`}>
      [{n}]
    </sup>
  );
}

/* ── Process step for IST (numbered, with icon) ── */
function IstStep({
  number,
  icon: Icon,
  title,
  children,
  time,
  critical,
  totalSteps = 7,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  time?: string;
  critical?: boolean;
  totalSteps?: number;
}) {
  const { isInView, ref } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className={`relative pl-16 pb-10 ${number < totalSteps ? "border-l-2 border-dashed border-[oklch(0.58_0.22_25)]/30 ml-5" : "ml-5"}`}>
        <div className={`absolute left-0 top-0 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold ${critical ? "bg-[oklch(0.58_0.22_25)] text-white" : "bg-foreground text-white"}`}>
          {number}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <h4 className="font-serif text-lg text-foreground">{title}</h4>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-1.5">
          {children}
        </div>
        {time && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[oklch(0.58_0.22_25)]/8 rounded text-xs font-mono font-semibold text-[oklch(0.58_0.22_25)]">
            <Clock className="w-3 h-3" />
            {time}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Process step for SOLL (numbered, with icon) ── */
function SollStep({
  number,
  icon: Icon,
  title,
  children,
  time,
  totalSteps = 6,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  time?: string;
  totalSteps?: number;
}) {
  const { isInView, ref } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className={`relative pl-16 pb-10 ${number < totalSteps ? "border-l-2 border-solid border-[oklch(0.52_0.14_175)]/30 ml-5" : "ml-5"}`}>
        <div className="absolute left-0 top-0 -translate-x-1/2 w-10 h-10 rounded-full bg-[oklch(0.52_0.14_175)] text-white flex items-center justify-center font-mono text-sm font-bold">
          {number}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-[oklch(0.52_0.14_175)]" />
          <h4 className="font-serif text-lg text-foreground">{title}</h4>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-1.5">
          {children}
        </div>
        {time && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[oklch(0.52_0.14_175)]/10 rounded text-xs font-mono font-semibold text-[oklch(0.52_0.14_175)]">
            <Zap className="w-3 h-3" />
            {time}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Hourglass SVG component (from reference site) ── */
function Hourglass() {
  return (
    <div className="flex flex-col items-center">
      <svg
        aria-label="Sanduhr mit rinnendem Sand"
        height="165"
        role="img"
        viewBox="0 0 120 165"
        width="120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="glassGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#b8cfe3" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#b8cfe3" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#b8cfe3" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="sandGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e3b866" />
            <stop offset="100%" stopColor="#c9a14a" />
          </linearGradient>
          <radialGradient cx="50%" cy="50%" id="innerGlow" r="50%">
            <stop offset="0%" stopColor="#adc130" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#adc130" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {/* Ambient glow ring */}
        <circle
          className="animate-[pulse-ring_3.2s_ease-in-out_infinite]"
          cx="60" cy="82" fill="none" r="54"
          stroke="#c9a14a" strokeWidth="0.5"
          style={{ opacity: 0.3 }}
        />
        <circle cx="60" cy="82" fill="url(#innerGlow)" r="70"
          className="animate-[ambient_5s_ease-in-out_infinite]"
        />
        {/* Rahmen oben / unten */}
        <rect fill="#c9a14a" height="4" opacity="0.85" rx="1.5" width="84" x="18" y="6" />
        <rect fill="#c9a14a" height="4" opacity="0.85" rx="1.5" width="84" x="18" y="155" />
        {/* Glas-Kontur Sanduhr */}
        <path
          d="M 26 10 L 94 10 L 62 80 L 94 155 L 26 155 L 58 80 Z"
          fill="url(#glassGrad)"
          stroke="#b8cfe3"
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
        {/* Sand oben (drain) */}
        <g className="animate-[drain_14s_ease-in-out_infinite] origin-bottom">
          <path d="M 28 12 L 92 12 L 62 78 L 58 78 Z" fill="url(#sandGrad)" opacity="0.9" />
        </g>
        {/* Falling stream */}
        <rect fill="#e3b866" height="75" opacity="0.75" width="1.4" x="59.3" y="78" />
        {/* Einzelne Sandkörner (staffel-animiert) */}
        <g>
          {[0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1].map((delay, i) => (
            <circle
              key={i}
              className="animate-[fall_2.4s_linear_infinite]"
              cx={59.5 + (i % 2 === 0 ? 0.5 : 0)}
              cy={85 + i * 5}
              fill={i % 2 === 0 ? "#f0cc7a" : "#e3b866"}
              r={i % 3 === 0 ? 0.7 : 0.9}
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </g>
        {/* Sand unten (fill) */}
        <g className="animate-[fill-sand_14s_ease-in-out_infinite] origin-top">
          <path d="M 28 153 L 92 153 L 62 82 L 58 82 Z" fill="url(#sandGrad)" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}

/* ── Sources ── */
const sources = [
  { id: 1, label: "Signicat: The Battle to Onboard (2022)", url: "https://www.signicat.com/de/pressemitteilungen/geduldsfaden-reisst-immer-schneller-milliardengrab-fuer-banken-versicherungen" },
  { id: 2, label: "IT Finanzmagazin: Conversion Rate Versicherung", url: "https://www.it-finanzmagazin.de/6-tipps-zur-steigerung-der-conversion-rate-fuer-online-versicherungs-und-kredit-anbieter-14339/" },
  { id: 3, label: "Bitkom 2025: Versichert per Klick", url: "https://www.bitkom.org/Presse/Presseinformation/83-Prozent-schliessen-Versicherungen-online" },
  { id: 4, label: "Paperfly 2025: Digitale Abschlusszeiten", url: "https://paperfly.io/de/blog/digitale-abschlusszeiten-versicherung/" },
  { id: 5, label: "MSR Consulting / KUBUS-Studie 2021", url: "https://www.msr.de/presse/pressemitteilungen/deutsche-assekuranz-zunehmend-kundenorientiert-alle-top-22-versicherer-mit-positivem-nps/" },
  { id: 6, label: "anwalt.de: BU-Anträge und Überforderung", url: "https://www.anwalt.de/rechtstipps/komplizierte-bu-warum-immer-mehr-versicherte-ihre-antraege-abbrechen-238437.html" },
  { id: 7, label: "M+M Versichertenbarometer 2024", url: "https://www.m-plus-m.de/mm-versichertenbarometer-2024/" },
  { id: 8, label: "McKinsey: Future of AI in Insurance", url: "https://www.mckinsey.com/industries/financial-services/our-insights/the-future-of-ai-in-the-insurance-industry" },
  { id: 9, label: "PKV-Verband: Zufriedenheit der Versicherten", url: "https://www.pkv.de/verband/presse/meldungen/umfrage-belegt-hohe-zufriedenheit-der-pkv-versicherten/" },
  { id: 10, label: "GDV 2024: Digitale Abschlüsse", url: "https://www.gdv.de/gdv/medien/medieninformationen/gdv-statistik-jeder-fuenfte-versicherungsvertrag-wird-digital-abgeschlossen-189444" },
  { id: 11, label: "Insurance Asia: McKinsey 10–20 % AI-Lift (verifizierter Beleg)", url: "https://insuranceasia.com/insurance/news/mckinsey-finds-insurers-lagging-peers-miss-out-ai-led-gains" },
];

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-14">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            PKV-Prozessanalyse
          </span>
          <span className="font-mono text-xs text-muted-foreground hidden sm:block">
            Obermeier Versicherungen
          </span>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO: McKinsey +24% als Kernaussage
          ═══════════════════════════════════════════════════════════ */}
      <section className="pt-24 pb-16 sm:pt-28 sm:pb-20 bg-gradient-to-br from-[oklch(0.95_0.02_200)] via-[oklch(0.97_0.01_180)] to-[oklch(0.93_0.015_220)] relative overflow-hidden">
        {/* Subtle medical/insurance pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23005577' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container relative">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[oklch(0.52_0.14_175)]/10 rounded-full border border-[oklch(0.52_0.14_175)]/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.52_0.14_175)] animate-pulse" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[oklch(0.42_0.14_175)]">
                PKV-Prozessanalyse &middot; Obermeier Versicherungen
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={50}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[oklch(0.42_0.12_175)] mb-4">
              McKinsey &middot; Future of AI in Insurance
            </p>
          </SectionReveal>
          <SectionReveal delay={100}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[oklch(0.18_0.01_65)] leading-[1.05] max-w-5xl">
              End-to-End-Digitalisierung steigert die Abschlussquote um bis zu{" "}
              <span className="text-[oklch(0.42_0.14_175)]">
                <BigNumber value={20} suffix=" %" color="foreground" />
              </span>
            </h1>
          </SectionReveal>
          <SectionReveal delay={200}>
            <p className="mt-8 text-lg sm:text-xl text-[oklch(0.35_0.01_65)] max-w-2xl leading-relaxed">
              Aktuell schließen wir rund 40 % unserer PKV-Beratungen ab. Unser Ziel: 60 %. Bei Kollegen, die PKV seltener beraten, ist das Potenzial noch deutlich höher — viele fangen gar nicht erst an, weil der Prozess zu komplex erscheint. <Src n={8} />
            </p>
          </SectionReveal>
          <SectionReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 px-5 py-3 bg-white/60 rounded-lg border border-[oklch(0.52_0.14_175)]/20 backdrop-blur-sm">
                <span className="font-serif text-3xl text-[oklch(0.18_0.01_65)]">40 %</span>
                <span className="text-sm text-[oklch(0.4_0.01_65)]">Abschlussquote<br />heute</span>
              </div>
              <ArrowRight className="w-5 h-5 text-[oklch(0.42_0.14_175)]" />
              <div className="flex items-center gap-3 px-5 py-3 bg-[oklch(0.52_0.14_175)]/10 rounded-lg border border-[oklch(0.52_0.14_175)]/30 backdrop-blur-sm">
                <span className="font-serif text-3xl text-[oklch(0.42_0.14_175)]">60 %</span>
                <span className="text-sm text-[oklch(0.4_0.01_65)]">Abschlussquote<br />Ziel</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SEITE 2: DER AKTUELLE PROZESS (IST) + SANDUHR
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container">
          {/* Header */}
          <SectionReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-sm bg-[oklch(0.88_0.12_95)]" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[oklch(0.58_0.22_25)]">
                Aktueller Prozess
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground max-w-3xl">
              So läuft es heute: 7 Schritte, 5 Medienbrüche, 6–12 Wochen
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              Vom ersten Beratungsgespräch bis zum unterschriebenen Antrag — jeder Schritt im Detail. Viele Kollegen fangen gar nicht erst an, PKV zu beraten, weil der Prozess zu komplex erscheint.
            </p>
          </SectionReveal>

          {/* Illustration */}
          <SectionReveal delay={100}>
            <div className="mt-10 mb-12 rounded-lg overflow-hidden border border-border/50 max-w-2xl">
              <img src={PROCESS_BROKEN_IMG} alt="Fragmentierter Papierprozess" className="w-full h-auto" />
              <div className="px-5 py-3 bg-[oklch(0.97_0.003_80)]">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.58_0.22_25)]">
                  Heute: Papier, Post, Fax, Wartewochen
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* IST-Prozess als Timeline mit Sanduhr */}
          <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Sticky Sanduhr — begleitet den gesamten IST-Prozess */}
          <div className="hidden lg:flex flex-col items-center lg:sticky lg:top-24 lg:self-start lg:min-w-[200px]">
            <div className="animate-[hourglass-bounce_3s_ease-in-out_infinite] scale-150 origin-center">
              <Hourglass />
            </div>
            <div className="text-center mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.58_0.22_25)]">
                Der gemeinsame Engpass
              </p>
              <p className="font-serif text-base text-foreground mt-1">
                Warten auf die<br />Krankenakte
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-3">
                6 – 12 Wochen<br />Gesamtdauer
              </p>
            </div>
          </div>
          {/* Mobile Sanduhr */}
          <div className="flex lg:hidden flex-col items-center gap-4 mb-8">
            <div className="animate-[hourglass-bounce_3s_ease-in-out_infinite] scale-125 origin-center">
              <Hourglass />
            </div>
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[oklch(0.58_0.22_25)]">
                Der gemeinsame Engpass
              </p>
              <p className="font-serif text-sm text-foreground mt-1">
                Warten auf die Krankenakte
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-2xl">
            <IstStep number={1} icon={MessageSquare} title="Beratung (nicht einheitlich)" time="30–60 Minuten">
              <p>Jeder Berater macht es anders — es gibt keinen standardisierten roten Faden. Der <span className="font-semibold text-foreground">Vorschlag ist optisch unansprechend</span> — kein professionelles Erscheinungsbild.</p>
              <p><span className="font-semibold text-foreground">Viele Kollegen fangen gar nicht erst an</span>, PKV zu beraten, weil das Thema zu komplex erscheint und keine Routine vorhanden ist. Ein strukturierter Leitfaden würde hier extrem weiterhelfen.</p>
            </IstStep>

            <IstStep number={2} icon={FileText} title="Gesundheitsdaten & Krankenakte" time="3–4 Wochen Wartezeit" critical>
              <p>Die Gesundheitsdaten sind meistens nur mit der Krankenakte des Kunden ausfüllbar. Der <span className="font-semibold text-foreground">Kunde muss seine Akte selbstständig per E-Mail bei der Krankenkasse anfordern</span> — die Akte kommt per Post nach 3–4 Wochen.</p>
              <p><span className="font-semibold text-foreground">Kunden haben oft nicht mehr alle Arztbesuche der letzten Jahre im Kopf</span> und vergessen oft wichtige Sachen. Beispiel: Der Kunde war einmal beim Einrenken, der Arzt schreibt aber <span className="font-semibold text-foreground">chronisches HWS-Syndrom</span> oder ähnliches auf.</p>
              <p><span className="font-semibold text-foreground">Warum ist die Krankenakte so wichtig?</span> In nahezu jedem 2. Fall hat der Arzt eine <span className="font-semibold text-foreground">Abrechnungsdiagnose</span> hinterlegt — die gar kein echter Befund ist, aber trotzdem Probleme macht.</p>
              <p className="text-[oklch(0.58_0.22_25)] font-medium">→ Hier geht massiv Momentum verloren. Viele schieben es auf oder vergessen es.</p>
            </IstStep>

            <IstStep number={3} icon={FileSearch} title="Krankenakte sichten & aufarbeiten" time="1–3 Stunden pro Akte">
              <p>Der Berater muss die Krankenakte <span className="font-semibold text-foreground">per Hand sichten und nach Relevanz ordnen</span>. Oft lateinische Begriffe — das fehlende medizinische Verständnis macht qualifizierte Aussagen sehr schwer.</p>
              <p>Die Gesundheitsakte wird aktuell auch <span className="font-semibold text-foreground">im 4-Augen-Prinzip in der Agentur abgearbeitet</span> — ein enormer Zeitaufwand. Fehleranfällig: Diagnosen werden übersehen oder falsch zugeordnet.</p>
            </IstStep>

            <IstStep number={4} icon={Send} title="Papierantrag an die VKB (Innendienst)" time="2–3 Wochen Bearbeitung" critical>
              <p>Die Akte ist soweit gesichtet und der Antrag muss jetzt als <span className="font-semibold text-foreground">Papierantrag anonymisiert an die VKB gesendet</span> werden — eine anonyme Risikovoranfrage.</p>
              <p><span className="font-semibold text-foreground">Es gibt kein einheitliches System</span> für die anonyme Risikovoranfrage. Alles läuft per Papier und nicht im System, weil eine Ablehnung für den Kunden folgenschwer wäre.</p>
            </IstStep>

            <IstStep number={5} icon={Mail} title="Rückmeldung vom Innendienstmitarbeiter" time="Tage bis Wochen">
              <p>Ein <span className="font-semibold text-foreground">Innendienstmitarbeiter</span> schaut sich das Ganze an. Anschließend sendet der Innendienst Anforderungen zurück: Selbstauskunft, Arztanfragen, Risikozuschläge oder eventuelle Ausschlüsse.</p>
              <p>Die Krankenakte wird <span className="font-semibold text-foreground">nicht vollständig mitgeschickt</span>, um keinen unnötigen Kontext mitzuteilen. Das führt zu Rückfragen.</p>
            </IstStep>

            <IstStep number={6} icon={AlertTriangle} title="Ping-Pong: Verhandlungsstrecke" time="Wochen" critical>
              <p><span className="font-semibold text-foreground">Das Ping-Pong mit den Fragebögen ist sehr anstrengend.</span> Wir gehen sehr oft auf den Kunden einzeln zu: „Ah sorry, jetzt brauch ich das noch, und das noch und das noch" — und das ganze immer zeitversetzt.</p>
              <p>Oft sind es <span className="font-semibold text-foreground">Abrechnungsdiagnosen (also falsche)</span> — und jetzt müssen wir mit dem Innendienst klären, ob ein Attest die Sache bereinigt. Der Kontakt mit der Anamneseabteilung kommt nur vor, <span className="font-semibold text-foreground">wenn etwas falsch gelaufen ist</span> — extrem unangenehm für alle Beteiligten. Der Agenturvertrieb hat Fokus auf <span className="font-semibold text-foreground">Bestandskundenerhaltung</span>.</p>
            </IstStep>

            <IstStep number={7} icon={PenTool} title="Finale Unterlagen & Unterschrift" time="1–2 Wochen">
              <p>Der Kunde liefert die gesamten Unterlagen, die müssen erneut an den Innendienst gesendet werden. Nach wieder einiger Bearbeitungszeit wird erst das <span className="font-semibold text-foreground">finale unterschriftsreife Dokument</span> erstellt.</p>
              <p>Kündigung muss an die Vorversicherung gesendet werden. Versicherte Zeiten müssen per Hand angefordert werden.</p>
            </IstStep>
          </div>
          </div>

          {/* Zusammenfassung IST */}
          <SectionReveal delay={100}>
            <div className="mt-8 max-w-2xl bg-[oklch(0.58_0.22_25)]/5 rounded-lg p-6 border border-[oklch(0.58_0.22_25)]/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[oklch(0.58_0.22_25)] mb-1">Gesamtdauer aktueller Prozess</p>
                  <p className="font-serif text-3xl text-[oklch(0.58_0.22_25)]">6 – 12 Wochen</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1">Medienbrüche</p>
                  <p className="font-serif text-3xl text-foreground">5 – 7</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SEITE 3: DER NEUE PROZESS (SOLL)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[oklch(0.96_0.005_80)]">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-sm bg-[oklch(0.75_0.12_15)]" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[oklch(0.52_0.14_175)]">
                Neuer Prozess
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground max-w-3xl">
              So könnte es laufen: 1 App, KI-Unterstützung, 0 Medienbrüche, 2 Termine
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              Ein durchgehender Beratungsfluss ohne Medienbruch — es fängt mit der App an und hört mit ihr auf. Zwei Termine statt monatelangem Hin und Her. Auch für die Versicherungskammer ein großer Nutzen: Der Prozess wird vom Innendienst final gegossen — keine großen Abweichungen mehr von Sachbearbeiter zu Sachbearbeiter.
            </p>
          </SectionReveal>

          {/* Illustration */}
          <SectionReveal delay={100}>
            <div className="mt-10 mb-12 rounded-lg overflow-hidden border border-[oklch(0.52_0.14_175)]/20 max-w-2xl">
              <img src={PROCESS_DIGITAL_IMG} alt="Digitaler durchgängiger Prozess" className="w-full h-auto" />
              <div className="px-5 py-3 bg-[oklch(0.97_0.005_175)]/20">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[oklch(0.52_0.14_175)]">
                  Ziel: Ein durchgängiges digitales Erlebnis
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* SOLL-Prozess als Timeline */}
          <div className="max-w-2xl">
            <SollStep number={1} icon={MonitorSmartphone} title="Einheitliche Beratung per Website / App" time="30–45 Minuten">
              <p>Geführte Beratung Schritt für Schritt — visuell und verständlich. <span className="font-semibold text-foreground">Standardisiert: Jeder Berater auf gleichem Niveau.</span> Ginge auch als PowerPoint für ältere Kollegen.</p>
              <p>Erster Hebel auch für Kollegen, die PKV nicht so oft machen und keine Routine haben — <span className="font-semibold text-foreground">ein Leitfaden hilft extrem weiter</span>. Sofort-Angebot mit optisch ansprechendem Vorschlagsdruck direkt aus der App.</p>
            </SollStep>

            <SollStep number={2} icon={Smartphone} title="Persönlicher Kundenzugang zur App" time="Sofort verfügbar">
              <p>Es wird ein <span className="font-semibold text-foreground">Kundenzugang zur App versendet</span>. Der Kunde kann das Wichtigste der Beratung nochmal durchklicken, seinen Versicherungsschutz selbst abändern und schauen, was passiert.</p>
            </SollStep>

            <SollStep number={3} icon={Camera} title="Krankenakte per Foto hochladen" time="5 Minuten (sobald Akte da)">
              <p>Sobald der Kunde seine Krankenakte hat, <span className="font-semibold text-foreground">lädt er sie direkt per Foto in der App hoch</span>.</p>
              <p>Die Wartezeit auf die Akte bleibt aktuell bestehen (3–4 Wochen per Post). Aber: Mit der <span className="font-semibold text-foreground">kommenden elektronischen Patientenakte (ePA)</span> könnte dieser Schritt in Zukunft auf Minuten schrumpfen — und das System wäre dafür bereits vorbereitet.</p>
            </SollStep>

            <SollStep number={4} icon={FileSearch} title="KI-Analyse der hochgeladenen Bilder (OCR) + Merica-KI" time="5–10 Minuten">
              <p><span className="font-semibold text-foreground">OCR liest die Krankenakte aus. Die KI ist mit Merica verbunden</span> und gibt eine sofortige Auskunft: Ablehnung, Zuschlag, Abrechnungsdiagnosen etc.</p>
              <p>So eingestellt, dass der Kunde das <span className="font-semibold text-foreground">nicht vor dem Berater in seiner App sieht</span> — der Berater bespricht die Ergebnisse persönlich.</p>
            </SollStep>

            <SollStep number={5} icon={UserCheck} title="KI-gestützt: Lage besprechen & alles sofort erledigen" time="2. Termin">
              <p>Die aktuelle Lage wird mit dem Kunden besprochen. Es werden sofort alle notwendigen Dokumente angezeigt:</p>
              <ul className="list-none space-y-1 ml-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.52_0.14_175)] mt-0.5 flex-shrink-0" />
                  <span><span className="font-semibold text-foreground">Selbstauskunft</span> kann der Kunde sofort per Umfrage erledigen (Flexcheck o.Ä.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.52_0.14_175)] mt-0.5 flex-shrink-0" />
                  <span><span className="font-semibold text-foreground">Arztanfragen</span> können gleich an den Arzt weitergemailt werden</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.52_0.14_175)] mt-0.5 flex-shrink-0" />
                  <span><span className="font-semibold text-foreground">Risikozuschläge</span> sofort mit dem Kunden besprochen — Transparenz statt böser Überraschungen</span>
                </li>
              </ul>
              <p className="mt-2">Mit einer <span className="font-semibold text-foreground">Schnittstelle zum Sachbearbeiter</span> wäre Punkt 6 des alten Prozesses direkt lösbar — der Sachbearbeiter antwortet innerhalb kurzer Zeit, da viele Fälle gar nicht mehr manuell geprüft werden müssen und so Kapazität frei wird.</p>
            </SollStep>

            <SollStep number={6} icon={PenTool} title="Digital unterschreiben & fertig" time="Im 2. Termin">
              <p>Kunde kann anschließend das <span className="font-semibold text-foreground">finale Angebot in der App digital unterschreiben</span>. Es ist ein durchgehender Beratungsfluss ohne Medienbruch.</p>
              <p>Kündigung und Versichertenzeiten integriert — kein Nachfassen nötig. <span className="font-semibold text-foreground">Es fängt mit der App an und hört mit ihr auf.</span></p>
            </SollStep>
          </div>

          {/* Zusammenfassung SOLL */}
          <SectionReveal delay={100}>
            <div className="mt-8 max-w-2xl bg-[oklch(0.52_0.14_175)]/5 rounded-lg p-6 border border-[oklch(0.52_0.14_175)]/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[oklch(0.52_0.14_175)] mb-1">Gesamtdauer neuer Prozess</p>
                  <p className="font-serif text-3xl text-[oklch(0.52_0.14_175)]">2 Termine</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1">Medienbrüche</p>
                  <p className="font-serif text-3xl text-foreground">0</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SEITE 4: REALISTISCHES POTENZIAL + FAZIT
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container">
          <SectionReveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[oklch(0.52_0.14_175)] mb-4">
              Realistisches Potenzial
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground max-w-3xl">
              Was ist konkret möglich?
            </h2>
          </SectionReveal>

          {/* Von 10 Beratungen Visualisierung */}
          <SectionReveal delay={100}>
            <div className="mt-12 bg-[oklch(0.97_0.003_80)] rounded-lg p-8 border border-border/50 max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-6">
                Von 10 Beratungen
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Heute */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[oklch(0.58_0.22_25)] mb-3">Heute</p>
                  <div className="flex gap-1.5 mb-3">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-10 flex-1 rounded-sm ${
                          i < 4 ? "bg-[oklch(0.52_0.14_175)]" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-[oklch(0.52_0.14_175)]">4 Abschlüsse</span>,{" "}
                    <span className="text-muted-foreground">6 verloren</span>
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    40 % Abschlussquote — bei uns im Büro
                  </p>
                </div>
                {/* Neu */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[oklch(0.52_0.14_175)] mb-3">Mit digitalem Prozess</p>
                  <div className="flex gap-1.5 mb-3">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-10 flex-1 rounded-sm ${
                          i < 6 ? "bg-[oklch(0.52_0.14_175)]" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-[oklch(0.52_0.14_175)]">6 Abschlüsse</span>,{" "}
                    <span className="text-muted-foreground">4 verloren</span>
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Ziel: 60 % — bei Kollegen noch mehr Potenzial
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Drei Potenzial-Karten */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SectionReveal delay={0}>
              <div className="bg-[oklch(0.97_0.003_80)] rounded-lg p-8 border border-border/50 h-full">
                <div className="text-4xl sm:text-5xl font-serif text-[oklch(0.52_0.14_175)] leading-none">
                  <BigNumber value={40} suffix=" → 60 %" color="solution" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground text-lg">
                  Abschlussquote
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Von aktuell 40 % auf 60 % — das sind 2 zusätzliche Abschlüsse pro 10 Beratungen. Bei Kollegen, die PKV seltener beraten, ist das Potenzial durch den standardisierten Prozess noch deutlich höher. <Src n={8} />
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={100}>
              <div className="bg-[oklch(0.97_0.003_80)] rounded-lg p-8 border border-border/50 h-full">
                <div className="text-4xl sm:text-5xl font-serif text-[oklch(0.52_0.14_175)] leading-none">
                  <BigNumber value={74} suffix=" %" color="solution" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground text-lg">
                  Weniger Arbeitszeit pro Antrag
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Statt 1–3 Stunden manueller Aktenaufarbeitung plus Stunden für Papieranträge und Nachfassen: Die KI-gestützte Analyse reduziert den Aufwand auf Minuten. <Src n={4} />
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              <div className="bg-[oklch(0.97_0.003_80)] rounded-lg p-8 border border-border/50 h-full">
                <div className="text-4xl sm:text-5xl font-serif text-[oklch(0.52_0.14_175)] leading-none">
                  <BigNumber value={2} suffix=" Termine" color="solution" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground text-lg">
                  Statt 6–12 Wochen Prozess
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Der gesamte Prozess lässt sich auf 2 Termine verdichten. Termin 1: Beratung, Angebot, Kundenzugang. Termin 2: Akte besprechen, Risikoprüfung, Unterschrift.
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Zusätzliche Vorteile */}
          <SectionReveal delay={300}>
            <div className="mt-12 bg-[oklch(0.97_0.003_80)] rounded-lg p-8 border border-border/50">
              <h3 className="font-serif text-xl text-foreground mb-6">
                Weitere konkrete Vorteile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.52_0.14_175)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Weniger Fehler bei der Gesundheitsprüfung</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      KI-Analyse statt Handarbeit: Fehlerquote sinkt von 12–18 % auf 2–4 %. <Src n={4} />
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.52_0.14_175)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Abrechnungsdiagnosen erkennen</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      In nahezu jedem 2. Fall hat der Arzt eine Abrechnungsdiagnose hinterlegt. Die KI erkennt das — weniger unnötige Zuschläge.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.52_0.14_175)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Nutzen für die Versicherungskammer</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Der Prozess wird einmal vom Innendienst final gegossen — keine Abweichungen mehr von Sachbearbeiter zu Sachbearbeiter.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.52_0.14_175)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Skalierbarkeit für alle Kollegen</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Standardisierter Prozess ermöglicht auch Beratern ohne PKV-Routine, professionell zu beraten. Knapp 50 % Abschlussquote durch strukturierte Beratung — der erste Hebel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAZIT ── */}
      <section className="py-20 sm:py-24 bg-foreground text-white">
        <div className="container">
          <SectionReveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[oklch(0.62_0.14_175)] mb-6">
              Fazit
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white max-w-4xl leading-[1.15]">
              End-to-End-Digitalisierung steigert die Abschlussquote um bis zu 20 %. <Src n={8} /> <Src n={11} />
            </h2>
          </SectionReveal>
          <SectionReveal delay={100}>
            <p className="mt-8 text-lg text-white/70 max-w-2xl leading-relaxed">
              Von 10 Interessenten werden heute nur 4 zu Kunden. Der Grund: Ein Prozess mit 7 Schritten, 5 Medienbrüchen und 6–12 Wochen Dauer. Unstrukturierte Beratung, wochenlange Wartezeiten, Papieranträge, Ping-Pong mit dem Innendienst.
            </p>
          </SectionReveal>
          <SectionReveal delay={200}>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              Eine durchgängig digitale Strecke bringt uns von <span className="text-white font-semibold">40 % auf 60 % Abschlussquote</span>. Bei Kollegen, die PKV seltener beraten, ist das Potenzial noch größer. Stunden an Arbeitszeit gespart pro Antrag — in 2 Terminen statt in Monaten.
            </p>
          </SectionReveal>
          <SectionReveal delay={250}>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              <span className="text-white font-semibold">Ziel:</span> Einheitliches Beratungserlebnis für die PKV-Kunden im Agenturvertrieb. Keine Medienbrüche. Reduzierte Bearbeitungszeiten. Vollkommen digitaler Prozess.
            </p>
          </SectionReveal>
          <SectionReveal delay={300}>
            <div className="mt-12 flex items-center gap-4">
              <a
                href="https://onepager-pkv-pitch.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.52_0.14_175)] text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                Zum Kooperationsangebot
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── QUELLEN ── */}
      <section className="py-16 bg-[oklch(0.96_0.005_80)]">
        <div className="container">
          <h3 className="font-serif text-2xl text-foreground mb-8">Quellenverzeichnis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
            {sources.map((s) => (
              <div key={s.id} className="flex items-start gap-3 py-2">
                <span className="font-mono text-xs text-muted-foreground/60 mt-0.5 flex-shrink-0">[{s.id}]</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground"
                >
                  {s.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 bg-foreground text-white/40 border-t border-white/10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs">Analysebericht erstellt mit Manus AI &middot; April 2026</p>
          <p className="font-mono text-xs">Obermeier Versicherungen, Bad Endorf</p>
        </div>
      </footer>
    </div>
  );
}
