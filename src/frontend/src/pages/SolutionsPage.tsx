import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSolutions, useShapes, useIndustries } from "@/hooks/use-backend";
import { Solution } from "@/types";
import { useState, useMemo, useEffect } from "react";

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
};

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const normalized = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const Icon = ICON_MAP[normalized] ?? ICON_MAP[name] ?? Code2;
  return <Icon {...props} />;
}

const SOLUTION_LOGO_URLS: Record<string, string> = {
  crunchi:             "/assets/logos/crunchi.png",
  nuvita:              "/assets/logos/nuvita.png",
  "faster-way":        "/assets/logos/faster-way.png",
  "wine-shop-at-home": "/assets/logos/wine-shop-at-home.png",
  reliv:               "/assets/logos/reliv.png",
  "sana-vita":         "/assets/logos/sana-vita.png",
  "l-bri":             "/assets/logos/l-bri.png",
  newulife:            "/assets/logos/newulife.png",
};

function clientLogoUrl(slug: string) {
  return SOLUTION_LOGO_URLS[slug] ?? "";
}

function SolutionSkeleton() {
  return (
    <div className="card-fluid p-8 flex flex-col justify-between min-h-[380px]">
      <div>
        <div className="flex justify-between items-start mb-6">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <Skeleton className="w-20 h-8" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-16 w-full mb-4" />
      </div>
      <Skeleton className="h-10 w-28 rounded-full" />
    </div>
  );
}

export default function SolutionsPage() {
  const { data: solutions = [], isLoading: solutionsLoading } = useSolutions();
  const { data: shapes = [], isLoading: shapesLoading } = useShapes();
  const { data: industries = [], isLoading: industriesLoading } = useIndustries();

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedShape, setSelectedShape] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");

  const techOptions = ["Shopify Plus", "Medusa", "Custom"];

  // Initialize from URL params if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ind = params.get("industry");
    if (ind) {
      setSelectedIndustry(ind);
    }
  }, []);

  // Filter Logic
  const filteredSolutions = useMemo(() => {
    return solutions.filter((sol) => {
      // 1. Text Search Filter
      const text = `${sol.title} ${sol.tagline} ${sol.description} ${sol.features?.join(" ") || ""}`.toLowerCase();
      if (searchQuery && !text.includes(searchQuery.toLowerCase())) {
        return false;
      }

      // 2. Industry Filter
      if (selectedIndustry !== "all") {
        const indId = BigInt(selectedIndustry);
        const ind = industries.find((i) => i.id === indId);
        if (ind && !ind.relatedSolutionIds?.includes(sol.id)) {
          return false;
        }
      }

      // 3. Product (Shape) Filter
      if (selectedShape !== "all") {
        const shapeId = BigInt(selectedShape);
        if (!sol.relatedShapeIds?.includes(shapeId)) {
          return false;
        }
      }

      // 4. Technology Stack Filter
      if (selectedTech !== "all") {
        const textLower = text.toLowerCase();
        if (selectedTech === "Shopify Plus" && !textLower.includes("shopify")) {
          return false;
        }
        if (selectedTech === "Medusa" && !textLower.includes("medusa")) {
          return false;
        }
        if (selectedTech === "Custom" && (textLower.includes("medusa") || textLower.includes("shopify"))) {
          return false;
        }
      }

      return true;
    });
  }, [solutions, searchQuery, selectedIndustry, selectedShape, selectedTech, industries]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("all");
    setSelectedShape("all");
    setSelectedTech("all");
  };

  const hasActiveFilters = searchQuery !== "" || selectedIndustry !== "all" || selectedShape !== "all" || selectedTech !== "all";

  return (
    <div data-ocid="solutions.page">
      {/* ── Hero Section ── */}
      <section
        className="relative bg-card overflow-hidden pt-24 pb-24 md:pt-36 md:pb-32"
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

        <div className="relative container max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
              Implementations
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
              Client Solutions <br />
              <span className="gradient-accent">Database</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
              Browse our portfolio of specialized e-commerce integrations, custom payout back-offices, and high-conversion storefront builds powering $100M+ in annual volume in annual volume.
            </p>
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
            style={{ height: "60px" }}
            aria-hidden="true"
          >
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
              fill="oklch(0.12 0.05 267)"
            />
          </svg>
        </div>
      </section>

      {/* ── Filter Controls Section ── */}
      <section className="bg-background border-b border-border/20 py-8 relative z-30" data-ocid="solutions.filter_section">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search implementations or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border/60 focus:border-primary/50 text-foreground text-sm transition-smooth outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mr-1">
                <SlidersHorizontal className="size-3.5" />
                <span>Filter By:</span>
              </div>

              {/* Industry Dropdown */}
              <div className="relative">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-card border border-border/60 focus:border-primary/50 text-foreground text-sm transition-smooth outline-none cursor-pointer"
                >
                  <option value="all">All Industries</option>
                  {industries.map((ind) => (
                    <option key={String(ind.id)} value={String(ind.id)}>
                      {ind.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Shape Dropdown */}
              <div className="relative">
                <select
                  value={selectedShape}
                  onChange={(e) => setSelectedShape(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-card border border-border/60 focus:border-primary/50 text-foreground text-sm transition-smooth outline-none cursor-pointer"
                >
                  <option value="all">All Shapes</option>
                  {shapes.map((shape) => (
                    <option key={String(shape.id)} value={String(shape.id)}>
                      {shape.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Tech Stack Dropdown */}
              <div className="relative">
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-card border border-border/60 focus:border-primary/50 text-foreground text-sm transition-smooth outline-none cursor-pointer"
                >
                  <option value="all">All Stacks</option>
                  {techOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Clear Button */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="text-xs text-primary hover:text-primary-foreground hover:bg-primary/20 rounded-xl px-4 py-2"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-border/10">
              <span className="text-xs text-muted-foreground font-medium">Active:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full text-xs">
                  Query: "{searchQuery}"
                  <X className="size-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {selectedIndustry !== "all" && (
                <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full text-xs">
                  Industry: {industries.find((i) => String(i.id) === selectedIndustry)?.title}
                  <X className="size-3 cursor-pointer" onClick={() => setSelectedIndustry("all")} />
                </Badge>
              )}
              {selectedShape !== "all" && (
                <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full text-xs">
                  Shape: {shapes.find((s) => String(s.id) === selectedShape)?.title}
                  <X className="size-3 cursor-pointer" onClick={() => setSelectedShape("all")} />
                </Badge>
              )}
              {selectedTech !== "all" && (
                <Badge variant="secondary" className="gap-1 px-3 py-1 rounded-full text-xs">
                  Stack: {selectedTech}
                  <X className="size-3 cursor-pointer" onClick={() => setSelectedTech("all")} />
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Implementations Database Grid ── */}
      <section className="bg-background py-16 min-h-[500px]" data-ocid="solutions.database_grid">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Results count info */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredSolutions.length}</span> of{" "}
              <span className="font-semibold text-foreground">{solutions.length}</span> implementations
            </p>
          </div>

          {solutionsLoading || shapesLoading || industriesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SolutionSkeleton key={i} />
              ))}
            </div>
          ) : filteredSolutions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <SlidersHorizontal className="size-8 animate-pulse" />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">No Implementations Found</h3>
              <p className="text-muted-foreground max-w-md">
                Try widening your search queries or clearing active filters to view all client solutions.
              </p>
              <Button onClick={clearAllFilters} className="mt-6 rounded-full bg-primary text-foreground">
                Reset All Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSolutions.map((sol, index) => {
                  const logoSrc = clientLogoUrl(sol.slug);
                  return (
                    <motion.div
                      key={String(sol.id)}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      data-ocid={`solutions.item.${sol.slug}`}
                      className="group card-fluid p-0 flex flex-col justify-between relative overflow-hidden h-full hover:border-primary/30 transition-smooth scroll-mt-24"
                      id={sol.slug}
                    >
                      <div>
                        {/* Logo area — consistent frosted dark panel */}
                        <div className="relative h-44 flex-shrink-0 flex items-center justify-center border-b border-border/30 overflow-hidden"
                          style={{ background: "oklch(0.16 0.04 270 / 0.9)" }}
                        >
                          {/* Subtle radial glow behind logo */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-32 h-32 rounded-full bg-primary/6 blur-2xl" />
                          </div>
                          {logoSrc ? (
                            <img
                              src={logoSrc}
                              alt={`${sol.title} logo`}
                              className="relative z-10 max-h-14 max-w-[160px] object-contain"
                              style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
                            />
                          ) : (
                            <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                              <DynamicIcon name={sol.iconName ?? "landmark"} className="size-8 text-primary/60" />
                            </div>
                          )}

                          {/* Top-right metrics badge in logo area */}
                          {sol.caseStudy?.metrics?.[0] && (
                            <div className="absolute top-4 right-6 text-right z-20">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 block">
                                {sol.caseStudy.metrics[0].label}
                              </span>
                              <span className="font-display font-black text-lg gradient-accent">
                                {sol.caseStudy.metrics[0].value}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content Area */}
                        <div className="p-8 pb-0">
                          {/* Brand & Tagline */}
                          <h3 className="font-display font-bold text-2xl text-foreground mb-1 group-hover:text-primary transition-colors">
                            {sol.title}
                          </h3>
                          <p className="text-xs text-primary font-semibold tracking-wide uppercase mb-3">
                            {sol.tagline}
                          </p>
                          
                          {/* Short Description */}
                          <p className="text-foreground/90 text-sm leading-relaxed mb-6">
                            {sol.description}
                          </p>

                          {/* Tech Features badges */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {sol.features?.map((f) => (
                              <span
                                key={f}
                                className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/45 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer / Dynamic Case Study Preview */}
                      <div className="p-8 pt-0 mt-auto">
                        <div className="pt-6 border-t border-border/20">
                          {sol.caseStudy ? (
                            <div className="mb-4">
                              <p className="text-[10px] uppercase font-bold tracking-widest text-foreground/80 mb-1">
                                Performance Lift
                              </p>
                              <p className="text-xs text-foreground/95 font-medium line-clamp-2 italic">
                                "{sol.caseStudy.description}"
                              </p>
                              {sol.caseStudy.metrics.length > 1 && (
                                <div className="flex gap-4 mt-2">
                                  {sol.caseStudy.metrics.slice(1).map((m) => (
                                    <div key={m.label} className="flex flex-col">
                                      <span className="text-sm font-bold text-primary">{m.value}</span>
                                      <span className="text-[9px] text-foreground/70 uppercase font-semibold">{m.label}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : null}

                          <Link
                            to="/solutions/$solutionId"
                            params={{ solutionId: sol.slug }}
                            data-ocid={`solutions.detail_link.${sol.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-foreground group-hover:bg-primary/20 px-4 py-2 rounded-full transition-smooth"
                          >
                            View Full Case Study Details
                            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── Partner Integrations Section ── */}
            <section className="bg-card py-20 md:py-24" data-ocid="solutions.partners_section">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
              Strategic Ecosystems
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mt-2 mb-4">
              Certified Integrations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              We architect secure, enterprise-grade pipelines connecting your distributor back-offices to the world's leading commerce platforms.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-3xl mx-auto">
            {[
              { title: "Shopify Plus Expert", desc: "High-volume commerce storefront architectures." },
              { title: "Medusa Headless Engine", desc: "Bespoke checkout & subscription box logic." },
              { title: "HubSpot CRM Integrations", desc: "Genealogy maps and sync workflows." }
            ].map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center gap-3 px-8 py-6 rounded-3xl border border-border bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-smooth flex-1"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                  <CheckCircle2 className="size-6 text-primary" />
                </div>
                <div className="text-center">
                  <h4 className="font-display font-bold text-foreground text-base">{p.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1 leading-normal">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
            <section
        className="relative overflow-hidden py-24 md:py-32 bg-background"
        data-ocid="solutions.cta_section"
      >
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-[0.08]"
          style={{
            background: `radial-gradient(circle, oklch(0.75 0.12 195), transparent 70%)`,
            borderRadius: "50% 50% 60% 40% / 40% 60% 40% 60%",
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
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-6 leading-tight">
              Have a niche commerce problem?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              We design custom loyalty wallets, replicated storefronts, and automated payout engines that grow with your brand. Let's build a solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full font-bold gap-2 px-10 h-14 bg-primary text-foreground hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                  Start a Conversation
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-border/60 text-foreground hover:bg-card/60 font-bold px-10 h-14"
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
