import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import LogoTicker from "@/components/LogoTicker";
import {
  useAbout,
  useClients,
  useIndustries,
  useShapes,
  useSolutions,
  useSubmitContact,
} from "@/hooks/use-backend";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe,
  HeartPulse,
  Landmark,
  Network,
  RefreshCcw,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
  Compass,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";

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
};

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const normalized = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const Icon = ICON_MAP[normalized] ?? ICON_MAP[name] ?? Code2;
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

export default function HomePage() {
  const { data: about } = useAbout();
  const { data: clients = [], isLoading: clientsLoading } = useClients();
  const { data: industries = [], isLoading: industriesLoading } = useIndustries();
  const { data: shapes = [], isLoading: shapesLoading } = useShapes();
  const { data: solutions = [], isLoading: solutionsLoading } = useSolutions();

  return (
    <div data-ocid="home.page">
      {/* ─── Section 1: Hero ───────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden bg-background"
        data-ocid="home.hero_section"
      >
        <HeroBlobs />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-24 md:pb-24 relative z-10">
          <Card className="w-full min-h-[600px] bg-background/5 border-none relative rounded-3xl backdrop-blur-sm overflow-visible">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="oklch(var(--primary))"
            />

            <div className="flex flex-col lg:flex-row h-full min-h-[500px] md:min-h-[600px] items-center overflow-visible">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 p-8 md:p-16 relative z-20 flex flex-col justify-center overflow-visible"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Commerce Solutions
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight text-foreground">
                  Powering <span className="gradient-accent">Global Volume</span> at Scale.
                </h1>
                <p className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed">
                  We build and grow specialized commerce solutions for niche use cases,
                  collectively powering $100s of Millions in annual volume across dozens of countries.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-10">
                  <Link to="/solutions" data-ocid="home.hero_primary_cta">
                    <Button
                      size="lg"
                      className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-semibold px-8 gap-2 transition-smooth shadow-[0_0_28px_oklch(0.75_0.12_195/0.4)] hover:shadow-[0_0_40px_oklch(0.75_0.12_195/0.6)] hover:-translate-y-0.5"
                    >
                      Explore Client Solutions
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

                {/* Scale Metrics */}
                <div className="flex items-center gap-8 mt-12">
                  {[
                    { value: "$100M+", label: "Annual Volume" },
                    { value: "Dozens", label: "Countries Served" },
                    { value: "6", label: "Client Solutions" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-start">
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

              {/* Right content - Spline Scene */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="hidden lg:flex flex-1 relative w-full h-[350px] sm:h-[450px] lg:h-[600px] z-10 overflow-visible"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full transform lg:scale-[1.4] origin-center"
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

      {/* Client Logos ticker under Hero */}
      <div className="w-full bg-background/50 border-y border-border/20 py-8 relative z-20">
        <div className="container max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-6">
            Powering Leading Commerce Ecosystems
          </p>
          {clientsLoading ? (
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-lg" />
              ))}
            </div>
          ) : (
            <LogoTicker clients={clients} />
          )}
        </div>
      </div>

      {/* ─── Section 2: About ──────────────────────────────────────────────── */}
      <section
        className="relative bg-card py-20 md:py-28"
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
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading
                eyebrow="Our Philosophy"
                title={about?.title ?? "Your Engineering Team for the Long Haul"}
                align="left"
              />
              <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
                {about?.body ??
                  "ShapeTech Solutions is an international team of specialists dedicated to building and integrating custom-built software solutions. Where standard software falls short, we step in. We engineer custom tools specifically designed to handle your most complex operational hurdles."}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                Our ultimate goal is to build long-term technology engines that solve our clients' complex commerce problems. Solutions are the individual implementations of our technology for a specific merchant.
              </p>
              <Link to="/about" data-ocid="home.about_cta">
                <Button className="rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 gap-2 transition-smooth hover:-translate-y-0.5">
                  About Our Approach <ArrowRight className="size-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Market Tiers Component */}
            <div className="relative">
              <div className="flex flex-col gap-4">
                {[
                  {
                    tier: "Tier 1",
                    title: "Innovative Startups",
                    description: "Moving from idea to MVP.",
                  },
                  {
                    tier: "Tier 2",
                    title: "Mid-Sized / Growth Business",
                    description: "Modernizing e-commerce operations.",
                  },
                  {
                    tier: "Tier 3",
                    title: "Evolving Enterprise",
                    description: "Global e-commerce transformation.",
                  },
                ].map((tier, i) => (
                  <motion.div
                    key={tier.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card-fluid p-6 flex gap-5 items-center relative overflow-hidden group hover:border-primary/30 transition-smooth"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm tracking-wider group-hover:bg-primary/20 group-hover:scale-105 transition-smooth">
                      {tier.tier}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground text-base group-hover:text-primary transition-colors">
                        {tier.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 block">
                        {tier.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <WaveDivider
          fill="oklch(0.13 0.05 267)"
          path="M0,35 C720,70 1080,0 1440,35 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Section 3: Shapes (Proprietary Products) ────────────────────────── */}
      <section
        className="relative bg-background py-20 md:py-28"
        data-ocid="home.shapes_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="Proprietary Technology"
            title="Our Shapes"
            subtitle="Shapes are our proprietary commerce engines — modular, production-ready building blocks engineered to solve the complex compensation, subscription, checkout, and CRM requirements of niche commerce."
            gradient
          />

          {shapesLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shapes.map((shape, i) => (
                <motion.div
                  key={String(shape.id)}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  data-ocid={`home.shape.${i + 1}`}
                  className="group card-fluid p-8 flex flex-col relative overflow-hidden h-full"
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
                      <DynamicIcon name={shape.iconName ?? "star"} className="size-7" />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-colors">
                      {shape.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      {shape.description}
                    </p>
                    {shape.capabilities && shape.capabilities.length > 0 && (
                      <div className="border-t border-border/40 pt-4 mt-auto">
                        <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">
                          Key Capabilities
                        </p>
                        <ul className="space-y-2">
                          {shape.capabilities.slice(0, 4).map((cap, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                              {cap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <WaveDivider
          fill="oklch(0.18 0.05 270)"
          path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          height={60}
        />
      </section>

      {/* ─── Section 4: Client Solutions (Case Studies) ────────────────────────── */}
      <section
        className="relative bg-card py-20 md:py-28"
        data-ocid="home.solutions_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="Case Studies"
            title="Specialized Client Solutions"
            subtitle="Explore our implementations across niche e-commerce, gamified loyalty, and distributor platforms."
            gradient
          />

          {solutionsLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((sol, i) => (
                <motion.div
                  key={String(sol.id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  data-ocid={`home.solution.${i + 1}`}
                  className="group card-fluid p-8 flex flex-col justify-between relative overflow-hidden h-full hover:border-primary/30 transition-smooth"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary blob-accent group-hover:scale-105 transition-smooth">
                        <DynamicIcon name={sol.iconName ?? "landmark"} className="size-6" />
                      </div>
                      {sol.caseStudy?.metrics?.[0] && (
                        <div className="text-right">
                          <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                            {sol.caseStudy.metrics[0].label}
                          </span>
                          <span className="font-display font-black text-lg gradient-accent">
                            {sol.caseStudy.metrics[0].value}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-foreground text-xl mb-1 group-hover:text-primary transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-primary/80 font-semibold mb-3">
                      {sol.tagline}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {sol.description}
                    </p>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {sol.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="text-[10px] px-2.5 py-0.5 rounded-full bg-background border border-border/60 text-muted-foreground"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/solutions#${sol.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-foreground group-hover:bg-primary/20 px-3 py-1.5 rounded-full self-start transition-smooth"
                  >
                    View Details
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <WaveDivider
          fill="oklch(0.13 0.05 267)"
          path="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          height={60}
        />
      </section>

      {/* ─── Section 5: Industries ────────────────────────────────────────── */}
      <section
        className="relative bg-background py-20 md:py-28"
        data-ocid="home.industries_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            eyebrow="Vertically Focused"
            title="Industries We Power"
            subtitle="Tailored modules designed to align with vertical requirements, compliance mandates, and merchant dynamics."
          />

          {industriesLoading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col border-t border-border/40 mt-10">
              {industries.map((ind, i) => (
                <motion.div
                  key={String(ind.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-ocid={`home.industry.${i + 1}`}
                  className="group relative border-b border-border/40 transition-smooth hover:bg-primary/[0.02]"
                >
                  <div className="container max-w-7xl mx-auto py-6 lg:py-8 relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                    {/* Number & Icon */}
                    <div className="flex items-center gap-5 lg:min-w-[240px]">
                      <span className="font-display font-bold text-4xl lg:text-5xl text-primary/10 group-hover:text-primary/30 transition-smooth tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-105 group-hover:bg-primary/15 transition-smooth">
                        <DynamicIcon name={ind.iconName ?? "compass"} className="size-6" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl lg:text-2xl text-foreground group-hover:text-primary transition-smooth">
                        {ind.title}
                      </h3>
                      <div className="lg:hidden mt-3">
                        <p className="text-muted-foreground text-sm leading-relaxed">
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
        </div>

        <WaveDivider
          fill="oklch(0.18 0.05 270)"
          path="M0,0 C480,70 960,0 1440,50 L1440,70 L0,70 Z"
        />
      </section>

      {/* ─── Section 6: Contact ───────────────────────────────────────────── */}
      <section
        className="relative bg-card py-20 md:py-28 overflow-hidden"
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
                title="Let's Solve Your Commerce Problem"
                subtitle="Tell us about your requirements. A solutions architect will reach out within 24 hours."
                align="left"
              />
              <ul className="flex flex-col gap-4 mt-6">
                {[
                  "Discuss your custom commission or MLM comp plan logic",
                  "Scope headless Shopify or Medusa migrations",
                  "Design a credits/wallet system using our Credits engine",
                  "Direct integration with HubSpot CRM or custom ERPs",
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
