import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import LogoTicker from "@/components/LogoTicker";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import {
  useAbout,
  useClients,
  useFaq,
  useIndustries,
  usePortfolio,
  useShapes,
  useSolutions,
  useSubmitContact,
  useTestimonials,
} from "@/hooks/use-backend";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Compass,
  Cpu,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers,
  LineChart,
  Network,
  Palette,
  PenTool,
  Plug,
  Quote,
  Search,
  Server,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  Landmark,
  HeartPulse,
  ShoppingCart,
  Truck,
  GraduationCap,
  Building2,
  Compass,
  Network,
  Palette,
  Code2,
  Cloud,
  ShieldCheck,
  TrendingUp,
  Layers,
  PenTool,
  Server,
  BarChart3,
  Smartphone,
  Plug,
  Shield,
  Cpu,
  Search,
  LineChart,
  Users,
  Sparkles,
};

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICON_MAP[name] ?? Code2;
  return <Icon {...props} />;
}

// ─── Wave Divider ─────────────────────────────────────────────────────────────
function WaveDivider({
  fill,
  path,
  height = 70,
}: {
  fill: string;
  path: string;
  height?: number;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
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
  eyebrow,
  title,
  subtitle,
  align = "center",
  gradient = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  gradient?: boolean;
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        {eyebrow}
      </span>
      <h2
        className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 ${gradient ? "gradient-accent" : "text-foreground"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-muted-foreground text-base lg:text-lg ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"}`}
        >
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

// ─── Testimonials Carousel ────────────────────────────────────────────────────
function TestimonialsCarousel() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const [active, setActive] = useState(0);
  const prev = () =>
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  if (isLoading)
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <>
      {/* Mobile carousel */}
      <div className="md:hidden">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid={`home.testimonial.${active + 1}`}
          className="relative card-fluid p-8 overflow-hidden"
        >
          <Quote className="absolute top-6 right-6 size-16 text-primary/10" />
          <Quote className="size-8 text-primary/60 mb-5" />
          <p className="text-muted-foreground leading-relaxed italic mb-6 relative z-10">
            "{current.quote}"
          </p>
          <div className="flex items-center gap-3 pt-5 border-t border-border/40">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/20 text-primary font-display font-bold text-sm flex-shrink-0 blob-accent">
              {current.authorName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground text-sm truncate">
                {current.authorName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {current.authorTitle}, {current.company}
              </p>
            </div>
          </div>
        </motion.div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            data-ocid="home.testimonial_prev"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 hover:border-primary/60 text-muted-foreground hover:text-primary transition-smooth hover:bg-primary/10"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((t, i) => (
              <button
                key={String(t.id)}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-smooth ${i === active ? "bg-primary w-5" : "bg-muted-foreground/30 w-2"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            data-ocid="home.testimonial_next"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 hover:border-primary/60 text-muted-foreground hover:text-primary transition-smooth hover:bg-primary/10"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((t, i) => (
          <motion.div
            key={String(t.id)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            data-ocid={`home.testimonial.${i + 1}`}
            className={`relative card-fluid p-8 overflow-hidden flex flex-col ${i === 1 ? "mt-6" : ""}`}
          >
            <Quote className="absolute top-5 right-5 size-14 text-primary/10" />
            <Quote className="size-7 text-primary/60 mb-5" />
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic relative z-10">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border/40">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-display font-bold text-sm flex-shrink-0 blob-accent">
                {t.authorName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-foreground text-sm truncate">
                  {t.authorName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t.authorTitle}, {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const submitContact = useSubmitContact();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
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
        <h3 className="font-display font-bold text-2xl text-foreground">
          Message Received!
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Thanks for reaching out. A solutions architect will contact you within
          24 hours.
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
          <Label
            htmlFor="contact-name"
            className="text-foreground text-sm font-medium"
          >
            Full Name *
          </Label>
          <Input
            id="contact-name"
            required
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="rounded-xl bg-background/50 border-border/60 focus:border-primary/60 transition-smooth h-11"
            data-ocid="home.contact_name_input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="contact-email"
            className="text-foreground text-sm font-medium"
          >
            Email Address *
          </Label>
          <Input
            id="contact-email"
            type="email"
            required
            placeholder="jane@company.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="rounded-xl bg-background/50 border-border/60 focus:border-primary/60 transition-smooth h-11"
            data-ocid="home.contact_email_input"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="contact-company"
          className="text-foreground text-sm font-medium"
        >
          Company
        </Label>
        <Input
          id="contact-company"
          placeholder="Your Company Inc."
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          className="rounded-xl bg-background/50 border-border/60 focus:border-primary/60 transition-smooth h-11"
          data-ocid="home.contact_company_input"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="contact-message"
          className="text-foreground text-sm font-medium"
        >
          Project Brief *
        </Label>
        <Textarea
          id="contact-message"
          required
          rows={5}
          placeholder="Tell us about your project — what you're building, your timeline, and any specific challenges."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="rounded-xl bg-background/50 border-border/60 focus:border-primary/60 transition-smooth resize-none"
          data-ocid="home.contact_message_textarea"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={submitContact.isPending}
        className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-semibold gap-2 transition-smooth w-full sm:w-auto shadow-[0_0_24px_oklch(0.75_0.12_195/0.3)] hover:shadow-[0_0_32px_oklch(0.75_0.12_195/0.5)]"
        data-ocid="home.contact_submit_button"
      >
        {submitContact.isPending ? "Sending…" : "Send Message"}
        {!submitContact.isPending && <ArrowRight className="size-4" />}
      </Button>
      {submitContact.isError && (
        <p
          className="text-sm text-destructive-foreground bg-destructive/20 px-4 py-2 rounded-xl"
          data-ocid="home.contact_error_state"
        >
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

// ─── Floating Blob Background ─────────────────────────────────────────────────
function HeroBlobs() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-primary/8 blur-[140px]" />
      <div className="absolute bottom-[-5%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
      <motion.div
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[25%] left-[20%] w-48 h-48 bg-primary/4 blur-3xl"
      />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025]"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          <pattern
            id="dots"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

// ─── Process Steps ────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We immerse ourselves in your business — understanding your goals, constraints, audience and competitive landscape before writing a single line of code.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design",
    description:
      "We craft a technical strategy and minimum viable product roadmap, translating business requirements into architecture decisions and user-centric interfaces.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Agile sprints with dedicated QA and project management. You get weekly demos, transparent progress reporting, and predictable delivery.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Optimize",
    description:
      "We iterate based on real-world results and data. Post-launch support, performance tuning, and feature evolution keep your product ahead of the curve.",
    icon: TrendingUp,
  },
];

// ─── Who We Serve Profiles ────────────────────────────────────────────────────
const CLIENT_PROFILES = [
  {
    icon: Network,
    title: "Direct Selling Companies",
    description:
      "MLM and network marketing organizations that need custom distributor portals, commission engines, genealogy trees, and replicated websites built specifically for their compensation plan.",
  },
  {
    icon: TrendingUp,
    title: "Growth-Stage Startups",
    description:
      "Fast-moving companies that need a technical partner to architect, build, and scale their core product — from MVP to market without burning runway on missteps.",
  },
  {
    icon: Building2,
    title: "Enterprise Teams",
    description:
      "Established businesses that need complex custom integrations, legacy system modernization, or specialized platforms their in-house team doesn't have capacity to build.",
  },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: about } = useAbout();
  const { data: clients = [], isLoading: clientsLoading } = useClients();
  const { data: industries = [], isLoading: industriesLoading } =
    useIndustries();
  const { data: shapes = [], isLoading: shapesLoading } = useShapes();
  const { data: solutions = [], isLoading: solutionsLoading } = useSolutions();
  const { data: portfolio = [], isLoading: portfolioLoading } = usePortfolio();
  const { data: faqs = [], isLoading: faqLoading } = useFaq();

  return (
    <div data-ocid="home.page">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden bg-background"
        data-ocid="home.hero_section"
      >
        <HeroBlobs />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32 relative z-10">
          <Card className="w-full min-h-[600px] bg-background/20 border-none relative rounded-3xl backdrop-blur-sm">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="oklch(var(--primary))"
            />

            <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Boutique Tech & Design Firm
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight text-foreground">
                  Shaping the <span className="gradient-accent">Future</span> of Your Business.
                </h1>
                <p className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed">
                  We are a boutique tech design and full-stack development firm
                  helping companies leverage technology to transform their business.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-10">
                  <Link to="/solutions" data-ocid="home.hero_primary_cta">
                    <Button
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-semibold px-8 gap-2 transition-smooth shadow-[0_0_28px_oklch(0.75_0.12_195/0.4)] hover:shadow-[0_0_40px_oklch(0.75_0.12_195/0.6)] hover:-translate-y-0.5"
                    >
                      Explore Solutions
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Link to="/contact" data-ocid="home.hero_secondary_cta">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full border-border/60 hover:border-primary/50 text-foreground font-semibold px-8 transition-smooth hover:bg-primary/5 hover:-translate-y-0.5"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-10 mt-12">
                  {[
                    { value: "50+", label: "Team Members" },
                    { value: "50+", label: "Projects Delivered" },
                    { value: "2", label: "Global Offices" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-start"
                    >
                      <span className="font-display font-bold text-3xl gradient-accent">
                        {stat.value}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5 uppercase tracking-widest font-medium">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right content - Enlarged and Standalone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="flex-1 relative w-full h-[500px] lg:h-[700px] z-10 lg:-mr-16"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] opacity-20" />
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full transform lg:scale-125 origin-center"
                />
              </motion.div>
            </div>
          </Card>
        </div>

        <WaveDivider
          fill="oklch(0.18 0.05 270)"
          path="M0,33 C480,55 960,11 1440,33 L1440,50 L0,50 Z"
          height={50}
        />
      </section>

      {/* ─── About Teaser ─────────────────────────────────────────────────── */}
      <section
        className="relative bg-card py-28"
        data-ocid="home.about_section"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading
                eyebrow="About Us"
                title={
                  about?.title ??
                  "A Boutique Firm That Thinks Like Your Partner"
                }
                align="left"
              />
              <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                {about?.body ??
                  "ShapeTech Solutions is a boutique tech design and full-stack development firm with offices in Sarasota, Florida, and Niš, Serbia. We are an international team of 50+ business consultants, developers, and designers who help companies leverage technology to transform their business."}
              </p>
              {about?.mission && (
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <span className="font-semibold text-foreground">
                    Our mission:{" "}
                  </span>
                  {about.mission}
                </p>
              )}
              <Link to="/about" data-ocid="home.about_cta">
                <Button className="rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 gap-2 transition-smooth hover:-translate-y-0.5">
                  Our Story <ArrowRight className="size-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats — asymmetric staggered layout */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: "50+",
                    label: "International Team",
                    sub: "Across 2 offices",
                    offset: false,
                  },
                  {
                    value: "2",
                    label: "Office Locations",
                    sub: "Sarasota & Niš",
                    offset: true,
                  },
                  {
                    value: "50+",
                    label: "Projects Delivered",
                    sub: "Direct selling & beyond",
                    offset: true,
                  },
                  {
                    value: "10+",
                    label: "Years Tech Experience",
                    sub: "Combined team expertise",
                    offset: false,
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`card-fluid p-7 ${stat.offset ? "mt-6" : ""}`}
                  >
                    <span className="font-display font-bold text-4xl gradient-accent block">
                      {stat.value}
                    </span>
                    <span className="font-semibold text-foreground text-sm block mt-1">
                      {stat.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stat.sub}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[60%] bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        <WaveDivider
          fill="oklch(0.13 0.05 267)"
          path="M0,35 C720,70 1080,0 1440,35 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Services (What We Do Best) ───────────────────────────────────── */}
      <section
        className="relative bg-background py-28"
        data-ocid="home.services_section"
      >
        <div
          className="absolute inset-0 overflow-hidden opacity-[0.04]"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 28px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="What We Build"
            title="Core Services"
            subtitle="Specialized capabilities built around what modern businesses actually need — not generic dev-shop offerings."
            gradient
          />

          {solutionsLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <div className="relative">
                <CarouselContent className="-ml-6">
                  {solutions.map((sol, i) => (
                    <CarouselItem
                      key={String(sol.id)}
                      className="pl-6 md:basis-1/2 lg:basis-1/3"
                    >
                      <Link
                        to={`/solutions#${sol.slug}`}
                        className="block h-full transition-transform active:scale-[0.98]"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 28 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: i * 0.08 }}
                          data-ocid={`home.solution.${i + 1}`}
                          className="group card-fluid p-8 flex flex-col relative overflow-hidden h-full min-h-[320px] cursor-pointer"
                        >
                          <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth"
                            style={{
                              background:
                                "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.12) 0%, transparent 60%)",
                            }}
                          />
                          <div className="relative z-10 flex flex-col h-full">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-smooth blob-accent">
                              <DynamicIcon
                                name={sol.iconName}
                                className="size-7"
                              />
                            </div>
                            <h3 className="font-display font-bold text-foreground text-xl mb-4 group-hover:text-primary transition-colors">
                              {sol.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                              {sol.description}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center md:justify-end gap-3 mt-10">
                  <CarouselPrevious className="static translate-y-0 bg-background/50 border-border/40 hover:bg-primary/10 hover:border-primary/40 text-foreground transition-smooth size-11" />
                  <CarouselNext className="static translate-y-0 bg-background/50 border-border/40 hover:bg-primary/10 hover:border-primary/40 text-foreground transition-smooth size-11" />
                </div>
              </div>
            </Carousel>
          )}

          <div className="text-center mt-16">
            <Link to="/solutions" data-ocid="home.solutions_cta">
              <Button
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-semibold px-10 gap-3 transition-smooth shadow-[0_0_24px_oklch(0.75_0.12_195/0.3)] hover:shadow-[0_0_40px_oklch(0.75_0.12_195/0.5)] hover:-translate-y-1"
              >
                View All Services
                <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </div>

        <WaveDivider
          fill="oklch(0.18 0.05 270)"
          path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          height={60}
        />
      </section>

      {/* ─── Clients ──────────────────────────────────────────────────────── */}
      <section
        className="relative bg-card py-20"
        data-ocid="home.clients_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-12">
            Trusted by innovative companies
          </p>
          {clientsLoading ? (
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 py-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-lg" />
              ))}
            </div>
          ) : (
            <LogoTicker clients={clients} />
          )}
        </div>

        <WaveDivider
          fill="oklch(0.13 0.05 267)"
          path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          height={60}
        />
      </section>

      {/* ─── Industries ───────────────────────────────────────────────────── */}
      <section
        className="relative bg-background py-28"
        data-ocid="home.industries_section"
      >
        <div className="w-full">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 mb-16">
            <SectionHeading
              eyebrow="Industries"
              title="Industries We Serve"
              subtitle="Deep domain expertise across the industries that matter most — with direct selling at the core."
            />
          </div>
          {industriesLoading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col">
              {industries.map((ind, i) => (
                <motion.div
                  key={String(ind.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-ocid={`home.industry.${i + 1}`}
                  className="group relative border-t border-border/40 last:border-b transition-smooth hover:bg-primary/[0.02]"
                >
                  <div className="container max-w-7xl mx-auto px-4 py-6 lg:py-8 relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                    {/* Number & Icon */}
                    <div className="flex items-center gap-5 lg:min-w-[240px]">
                      <span className="font-display font-bold text-4xl lg:text-5xl text-primary/10 group-hover:text-primary/30 transition-smooth tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/15 transition-smooth">
                        <DynamicIcon name={ind.iconName} className="size-6" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl lg:text-2xl text-foreground group-hover:text-primary transition-smooth">
                        {ind.title}
                      </h3>
                      <div className="lg:hidden mt-3">
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                          {ind.description}
                        </p>
                      </div>
                    </div>

                    {/* Description (Desktop) */}
                    <div className="hidden lg:block flex-[1.5] max-w-2xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-smooth delay-75">
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {ind.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover background accent */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-20">
            <Link to="/industries" data-ocid="home.industries_cta">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/5 text-foreground px-10 gap-3 transition-smooth hover:-translate-y-1"
              >
                Explore All Verticals <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </div>

        <WaveDivider
          fill="oklch(0.18 0.05 270)"
          path="M0,0 C480,70 960,0 1440,50 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Process (How We Do It) ───────────────────────────────────────── */}
      <section
        className="relative bg-card py-28"
        data-ocid="home.process_section"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
          aria-hidden
        />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="How We Do It"
            title="Our Process"
            subtitle="Four clear phases that transform your idea into a live, scalable product."
            gradient
          />

          {/* Diagonal flow layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                data-ocid={`home.process.${i + 1}`}
                className={`flex flex-col items-center text-center p-8 relative ${i % 2 === 1 ? "lg:mt-12" : ""}`}
              >
                {/* Step number badge */}
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30 text-primary group-hover:bg-primary/20 transition-smooth blob-accent relative z-10">
                    <step.icon className="size-6" />
                  </div>
                  <span className="absolute -top-2 -right-2 font-display font-bold text-xs text-primary/60 bg-card rounded-full px-1.5 border border-primary/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <WaveDivider
          fill="oklch(0.13 0.05 267)"
          path="M0,40 C240,70 720,0 1440,50 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Who We Are For ───────────────────────────────────────────────── */}
      <section
        className="relative bg-background py-28"
        data-ocid="home.profiles_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Built for Companies Like Yours"
            subtitle="We do our best work for three types of clients — here's where you might fit."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {CLIENT_PROFILES.map((profile, i) => (
              <motion.div
                key={profile.title}
                initial={{ opacity: 0, y: 28, rotate: i % 2 === 1 ? 1 : -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                data-ocid={`home.profile.${i + 1}`}
                className={`group card-fluid p-8 relative overflow-hidden ${i === 1 ? "md:mt-8" : ""}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-smooth rounded-t-2xl" />
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-smooth blob-accent">
                  <profile.icon className="size-6" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-colors">
                  {profile.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {profile.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <WaveDivider
          fill="oklch(0.18 0.05 270)"
          path="M0,50 C360,0 1080,70 1440,30 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Shapes / Methodology ─────────────────────────────────────────── */}
      <section
        className="relative bg-card py-28"
        data-ocid="home.shapes_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Our Approach"
            title="What Makes Us Different"
            subtitle="Six methodology pillars that define every engagement — from first call to final delivery."
            gradient
          />
          {shapesLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {shapes.map((shape, i) => (
                <motion.div
                  key={String(shape.id)}
                  initial={{ opacity: 0, y: 28, rotate: -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  data-ocid={`home.shape.${i + 1}`}
                  className="group card-fluid p-7 overflow-hidden relative flex flex-col h-full"
                >
                  <span className="absolute -top-3 -right-2 font-display font-bold text-[5rem] leading-none text-foreground/[0.04] select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl bg-gradient-to-b from-primary/60 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-smooth">
                      <DynamicIcon name={shape.iconName} className="size-6" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-base mb-2">
                      {shape.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {shape.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/shapes" data-ocid="home.shapes_cta">
              <Button className="rounded-full border border-border/60 bg-transparent hover:border-primary/40 hover:bg-primary/10 text-foreground gap-2 transition-smooth hover:-translate-y-0.5">
                Our Methodology <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>

        <WaveDivider
          fill="oklch(0.13 0.05 267)"
          path="M0,20 C480,70 960,10 1440,40 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────── */}
      <section
        className="relative bg-background py-28"
        data-ocid="home.testimonials_section"
      >
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden
        >
          <svg
            aria-hidden="true"
            className="absolute top-0 left-0 w-64 h-64 text-primary opacity-[0.04]"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="55"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <svg
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-80 h-80 text-primary opacity-[0.04]"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Clients Say"
            subtitle="The results speak louder than any pitch deck."
          />
          <TestimonialsCarousel />
        </div>

        <WaveDivider
          fill="oklch(0.18 0.05 270)"
          path="M0,50 C360,0 1080,70 1440,30 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Recent Launches ──────────────────────────────────────────────── */}
      <section
        className="relative bg-card py-28"
        data-ocid="home.launches_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Recent Launches
              </span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground">
                Fresh Off the <span className="gradient-accent">Build</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Projects we've shipped recently — real work, real impact.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-primary/5 border border-primary/20 p-1.5 rounded-2xl backdrop-blur-md shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.3)]">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/40 animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Coming Soon
              </div>
              <span className="pr-5 text-xs font-bold text-foreground/80">
                Portfolio Preview
              </span>
            </div>
          </div>
          {portfolioLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div
              className="relative group/portfolio"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              <div
                className="grid md:grid-cols-12 gap-6 transition-opacity duration-700"
                style={{
                  maskImage: `radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, rgba(0,0,0,0.25) 100%)`,
                  WebkitMaskImage: `radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, rgba(0,0,0,0.25) 100%)`,
                }}
              >
                {portfolio.slice(0, 3).map((item, i) => (
                  <motion.div
                    key={String(item.id)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    data-ocid={`home.launch.${i + 1}`}
                    className={`group card-fluid overflow-hidden
                    ${i === 0 ? "md:col-span-7" : "md:col-span-5"}
                    ${i === 2 ? "md:col-span-12 md:grid md:grid-cols-2" : ""}`}
                  >
                    <div
                      className={`bg-gradient-to-br from-muted/80 to-background overflow-hidden relative
                    ${i === 2 ? "h-full min-h-[200px]" : "h-52"}`}
                    >
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary text-2xl font-display font-bold blob-accent">
                            {item.title.charAt(0)}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                      {i === 0 && (
                        <Badge className="absolute top-4 right-4 rounded-full bg-primary/20 text-primary border-primary/30 text-xs backdrop-blur-sm">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.clientName}
                        {item.launchDate ? ` · ${item.launchDate}` : ""}
                      </p>
                      <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-0.5 rounded-full bg-primary/10 text-primary/80 border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <WaveDivider
          fill="oklch(0.13 0.05 267)"
          path="M0,30 C600,70 1000,0 1440,45 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-background py-28"
        data-ocid="home.faq_section"
      >
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions"
            subtitle="Everything you need to know before reaching out."
          />
          {faqLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="flex flex-col gap-3"
            >
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={String(faq.id)}
                  value={`item-${i}`}
                  data-ocid={`home.faq.${i + 1}`}
                  className="card-fluid border-none px-7 overflow-hidden group"
                >
                  <AccordionTrigger className="font-display font-semibold text-foreground text-sm py-5 hover:no-underline hover:text-primary transition-colors [&[data-state=open]]:text-primary">
                    <span className="flex items-center gap-3">
                      <span className="w-1 h-5 rounded-full bg-primary/30 group-data-[state=open]:bg-primary transition-smooth" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 pl-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        <WaveDivider
          fill="oklch(0.18 0.05 270)"
          path="M0,15 C360,70 1080,0 1440,40 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Contact CTA Banner ───────────────────────────────────────────── */}
      <section
        className="relative bg-card py-24 overflow-hidden"
        data-ocid="home.cta_section"
      >
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"
          aria-hidden
        />

        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Let's Work Together
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Ready to shape the <span className="gradient-accent">future</span>{" "}
              of your business?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Tell us about your challenge. Our team will respond within 24
              hours with initial thoughts and next steps — no commitment
              required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Link to="/contact" data-ocid="home.cta_primary_button">
                <Button
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-semibold px-10 gap-2 transition-smooth shadow-[0_0_32px_oklch(0.75_0.12_195/0.4)] hover:shadow-[0_0_48px_oklch(0.75_0.12_195/0.6)] hover:-translate-y-0.5"
                >
                  Get in Touch <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/solutions" data-ocid="home.cta_secondary_button">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-border/60 hover:border-primary/50 text-foreground font-semibold px-8 transition-smooth hover:bg-primary/5 hover:-translate-y-0.5"
                >
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Form ─────────────────────────────────────────────────── */}
      <section
        className="relative bg-background pt-28 pb-32 overflow-hidden"
        data-ocid="home.contact_section"
      >
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"
          aria-hidden
        />

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
                title="Start Your Project"
                subtitle="Tell us about your idea. A solutions architect will reach out within 24 hours."
                align="left"
              />
              <ul className="flex flex-col gap-4 mt-4">
                {[
                  "Free discovery call to scope your project",
                  "Transparent fixed-price quotes — no hidden fees",
                  "Dedicated project manager from day one",
                  "Weekly demos and progress reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="size-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
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
              style={{
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px oklch(0.28 0.05 270 / 0.6)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-2xl pointer-events-none"
                aria-hidden
              >
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
