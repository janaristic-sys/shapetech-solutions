import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Hexagon } from "lucide-react";
import { motion } from "motion/react";

// ---------------------------------------------------------------------------
// Geometric SVG Icons — unique per shape pillar
// ---------------------------------------------------------------------------
function TriangleIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12"
      aria-label="Triangle shape icon"
    >
      <title>Triangle shape icon</title>
      <polygon
        points="32,8 58,52 6,52"
        stroke={color}
        strokeWidth="2.5"
        fill={`${color}18`}
        strokeLinejoin="round"
      />
      <polygon
        points="32,18 48,44 16,44"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.45"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="3" fill={color} opacity="0.8" />
    </svg>
  );
}

function CircleIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12"
      aria-label="Circle shape icon"
    >
      <title>Circle shape icon</title>
      <circle
        cx="32"
        cy="32"
        r="22"
        stroke={color}
        strokeWidth="2.5"
        fill={`${color}18`}
      />
      <circle
        cx="32"
        cy="32"
        r="13"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.45"
      />
      <circle cx="32" cy="32" r="4.5" fill={color} opacity="0.8" />
    </svg>
  );
}

function HexagonIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12"
      aria-label="Hexagon shape icon"
    >
      <title>Hexagon shape icon</title>
      <polygon
        stroke={color}
        strokeWidth="2.5"
        fill={`${color}18`}
        strokeLinejoin="round"
      />
      <polygon
        points="32,16 46,24 46,40 32,48 18,40 18,24"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.45"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="3" fill={color} opacity="0.8" />
    </svg>
  );
}

function DiamondIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12"
      aria-label="Diamond shape icon"
    >
      <title>Diamond shape icon</title>
      <polygon
        points="32,6 58,32 32,58 6,32"
        stroke={color}
        strokeWidth="2.5"
        fill={`${color}18`}
        strokeLinejoin="round"
      />
      <polygon
        points="32,16 48,32 32,48 16,32"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.45"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="3" fill={color} opacity="0.8" />
    </svg>
  );
}

function StarIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12"
      aria-label="Star shape icon"
    >
      <title>Star shape icon</title>
      <polygon
        points="32,6 38,24 57,24 43,35 48,54 32,43 16,54 21,35 7,24 26,24"
        stroke={color}
        strokeWidth="2.5"
        fill={`${color}18`}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="4" fill={color} opacity="0.75" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Static shape data — The Shapetech Approach methodology pillars
// ---------------------------------------------------------------------------
const SHAPES = [
  {
    id: 1,
    slug: "strategy",
    Icon: TriangleIcon,
    shapeLabel: "Triangle",
    title: "Strategy",
    tagline: "Clarity before code",
    description:
      "We start every engagement with deep discovery. We map your business model, understand your growth goals, and architect a technology roadmap aligned with your vision. Every decision is deliberate — grounded in data, shaped by experience.",
    capabilities: [
      "Business model mapping & discovery",
      "Technology roadmap architecture",
      "Competitive landscape assessment",
      "Risk identification & mitigation",
      "KPI definition & success metrics",
      "Stakeholder alignment workshops",
    ],
  },
  {
    id: 2,
    slug: "design",
    Icon: CircleIcon,
    shapeLabel: "Circle",
    title: "Design",
    tagline: "Interfaces people love",
    description:
      "User experience is the heart of everything we build. From wireframes to polished interfaces, we create intuitive, beautiful digital experiences that delight users and drive measurable outcomes for your business.",
    capabilities: [
      "User experience (UX) research",
      "UI design & interactive prototyping",
      "Brand identity & visual guidelines",
      "Responsive & accessible design",
      "Design system creation",
      "Conversion-focused interface patterns",
    ],
  },
  {
    id: 3,
    slug: "development",
    Icon: HexagonIcon,
    shapeLabel: "Hexagon",
    title: "Development",
    tagline: "Built to scale, built to last",
    description:
      "Our engineers build scalable, robust platforms using modern technology stacks. We prioritize code quality, security, and performance from day one — delivering full-stack solutions from MVPs to enterprise-grade systems.",
    capabilities: [
      "Full-stack web application development",
      "Native & cross-platform mobile apps",
      "API design & microservices architecture",
      "Gaming & interactive experience development",
      "Agile project management & sprint demos",
      "Code reviews & quality assurance",
    ],
  },
  {
    id: 4,
    slug: "integration",
    Icon: DiamondIcon,
    shapeLabel: "Diamond",
    title: "Integration",
    tagline: "Your ecosystem, unified",
    description:
      "We specialize in connecting your technology ecosystem. HubSpot, Shopify, payment processors, shipping providers — we make everything work together seamlessly through middleware, custom APIs, and event-driven pipelines.",
    capabilities: [
      "HubSpot, Salesforce & CRM integrations",
      "Shopify & e-commerce platform connections",
      "Commission engine & ERP connectivity",
      "Payment gateway & financial API integrations",
      "Custom middleware & ETL pipelines",
      "Webhook infrastructure & event-driven sync",
    ],
  },
  {
    id: 5,
    slug: "optimization",
    Icon: StarIcon,
    shapeLabel: "Star",
    title: "Optimization",
    tagline: "Always improving",
    description:
      "Technology is never finished. We continuously monitor, test, and improve your platform — A/B testing, performance tuning, conversion optimization — so your product keeps getting better long after launch day.",
    capabilities: [
      "Performance audits & Core Web Vitals",
      "Analytics setup & conversion tracking",
      "A/B testing & experimentation frameworks",
      "SEO technical optimization",
      "Scalability & infrastructure tuning",
      "Post-launch monitoring & iteration",
    ],
  },
];

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
function DiagonalDivider() {
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
        {SHAPES.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border"
            style={{
              background: `${TEAL}12`,
              borderColor: `${TEAL}35`,
            }}
          >
            <s.Icon color={TEAL} />
            <span
              className="font-display font-semibold text-sm"
              style={{ color: TEAL }}
            >
              {s.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shape Card
// ---------------------------------------------------------------------------
function ShapeCard({
  shape,
  index,
}: {
  shape: (typeof SHAPES)[0];
  index: number;
}) {
  const blobRadius = BLOB_RADII[index % BLOB_RADII.length];

  return (
    <motion.div
      data-ocid={`shapes.card.${index + 1}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col card-fluid border border-border hover:border-primary/40 overflow-hidden"
      style={{ borderRadius: "20px" }}
    >
      {/* Organic blob background accent */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 opacity-[0.08] group-hover:opacity-[0.15] transition-smooth"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${TEAL}, transparent 70%)`,
          borderRadius: blobRadius,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 w-48 h-48 opacity-[0.05] group-hover:opacity-[0.10] transition-smooth"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${TEAL}, transparent 70%)`,
          borderRadius: BLOB_RADII[(index + 2) % BLOB_RADII.length],
        }}
      />

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(135deg, ${TEAL}0d 0%, transparent 60%)`,
          borderRadius: "20px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-8">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon with blob background */}
          <div
            className="flex items-center justify-center w-20 h-20 group-hover:scale-110 transition-smooth flex-shrink-0"
            style={{
              background: `${TEAL}14`,
              borderRadius: blobRadius,
              border: `1.5px solid ${TEAL}35`,
            }}
          >
            <shape.Icon color={TEAL} />
          </div>

          {/* Ghost number */}
          <span
            className="font-display font-bold text-7xl leading-none select-none"
            style={{ color: `${TEAL}18` }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Shape badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: `${TEAL}14`,
              border: `1px solid ${TEAL}35`,
              color: TEAL,
            }}
          >
            {shape.shapeLabel}
          </span>
        </div>

        {/* Title & tagline */}
        <h3 className="font-display font-bold text-2xl text-foreground mb-1 leading-tight">
          {shape.title}
        </h3>
        <p className="text-primary font-medium text-sm mb-4">{shape.tagline}</p>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-1">
          {shape.description}
        </p>

        {/* Capabilities */}
        <ul className="space-y-2 mb-6">
          {shape.capabilities.map((cap) => (
            <li
              key={cap}
              className="flex items-start gap-2.5 text-sm text-foreground/75"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: `${TEAL}18`,
                  border: `1px solid ${TEAL}35`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: TEAL }}
                />
              </div>
              <span>{cap}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="divider-fluid mb-4" />

        {/* Footer link */}
        <div className="flex items-center gap-2 text-primary font-medium text-sm">
          <span>Explore {shape.title}</span>
          <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton Card (loading state)
// ---------------------------------------------------------------------------
function ShapeCardSkeleton({ index }: { index: number }) {
  return (
    <div
      data-ocid={`shapes.loading_state.${index + 1}`}
      className="card-fluid border border-border p-8"
      style={{ borderRadius: "20px" }}
    >
      <div className="flex items-start justify-between mb-6">
        <Skeleton className="w-20 h-20 rounded-2xl" />
        <Skeleton className="w-16 h-14 rounded-lg" />
      </div>
      <Skeleton className="w-20 h-5 rounded-full mb-3" />
      <Skeleton className="w-2/3 h-7 rounded mb-2" />
      <Skeleton className="w-1/3 h-4 rounded mb-4" />
      <Skeleton className="w-full h-20 rounded mb-6" />
      <div className="space-y-2">
        {[1, 2, 3].map((j) => (
          <Skeleton key={j} className="w-full h-4 rounded" />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ShapesPage() {
  // NOTE: static data is used here; swap with useShapes hook when available
  const isLoading = false;
  const shapes = SHAPES;

  return (
    <div data-ocid="shapes.page">
      {/* ── Hero ── */}
      <section
        className="relative bg-card overflow-hidden"
        data-ocid="shapes.hero_section"
      >
        {/* Atmospheric blobs */}
        <div
          className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] opacity-[0.09]"
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
              Our Methodology
            </span>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
              The{" "}
              <span className="relative inline-block">
                <span className="gradient-accent">Shapetech</span>
                <span
                  className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: `${TEAL}40` }}
                />
              </span>{" "}
              Approach
            </h1>

            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              How Shapetech shapes technology solutions — five interlocking
              methodology pillars that define how we think, design, and deliver.
            </p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { label: "Core Shapes", value: "5" },
                { label: "Years Refined", value: "8+" },
                { label: "Projects Shaped", value: "150+" },
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
        className="bg-background py-16 lg:py-20"
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
              Shapes as a <span className="gradient-accent">Philosophy</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-loose max-w-3xl mx-auto">
              Shapetech Solutions takes a holistic, shape-driven approach to
              technology. Each{" "}
              <span className="text-foreground font-medium">
                "shape" represents a core methodology pillar
              </span>{" "}
              that defines how we think, design, and deliver. Together, these
              five shapes form an interlocking framework — not a checklist, but
              a philosophy built from over eight years of delivery excellence
              across direct selling, SaaS, and enterprise platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Diagonal Divider Accent ── */}
      <DiagonalDivider />

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
              Five Pillars
            </span>
            <h2 className="font-display font-bold text-4xl text-foreground mt-2">
              The Five Shapes of Delivery
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Every Shapetech engagement is built on these five interconnected
              pillars — applied in sequence or in parallel, always with
              intention.
            </p>
          </motion.div>

          {/* Responsive grid: 1 col → 2 col → 3 col */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            data-ocid="shapes.cards_list"
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <ShapeCardSkeleton key={`skeleton-${i + 1}`} index={i} />
                ))
              : shapes.map((shape, i) => (
                  <ShapeCard key={shape.id} shape={shape} index={i} />
                ))}
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
              Ready to start shaping <br className="hidden sm:block" />
              <span className="gradient-accent">your technology?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Every great product starts with the right shape. Tell us about
              your project and we'll map the methodology pillars that will make
              it exceptional.
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
