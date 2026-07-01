import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Hexagon, RefreshCcw, Wallet, ShoppingCart, Network, Activity } from "lucide-react";
import { motion } from "motion/react";
import { useShapes } from "@/hooks/use-backend";
import { Shape } from "@/types";

const ICON_RESOLVER: Record<string, React.ElementType> = {
  "refresh-ccw": RefreshCcw,
  wallet: Wallet,
  "shopping-cart": ShoppingCart,
  network: Network,
};

const TEAL = "oklch(0.75 0.12 195)";

// Organic blob border-radius variants per card
const BLOB_RADII = [
  "60% 40% 55% 45% / 45% 55% 45% 55%",
  "40% 60% 45% 55% / 55% 45% 60% 40%",
  "55% 45% 60% 40% / 40% 60% 40% 60%",
  "45% 55% 40% 60% / 60% 40% 55% 45%",
  "50% 50% 40% 60% / 45% 55% 50% 50%",
];

// ---------------------------------------------------------------------------
// Wave Divider
// ---------------------------------------------------------------------------
function WaveDivider({
  flip = false,
  fromBg = "oklch(0.18 0.05 270)",
  toBg = "oklch(0.11 0.04 267)",
}: { flip?: boolean; fromBg?: string; toBg?: string }) {
  const fill = flip ? fromBg : toBg;
  return (
    <div
      className="relative -my-px leading-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
        style={{
          height: "80px",
          transform: flip ? "scaleY(-1)" : undefined,
          display: "block",
        }}
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Diagonal Accent Divider — large angled band between intro and cards
// ---------------------------------------------------------------------------
function DiagonalDivider({ shapes }: { shapes: Shape[] }) {
  return (
    <div
      className="relative py-8 overflow-hidden"
      aria-hidden="true"
      data-ocid="shapes.diagonal_divider"
    >
      {/* Diagonal band */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${TEAL}08 0%, ${TEAL}14 40%, ${TEAL}06 100%)`,
          clipPath: "polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)",
        }}
      />
      {/* Decorative teal line */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${TEAL}22 50%, transparent 70%)`,
          clipPath: "polygon(0 35%, 100% 15%, 100% 45%, 0 65%)",
        }}
      />
      {/* Pill row */}
      <div className="relative container max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-3 py-6">
        {(shapes || []).map((s, i) => {
          return (
            <motion.div
              key={String(s.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center justify-center px-8 py-3 rounded-full border shadow-sm hover:scale-105 transition-transform"
              style={{
                background: `${TEAL}12`,
                borderColor: `${TEAL}40`,
              }}
            >
              <span
                className="font-display font-bold text-base md:text-lg tracking-wide uppercase"
                style={{ color: TEAL }}
              >
                {s.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shape Stack Card (Mirroring Industries Page Layout)
// ---------------------------------------------------------------------------
function ShapeStackCard({
  shape,
  index,
}: {
  shape: Shape & { Icon: React.ElementType };
  index: number;
}) {
  const borderRadius = "28px 8px 28px 8px";

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-20 md:top-24 w-full mb-20 md:mb-32 last:mb-0 pt-10"
      style={{ zIndex: index + 1 }}
      data-ocid={`shapes.stack_card.${index + 1}`}
    >
      <div className="relative">
        {/* Main card — sits on top */}
        <div
          className="relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] min-h-[480px] md:min-h-[450px] flex flex-col md:flex-row"
          style={{
            borderRadius,
            background: "oklch(0.18 0.05 270)",
            border: `1px solid ${TEAL}25`,
            zIndex: 3,
          }}
        >
          {/* Content Layout */}
          <div className="relative z-10 flex flex-col md:flex-row w-full p-6 md:p-14 gap-8 md:gap-12 lg:gap-20">
            {/* Left Column: Information */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-primary"
                  style={{
                    background: `${TEAL}12`,
                    borderRadius: "20px 6px 20px 6px",
                    border: `1px solid ${TEAL}40`,
                  }}
                >
                  <shape.Icon color={TEAL} className="size-5 md:size-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-0.5 md:mb-1" style={{ color: TEAL }}>
                    Commerce Engine
                  </span>
                  <h3 className="font-display font-bold text-foreground text-xl md:text-2xl lg:text-3xl leading-tight">
                    {shape.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl">
                {shape.description}
              </p>
            </div>

            {/* Right Column: Key Capabilities */}
            <div className="md:w-[320px] lg:w-[380px] shrink-0">
              <div className="bg-background/20 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-8 h-full relative">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/80">
                    Capabilities
                  </span>
                </div>

                <ul className="space-y-3 md:space-y-4">
                  {(shape.capabilities || []).map((cap, i) => (
                    <motion.li
                      key={cap}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                      className="flex items-start gap-3 md:gap-4 group/item"
                    >
                      <div className="mt-1 size-4 md:size-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <div className="size-1.5 md:size-2 rounded-full" style={{ background: TEAL }} />
                      </div>
                      <span className="text-xs md:text-sm lg:text-base text-foreground/90 leading-tight">
                        {cap}
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
// Skeleton Card (loading state)
// ---------------------------------------------------------------------------
function ShapeStackCardSkeleton({ index }: { index: number }) {
  return (
    <div
      data-ocid={`shapes.loading_state.${index + 1}`}
      className="w-full mb-12"
    >
      <Skeleton className="w-full h-[450px]" style={{ borderRadius: "28px 8px 28px 8px" }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// -----------------------------------------------------------// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ShapesPage() {
  const { data: shapes, isLoading } = useShapes();

  return (
    <div data-ocid="shapes.page">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-card py-32 md:py-40"
        data-ocid="shapes.hero_section"
      >
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] opacity-[0.08]"
          style={{
            background: `radial-gradient(circle, ${TEAL}, transparent 65%)`,
            borderRadius: "40% 60% 70% 30% / 50% 40% 60% 50%",
            animation: "flowing 12s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 -left-32 w-[500px] h-[500px] opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${TEAL}, transparent 65%)`,
            borderRadius: "60% 40% 30% 70% / 40% 70% 30% 60%",
            animation: "flowing 16s ease-in-out infinite reverse",
          }}
          aria-hidden="true"
        />

        <div className="relative container max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-6 px-4 py-2 rounded-full border"
              style={{
                background: `${TEAL}14`,
                borderColor: `${TEAL}35`,
                color: TEAL,
              }}
            >
              <Hexagon className="size-3.5" />
              Proprietary Technology
            </span>

            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
              Our <span className="gradient-accent">Commerce Engines</span>
            </h1>

            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Shapes are our proprietary, modular commerce engines — production-ready building blocks engineered to solve the complex compensation, subscription, checkout, and CRM requirements of niche commerce.
            </p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { label: "Core Shapes", value: "4" },
                { label: "Years in Production", value: "8+" },
                { label: "Client Implementations", value: "X" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-sm"
                  style={{
                    background: "oklch(0.11 0.04 267 / 0.5)",
                    borderColor: `${TEAL}25`,
                  }}
                >
                  <span className="font-display font-bold text-primary text-xl">
                    {stat.value}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WaveDivider fromBg="oklch(0.18 0.05 270)" toBg="oklch(0.11 0.04 267)" />

      {/* ── Intro paragraph ── */}
      <section
        className="bg-background py-10 lg:py-14"
        data-ocid="shapes.intro_section"
      >
        <div className="container max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-5 leading-tight">
              Built for <span className="gradient-accent">Niche Commerce</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-loose max-w-3xl mx-auto">
              We believe commerce is dominated by a near-endless series of niche use cases — and that the merchants serving those niches deserve purpose-built technology.{" "}
              <span className="text-foreground font-medium">
                Each Shape is a standalone product engine
              </span>{" "}
              that solves a specific, recurring commerce complexity. They are modular by design — deployable individually or combined into a complete commerce stack tailored to your business model.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Diagonal Divider Accent ── */}
      <DiagonalDivider shapes={shapes || []} />

      {/* ── Shape Cards Grid ── */}
      <section
        className="bg-background py-16 lg:py-28"
        data-ocid="shapes.cards_section"
      >
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border"
              style={{
                background: `${TEAL}12`,
                borderColor: `${TEAL}35`,
                color: TEAL,
              }}
            >
              Four Engines
            </span>
            <h2 className="font-display font-bold text-4xl text-foreground mt-2">
              Our Four Commerce Shapes
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Each Shape is a production-grade commerce engine. Deploy one or combine them into a full stack built for your specific niche.
            </p>
          </motion.div>

          {/* Stacked Layout */}
          <div
            className="flex flex-col relative"
            data-ocid="shapes.cards_list"
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                <ShapeStackCardSkeleton key={`skeleton-${i + 1}`} index={i} />
              ))
              : (shapes || []).sort((a, b) => Number(a.sortOrder - b.sortOrder)).map((shape, i) => {
                const IconComponent = ICON_RESOLVER[shape.iconName || (shape as any).icon] || Activity;
                return (
                  <ShapeStackCard
                    key={String(shape.id)}
                    shape={{ ...shape, Icon: IconComponent }}
                    index={i}
                  />
                );
              })}
          </div>
        </div>
      </section>

      <WaveDivider
        flip
        fromBg="oklch(0.11 0.04 267)"
        toBg="oklch(0.18 0.05 270)"
      />

      {/* ── CTA ── */}
      <section
        className="relative bg-card overflow-hidden py-24 lg:py-36"
        data-ocid="shapes.cta_section"
      >
        {/* Radial bloom */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-[0.07]"
          style={{
            background: `radial-gradient(ellipse at center, ${TEAL}, transparent 70%)`,
            borderRadius: "50% 50% 60% 40% / 40% 60% 40% 60%",
            animation: "flowing 10s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        {/* Top diagonal line accent */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${TEAL}40 50%, transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="relative container max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-6 px-3 py-1.5 rounded-full border"
              style={{
                background: `${TEAL}12`,
                borderColor: `${TEAL}35`,
                color: TEAL,
              }}
            >
              Get Started
            </span>

            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-5 leading-tight">
              Ready to power your <br className="hidden sm:block" />
              <span className="gradient-accent">commerce operation?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us about your commerce model and we'll identify which Shapes fit your niche — and how we build them together for the long term.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" data-ocid="shapes.cta_contact_button">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 px-8 transition-smooth shadow-elevated rounded-2xl"
                >
                  Start a Conversation
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/solutions" data-ocid="shapes.cta_solutions_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-card gap-2 px-8 transition-smooth rounded-2xl"
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
