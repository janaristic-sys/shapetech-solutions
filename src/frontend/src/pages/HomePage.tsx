import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Spotlight } from "@/components/ui/spotlight";
import LogoTicker from "@/components/LogoTicker";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  useClients,
  useIndustries,
  useShapes,
  useSolutions,
  useSubmitContact,
} from "@/hooks/use-backend";
import type { Industry, Shape, Solution } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  CreditCard,
  Globe,
  HeartPulse,
  Landmark,
  Monitor,
  Network,
  Package,
  RefreshCcw,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Compass,
  Wallet,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useEffect, useRef, useState, useMemo } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Landmark,
  HeartPulse,
  ShoppingCart,
  Network,
  Code2,
  Users,
  Sparkles,
  RefreshCcw,
  Star,
  Globe,
  Compass,
  Package,
  CreditCard,
  Smartphone,
  Wallet,
  Monitor,
};

const HERO_HEADLINES = [
  "Shaping the Future of Companies",
  "Shaping the Futures of Industries",
  "Shaping the Future of E-Commerce",
] as const;

const CLIENT_LOGOS: Record<string, string> = {
  crunchi:             "/assets/logos/crunchi.png",
  nuvita:              "/assets/logos/nuvita.png",
  "faster-way":        "/assets/logos/faster-way.png",
  "wine-shop-at-home": "/assets/logos/wine-shop-at-home.png",
  reliv:               "/assets/logos/reliv.png",
  "sana-vita":         "/assets/logos/sana-vita.png",
  "l-bri":             "/assets/logos/l-bri.png",
  newulife:            "/assets/logos/newulife.png",
};

// Unified primary shape accents so they don't break the site's aesthetic
const SHAPE_ACCENTS = [
  { ring: "from-primary/20 to-primary/5", dot: "bg-primary/80", glow: "bg-primary/10" },
  { ring: "from-primary/20 to-primary/5", dot: "bg-primary/80", glow: "bg-primary/10" },
  { ring: "from-primary/20 to-primary/5", dot: "bg-primary/80", glow: "bg-primary/10" },
  { ring: "from-primary/20 to-primary/5", dot: "bg-primary/80", glow: "bg-primary/10" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const normalized = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  const Icon = ICON_MAP[normalized] ?? ICON_MAP[name] ?? Code2;
  return <Icon {...props} />;
}

function clientLogoUrl(slug: string) {
  return CLIENT_LOGOS[slug] ?? "";
}

// ─── Wave Divider ─────────────────────────────────────────────────────────────
function WaveDivider({ fill, path, height = 70 }: { fill: string; path: string; height?: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
      <svg
        aria-hidden="true"
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height, display: "block" }}
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({
  eyebrow, title, subtitle, align = "center", gradient = false,
}: {
  eyebrow: string; title: string; subtitle?: string;
  align?: "center" | "left"; gradient?: boolean;
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        {eyebrow}
      </span>
      <h2 className={`font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 ${gradient ? "gradient-accent" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-muted-foreground text-base lg:text-lg ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="card-fluid p-6">
      <Skeleton className="w-11 h-11 rounded-full mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6 mt-1" />
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const submitContact = useSubmitContact();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitContact.mutateAsync(form);
    setSubmitted(true);
    setForm({ name: "", email: "", company: "", message: "" });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 py-16 text-center"
        data-ocid="home.contact_success_state"
      >
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary blob-accent">
          <CheckCircle2 className="size-10" />
        </div>
        <h3 className="font-display font-bold text-2xl text-foreground">Message Received!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thanks for reaching out. A solutions architect will contact you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-2 rounded-full border-border hover:border-primary/40 text-foreground transition-smooth"
          data-ocid="home.contact_reset_button"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name" className="text-foreground text-sm font-medium">Full Name *</Label>
          <Input
            id="contact-name" required placeholder="Jane Smith" value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="rounded-xl bg-background/50 border-border/60 focus:border-primary/60 transition-smooth h-11"
            data-ocid="home.contact_name_input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email" className="text-foreground text-sm font-medium">Email Address *</Label>
          <Input
            id="contact-email" type="email" required placeholder="jane@company.com" value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="rounded-xl bg-background/50 border-border/60 focus:border-primary/60 transition-smooth h-11"
            data-ocid="home.contact_email_input"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-company" className="text-foreground text-sm font-medium">Company</Label>
        <Input
          id="contact-company" placeholder="Your Company Inc." value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          className="rounded-xl bg-background/50 border-border/60 focus:border-primary/60 transition-smooth h-11"
          data-ocid="home.contact_company_input"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message" className="text-foreground text-sm font-medium">Project Brief *</Label>
        <Textarea
          id="contact-message" required rows={5}
          placeholder="Tell us about your project — what you're building, your timeline, and any specific challenges."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="rounded-xl bg-background/50 border-border/60 focus:border-primary/60 transition-smooth resize-none"
          data-ocid="home.contact_message_textarea"
        />
      </div>
      <Button
        type="submit" size="lg" disabled={submitContact.isPending}
        className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-semibold gap-2 transition-smooth w-full sm:w-auto shadow-[0_0_24px_oklch(0.75_0.12_195/0.3)] hover:shadow-[0_0_32px_oklch(0.75_0.12_195/0.5)]"
        data-ocid="home.contact_submit_button"
      >
        {submitContact.isPending ? "Sending…" : "Send Message"}
        {!submitContact.isPending && <ArrowRight className="size-4" />}
      </Button>
      {submitContact.isError && (
        <p className="text-sm text-destructive-foreground bg-destructive/20 px-4 py-2 rounded-xl" data-ocid="home.contact_error_state">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

// ─── Hero Background Blobs ────────────────────────────────────────────────────
function HeroBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="hidden md:block absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-primary/5 blur-[140px]" />
      <div className="hidden md:block absolute bottom-[-5%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
      <motion.div
        animate={{ borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        className="hidden md:block absolute bottom-[25%] left-[20%] w-48 h-48 bg-primary/5 blur-3xl"
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" aria-hidden role="presentation">
        <defs>
          <pattern id="hero-dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
    </div>
  );
}

// ─── Hero Animation ───────────────────────────────────────────────────────────
function HeroAnimation() {
  // Helper: renders one orbital ring of icons
  function OrbitRing({
    icons,
    radius,
    duration,
    dir = 1,
  }: {
    icons: { Icon: LucideIcon; angle: number }[];
    radius: number;
    duration: number;
    dir?: 1 | -1;
  }) {
    return (
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: dir * 360 }}
        transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {icons.map(({ Icon, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x   = Math.cos(rad) * radius;
          const y   = Math.sin(rad) * radius;
          return (
            <div
              key={angle}
              className="absolute"
              style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
            >
              {/* Counter-rotate so the icon stays upright */}
              <motion.div
                animate={{ rotate: -dir * 360 }}
                transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-[1.25rem] bg-card/90 border border-border/60 flex items-center justify-center backdrop-blur-md"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
              >
                <Icon className="size-8 md:size-10 text-primary/90" />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center scale-75 sm:scale-90 lg:scale-100 origin-center">
      {/* ── Static ring outlines ── */}
      <div className="absolute w-[360px] h-[360px] rounded-full border border-primary/10 pointer-events-none" />
      <div className="absolute w-[560px] h-[560px] rounded-full border border-primary/6 pointer-events-none" />

      {/* ── Conic-gradient sweep on inner ring (clockwise) ── */}
      <motion.div
        className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ background: "conic-gradient(from 0deg, transparent 62%, oklch(0.75 0.12 195 / 0.3) 100%)" }}
      />

      {/* ── Conic-gradient sweep on outer ring (counter-clockwise) ── */}
      <motion.div
        className="absolute w-[560px] h-[560px] rounded-full pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ background: "conic-gradient(from 0deg, transparent 78%, oklch(0.75 0.12 195 / 0.15) 100%)" }}
      />

      {/* ── Inner orbit: core e-commerce actions ── */}
      <OrbitRing
        icons={[
          { Icon: ShoppingCart, angle: -90 },
          { Icon: Wallet,       angle:  30 },
          { Icon: RefreshCcw,   angle: 150 },
        ]}
        radius={180}
        duration={16}
        dir={1}
      />

      {/* ── Outer orbit: ecosystem (counter-clockwise) ── */}
      <OrbitRing
        icons={[
          { Icon: Code2,       angle: -90 },
          { Icon: Users,       angle:   0 },
          { Icon: TrendingUp,  angle:  90 },
          { Icon: Globe,       angle: 180 },
        ]}
        radius={280}
        duration={28}
        dir={-1}
      />

      {/* ── Ambient background glow ── */}
      <div className="absolute w-[280px] h-[280px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

      {/* ── Central hub ── */}
      <div
        className="relative z-20 w-36 h-36 md:w-44 md:h-44 rounded-[2rem] bg-gradient-to-br from-primary/60 to-primary/20 border border-primary/50 flex items-center justify-center"
        style={{ boxShadow: "0 0 50px oklch(0.75 0.12 195 / 0.4)" }}
      >
        {/* Inner glow layer */}
        <div className="absolute inset-0 rounded-[2rem] bg-primary/20 blur-xl" />
        <Network className="relative size-16 md:size-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      </div>
    </div>
  );
}


// ─── Shape Visual Card ─────────────────────────────────────────────────────────
function ShapeCard({ shape, index }: { shape: Shape; index: number }) {
  const accent = SHAPE_ACCENTS[index % SHAPE_ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      data-ocid={`home.shape.${index + 1}`}
      className="card-fluid overflow-hidden flex flex-col h-full transition-smooth border border-border/40"
    >
      {/* Visual header */}
      <div className={`relative h-64 bg-gradient-to-br ${accent.ring} overflow-hidden flex items-center justify-center border-b border-border/30`}>
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden>
          <defs>
            <pattern id={`sg-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#sg-${index})`} />
        </svg>
        {/* Ambient glow */}
        <div className={`absolute inset-0 ${accent.glow} blur-3xl opacity-60`} />
        {/* Icon block */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: index * 0.7 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div className="w-24 h-24 rounded-3xl bg-background/85 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-xl transition-smooth">
            <DynamicIcon name={shape.iconName ?? "star"} className="size-11 text-primary" />
          </div>
          <span className={`w-2.5 h-2.5 rounded-full ${accent.dot} shadow-lg`} />
        </motion.div>
        {/* Tagline strip */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-3 bg-gradient-to-t from-card/95 to-transparent">
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary/60">
            {shape.tagline}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-display font-bold text-foreground text-xl mb-3 transition-colors">
          {shape.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
          {shape.description}
        </p>
        {shape.capabilities && shape.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {shape.capabilities?.slice(0, 4).map((cap, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary/80 font-medium"
              >
                {cap}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Industries Accordion ─────────────────────────────────────────────────────
function IndustriesFocusCarousel({
  industries,
  isLoading,
}: {
  industries: Industry[];
  isLoading: boolean;
}) {
  const [open, setOpen] = useState(0);

  if (isLoading) {
    return (
      <div className="mt-10 space-y-px">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
      </div>
    );
  }

  return (
    <div className="mt-10 border-t border-border/40">
      {industries.map((ind, i) => {
        const isOpen = i === open;
        return (
          <div key={String(ind.id)} data-ocid={`home.industry.${i + 1}`} className="border-b border-border/40">
            {/* ── Header row — always visible ── */}
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="w-full flex items-center gap-5 py-6 text-left group"
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-primary transition-smooth ${
                  isOpen ? "bg-primary/15 scale-110" : "bg-primary/6 group-hover:bg-primary/10"
                }`}
              >
                <DynamicIcon name={ind.iconName ?? "compass"} className="size-5" />
              </div>

              {/* Title */}
              <h3
                className={`flex-1 font-display font-bold text-lg md:text-xl transition-colors ${
                  isOpen ? "text-primary" : "text-foreground group-hover:text-primary/80"
                }`}
              >
                {ind.title}
              </h3>

              {/* Expand chevron */}
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 text-muted-foreground"
              >
                <ArrowRight className="size-4" />
              </motion.div>
            </button>

            {/* ── Expandable body ── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-[4.75rem] md:pr-16">
                    <p className="text-muted-foreground leading-relaxed mb-5 text-sm md:text-base max-w-2xl">
                      {ind.description}
                    </p>
                    <Link to="/solutions">
                      <Button
                        size="sm"
                        className="rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 gap-1.5 transition-smooth"
                      >
                        See Solutions <ArrowRight className="size-3.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: clients = [],    isLoading: clientsLoading    } = useClients();
  const { data: industries = [], isLoading: industriesLoading } = useIndustries();
  const { data: shapes = [],     isLoading: shapesLoading     } = useShapes();
  const { data: solutions = [],  isLoading: solutionsLoading  } = useSolutions();

  // Cycling hero headline
  const [headlineIdx, setHeadlineIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHeadlineIdx((i) => (i + 1) % HERO_HEADLINES.length), 3500);
    return () => clearInterval(id);
  }, []);

  // Solutions interactive tabs state
  const [solutionsTab, setSolutionsTab] = useState<"all" | "direct-selling" | "headless" | "subscriptions">("all");

  const filteredSolutions = useMemo(() => {
    if (solutionsTab === "all") return solutions;
    if (solutionsTab === "direct-selling") {
      return solutions.filter((sol) =>
        ["newulife", "nuvita", "wine-shop-at-home", "l-bri"].includes(sol.slug)
      );
    }
    if (solutionsTab === "headless") {
      return solutions.filter((sol) =>
        ["crunchi", "reliv", "l-bri"].includes(sol.slug)
      );
    }
    if (solutionsTab === "subscriptions") {
      return solutions.filter((sol) =>
        ["faster-way", "sana-vita"].includes(sol.slug)
      );
    }
    return solutions;
  }, [solutions, solutionsTab]);

  // Solutions Carousel API state
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;

    const updateState = () => {
      setCount(carouselApi.scrollSnapList().length);
      setCurrent(carouselApi.selectedScrollSnap() + 1);
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateState();
    carouselApi.on("select", updateState);
    carouselApi.on("reInit", updateState);

    return () => {
      carouselApi.off("select", updateState);
      carouselApi.off("reInit", updateState);
    };
  }, [carouselApi, filteredSolutions]);

  return (
    <div data-ocid="home.page">

      {/* ══════════════════════════════════════════════════════════════════════
          Section 1 · Hero
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-background"
        data-ocid="home.hero_section"
      >
        <HeroBlobs />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-24 md:pb-12 relative z-10">
          <Card className="w-full min-h-[600px] bg-background/5 border-none relative rounded-3xl backdrop-blur-sm overflow-visible">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="oklch(var(--primary))" />

            <div className="flex flex-col lg:flex-row h-full min-h-[560px] md:min-h-[620px] items-center overflow-visible">

              {/* ── Left: Copy ── */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 p-8 md:p-16 relative z-20 flex flex-col justify-center"
              >
                {/* Cycling headline — absolute positioned so long lines never clip */}
                <div className="relative w-full" style={{ minHeight: "clamp(12rem, 18vw, 15rem)" }}>
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={headlineIdx}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -32 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-0 left-0 right-0 text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight text-foreground"
                    >
                      {(() => {
                        const words = HERO_HEADLINES[headlineIdx].split(" ");
                        const last  = words[words.length - 1];
                        const rest  = words.slice(0, -1).join(" ");
                        return (
                          <>
                            {rest}{" "}
                            <span className="gradient-accent">{last}</span>
                          </>
                        );
                      })()}
                    </motion.h1>
                  </AnimatePresence>
                </div>

                {/* Metrics — sit right below headline, replacing the old body copy */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex flex-wrap items-center gap-4 md:gap-10 mt-6 mb-10"
                >
                  {[
                    { value: "$100M+", label: "Annual Volume" },
                    { value: "Dozens", label: "Countries Served" },
                    { value: "8+",     label: "Client Solutions" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-start">
                      <span className="font-display font-black text-4xl gradient-accent">
                        {stat.value}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-medium">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/solutions" data-ocid="home.hero_primary_cta">
                    <Button
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-semibold px-8 gap-2 transition-smooth shadow-[0_0_28px_oklch(0.75_0.12_195/0.4)] hover:shadow-[0_0_40px_oklch(0.75_0.12_195/0.6)] hover:-translate-y-0.5"
                    >
                      Explore Solutions <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Link to="/contact" data-ocid="home.hero_secondary_cta">
                    <Button
                      variant="outline" size="lg"
                      className="rounded-full border-border/60 hover:border-primary/50 text-foreground font-semibold px-8 transition-smooth hover:bg-primary/5 hover:-translate-y-0.5"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* ── Right: Animation ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="hidden lg:flex flex-1 relative w-full h-[500px] sm:h-[580px] lg:h-[700px] z-10 overflow-visible"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <HeroAnimation />
              </motion.div>
            </div>
          </Card>
        </div>

        {/* Seamless Client Logos Ticker */}
        <div className="w-full relative z-20 overflow-hidden pb-24">
          {clientsLoading ? (
            <div className="flex justify-center gap-x-10 py-4 px-6">
              {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-8 w-24 rounded-lg" />)}
            </div>
          ) : (
            <LogoTicker clients={clients} />
          )}
        </div>

        <WaveDivider fill="oklch(0.18 0.05 270)" path="M0,33 C480,55 960,11 1440,33 L1440,50 L0,50 Z" height={50} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 2 · Our Approach
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-card py-20 md:py-28" data-ocid="home.about_section">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-28"
            >
              <SectionHeading eyebrow="About Us" title="ShapeTech Solutions" align="left" />

              <p className="text-foreground/90 font-medium leading-relaxed text-lg md:text-xl mb-6 -mt-6">
                ShapeTech Solutions is a team of E-Commerce specialists. We set out each day to redefine
                the marketing, selling, and distribution of products &amp; services for both individual
                clients and entire industries.
              </p>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
                What has evolved over 7+ years of business is an ever-growing portfolio of E-Commerce
                solutions that are shaping an entirely new future for e-commerce, all created and supported
                by our team of experts. We design, develop, and grow our solutions in tandem with clients
                and industries over the course of years.
              </p>

              <div>
                <Link to="/about" data-ocid="home.about_cta">
                  <Button className="rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 gap-2 transition-smooth hover:-translate-y-0.5">
                    Learn More About Us <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Capability Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 flex flex-col justify-center gap-3 md:gap-4"
            >
              {[
                { label: "E-Commerce Sites", icon: ShoppingCart },
                { label: "Subscription Engines", icon: RefreshCcw },
                { label: "Point-of-Sale Systems", icon: CreditCard },
                { label: "Order Management Systems", icon: Package },
                { label: "Alternative Payment Methods", icon: Wallet },
              ].map((cap, i) => {
                const IconComponent = cap.icon;
                return (
                  <div
                    key={cap.label}
                    className="group relative flex items-center gap-5 p-4 rounded-2xl bg-card/20 border border-border/30 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="size-6" />
                    </div>
                    <h4 className="text-foreground font-semibold text-lg md:text-xl group-hover:text-primary transition-colors duration-300">
                      {cap.label}
                    </h4>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <WaveDivider fill="oklch(0.13 0.05 267)" path="M0,35 C720,70 1080,0 1440,35 L1440,70 L0,70 Z" />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 3 · Industries We Work In
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-background py-20 md:py-28" data-ocid="home.industries_section">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="Industries"
            title="Industries We Work In"
            subtitle="We set out to reshape e-commerce inside the industries we work in."
          />

          <IndustriesFocusCarousel industries={industries} isLoading={industriesLoading} />
        </div>

        <WaveDivider fill="oklch(0.18 0.05 270)" path="M0,0 C480,70 960,0 1440,50 L1440,70 L0,70 Z" />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 4 · Shapes
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-card py-20 md:py-28" data-ocid="home.shapes_section">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="Shapes"
            title="Shapes"
            subtitle="Each Shape has been built to transform how e-commerce happens in that market."
            gradient
          />

          {shapesLoading ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {shapes.map((shape, i) => (
                <ShapeCard key={String(shape.id)} shape={shape} index={i} />
              ))}
            </div>
          )}
        </div>

        <WaveDivider fill="oklch(0.13 0.05 267)" path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" height={60} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 5 · Solutions
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-background py-20 md:py-28 overflow-hidden" data-ocid="home.solutions_section">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="Solutions"
            title="Solutions for our Clients"
            gradient
          />

          {/* Interactive tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: "all", label: "All Cases" },
              { id: "direct-selling", label: "Direct Selling & Affiliate" },
              { id: "headless", label: "Headless E-Commerce" },
              { id: "subscriptions", label: "Subscription Platforms" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSolutionsTab(tab.id as any)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                  solutionsTab === tab.id
                    ? "bg-primary border-primary text-background shadow-[0_0_20px_oklch(var(--primary)/0.3)] scale-105"
                    : "bg-card/40 border-border/40 text-muted-foreground hover:text-foreground hover:bg-card/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {solutionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full mt-4 overflow-hidden"
            >
              <CarouselContent className="-ml-6">
                {filteredSolutions.map((sol, index) => {
                  const logoSrc = clientLogoUrl(sol.slug);
                  return (
                    <CarouselItem
                      key={String(sol.id)}
                      className="pl-6 md:basis-1/2 lg:basis-1/3"
                    >
                      <div
                        data-ocid={`home.solution.${sol.slug}`}
                        className="group card-fluid p-0 flex flex-col justify-between relative overflow-hidden h-full hover:border-primary/30 transition-smooth"
                      >
                        <div>
                          {/* Logo header */}
                          <div className="relative h-44 flex-shrink-0 flex items-center justify-center border-b border-border/30 overflow-hidden"
                            style={{ background: "oklch(0.16 0.04 270 / 0.9)" }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-32 h-32 rounded-full bg-primary/6 blur-2xl" />
                            </div>
                            {logoSrc ? (
                              <img
                                src={logoSrc}
                                alt={`${sol.title} logo`}
                                className="relative z-10 max-h-14 max-w-[160px] object-contain"
                                style={{ filter: "brightness(0) invert(1)", opacity: 0.65 }}
                              />
                            ) : (
                              <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <DynamicIcon name={sol.iconName ?? "landmark"} className="size-8 text-primary/60" />
                              </div>
                            )}
                            
                            {/* Industry badge overlay */}
                            {sol.industryName && (
                              <span className="absolute bottom-3 left-4 text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-background/80 border border-border/40 text-foreground/90 backdrop-blur-sm z-20">
                                {sol.industryName}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="font-display font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                              {sol.title}
                            </h3>
                            <p className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-4">
                              {sol.tagline}
                            </p>
                            
                            <p className="text-foreground/90 text-xs leading-relaxed mb-5">
                              {sol.description}
                            </p>

                            {/* Bullet points */}
                            <div className="space-y-2 mb-5">
                              {sol.features?.slice(0, 3).map((f) => (
                                <div key={f} className="flex items-center gap-2">
                                  <CheckCircle2 className="size-3 text-primary/70 flex-shrink-0" />
                                  <span className="text-[11px] text-foreground font-medium">{f}</span>
                                </div>
                              ))}
                            </div>

                            {/* Tech tags */}
                            {sol.technologies && sol.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-border/20">
                                {sol.technologies?.map((t) => (
                                  <span key={t} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/40 text-zinc-100">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Footer link */}
                        <div className="p-6 pt-0 mt-auto">
                          <Link
                            to="/solutions/$solutionId"
                            params={{ solutionId: sol.slug }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-primary group-hover:text-primary-foreground group-hover:bg-primary/20 px-3.5 py-1.5 rounded-full transition-smooth border border-primary/20"
                          >
                            View Case Study
                            <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Controls footer row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => carouselApi?.scrollPrev()}
                    disabled={!canScrollPrev}
                    className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
                    aria-label="Previous solution"
                  >
                    <ArrowRight className="size-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => carouselApi?.scrollNext()}
                    disabled={!canScrollNext}
                    className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
                    aria-label="Next solution"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: count }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => carouselApi?.scrollTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === current - 1
                          ? "w-6 h-2 bg-primary"
                          : "w-2 h-2 bg-border hover:bg-primary/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <span className="text-xs text-muted-foreground font-semibold tabular-nums min-w-[3rem] text-right">
                  {current} / {count}
                </span>
              </div>
            </Carousel>
          )}
        </div>

        <WaveDivider fill="oklch(0.18 0.05 270)" path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" height={60} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 6 · Contact
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-card py-20 md:py-28 overflow-hidden" data-ocid="home.contact_section">
        <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden />
        <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" aria-hidden />

        <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                eyebrow="Contact Us"
                title="Let's Talk"
                subtitle="Have a project in mind? Tell us what you're working on and we'll get back to you within 24 hours."
                align="left"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-fluid p-8 relative"
              style={{
                boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px oklch(0.28 0.05 270 / 0.6)",
                background: "oklch(0.23 0.04 270 / 0.9)", // Lighter shade to stand out from the bg-card section background
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-2xl pointer-events-none" aria-hidden>
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-xl" />
              </div>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
