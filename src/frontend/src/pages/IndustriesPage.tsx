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
  GraduationCap,
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
  GraduationCap,
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
// Industry Stack Card — New sophisticated stacking design
// ---------------------------------------------------------------------------
function IndustryStackCard({
  industry,
  index,
  total,
}: {
  industry: Industry;
  index: number;
  total: number;
}) {
  const isDirectSelling = industry.title.toLowerCase().includes("direct selling");
  const isHealthWellness = industry.title.toLowerCase().includes("health");
  const isEcommerce = industry.title.toLowerCase().includes("e-commerce") || industry.title.toLowerCase().includes("retail");

  // Custom radii for the premium look
  const borderRadius = "28px 8px 28px 8px";

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-20 md:top-24 w-full mb-20 md:mb-32 last:mb-0 pt-10"
      style={{ zIndex: index + 1 }}
      data-ocid={`industries.stack_card.${index + 1}`}
    >
      {/* Inner wrapper — relative so peek strips and main card share the same stacking context */}
      <div className="relative">
        {/* Deck strip — third card back (deepest, most offset) */}
        {index < total - 2 && (
          <div
            className="absolute inset-x-[6%] inset-y-0 pointer-events-none rounded-[28px_8px_28px_8px]"
            style={{
              top: -28,
              background: "linear-gradient(135deg, oklch(0.14 0.035 265), oklch(0.11 0.025 262))",
              borderRadius,
              border: "1px solid oklch(0.75 0.12 195 / 0.12)",
              zIndex: 1,
              opacity: 0.75,
              boxShadow: "0 -4px 20px rgba(0,0,0,0.25)",
            }}
          />
        )}
        {/* Deck strip — second card back (closer) */}
        {index < total - 1 && (
          <div
            className="absolute inset-x-[3%] inset-y-0 pointer-events-none"
            style={{
              top: -14,
              background: "linear-gradient(135deg, oklch(0.17 0.05 267), oklch(0.14 0.05 264))",
              borderRadius,
              border: "1px solid oklch(0.75 0.12 195 / 0.16)",
              zIndex: 2,
              opacity: 0.85,
              boxShadow: "0 -4px 16px rgba(0,0,0,0.2)",
            }}
          />
        )}

        {/* Main card — sits on top of the deck strips */}
        <div
          className="relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] min-h-[480px] md:min-h-[450px] flex flex-col md:flex-row"
          style={{
            borderRadius,
            background: "oklch(0.18 0.05 270)",
            border: "1px solid oklch(0.75 0.12 195 / 0.15)",
            zIndex: 3,
          }}
        >
          {/* Background Decorative Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${isDirectSelling
                  ? "oklch(0.20 0.06 268) 0%, oklch(0.16 0.09 262) 100%"
                  : isEcommerce
                    ? "oklch(0.18 0.05 270) 0%, oklch(0.22 0.08 260) 100%"
                    : "oklch(0.18 0.05 270) 0%, oklch(0.14 0.04 265) 100%"
                  })`,
              }}
            />
            {/* Subtle Grid / Texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, oklch(0.75 0.12 195) 0 1px, transparent 1px 40px)",
              }}
            />
            {/* Glow Blobs */}
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-[0.12]"
              style={{
                background: "radial-gradient(circle, oklch(0.75 0.12 195), transparent 70%)",
              }}
            />
          </div>

          {/* Content Layout */}
          <div className="relative z-10 flex flex-col md:flex-row w-full p-6 md:p-14 gap-8 md:gap-12 lg:gap-20">
            {/* Left Column: Information */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-primary"
                  style={{
                    background: "oklch(0.75 0.12 195 / 0.12)",
                    borderRadius: "20px 6px 20px 6px",
                    border: "1px solid oklch(0.75 0.12 195 / 0.25)",
                  }}
                >
                  <IndustryIcon name={industry.iconName} className="size-5 md:size-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70 block mb-0.5 md:mb-1">
                    Industry Focus
                  </span>
                  <h3 className="font-display font-bold text-foreground text-xl md:text-2xl lg:text-3xl leading-tight">
                    {industry.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl">
                {industry.description}
              </p>

              <div className="mt-auto mb-8 md:mb-0">
                <Link to="/contact">
                  <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 transition-smooth shadow-[0_0_24px_oklch(0.75_0.12_195/0.3)] hover:shadow-[0_0_32px_oklch(0.75_0.12_195/0.45)]">
                    Start a Project
                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Key Capabilities (Single Column as requested) */}
            <div className="md:w-[320px] lg:w-[380px] shrink-0">
              <div className="bg-background/20 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-8 h-full relative">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <Sparkles className="size-4 text-primary" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/80">
                    Key Capabilities
                  </span>
                </div>

                <ul className="space-y-3 md:space-y-4">
                  {(industry.highlights || []).map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                      className="flex items-start gap-3 md:gap-4 group/item"
                    >
                      <div className="mt-1 size-4 md:size-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors">
                        <CheckCircle2 className="size-2.5 md:size-3 text-primary" />
                      </div>
                      <span className="text-xs md:text-sm lg:text-base text-foreground/90 leading-tight">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Counter for visual flair */}
                <div className="absolute bottom-4 right-6 md:bottom-6 md:right-8 opacity-[0.05] select-none pointer-events-none">
                  <span className="font-display font-black text-6xl md:text-7xl lg:text-8xl">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function IndustriesPage() {
  const { data: industries, isLoading } = useIndustries();

  return (
    <div data-ocid="industries.page">
      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden bg-card py-16 md:py-24"
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

      {/* ── Industries Stack ── */}
      <section
        className="bg-background py-16 md:py-24"
        data-ocid="industries.list_section"
      >
        <div className="container max-w-6xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-20"
          >
            <h2 className="font-display font-bold text-4xl lg:text-6xl text-foreground leading-tight mb-4">
              Industries We've <br />
              <span className="gradient-accent">Transformed</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We bring deep domain expertise to every engagement, crafting tailored
              technology solutions that address the unique challenges of your vertical.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-full h-[400px] rounded-[28px]" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col relative">
              {/* Combine and sort for the stack */}
              {(() => {
                const ECOMMERCE_FALLBACK: Industry = {
                  id: "ecommerce-fallback",
                  title: "E-Commerce & Retail",
                  description: "Scaling high-volume retail platforms with custom headless architectures, sophisticated inventory management, and integrated loyalty systems.",
                  iconName: "ShoppingCart",
                  highlights: [
                    "Headless Commerce Architectures",
                    "Multi-channel Inventory Sync",
                    "Custom Loyalty & Rewards Engines",
                    "High-Performance Checkout Flows",
                    "Advanced Personalization Systems"
                  ],
                  featured: false
                };

                const allIndustries = industries || [];
                const hasEcommerce = allIndustries.some(ind =>
                  ind.title.toLowerCase().includes("e-commerce") ||
                  ind.title.toLowerCase().includes("retail")
                );
                const displayIndustries = hasEcommerce ? allIndustries : [...allIndustries, ECOMMERCE_FALLBACK];

                // Priority-based sorting
                const getPriority = (title: string) => {
                  const t = title.toLowerCase();
                  if (t.includes("direct selling")) return 1;
                  if (t.includes("e-commerce") || t.includes("retail")) return 2;
                  if (t.includes("health")) return 3;
                  return 99;
                };

                const sorted = [...displayIndustries].sort((a, b) =>
                  getPriority(a.title) - getPriority(b.title)
                );

                return sorted.map((industry, i) => (
                  <IndustryStackCard
                    key={String(industry.id)}
                    industry={industry}
                    index={i}
                    total={sorted.length}
                  />
                ));
              })()}
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
        className="bg-card py-16"
        data-ocid="industries.why_section"
      >
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
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
        className="relative overflow-hidden bg-background py-16 md:py-20"
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
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 px-8 transition-smooth shadow-[0_0_24px_oklch(0.75_0.12_195/0.3)] hover:shadow-[0_0_32px_oklch(0.75_0.12_195/0.45)]">
                  Discuss Your Project <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/solutions" data-ocid="industries.cta_solutions_button">
                <Button
                  variant="outline"
                  className="rounded-full border-border/60 hover:border-primary/40 text-foreground hover:bg-primary/5 font-semibold px-8 transition-smooth"
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
