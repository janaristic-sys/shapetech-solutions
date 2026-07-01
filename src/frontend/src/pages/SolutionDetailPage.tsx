import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSolutions, useShapesBySolution } from "@/hooks/use-backend";
import {
  Network,
  Plug,
  ShoppingCart,
  Smartphone,
  LineChart,
  Star,
  CheckCircle2
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ICON_MAP: Record<string, React.ElementType> = {
  Network,
  Plug,
  ShoppingCart,
  Smartphone,
  LineChart,
  Star
};

function SolutionIcon({
  name,
  className,
}: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Activity;
  return <Icon className={className} />;
}

export default function SolutionDetailPage() {
  const { solutionId } = useParams({ strict: false }) as { solutionId: string };
  const { data: solutions } = useSolutions();
  const solution = solutions?.find((s) => s.slug === solutionId);
  const { data: relatedShapes, isLoading: isShapesLoading } = useShapesBySolution(solution?.id);

  const title = solution?.title ?? solutionId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    
  const description = solution?.description ?? "Information on how this solution works, its benefits, and related case studies will be displayed here.";
  const iconName = solution?.iconName ?? "Activity";

  return (
    <div data-ocid="solution_detail.page">
      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-card pt-24 md:pt-32 pb-16 md:pb-24 min-h-[70vh] flex flex-col justify-center">
        {/* Organic animated blobs (keeping subtle ambient glow) */}
        <div
          className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] opacity-[0.15]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.15 250), transparent 65%)",
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
            animation: "flowing 10s ease-in-out infinite",
          }}
          aria-hidden="true"
        />

        <div className="relative z-20 container max-w-7xl mx-auto px-6 lg:px-10">
          <Link to="/solutions">
            <Button variant="ghost" className="mb-12 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" />
              Back to Solutions
            </Button>
          </Link>
          
          <div className="flex flex-col items-start max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="w-14 h-14 flex items-center justify-center text-primary bg-primary/10 rounded-2xl border border-primary/20">
                  <SolutionIcon name={iconName} className="size-6" />
                </div>
                {solution?.industryName && (
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-foreground/80 bg-background/60 px-5 py-2.5 rounded-full border border-border/50 backdrop-blur-md">
                    {solution.industryName}
                  </span>
                )}
              </div>
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8 tracking-tight">
                {title}
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">
                {description}
              </p>
              
              {solution?.technologies && solution.technologies.length > 0 && (
                <div className="mb-14">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/80 mb-4">Core Technologies</p>
                  <div className="flex flex-wrap gap-3">
                    {solution.technologies.map(tech => (
                      <span key={tech} className="px-5 py-2.5 rounded-full bg-card/60 border border-border/40 text-sm font-medium text-foreground backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link to="/contact">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-3 transition-all shadow-[0_8px_30px_oklch(0.75_0.12_195/0.25)] hover:shadow-[0_8px_40px_oklch(0.75_0.12_195/0.4)] h-14 px-10 text-base hover:-translate-y-1">
                  Discuss a Project
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Project Highlights Section ─────────────────────────────────────── */}
      {(solution?.bulletPoints && solution.bulletPoints.length > 0) && (
        <section className="bg-background py-24 relative overflow-hidden">
          <div className="container max-w-5xl mx-auto px-6 lg:px-10">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-16 text-center">
              Project Highlights
            </h2>
            <div className="space-y-6">
              {solution.bulletPoints.map((point, i) => (
                <div key={i} className="flex gap-5 items-start group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-sm border border-primary/20 mt-1">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <p className="text-foreground/90 text-base md:text-lg leading-relaxed font-medium pt-1">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery Section ────────────────────────────────────────────── */}
      {(solution?.gallery && solution.gallery.length > 0) && (
        <section className="bg-card py-16 relative overflow-hidden">
          <div className="container max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
                  Inside the Implementation
                </h2>
                <p className="text-muted-foreground text-lg">Key workflows and custom interfaces built for {title}.</p>
              </div>
            </div>
            <div className="relative max-w-6xl mx-auto md:px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-6">
                  {solution.gallery.map((img, i) => (
                    <CarouselItem key={i} className="pl-6 md:basis-4/5 lg:basis-[85%]">
                      <div className="aspect-video rounded-[2rem] overflow-hidden bg-background/50 flex items-center justify-center relative group shadow-xl border border-border/50">
                        <img src={img} alt={`Gallery view ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-6 lg:-left-12 size-14 border-primary/20 hover:border-primary/50 text-foreground hover:text-primary transition-colors" />
                <CarouselNext className="hidden md:flex -right-6 lg:-right-12 size-14 border-primary/20 hover:border-primary/50 text-foreground hover:text-primary transition-colors" />
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* ── Powered By Shapes Section ─────────────────────────────────────── */}
      <section className="bg-background py-24 border-t border-border/40 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Powered by <span className="gradient-accent">Shapes</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
              {title} is built upon these core architectural shapes, ensuring robustness and rapid scalability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isShapesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card/50 border border-border/50 rounded-3xl p-8 h-48 animate-pulse" />
              ))
            ) : relatedShapes?.length ? (
              relatedShapes.map((shape) => (
                <Link key={String(shape.id)} to="/shapes/$shapeId" params={{ shapeId: shape.slug }} className="group block">
                  <div className="bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 rounded-3xl p-8 transition-smooth h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                    <h3 className="font-display font-bold text-xl mb-3">{shape.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                      {shape.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                      View Shape
                      <ChevronRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground">No methodology shapes associated with this solution.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── Case Study Section ────────────────────────────────────────────── */}
      {solution?.caseStudy && (
        <section className="bg-card py-24 md:py-32 relative overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, oklch(0.75 0.12 195) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="container max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-6 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/10">
                  Success Story
                </span>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                  {solution.caseStudy.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  {solution.caseStudy.description}
                </p>
                
                <div className="flex flex-wrap gap-8">
                  {solution.caseStudy.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col"
                    >
                      <span className="text-4xl font-display font-bold text-primary mb-1">
                        {m.value}
                      </span>
                      <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                        {m.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full opacity-30" />
                <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-background/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 flex items-center justify-center shadow-3xl">
                   <div className="text-center">
                      <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Activity className="size-10 text-primary" />
                      </div>
                      <p className="text-xl font-display font-bold text-foreground">Verified Outcome</p>
                      <p className="text-sm text-muted-foreground mt-2">Validated through real-world deployment.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
