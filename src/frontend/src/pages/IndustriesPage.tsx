import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIndustries } from "@/hooks/use-backend";
import type { Industry } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CreditCard,
  HeartPulse,
  Landmark,
  Network,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

// ---------------------------------------------------------------------------
// Icon resolver — maps iconName strings to Lucide components
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, React.ElementType> = {
  Network,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Sparkles,
  Users,
  BookOpen,
  CreditCard,
};

function IndustryIcon({
  name,
  className,
}: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Network;
  return <Icon className={className} />;
}

// ---------------------------------------------------------------------------
// SVG Wave Divider
// ---------------------------------------------------------------------------
function WaveDivider({
  topColor,
  bottomColor,
  flip = false,
}: {
  topColor: string;
  bottomColor: string;
  flip?: boolean;
}) {
  return (
    <div
      className="relative w-full overflow-hidden -my-px"
      style={{ height: 80 }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="80" fill={topColor} />
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Featured Industry — full-width hero card (Direct Selling)
// ---------------------------------------------------------------------------
function FeaturedCard({ industry }: { industry: Industry }) {
  const features = industry.highlights ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      data-ocid="industries.featured_card"
      className="col-span-full relative overflow-hidden"
      style={{ borderRadius: "28px 8px 28px 8px" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.06 268) 0%, oklch(0.16 0.09 262) 55%, oklch(0.20 0.06 268) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, oklch(0.75 0.12 195) 0 3px, transparent 3px 26px)",
        }}
        aria-hidden="true"
      />
      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.12 195), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.12 195), transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Border ring */}
      <div
        className="absolute inset-0 border border-primary/25 pointer-events-none"
        style={{ borderRadius: "28px 8px 28px 8px" }}
        aria-hidden="true"
      />

      <div className="relative p-8 md:p-14 grid md:grid-cols-2 gap-10 items-start">
        {/* Left column */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-7">
            {/* Organic blob icon */}
            <div
              className="w-16 h-16 flex items-center justify-center text-primary"
              style={{
                background: "oklch(0.75 0.12 195 / 0.18)",
                borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%",
                border: "1px solid oklch(0.75 0.12 195 / 0.35)",
              }}
            >
              <IndustryIcon name={industry.iconName} className="size-7" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
              <Star className="size-3" />
              Core Specialty
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-[1.1] mb-5">
            {industry.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 text-base max-w-lg">
            {industry.description}
          </p>

          <Link to="/contact" data-ocid="industries.featured_cta">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 transition-smooth rounded-xl shadow-elevated">
              Start a Project <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Right column — key features */}
        {features.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Key Capabilities
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                  className="flex items-start gap-2.5 text-sm text-foreground p-3 rounded-xl bg-background/25 border border-border/40"
                >
                  <CheckCircle2 className="size-4 text-primary flex-shrink-0 mt-0.5" />
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Standard Industry Card
// ---------------------------------------------------------------------------

// Alternating organic border-radius shapes
const CARD_RADII = [
  "8px 28px 8px 28px",
  "28px 8px 28px 8px",
  "20px 6px 20px 6px",
  "6px 20px 6px 20px",
  "18px 18px 4px 18px",
  "4px 18px 18px 4px",
];

function IndustryCard({
  industry,
  index,
}: { industry: Industry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      data-ocid={`industries.item.${index + 1}`}
      className="group relative overflow-hidden bg-card border border-border hover:border-primary/40 transition-smooth card-fluid flex flex-col"
      style={{ borderRadius: CARD_RADII[index % CARD_RADII.length] }}
    >
      {/* Hover gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.07) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-smooth"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 195 / 0.8), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative p-7 flex flex-col h-full">
        {/* Blob icon */}
        <div
          className="w-12 h-12 flex items-center justify-center mb-5 text-primary group-hover:scale-110 transition-smooth"
          style={{
            background: "oklch(0.75 0.12 195 / 0.12)",
            borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%",
            border: "1px solid oklch(0.75 0.12 195 / 0.22)",
          }}
        >
          <IndustryIcon name={industry.iconName} className="size-5" />
        </div>

        <h3 className="font-display font-bold text-foreground text-lg mb-3 leading-snug">
          {industry.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
          {industry.description}
        </p>

        {/* Tag chips */}
        {industry.highlights && industry.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
            {industry.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="text-xs px-2.5 py-1 rounded-full bg-primary/[0.08] text-muted-foreground border border-primary/[0.15]"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton loading
// ---------------------------------------------------------------------------
function IndustriesSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <div key={i} className="bg-card rounded-3xl border border-border p-7">
          <Skeleton className="w-12 h-12 rounded-2xl mb-5" />
          <Skeleton className="h-5 w-2/3 mb-3" />
          <Skeleton className="h-4 w-full mb-1.5" />
          <Skeleton className="h-4 w-4/5 mb-1.5" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function IndustriesPage() {
  const { data: industries, isLoading } = useIndustries();

  const featured = industries?.find((ind) => ind.featured);
  const rest = industries?.filter((ind) => !ind.featured) ?? [];

  return (
    <div data-ocid="industries.page">
      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden bg-card py-24 lg:py-36"
        data-ocid="industries.hero_section"
      >
        {/* Organic animated blobs */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] opacity-[0.11]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.12 195), transparent 65%)",
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
            animation: "flowing 12s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.12 195), transparent 65%)",
            borderRadius: "40% 60% 30% 70% / 60% 30% 70% 40%",
            animation: "flowing 9s ease-in-out infinite reverse",
          }}
          aria-hidden="true"
        />

        <div className="relative container max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10"
              data-ocid="industries.hero_badge"
            >
              Industries We Serve
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-6xl text-foreground leading-[1.05] mb-6">
              Deep <span className="gradient-accent">Industry Expertise</span>{" "}
              That Delivers
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Shapetech Solutions has built mission-critical technology across
              the most demanding sectors. Our deep domain knowledge means faster
              delivery, fewer re-works, and better outcomes for your business —
              no matter your industry.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="flex flex-wrap gap-5 mt-12"
          >
            {[
              { value: "7+", label: "Verticals mastered" },
              { value: "150+", label: "Projects delivered" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-3 rounded-2xl bg-background/40 border border-border backdrop-blur-sm"
              >
                <p className="font-display font-bold text-2xl text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <WaveDivider
        topColor="oklch(0.18 0.05 270)"
        bottomColor="oklch(0.12 0.06 267)"
      />

      {/* ── Industries Grid ── */}
      <section
        className="bg-background py-20 lg:py-28"
        data-ocid="industries.list_section"
      >
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-14"
          >
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              Industries We've{" "}
              <span className="gradient-accent">Transformed</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Deep expertise across sectors means we speak your language —
              whether you're in network marketing, retail, professional
              services, or beyond.
            </p>
          </motion.div>

          {isLoading ? (
            <IndustriesSkeleton />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Featured spans full width */}
              {featured && <FeaturedCard industry={featured} />}

              {/* Standard cards — responsive 1/2/3 columns */}
              {rest.map((industry, i) => (
                <IndustryCard
                  key={String(industry.id)}
                  industry={industry}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <WaveDivider
        topColor="oklch(0.12 0.06 267)"
        bottomColor="oklch(0.18 0.05 270)"
        flip
      />

      {/* ── Why Shapetech strip ── */}
      <section
        className="bg-card py-20 lg:py-24"
        data-ocid="industries.why_section"
      >
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
              Why Choose Us
            </span>
            <h2 className="font-display font-bold text-4xl text-foreground leading-tight mb-4">
              Built on Industry Knowledge,{" "}
              <span className="gradient-accent">Not Just Code</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Generic agencies learn your industry on your dime. We come
              pre-loaded with the domain expertise that makes your project
              succeed from day one.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🧭",
                title: "Domain-First Discovery",
                body: "Every engagement starts with a deep dive into your vertical — its workflows, compliance requirements, and growth dynamics.",
              },
              {
                icon: "⚙️",
                title: "Industry-Tuned Tech",
                body: "We reuse battle-tested vertical components — commission engines, genealogy trees, compliance layers — so you ship faster.",
              },
              {
                icon: "🚀",
                title: "Proven Track Record",
                body: "Over 150 projects across 7+ verticals. From startups to Fortune 500 companies — the patterns we've learned mean fewer surprises and faster ROI.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-7 rounded-2xl bg-background/50 border border-border/60"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider
        topColor="oklch(0.18 0.05 270)"
        bottomColor="oklch(0.12 0.06 267)"
      />

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden bg-background py-24"
        data-ocid="industries.cta_section"
      >
        <div
          className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] opacity-[0.09]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.12 195), transparent 65%)",
            borderRadius: "50% 50% 60% 40% / 40% 60% 40% 60%",
          }}
          aria-hidden="true"
        />

        <div className="relative container max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
              Let's Work Together
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Is Your Industry Not Listed?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              We build custom solutions for any vertical. Our engineering
              practices and technology expertise translate across industries —
              tell us about your unique challenges and we'll build the solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" data-ocid="industries.cta_contact_button">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 px-8 transition-smooth rounded-xl shadow-elevated">
                  Discuss Your Project <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/solutions" data-ocid="industries.cta_solutions_button">
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted/60 font-semibold px-8 transition-smooth rounded-xl"
                >
                  View Our Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
