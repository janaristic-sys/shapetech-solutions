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

// ─── Wave Divider ─────────────────────────────────────────────────────────────
function WaveDivider({ fill, path, height = 70 }: { fill: string; path: string; height?: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" aria-hidden="true">
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
