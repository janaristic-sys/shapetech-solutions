import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useClients, usePartners } from "@/hooks/use-backend";
import type { Partner } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  ExternalLink,
  Globe,
  Handshake,
  LayoutGrid,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ── Static data ─────────────────────────────────────────────────────────────

const FEATURED_PARTNERS: Partner[] = [
  {
    id: 1n,
    name: "Shopify",
    logoUrl: "",
    websiteUrl: "https://shopify.com",
    description:
      "Shopify Plus Partner with deep expertise in headless commerce, custom app development, and direct-selling storefronts. We build seamless shopping experiences that scale from startup to enterprise.",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Medusa",
    logoUrl: "",
    websiteUrl: "https://medusajs.com",
    description:
      "Featured Medusa partner specializing in open-source composable commerce. We build scalable, highly customizable bespoke e-commerce architectures tailored exactly to complex enterprise requirements.",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Dotdigital",
    logoUrl: "",
    websiteUrl: "https://dotdigital.com",
    description:
      "Certified Dotdigital partner. We craft data-driven, cross-channel marketing automations that engage your audience and drive conversion at scale.",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "HubSpot",
    logoUrl: "",
    websiteUrl: "https://hubspot.com",
    description:
      "Certified HubSpot Solutions Partner. We design and implement CRM architectures, Marketing Hub automations, Sales pipelines and custom integrations — helping companies unify their data.",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "LPT",
    logoUrl: "",
    websiteUrl: "#",
    description:
      "Featured partner integrating specialized platform solutions. We build powerful tooling to connect your backend operations directly to scalable front-end commerce.",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "ByDesign",
    logoUrl: "",
    websiteUrl: "https://bydesign.com",
    description:
      "Specialized integration partner. We connect ByDesign commission engines and direct-selling platforms seamlessly with modern headless frontends to power distributor success.",
    sortOrder: 6n,
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Access to Latest Features",
    description:
      "As certified partners we receive early access to platform updates, beta features, and product roadmaps — so your project benefits from cutting-edge capabilities before they're publicly available.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Support",
    description:
      "Our partner status unlocks priority access to platform support teams. When issues arise, we have direct escalation channels with HubSpot, Shopify, AWS and others — your project never gets stuck in a queue.",
  },
  {
    icon: Award,
    title: "Certified Expertise",
    description:
      "Every partnership requires rigorous certification across all major platforms. Our team holds active certifications that verify we meet each vendor's highest standard of technical and delivery excellence.",
  },
];

const HUBSPOT_HIGHLIGHTS = [
  "CRM architecture & custom properties",
  "Marketing Hub automation & workflows",
  "Shopify ↔ HubSpot data sync",
  "Sales pipeline & deal stage configuration",
  "Distributor onboarding automation",
  "Platform training & team enablement",
];

const SHOPIFY_HIGHLIGHTS = [
  "Storefront development & theme customisation",
  "Shopify Plus & headless commerce builds",
  "Custom app development & integrations",
  "Checkout extensibility & scripts",
  "Direct-selling compensation plan storefronts",
  "Multi-currency & international commerce",
];

// ── Sub-components ───────────────────────────────────────────────────────────

function PartnerLogoBox({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.18), oklch(0.28 0.05 270))",
        border: "1px solid oklch(0.75 0.12 195 / 0.28)",
      }}
    >
      <span className="font-display font-bold text-lg text-primary">
        {initials}
      </span>
    </div>
  );
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const isOffset = index % 2 !== 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: isOffset ? 40 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      data-ocid={`partners.item.${index + 1}`}
      className={`card-fluid group relative rounded-3xl border border-border/50 p-7 hover:border-primary/40 flex flex-col gap-5 overflow-hidden${isOffset ? " lg:mt-8" : ""}`}
    >
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-smooth"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
        }}
      />
      <div className="flex items-center gap-4">
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="w-16 h-16 rounded-2xl object-contain p-2 flex-shrink-0"
            style={{
              background: "oklch(0.28 0.05 270)",
              border: "1px solid oklch(0.35 0.04 270)",
            }}
          />
        ) : (
          <PartnerLogoBox name={partner.name} />
        )}
        <div className="min-w-0">
          <h3 className="font-display font-bold text-foreground text-xl leading-tight truncate">
            {partner.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Globe className="size-3 text-muted-foreground flex-shrink-0" />
            <a
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-smooth truncate"
              data-ocid={`partners.website_link.${index + 1}`}
            >
              {partner.websiteUrl.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
        {partner.description}
      </p>
      <div className="divider-fluid" />
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:gap-3 transition-smooth self-start"
        data-ocid={`partners.visit_link.${index + 1}`}
      >
        Visit partner <ExternalLink className="size-3" />
      </a>
    </motion.div>
  );
}

function PartnerCardSkeleton({ offset = false }: { offset?: boolean }) {
  return (
    <div
      className={`rounded-3xl border border-border/50 p-7 flex flex-col gap-5${offset ? " lg:mt-8" : ""}`}
      style={{ background: "oklch(0.22 0.05 270)" }}
    >
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

function HighlightPill({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-foreground/85">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "oklch(0.75 0.12 195 / 0.18)" }}
      >
        <BadgeCheck className="size-3 text-primary" />
      </span>
      {text}
    </li>
  );
}

function ClientLogoPlaceholder({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      data-ocid={`partners.client_logo.${index + 1}`}
      className="rounded-2xl border border-border/40 px-6 py-5 flex items-center justify-center hover:border-primary/30 transition-smooth cursor-default"
      style={{ background: "oklch(0.20 0.05 270)" }}
    >
      <span className="font-display font-semibold text-sm text-muted-foreground/70 text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  const { data: backendPartners, isLoading } = usePartners();
  const { data: clients } = useClients();
  const partners =
    backendPartners && backendPartners.length > 4
      ? backendPartners
      : FEATURED_PARTNERS;

  const clientNames = clients
    ? clients.map((c) => c.name)
    : [
        "Forever Living",
        "Isagenix",
        "4Life Research",
        "Kyäni",
        "Synergy WorldWide",
        "Noni by NewAge",
        "Mannatech",
        "Rain International",
      ];

  return (
    <div data-ocid="partners.page">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-16 pb-28 md:pt-32 md:pb-40"
        data-ocid="partners.hero_section"
        style={{ background: "oklch(0.22 0.05 270)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 w-[600px] h-[600px] blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle at 70% 40%, oklch(0.75 0.12 195) 0%, transparent 65%)",
            borderRadius: "40% 60% 60% 40% / 50% 50% 70% 50%",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, oklch(0.75 0.12 195) 0px, oklch(0.75 0.12 195) 1px, transparent 1px, transparent 30px)",
          }}
        />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 backdrop-blur-sm"
              style={{ background: "oklch(0.75 0.12 195 / 0.1)" }}
            >
              <Handshake className="size-3.5" />
              Technology Partners
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
              Our <span className="gradient-accent">Partners</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
              We work with the world's leading technology platforms to deliver
              best-in-class solutions for our clients. Every partnership is
              built on certification, shared values, and a commitment to
              measurable outcomes.
            </p>
          </motion.div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 leading-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "80px" }}
          >
            <path
              d="M0,80 C320,20 620,100 900,60 C1100,30 1300,80 1440,50 L1440,120 L0,120 Z"
              fill="oklch(0.15 0.07 267)"
            />
          </svg>
        </div>
      </section>

      {/* ── Technology Partners Grid ──────────────────────────────────────── */}
      <section
        className="bg-background py-20 md:py-28"
        data-ocid="partners.list_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-3">
              Technology <span className="gradient-accent">Partners</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Certified partnerships that power every engagement.
            </p>
          </motion.div>
          {isLoading ? (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="partners.loading_state"
            >
              {([0, 1, 2, 3, 4, 5] as const).map((k) => (
                <PartnerCardSkeleton key={k} offset={k % 2 !== 0} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...partners]
                .sort((a, b) => Number(a.sortOrder - b.sortOrder))
                .map((partner, i) => (
                  <PartnerCard
                    key={String(partner.id)}
                    partner={partner}
                    index={i}
                  />
                ))}
            </div>
          )}
        </div>
      </section>

      {/* ── HubSpot Partner Highlight ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        data-ocid="partners.hubspot_section"
        style={{ background: "oklch(0.19 0.06 260)" }}
      >
        {/* curved top */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 leading-none"
          style={{ marginTop: "-1px" }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "60px" }}
          >
            <path
              d="M0,0 C480,80 960,0 1440,60 L1440,0 L0,0 Z"
              fill="oklch(0.15 0.07 267)"
            />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 w-[500px] h-[500px] blur-3xl opacity-10"
          style={{
            background:
              "radial-gradient(circle at 80% 30%, oklch(0.75 0.12 195) 0%, transparent 65%)",
          }}
        />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* HubSpot Certified Partner badge */}
              <div
                className="inline-flex items-center gap-3 rounded-2xl px-5 py-3 mb-8 border border-primary/30"
                style={{ background: "oklch(0.75 0.12 195 / 0.1)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.75 0.12 195 / 0.2)" }}
                >
                  <Star className="size-4 text-primary" fill="currentColor" />
                </div>
                <div>
                  <p className="font-display font-bold text-primary text-sm leading-none mb-0.5">
                    HubSpot Certified Partner
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Solutions Partner Program
                  </p>
                </div>
              </div>

              <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-5">
                HubSpot <span className="gradient-accent">Certified</span>{" "}
                Partner
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                As a Certified HubSpot Solutions Partner, Shapetech designs and
                implements end-to-end CRM ecosystems tailored for direct-selling
                and network-marketing organizations. We don't just connect
                systems — we architect growth engines.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                From Marketing Hub automation to Shopify data sync and
                distributor onboarding workflows, our certified team delivers
                measurable outcomes at every stage of the customer lifecycle.
              </p>
              <a
                href="https://hubspot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-smooth"
                data-ocid="partners.hubspot_link"
              >
                Learn about HubSpot <ExternalLink className="size-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div
                className="rounded-3xl border border-border/40 p-8"
                style={{ background: "oklch(0.22 0.05 270)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <LayoutGrid className="size-5 text-primary" />
                  <span className="font-display font-semibold text-foreground text-base">
                    What we deliver
                  </span>
                </div>
                <ul className="space-y-3">
                  {HUBSPOT_HIGHLIGHTS.map((item) => (
                    <HighlightPill key={item} text={item} />
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* curved bottom */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 leading-none"
          style={{ marginBottom: "-1px" }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "60px" }}
          >
            <path
              d="M0,40 C360,80 1080,0 1440,60 L1440,80 L0,80 Z"
              fill="oklch(0.15 0.07 267)"
            />
          </svg>
        </div>
      </section>

      {/* ── Shopify Partner Highlight ─────────────────────────────────────── */}
      <section
        className="bg-background py-20 md:py-28"
        data-ocid="partners.shopify_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-2 lg:order-1"
            >
              <div
                className="rounded-3xl border border-border/40 p-8"
                style={{ background: "oklch(0.22 0.05 270)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingBag className="size-5 text-primary" />
                  <span className="font-display font-semibold text-foreground text-base">
                    What we build
                  </span>
                </div>
                <ul className="space-y-3">
                  {SHOPIFY_HIGHLIGHTS.map((item) => (
                    <HighlightPill key={item} text={item} />
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              {/* Shopify Partner badge */}
              <div
                className="inline-flex items-center gap-3 rounded-2xl px-5 py-3 mb-8 border border-primary/30"
                style={{ background: "oklch(0.75 0.12 195 / 0.1)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.75 0.12 195 / 0.2)" }}
                >
                  <Sparkles className="size-4 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-primary text-sm leading-none mb-0.5">
                    Shopify Partner
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Shopify Plus Certified
                  </p>
                </div>
              </div>

              <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-5">
                Shopify <span className="gradient-accent">Plus</span> Partner
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Shapetech is a certified Shopify Partner with hands-on Shopify
                Plus expertise. We build storefronts, custom apps, and
                integrations that transform your commerce operation — from a
                standard Shopify store to an enterprise-grade direct-selling
                powerhouse.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Whether you need checkout customization, a bespoke headless
                front end, or a full migration from a legacy platform, our
                Shopify-certified team has delivered it at scale.
              </p>
              <a
                href="https://shopify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-smooth"
                data-ocid="partners.shopify_link"
              >
                Learn about Shopify <ExternalLink className="size-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Partnership Benefits ──────────────────────────────────────────── */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        data-ocid="partners.benefits_section"
        style={{ background: "oklch(0.19 0.08 260)" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, oklch(0.75 0.12 195) 0px, oklch(0.75 0.12 195) 2px, transparent 2px, transparent 50px)",
          }}
        />

        {/* curved top */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 leading-none"
          style={{ marginTop: "-1px" }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "60px" }}
          >
            <path
              d="M0,60 C480,0 960,80 1440,20 L1440,0 L0,0 Z"
              fill="oklch(0.15 0.07 267)"
            />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4">
              Partnership <span className="gradient-accent">Benefits</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              When you work with Shapetech, you engage a network of certified
              platform experts — not just a dev shop.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  data-ocid={`partners.benefit.${i + 1}`}
                  className="card-fluid group rounded-3xl border border-border/50 p-8 flex flex-col gap-5 hover:border-primary/40 overflow-hidden relative"
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-smooth"
                    style={{
                      background:
                        "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
                    }}
                  />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.2), oklch(0.75 0.12 195 / 0.05))",
                      border: "1px solid oklch(0.75 0.12 195 / 0.25)",
                    }}
                  >
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* curved bottom */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 leading-none"
          style={{ marginBottom: "-1px" }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "60px" }}
          >
            <path
              d="M0,20 C360,80 1080,0 1440,50 L1440,80 L0,80 Z"
              fill="oklch(0.15 0.07 267)"
            />
          </svg>
        </div>
      </section>

      {/* ── Client Logos ─────────────────────────────────────────────────── */}
      <section
        className="bg-background py-20 md:py-28"
        data-ocid="partners.clients_section"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Trusted by Leading{" "}
              <span className="gradient-accent">Organizations</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              We've helped direct-selling companies, e-commerce brands, and
              fast-growing startups leverage our partner network to drive real
              results.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {clientNames.map((name, i) => (
              <ClientLogoPlaceholder key={name} name={name} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        data-ocid="partners.cta_section"
        style={{ background: "oklch(0.22 0.05 270)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-3xl opacity-[0.12]"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.75 0.12 195) 0%, transparent 70%)",
          }}
        />
        {/* curved top */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 leading-none"
          style={{ marginTop: "-1px" }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "80px" }}
          >
            <path
              d="M0,50 C400,0 1000,80 1440,20 L1440,0 L0,0 Z"
              fill="oklch(0.15 0.07 267)"
            />
          </svg>
        </div>

        <div className="relative container max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-6"
              style={{
                background: "oklch(0.75 0.12 195 / 0.15)",
                border: "1px solid oklch(0.75 0.12 195 / 0.3)",
              }}
            >
              <Handshake className="size-8 text-primary" />
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4">
              Want to learn more about how our{" "}
              <span className="gradient-accent">partnerships benefit you?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Our partnerships translate directly into better outcomes for your
              project — faster delivery, deeper expertise, and access to
              platform features most agencies never see. Let's talk.
            </p>
            <Link to="/contact" data-ocid="partners.contact_cta">
              <Button
                size="lg"
                className="rounded-full font-semibold gap-2 px-10 h-12 transition-smooth"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.75 0.12 195), oklch(0.65 0.14 205))",
                  boxShadow: "0 0 24px oklch(0.75 0.12 195 / 0.4)",
                  color: "oklch(0.12 0.03 270)",
                }}
              >
                Get in Touch <ArrowRight className="size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
