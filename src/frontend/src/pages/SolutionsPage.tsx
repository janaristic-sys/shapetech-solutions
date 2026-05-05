import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Code2,
  ShoppingBag,
  Users,
  Zap,
  RefreshCcw,
  Rocket,
  Star,
  Smartphone,
  Network,
} from "lucide-react";
import { motion } from "motion/react";
import { useSolutions } from "@/hooks/use-backend";
import { Solution } from "@/types";

// ---------------------------------------------------------------------------
// Icon Mapping
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  RefreshCcw,
  Rocket,
  ShoppingCart: ShoppingBag,
  Users,
  Star,
  Smartphone,
  Network,
  BarChart2,
  Code2,
};

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------
function SolutionSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
      <div className="flex flex-col gap-5">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          {[1, 2, 3, 4].map((k) => (
            <Skeleton key={k} className="h-6 w-full rounded-lg" />
          ))}
        </div>
      </div>
      <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Wave divider
// ---------------------------------------------------------------------------
function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="relative -my-px leading-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
        style={{ height: "80px", transform: flip ? "scaleY(-1)" : undefined }}
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="oklch(0.22 0.05 270)"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Partner badge
// ---------------------------------------------------------------------------
function PartnerBadge({ name, subtitle }: { name: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-3 px-8 py-6 rounded-3xl border-2 border-primary/40 bg-primary/5 backdrop-blur-sm hover:border-primary/70 hover:bg-primary/10 transition-smooth"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: "oklch(0.75 0.12 195 / 0.15)",
          border: "1px solid oklch(0.75 0.12 195 / 0.4)",
        }}
      >
        <CheckCircle2 className="size-7 text-primary" />
      </div>
      <div className="text-center">
        <p className="font-display font-bold text-foreground text-base">
          {name}
        </p>
        <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Solution row — alternating layout
// ---------------------------------------------------------------------------
function SolutionRow({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const Icon = ICON_MAP[solution.iconName] || Code2;
  const isEven = index % 2 !== 0;

  return (
    <motion.div
      id={solution.slug}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      data-ocid={`solutions.item.${index + 1}`}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-24 items-center scroll-mt-32 py-16 md:py-24 border-b border-border/40 last:border-0 ${
        isEven ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* ── Text panel ── */}
      <div className="flex flex-col gap-6 relative">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "oklch(0.75 0.12 195 / 0.15)",
              border: "1px solid oklch(0.75 0.12 195 / 0.35)",
            }}
          >
            <Icon className="size-5 text-primary" />
          </div>
          <Badge
            variant="outline"
            className="text-primary border-primary/30 bg-primary/10 font-semibold text-xs tracking-widest uppercase px-3 py-1"
          >
            {solution.tagline || "Technical Solution"}
          </Badge>
        </div>

        <div>
          <h3 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-2">
            {solution.title}
          </h3>
          <p className="text-primary font-medium text-lg leading-snug">
            {solution.tagline}
          </p>
        </div>

        <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
          {solution.description}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
          {(solution.features || []).map((f) => (
            <li
              key={f}
              className="flex items-center gap-2.5 text-sm text-foreground/85"
            >
              <CheckCircle2 className="size-4 text-primary flex-shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Case Study Concept Preview */}
        {solution.caseStudy && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-5 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mb-2">
              Success Highlight
            </p>
            <p className="text-sm font-semibold text-foreground mb-3 leading-tight">
              {solution.caseStudy.title}
            </p>
            <div className="flex gap-4">
              {solution.caseStudy.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-lg font-display font-bold text-primary">
                    {m.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="pt-2">
          <Link to={`/solutions/${solution.slug}`} data-ocid={`solutions.cta.${index + 1}`}>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 rounded-xl transition-smooth h-12 px-8 shadow-lg shadow-primary/20"
            >
              View Solution Details
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Visual panel ── */}
      <div className="relative group">
        <div
          aria-hidden="true"
          className="absolute inset-0 -m-10 rounded-[4rem] blur-3xl opacity-10 pointer-events-none group-hover:opacity-15 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
          }}
        />

        <div
          className="relative rounded-[2.5rem] p-px overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.5), oklch(0.28 0.05 270 / 0.2), oklch(0.75 0.12 195 / 0.2))",
          }}
        >
          <div className="bg-card/90 backdrop-blur-md rounded-[calc(2.5rem-1px)] p-10 flex flex-col gap-8 min-h-[400px] justify-center items-center text-center">
             <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center bg-primary/10 border border-primary/20 shadow-inner group-hover:scale-110 transition-smooth duration-500"
            >
              <Icon className="size-12 text-primary" strokeWidth={1.5} />
            </div>
            
            <div className="max-w-xs">
              <span className="font-display font-bold text-7xl text-primary/10 absolute top-10 right-10 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="font-display font-bold text-2xl mb-4">{solution.title}</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {(solution.features || []).slice(0, 4).map((f) => (
                   <span key={f} className="px-3 py-1 rounded-full bg-background/50 border border-border/50 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {f}
                   </span>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <div className="flex items-center gap-4 text-xs font-semibold text-primary/70">
              <CheckCircle2 className="size-4" />
              Enterprise Ready Architecture
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
export default function SolutionsPage() {
  const { data: solutions, isLoading } = useSolutions();

  return (
    <div data-ocid="solutions.page">
      {/* ── Hero ── */}
      <section
        className="relative bg-card overflow-hidden pt-24 pb-32 md:pt-36 md:pb-48"
        data-ocid="solutions.hero_section"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, oklch(0.75 0.12 195) 0%, transparent 65%)",
            borderRadius: "40% 60% 60% 40% / 50% 50% 70% 50%",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-0 w-[500px] h-[400px] opacity-[0.08] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
            borderRadius: "60% 40% 40% 60% / 40% 60% 40% 60%",
          }}
        />

        <div className="relative container max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
              Our Solutions
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
              Modular <br />
              <span className="gradient-accent">Enterprise Tech</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
              We deliver purpose-built technology for direct selling and e-commerce
              organisations — from core commission engines to unified ecosystem 
              integrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="mt-12 flex flex-wrap gap-12"
          >
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "8+", label: "Years of Excellence" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-display font-bold text-5xl text-primary leading-none">
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-xs uppercase tracking-widest font-semibold opacity-70">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 leading-none"
        >
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "100px" }}
            aria-hidden="true"
          >
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
              fill="oklch(0.12 0.05 267)"
            />
          </svg>
        </div>
      </section>

      {/* ── Solutions list ── */}
      <section
        className="bg-background py-12 md:py-20"
        data-ocid="solutions.list_section"
      >
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col">
            {isLoading
              ? [1, 2, 3].map((k) => (
                  <SolutionSkeleton key={k} />
                ))
              : (solutions || []).sort((a,b) => Number(a.sortOrder - b.sortOrder)).map((sol, i) => (
                  <SolutionRow key={String(sol.id)} solution={sol} index={i} />
                ))}
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* ── Partner badges ── */}
      <section
        className="bg-card py-24"
        data-ocid="solutions.partners_section"
      >
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
              Strategic Alliances
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mt-2 mb-4">
              Certified <span className="gradient-accent">Partnerships</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Our solutions are built on world-class foundations. We maintain 
              official partner status with the platforms that power modern commerce.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-3xl mx-auto">
            <PartnerBadge
              name="HubSpot Certified Partner"
              subtitle="Specialising in direct selling custom objects & CRM automation."
            />
            <PartnerBadge
              name="Shopify Plus Partner"
              subtitle="Expertise in high-volume headless storefronts & custom apps."
            />
            <PartnerBadge
              name="Microsoft Cloud Partner"
              subtitle="Azure-based enterprise architectures & scalable cloud infrastructure."
            />
          </div>
        </div>
      </section>

      <WaveDivider flip />

      {/* ── Bottom CTA ── */}
      <section
        className="relative overflow-hidden py-32 md:py-40 bg-background"
        data-ocid="solutions.cta_section"
      >
         <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-[0.08]"
          style={{
            background: `radial-gradient(circle, oklch(0.75 0.12 195), transparent 70%)`,
            borderRadius: "50% 50% 60% 40% / 40% 60% 40% 60%",
            animation: "flowing 12s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        <div className="relative container max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="font-display font-bold text-4xl sm:text-6xl text-foreground mb-6 leading-tight">
              Ready to architect <br />
              <span className="gradient-accent">your next win?</span>
            </h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you need a full commission engine overhaul or a seamless 
              CRM integration, our team is ready to map the solution to your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-2xl font-bold gap-2 px-10 h-14 bg-primary text-primary-foreground hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                  Start a Conversation
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-border/60 text-foreground hover:bg-card/60 font-bold px-10 h-14"
                >
                  Learn About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
