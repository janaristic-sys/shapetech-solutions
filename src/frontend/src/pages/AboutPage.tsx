import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAbout, useTeam } from "@/hooks/use-backend";
import type { TeamMember } from "@/types";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Eye,
  Handshake,
  Lightbulb,
  MapPin,
  Medal,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { FaLinkedinIn } from "react-icons/fa6";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface StatItem {
  value: string;
  label: string;
}
interface Office {
  city: string;
  country: string;
  flag: string;
  address: string;
  description: string;
}
interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const STATS: StatItem[] = [
  { value: "50+", label: "International Team" },
  { value: "50+", label: "Projects Delivered" },
  { value: "2", label: "Global Offices" },
  { value: "10+", label: "Years Tech Experience" },
];

const OFFICES: Office[] = [
  {
    city: "Sarasota",
    country: "Florida, USA",
    flag: "🇺🇸",
    address: "Sarasota, FL — Headquarters",
    description:
      "Our North American headquarters — home to our leadership, sales, and client success teams. Serving clients across the Americas and coordinating global engagements.",
  },
  {
    city: "Niš",
    country: "Serbia",
    flag: "🇷🇸",
    address: "Niš, Serbia — Development Office",
    description:
      "Our engineering hub in Serbia, powering product development and delivery for European timezone clients with a world-class technical team of developers and architects.",
  },
];

const VALUES: ValueItem[] = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay ahead of the technology curve so our clients don't have to. Every project is an opportunity to apply the latest tools and approaches to create real competitive advantage.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description:
      "We don't just deliver software — we become partners in your success. We invest in understanding your business, your goals, and your challenges as if they were our own.",
  },
  {
    icon: Medal,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in everything we do — from code quality and design to communication and project management. Good enough is never enough.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    description:
      "No hidden costs, no surprises, no spin. We communicate clearly and honestly throughout every engagement — about timelines, progress, risks, and results.",
  },
  {
    icon: TrendingUp,
    title: "Results-Driven",
    description:
      "We measure our success by the outcomes we create for our clients — not lines of code or hours billed. Every decision is made with your business goals in mind.",
  },
];

// ---------------------------------------------------------------------------
// Real team members — shown when backend returns empty
// ---------------------------------------------------------------------------
const REAL_TEAM: TeamMember[] = [
  {
    id: 1n,
    name: "Connor Hester",
    role: "Co-Founder & CEO",
    bio: "Connor leads the strategic vision at ShapeTech Solutions, helping clients transform their businesses through technology. He has worked with dozens of companies from startups to $100M+ enterprises.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 1n,
    category: "leadership",
  },
  {
    id: 2n,
    name: "Saša Veličković",
    role: "Co-Founder & President",
    bio: "Saša oversees client relations and business strategy, ensuring that every project is perfectly aligned with the client's long-term objectives.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 2n,
    category: "leadership",
  },
  {
    id: 3n,
    name: "Nenad Andrejević",
    role: "Co-Founder & CTO",
    bio: "Nenad is the architectural lead, responsible for the technical integrity and scalability of the solutions we deliver.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 3n,
    category: "leadership",
  },
  {
    id: 4n,
    name: "Darko Milenković",
    role: "Co-Founder & Creative Director",
    bio: "Darko sets the creative standard, blending high-end design with functional excellence to create immersive digital experiences.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 4n,
    category: "leadership",
  },
  {
    id: 5n,
    name: "Dušan Mitrović",
    role: "Co-Founder & Managing Partner",
    bio: "Dušan manages operational excellence across our engineering teams, ensuring robust delivery and technical growth.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 5n,
    category: "leadership",
  },
  {
    id: 6n,
    name: "Miodrag Vidojković",
    role: "VP of Operations",
    bio: "Miodrag keeps our global operations running smoothly, bridging the gap between strategy and execution.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 6n,
    category: "leadership",
  },
  {
    id: 7n,
    name: "Nemanja Jotić",
    role: "VP of Finances",
    bio: "Nemanja oversees the financial health and strategic growth planning for ShapeTech Solutions.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 7n,
    category: "leadership",
  },
  {
    id: 8n,
    name: "Nikola Olarić",
    role: "Back-end Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 8n,
    category: "engineering",
  },
  {
    id: 9n,
    name: "Ana Mitrović",
    role: "Graphic and Web Designer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 9n,
    category: "creative",
  },
  {
    id: 10n,
    name: "Andriana Miladinović",
    role: "Client Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 10n,
    category: "operations",
  },
  {
    id: 11n,
    name: "Sandra Marković",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 11n,
    category: "engineering",
  },
  {
    id: 12n,
    name: "Milena Blagojević",
    role: "Back-end Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 12n,
    category: "engineering",
  },
  {
    id: 13n,
    name: "Djordje Stojanović",
    role: "Client Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 13n,
    category: "operations",
  },
  {
    id: 14n,
    name: "Anastasios Spanos",
    role: "QA Engineer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 14n,
    category: "engineering",
  },
  {
    id: 15n,
    name: "Uroš Terzić",
    role: "Back-end Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 15n,
    category: "engineering",
  },
  {
    id: 16n,
    name: "Marija Veljković",
    role: "Back-end Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 16n,
    category: "engineering",
  },
  {
    id: 17n,
    name: "Milan Stanković",
    role: "Frontend Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 17n,
    category: "engineering",
  },
  {
    id: 18n,
    name: "Katarina Tonić",
    role: "People Operations Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 18n,
    category: "operations",
  },
  {
    id: 19n,
    name: "Sara Milovanović",
    role: "Backend developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 19n,
    category: "engineering",
  },
  {
    id: 20n,
    name: "Marko Budiša",
    role: "Back-end Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 20n,
    category: "engineering",
  },
  {
    id: 21n,
    name: "Milica Prvulović",
    role: "Frontend Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 21n,
    category: "engineering",
  },
  {
    id: 22n,
    name: "Filip Stamenković",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 22n,
    category: "engineering",
  },
  {
    id: 23n,
    name: "Marko Kostić",
    role: "Back-end Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 23n,
    category: "engineering",
  },
  {
    id: 24n,
    name: "Matea Milosavljević",
    role: "Back-end Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 24n,
    category: "engineering",
  },
  {
    id: 25n,
    name: "Slađan Milenović",
    role: "IT Administrator",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 25n,
    category: "operations",
  },
  {
    id: 26n,
    name: "Damjan Denić",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 26n,
    category: "engineering",
  },
  {
    id: 27n,
    name: "Predrag Aleksov",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 27n,
    category: "engineering",
  },
  {
    id: 28n,
    name: "Mihajlo Petrović",
    role: "Client Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 28n,
    category: "operations",
  },
  {
    id: 29n,
    name: "Mila Teokarević",
    role: "UX/UI Designer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 29n,
    category: "creative",
  },
  {
    id: 30n,
    name: "Milena Radosavljević",
    role: "Project Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 30n,
    category: "operations",
  },
  {
    id: 31n,
    name: "Andrija Đorđević",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 31n,
    category: "engineering",
  },
  {
    id: 32n,
    name: "Andria Trojanović",
    role: "Client Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 32n,
    category: "operations",
  },
  {
    id: 33n,
    name: "Milica Antonijević",
    role: "Client Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 33n,
    category: "operations",
  },
  {
    id: 34n,
    name: "Jana Ristić",
    role: "Business Development Representative",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 34n,
    category: "operations",
  },
  {
    id: 35n,
    name: "Filip Minić",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 35n,
    category: "engineering",
  },
  {
    id: 36n,
    name: "Dušan Ristić",
    role: "Back-end Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 36n,
    category: "engineering",
  },
  {
    id: 37n,
    name: "Teodora Velisavljević",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 37n,
    category: "engineering",
  },
  {
    id: 38n,
    name: "Marko Spasić",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 38n,
    category: "engineering",
  },
  {
    id: 39n,
    name: "Sara Novosel",
    role: "Project Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 39n,
    category: "operations",
  },
  {
    id: 40n,
    name: "Irina Veličković",
    role: "People Operations Assistant",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 40n,
    category: "operations",
  },
  {
    id: 41n,
    name: "Milica Savić",
    role: "Frontend Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 41n,
    category: "engineering",
  },
  {
    id: 42n,
    name: "Dalibor Stanojević",
    role: "Fullstack Developer",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 42n,
    category: "engineering",
  },
  {
    id: 43n,
    name: "Miloš Videnović",
    role: "Project Manager",
    bio: "",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 43n,
    category: "operations",
  },
];
function WaveDivider({
  topColor,
  bottomColor,
}: {
  topColor: string;
  bottomColor: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden -my-px"
      style={{ height: 80 }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="80" fill={topColor} />
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BlobBackground
// ---------------------------------------------------------------------------
function BlobBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute -top-32 -right-32 w-[700px] h-[700px] opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 65%)",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          animation: "flowing 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 -left-40 w-[500px] h-[500px] opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 65%)",
          borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%",
          animation: "flowing 14s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function PageHero() {
  return (
    <>
      <section
        className="relative bg-card overflow-hidden py-28 lg:py-40"
        data-ocid="about.hero_section"
      >
        <BlobBackground />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, oklch(0.75 0.12 195) 0 2px, transparent 2px 40px)",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary uppercase tracking-widest text-xs font-display"
            >
              About Us
            </Badge>
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] text-foreground mb-6">
              About <span className="gradient-accent">Shapetech Solutions</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
              We empower direct selling businesses and growth-stage companies
              with transformative technology — helping every client shape the
              future of their business.
            </p>
          </motion.div>
        </div>
      </section>
      <WaveDivider
        topColor="oklch(0.22 0.05 270)"
        bottomColor="oklch(0.15 0.07 267)"
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
function StatsSection() {
  return (
    <section
      className="relative bg-background py-20 overflow-hidden"
      data-ocid="about.stats_section"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.75 0.12 195 / 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-end gap-6 lg:gap-0">
          {STATS.map((stat, i) => {
            const offsets = [
              "translate-y-0",
              "-translate-y-4",
              "translate-y-6",
              "-translate-y-2",
            ];
            const sizes = [
              "text-7xl lg:text-8xl",
              "text-6xl lg:text-7xl",
              "text-8xl lg:text-9xl",
              "text-6xl lg:text-7xl",
            ];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className={`flex-1 min-w-[160px] text-center px-4 lg:px-8 ${offsets[i % offsets.length]}`}
                data-ocid={`about.stat.${i + 1}`}
              >
                <p
                  className={`font-display font-bold text-primary leading-none mb-2 ${sizes[i % sizes.length]}`}
                >
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider font-body">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Mission & Vision
// ---------------------------------------------------------------------------
function MissionVisionSection() {
  const { data: about } = useAbout();

  return (
    <>
      <WaveDivider
        topColor="oklch(0.15 0.07 267)"
        bottomColor="oklch(0.22 0.05 270)"
      />
      <section
        className="relative bg-card py-24 overflow-hidden"
        data-ocid="about.mission_vision_section"
      >
        <BlobBackground />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/40 text-primary uppercase tracking-widest text-xs font-display"
            >
              Mission &amp; Vision
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              What Drives{" "}
              <span className="gradient-accent">Everything We Do</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              data-ocid="about.mission_card"
              className="group relative overflow-hidden card-fluid border border-border hover:border-primary/40 p-8"
              style={{ borderRadius: "24px 8px 24px 8px" }}
            >
              <div
                className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-smooth"
                aria-hidden="true"
              />
              {/* Gradient top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.75 0.12 195 / 0.7), transparent)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-2xl mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {about?.mission ??
                    "To empower direct selling companies and growth-stage businesses with cutting-edge technology platforms — turning complex operational challenges into competitive advantages through world-class engineering and strategic expertise."}
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              data-ocid="about.vision_card"
              className="group relative overflow-hidden card-fluid border border-border hover:border-primary/40 p-8"
              style={{ borderRadius: "8px 24px 8px 24px" }}
            >
              <div
                className="pointer-events-none absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-smooth"
                aria-hidden="true"
              />
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.75 0.12 195 / 0.7), transparent)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground text-2xl mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {about?.vision ??
                    "To become the world's leading technology partner for direct selling organizations — recognized globally for delivering transformative platforms that help our clients grow, compete, and thrive in an ever-changing digital landscape."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <WaveDivider
        topColor="oklch(0.22 0.05 270)"
        bottomColor="oklch(0.15 0.07 267)"
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Company Story
// ---------------------------------------------------------------------------
function CompanyStorySection() {
  return (
    <section
      className="relative bg-background py-24 overflow-hidden"
      data-ocid="about.story_section"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 40% at 50% 60%, oklch(0.75 0.12 195 / 0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-primary/40 text-primary uppercase tracking-widest text-xs font-display"
            >
              Our Story
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Built to Bridge the Gap Between{" "}
              <span className="gradient-accent">Business &amp; Technology</span>
            </h2>
            <div
              className="w-16 h-1 rounded-full mb-8"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.75 0.12 195), oklch(0.75 0.12 195 / 0.2))",
              }}
              aria-hidden="true"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              Shapetech Solutions was founded with a single purpose: to bridge
              the gap between direct selling businesses and modern technology.
              We saw an industry underserved by generic software — companies
              with complex compensation plans, global distributor networks, and
              real operational challenges that off-the-shelf tools simply
              couldn't solve.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Today we serve clients globally from our offices in{" "}
              <span className="text-foreground font-medium">
                Sarasota, Florida (USA)
              </span>{" "}
              and{" "}
              <span className="text-foreground font-medium">Niš, Serbia</span>.
              Our international team of 50+ business consultants, developers,
              and designers combines US-based leadership and client
              communication with a highly skilled engineering team — giving
              every client the best of both worlds.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From{" "}
              <span className="text-primary font-semibold">
                HubSpot integrations
              </span>{" "}
              and{" "}
              <span className="text-primary font-semibold">
                Shopify storefronts
              </span>{" "}
              to custom direct selling platforms and distributor back-offices,
              we deliver technology that shapes the future of every business we
              work with.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------
function ValuesSection() {
  return (
    <>
      <WaveDivider
        topColor="oklch(0.15 0.07 267)"
        bottomColor="oklch(0.22 0.05 270)"
      />
      <section
        className="relative bg-card py-20 lg:py-28 overflow-hidden"
        data-ocid="about.values_section"
      >
        <BlobBackground />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-24"
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/40 text-primary uppercase tracking-widest text-xs font-display"
            >
              Our Values
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-[1.15] max-w-2xl">
              The Principles That <br />
              <span className="gradient-accent">Shape Our DNA</span>
            </h2>
          </motion.div>

          <div className="space-y-16 lg:space-y-28">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-20 items-center`}
                >
                  {/* Number & Visual */}
                  <div className="flex-1 relative w-full flex items-center justify-center lg:justify-start">
                    <div className={`relative flex items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse lg:ml-auto"}`}>
                      <span
                        className="font-display text-7xl lg:text-[9rem] font-bold text-primary/5 select-none leading-none"
                      >
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <div className={`relative z-10 w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-primary/5 flex items-center justify-center group ${isEven ? "-ml-8 lg:-ml-12" : "-mr-8 lg:-mr-12"}`}>
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-smooth" />
                        <Icon className="w-8 h-8 lg:w-11 lg:h-11 text-primary relative z-10 group-hover:scale-110 transition-smooth" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 space-y-4 ${isEven ? "text-left" : "lg:text-right flex flex-col lg:items-end"}`}
                  >
                    <h3 className="font-display text-2xl lg:text-4xl font-bold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl">
                      {value.description}
                    </p>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary to-transparent rounded-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <WaveDivider
        topColor="oklch(0.22 0.05 270)"
        bottomColor="oklch(0.15 0.07 267)"
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Office card
// ---------------------------------------------------------------------------
function OfficeCard({ office, index }: { office: Office; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      data-ocid={`about.office.${index + 1}`}
      className="group relative overflow-hidden card-fluid border border-border hover:border-primary/40"
      style={{
        borderRadius: index === 0 ? "8px 24px 8px 24px" : "24px 8px 24px 8px",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.12 195 / 0.7), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-smooth"
        aria-hidden="true"
      />
      <div className="relative p-8">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0 mt-1">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-2xl font-bold text-foreground">
                {office.city}
              </h3>
              <span
                className="text-2xl"
                aria-label={`Flag of ${office.country}`}
              >
                {office.flag}
              </span>
            </div>
            <p className="text-primary font-medium text-sm mb-3">
              {office.country}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {office.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{office.address}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Offices section
// ---------------------------------------------------------------------------
function OfficesSection() {
  return (
    <section className="bg-background py-24" data-ocid="about.offices_section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary/40 text-primary uppercase tracking-widest text-xs font-display"
          >
            Our Offices
          </Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Global Presence,{" "}
            <span className="gradient-accent">Local Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            With offices in Florida and Serbia, we deliver round-the-clock
            support and fresh perspectives from two continents.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {OFFICES.map((office, i) => (
            <OfficeCard key={office.city} office={office} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Team member card
// ---------------------------------------------------------------------------
interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  variant?: "detailed" | "compact";
}

function TeamMemberCard({
  member,
  index,
  variant = "detailed",
}: TeamMemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
        className="group relative flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-smooth h-full"
      >
        <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
          {member.avatarUrl ? (
            <img
              src={member.avatarUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display font-bold text-primary text-sm">
              {initials}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="font-display font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
            {member.name}
          </h4>
          <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-medium truncate">
            {member.role}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/30 transition-smooth overflow-hidden h-full"
      data-ocid={`about.team_card.${index + 1}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

      <div className="relative p-6 lg:p-8">
        <div className="mb-6">
          {member.avatarUrl ? (
            <img
              src={member.avatarUrl}
              alt={member.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20 shadow-subtle"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center float-subtle">
              <span className="font-display font-bold text-primary text-2xl">
                {initials}
              </span>
            </div>
          )}
        </div>
        <h3 className="font-display font-bold text-foreground text-xl lg:text-2xl leading-tight mb-1">
          {member.name}
        </h3>
        <p className="text-primary font-medium text-sm lg:text-base mb-4">
          {member.role}
        </p>
        {member.bio && (
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-6 line-clamp-4">
            {member.bio}
          </p>
        )}
        {member.linkedinUrl && member.linkedinUrl !== "#" && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid={`about.team_linkedin.${index + 1}`}
          >
            <FaLinkedinIn className="w-4 h-4" />
            <span className="font-medium">Connect</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Team section
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: "all", label: "Global Roster" },
  { id: "leadership", label: "Leadership" },
  { id: "engineering", label: "Engineering" },
  { id: "creative", label: "Creative" },
  { id: "operations", label: "Operations" },
];

function TeamSection() {
  const { data: backendTeam, isLoading } = useTeam();
  const [activeCategory, setActiveCategory] = useState("all");

  // Use real hardcoded members when backend returns empty
  const allTeam = backendTeam && backendTeam.length > 0 ? backendTeam : REAL_TEAM;

  const filteredTeam = useMemo(() => {
    if (activeCategory === "all") return allTeam;
    return allTeam.filter((m) => m.category === activeCategory);
  }, [allTeam, activeCategory]);

  const leadershipTeam = useMemo(() => {
    return allTeam.filter((m) => m.category === "leadership");
  }, [allTeam]);

  return (
    <>
      <WaveDivider
        topColor="oklch(0.15 0.07 267)"
        bottomColor="oklch(0.22 0.05 270)"
      />
      <section
        className="bg-card py-24 lg:py-32"
        data-ocid="about.team_section"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/40 text-primary uppercase tracking-widest text-xs font-display"
            >
              Our Team
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              The People Behind the Work
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              A diverse, globally distributed crew of 40+ builders, designers,
              and strategists dedicated to your success.
            </p>
          </motion.div>

          {/* Tier 1: Leadership Spotlight */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h3 className="font-display text-lg font-bold text-primary uppercase tracking-widest">
                Leadership
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, i) => (
                <TeamMemberCard key={String(member.id)} member={member} index={i} />
              ))}
            </div>
          </div>

          {/* Tier 2 & 3: Global Team with Filtering */}
          <div className="space-y-12">
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-4 w-full">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h3 className="font-display text-lg font-bold text-primary uppercase tracking-widest">
                  Global Roster
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-smooth border ${activeCategory === cat.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background/40 text-muted-foreground border-border hover:border-primary/40"
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-20 rounded-2xl bg-muted/20 animate-pulse" />
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {filteredTeam
                  .filter((m) => activeCategory !== "all" || m.category !== "leadership")
                  .map((member, i) => (
                    <TeamMemberCard
                      key={String(member.id)}
                      member={member}
                      index={i}
                      variant="compact"
                    />
                  ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Contact CTA
// ---------------------------------------------------------------------------
function ContactCta() {
  return (
    <>
      <WaveDivider
        topColor="oklch(0.22 0.05 270)"
        bottomColor="oklch(0.15 0.07 267)"
      />
      <section
        className="relative overflow-hidden bg-background py-28"
        data-ocid="about.contact_cta_section"
      >
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-[0.08]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.75 0.12 195), transparent 70%)",
            borderRadius: "50% 50% 60% 40% / 40% 60% 40% 60%",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-8" />
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ready to Work <span className="gradient-accent">Together?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Let's talk about your project. Our team is ready to help you shape
              the future of your business with transformative technology.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-elevated rounded-2xl"
                data-ocid="about.contact_cta_button"
              >
                <Link to="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-primary/60 hover:text-primary font-semibold px-8 transition-smooth rounded-2xl"
                data-ocid="about.solutions_cta_button"
              >
                <Link to="/solutions">Explore Our Solutions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <main data-ocid="about.page">
      <PageHero />
      <StatsSection />
      <MissionVisionSection />
      <CompanyStorySection />
      <ValuesSection />
      <OfficesSection />
      <TeamSection />
      <ContactCta />
    </main>
  );
}
