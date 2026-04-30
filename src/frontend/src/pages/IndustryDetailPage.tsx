import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIndustries, useSolutions } from "@/hooks/use-backend";
import {
  Network,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Sparkles,
  Users,
  GraduationCap,
  Cpu
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Network,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Sparkles,
  Users,
  GraduationCap,
  Cpu
};

function IndustryIcon({
  name,
  className,
}: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Network;
  return <Icon className={className} />;
}

export default function IndustryDetailPage() {
  const { industryId } = useParams({ strict: false }) as { industryId: string };
  const { data: industries } = useIndustries();
  const { data: solutions } = useSolutions();

  const industry = industries?.find((ind) => ind.slug === industryId);

  // Fallback if data is still loading or industry not found
  const title = industry?.title ?? industryId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    
  const description = industry?.description ?? "Information for this specific industry is currently being updated.";
  const iconName = industry?.iconName ?? "Network";
  const highlights = industry?.highlights ?? [];

  return (
    <div data-ocid="industry_detail.page">
      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-card pt-24 md:pt-32 pb-16 md:pb-24 min-h-[70vh] flex flex-col justify-center">
        {/* Abstract 3D Render Image Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-card/70 backdrop-blur-sm z-10" />
          <img 
            src="/images/industry_abstract.png" 
            alt="" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-screen"
            aria-hidden="true"
          />
        </div>

        {/* Organic animated blobs */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] opacity-[0.2]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.12 195), transparent 65%)",
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
            animation: "flowing 12s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        <div className="relative z-20 container max-w-7xl mx-auto px-6 lg:px-10">
          <Link to="/industries">
            <Button variant="ghost" className="mb-10 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" />
              Back to Industries
            </Button>
          </Link>
          
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 flex items-center justify-center text-primary"
                  style={{
                    background: "oklch(0.75 0.12 195 / 0.12)",
                    borderRadius: "20px 6px 20px 6px",
                    border: "1px solid oklch(0.75 0.12 195 / 0.25)",
                    backdropFilter: "blur(12px)"
                  }}
                >
                  <IndustryIcon name={iconName} className="size-6" />
                </div>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary/90">
                  Industry Focus
                </span>
              </div>
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
                {title}
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mb-10">
                {description}
              </p>
              <Link to="/contact">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 transition-smooth shadow-[0_0_24px_oklch(0.75_0.12_195/0.3)] hover:shadow-[0_0_32px_oklch(0.75_0.12_195/0.45)] h-12 px-8">
                  Discuss a Project
                  <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            {/* Highlights Card */}
            {highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-background/40 backdrop-blur-xl rounded-[28px_8px_28px_8px] border border-white/10 p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-[0.15]"
                    style={{ background: "oklch(0.75 0.12 195)" }}
                  />
                </div>
                <h3 className="font-display font-bold text-xl mb-6 relative z-10">Key Capabilities</h3>
                <ul className="space-y-4 relative z-10">
                  {highlights.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 size-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="size-3 text-primary" />
                      </div>
                      <span className="text-foreground/90 leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Related Solutions Section ───────────────────────────────────────── */}
      <section className="bg-background py-24 border-t border-border/40 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Related <span className="gradient-accent">Solutions</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
              Explore the tailored solutions and architectures we commonly deploy for {title}.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mocked Related Solutions mapped from the hook */}
            {(solutions || []).slice(0, 3).map((sol, index) => (
              <Link key={String(sol.id)} to={`/solutions/${sol.slug}`} className="group block">
                <div className="bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 rounded-3xl p-8 transition-smooth h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                  <h3 className="font-display font-bold text-xl mb-3">{sol.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    {sol.description}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                    View Solution
                    <ChevronRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[oklch(0.18_0.05_270)] mix-blend-multiply z-10" />
        </div>
        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Ready to Accelerate Your <br />
            <span className="text-primary">{title}</span> Initiative?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Our team of expert architects is ready to map out your digital transformation.
          </p>
          <Link to="/contact">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 shadow-[0_0_24px_oklch(0.75_0.12_195/0.3)]">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
