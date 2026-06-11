import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Spotlight } from "@/components/ui/spotlight";
import LogoTicker from "@/components/LogoTicker";
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
  Users,
  Compass,
  Wallet,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useEffect, useRef, useState } from "react";

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
  "Shaping the Future of Commerce",
] as const;

// Lookup for client website URLs used for screenshot thumbnails
const SOLUTION_URLS: Record<string, string> = {
  crunchi:           "https://crunchi.com",
  newulife:          "https://newulife.com",
  nuvita:            "https://nuvitaglobal.com",
  "faster-way":      "https://fasterwaytoweightloss.com",
  "wine-shop-at-home": "https://wineshopathome.com",
  reliv:             "https://reliv.com",
  sannavita:         "https://sannavita.com",
  "li-bri":          "https://libri.com",
};

// Per-shape accent colours (index 0-3)
const SHAPE_ACCENTS = [
  { ring: "from-cyan-500/30 to-primary/10",    dot: "bg-cyan-400",    glow: "bg-cyan-500/10"    },
  { ring: "from-amber-400/30 to-orange-500/10", dot: "bg-amber-400",  glow: "bg-amber-500/10"   },
  { ring: "from-violet-500/30 to-primary/10",  dot: "bg-violet-400",  glow: "bg-violet-500/10"  },
  { ring: "from-emerald-500/30 to-teal-500/10",dot: "bg-emerald-400", glow: "bg-emerald-500/10" },
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

function screenshotUrl(slug: string) {
  const url = SOLUTION_URLS[slug];
  if (!url) return "";
  return `https://image.thum.io/get/width/600/crop/380/npa/${url}`;
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
      <h2 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 ${gradient ? "gradient-accent" : "text-foreground"}`}>
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
      <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-primary/8 blur-[140px]" />
      <div className="absolute bottom-[-5%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
      <motion.div
        animate={{ borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[25%] left-[20%] w-48 h-48 bg-primary/4 blur-3xl"
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

// ─── Hero Animation Placeholder ───────────────────────────────────────────────
function HeroAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outermost halo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[560px] h-[560px] rounded-full border border-primary/5"
          style={{ background: "conic-gradient(from 0deg, transparent 80%, oklch(0.75 0.12 195 / 0.08) 100%)" }}
        />
      </div>
      {/* Outer ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[440px] h-[440px] rounded-full border border-primary/10"
          style={{ background: "conic-gradient(from 0deg, transparent 70%, oklch(0.75 0.12 195 / 0.18) 100%)" }}
        />
      </div>
      {/* Inner ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-[310px] h-[310px] rounded-full border border-primary/15"
          style={{ background: "conic-gradient(from 180deg, transparent 60%, oklch(0.75 0.12 195 / 0.14) 100%)" }}
        />
      </div>
      {/* Center orb */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          boxShadow: [
            "0 0 60px oklch(0.75 0.12 195 / 0.35)",
            "0 0 120px oklch(0.75 0.12 195 / 0.55)",
            "0 0 60px oklch(0.75 0.12 195 / 0.35)",
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="relative w-44 h-44 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 flex items-center justify-center z-10"
      >
        <ShoppingCart className="size-16 text-primary-foreground" />
      </motion.div>
      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={deg}
          animate={{ rotate: 360 }}
          transition={{ duration: 12 + i * 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute w-[380px] h-[380px] flex items-start justify-center"
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + i * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-3.5 h-3.5 rounded-full bg-primary mt-2"
          />
        </motion.div>
      ))}
      {/* Floating labels */}
      {[
        { label: "Commerce", angle: -40,  radius: 265 },
        { label: "Scale",    angle:  50,  radius: 258 },
      ].map(({ label, angle, radius }) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute px-3 py-1.5 rounded-full bg-card border border-border/60 text-xs font-semibold text-muted-foreground shadow-sm"
            style={{ transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)` }}
          >
            {label}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Solution Image Card ───────────────────────────────────────────────────────
function SolutionCard({ sol, index }: { sol: Solution; index: number }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = screenshotUrl(sol.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      data-ocid={`home.solution.${index + 1}`}
      className="group card-fluid overflow-hidden flex flex-col h-full hover:border-primary/30 transition-smooth"
    >
      {/* Screenshot / image area */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex-shrink-0">
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={`${sol.title} website`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <DynamicIcon name={sol.iconName ?? "landmark"} className="size-16 text-primary/15" />
          </div>
        )}
        {/* Bottom fade + icon badge */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4">
          <div className="w-9 h-9 rounded-xl bg-card/90 backdrop-blur-sm border border-border/60 flex items-center justify-center text-primary shadow-sm">
            <DynamicIcon name={sol.iconName ?? "landmark"} className="size-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
          {sol.title}
        </h3>
        <p className="text-xs text-primary/80 font-semibold mb-5 uppercase tracking-wide">
          {sol.tagline}
        </p>
        <div className="mt-auto">
          <Link
            to={`/solutions#${sol.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary border border-primary/25 hover:border-primary/50 hover:bg-primary/5 px-3 py-1.5 rounded-full transition-smooth"
          >
            View Details
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
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
      className="group card-fluid overflow-hidden flex flex-col h-full hover:border-primary/30 transition-smooth"
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
          <div className="w-24 h-24 rounded-3xl bg-background/85 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-xl group-hover:scale-110 transition-smooth">
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
        <h3 className="font-display font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-colors">
          {shape.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
          {shape.description}
        </p>
        {shape.capabilities && shape.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {shape.capabilities.slice(0, 4).map((cap, idx) => (
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

// ─── Industry Row ──────────────────────────────────────────────────────────────
function IndustryRow({ ind, index }: { ind: Industry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`home.industry.${index + 1}`}
      className="group relative border-b border-border/40 transition-smooth hover:bg-primary/[0.02]"
    >
      <div className="container max-w-7xl mx-auto py-6 lg:py-8 relative z-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12">
        {/* Number + icon */}
        <div className="flex items-center gap-5 lg:min-w-[220px]">
          <span className="font-display font-bold text-4xl lg:text-5xl text-primary/10 group-hover:text-primary/25 transition-smooth tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/15 transition-smooth">
            <DynamicIcon name={ind.iconName ?? "compass"} className="size-6" />
          </div>
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-xl lg:text-2xl text-foreground group-hover:text-primary transition-smooth">
            {ind.title}
          </h3>
          {/* Description visible on mobile always, desktop on hover */}
          <div className="lg:hidden mt-2">
            <p className="text-muted-foreground text-sm leading-relaxed">{ind.description}</p>
          </div>
        </div>

        {/* Description – desktop hover reveal */}
        <div className="hidden lg:block flex-[1.4] max-w-xl opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-smooth delay-75">
          <p className="text-muted-foreground text-base leading-relaxed">{ind.description}</p>
        </div>

        {/* CTA button */}
        <div className="lg:ml-auto flex-shrink-0">
          <Link to="/solutions">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-border/50 hover:border-primary/40 hover:bg-primary/5 text-sm gap-1.5 text-foreground transition-smooth opacity-60 group-hover:opacity-100"
            >
              See Solutions
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
    </motion.div>
  );
}

// ─── Solutions Carousel ───────────────────────────────────────────────────────
function SolutionsCarousel({
  solutions,
  isLoading,
}: {
  solutions: Solution[];
  isLoading: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Card width + gap in px — must match the inline style below
  const CARD_W  = 320;
  const GAP     = 20;
  const STEP    = CARD_W + GAP;

  const total = solutions.length;

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, total - 1));
    setActiveIdx(clamped);
    trackRef.current?.scrollTo({ left: clamped * STEP, behavior: "smooth" });
  };

  // Keep dot indicator in sync when user drags/scrolls manually
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / STEP);
    setActiveIdx(Math.max(0, Math.min(idx, total - 1)));
  };

  if (isLoading) {
    return (
      <div className="flex gap-5">
        {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Left / Right fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Scrollable track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Leading spacer so first card isn't flush to edge */}
        <div className="flex-shrink-0 w-4" />
        {solutions.map((sol, i) => (
          <div
            key={String(sol.id)}
            className="flex-shrink-0"
            style={{ width: CARD_W, scrollSnapAlign: "start" }}
          >
            <SolutionCard sol={sol} index={i} />
          </div>
        ))}
        {/* Trailing spacer */}
        <div className="flex-shrink-0 w-4" />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-6 px-2">
        {/* Prev / Next arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
            aria-label="Previous solution"
          >
            <ArrowRight className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(activeIdx + 1)}
            disabled={activeIdx >= total - 1}
            className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
            aria-label="Next solution"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {solutions.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to solution ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="text-xs text-muted-foreground tabular-nums">
          {activeIdx + 1} / {total}
        </span>
      </div>
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

  return (
    <div data-ocid="home.page">

      {/* ══════════════════════════════════════════════════════════════════════
          Section 1 · Hero
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden bg-background"
        data-ocid="home.hero_section"
      >
        <HeroBlobs />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-24 md:pb-24 relative z-10">
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
                <div className="relative w-full" style={{ minHeight: "clamp(9rem, 18vw, 14rem)" }}>
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
                  className="flex flex-wrap items-center gap-10 mt-6 mb-10"
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

        <WaveDivider fill="oklch(0.18 0.05 270)" path="M0,33 C480,55 960,11 1440,33 L1440,50 L0,50 Z" height={50} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Client Logos Ticker
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="w-full relative z-20 overflow-hidden pb-6"
        style={{ background: "oklch(0.13 0.05 267)" }}
        data-ocid="home.clients_ticker"
      >
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 pt-6 pb-4">
          Trusted by Commerce Teams
        </p>
        {clientsLoading ? (
          <div className="flex justify-center gap-x-10 py-4 px-6">
            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-8 w-24 rounded-lg" />)}
          </div>
        ) : (
          <LogoTicker clients={clients} />
        )}
      </div>

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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading eyebrow="Our Approach" title="We build. We solve. We deliver." align="left" />

            <div className="max-w-3xl">
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                ShapeTech Solutions is a team of Commerce specialists. We set out each day to redefine
                the marketing, selling, and distribution of products &amp; services for both individual
                clients and entire industries. We have created commerce-focused experiences and
                applications in almost every shape &amp; form.
              </p>
            </div>

            {/* Capability list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-10 max-w-3xl">
              {[
                { icon: "ShoppingCart", label: "E-Commerce Sites"             },
                { icon: "Smartphone",   label: "Commerce-Focused Mobile Apps" },
                { icon: "RefreshCcw",   label: "Subscription Engines"         },
                { icon: "CreditCard",   label: "Point-of-Sale Systems"        },
                { icon: "Package",      label: "Order Management Systems"     },
                { icon: "Wallet",       label: "Alternative Payment Methods"  },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-background/60 border border-border/40 hover:border-primary/30 hover:bg-primary/[0.03] transition-smooth"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <DynamicIcon name={icon} className="size-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">{label}</span>
                </div>
              ))}
            </div>

            <div className="max-w-3xl">
              <p className="text-muted-foreground leading-relaxed text-base mb-8">
                What has evolved over 7+ years of business is an ever-growing portfolio of Commerce
                solutions that are shaping an entirely new future for commerce, all created and supported
                by our team of experts. We design, develop, and grow our solutions in tandem with clients
                and industries over the course of years.
              </p>
              <Link to="/about" data-ocid="home.about_cta">
                <Button className="rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 gap-2 transition-smooth hover:-translate-y-0.5">
                  Learn More About Us <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
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
            subtitle="We set out to reshape commerce inside the industries we work in."
          />

          {industriesLoading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
            </div>
          ) : (
            <div className="flex flex-col border-t border-border/40 mt-10">
              {industries.map((ind, i) => (
                <IndustryRow key={String(ind.id)} ind={ind} index={i} />
              ))}
            </div>
          )}
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
            subtitle="Each Shape has been built to transform how commerce happens in that market."
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
            subtitle="Our solutions are built at the end of the day to power commerce for our clients. See each solution and its results in action."
            gradient
          />

          <SolutionsCarousel solutions={solutions} isLoading={solutionsLoading} />
        </div>

        <WaveDivider fill="oklch(0.18 0.05 270)" path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" height={60} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 6 · Contact
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-card py-20 md:py-28 overflow-hidden" data-ocid="home.contact_section">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" aria-hidden />

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
              <ul className="flex flex-col gap-4 mt-6">
                {[
                  "Commission and compensation plan engineering",
                  "Headless Shopify or Medusa builds",
                  "Distributor back-office and portal development",
                  "Subscription and recurring billing platforms",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="size-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-fluid p-8 relative"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px oklch(0.28 0.05 270 / 0.6)" }}
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