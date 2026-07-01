import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAbout, useTeam } from "@/hooks/use-backend";
import type { TeamMember } from "@/types";
import { useState, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
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
  { value: "$100M+", label: "Annual Volume Powered" },
  { value: "Dozens", label: "Countries Served" },
  { value: "6+", label: "Client Solutions" },
  { value: "5", label: "Core Industries" },
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
    id: 0n,
    name: "Gordon Hester",
    role: "Co-Founder & Chairman of the Board",
    bio: 'Gordon is a 30+ year veteran of direct selling with experience on both the field and operations side of the business. He co-founded ShapeTech Solutions in 2018 to provide transformative technology solutions for direct selling businesses worldwide. He is the author of "Positioned Right: The Forces Shaping the Future of Direct Selling and Network Marketing" and sits on the DSA/DSEF Board.',
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Gordon-512x491.png",
    linkedinUrl: "",
    sortOrder: 0n,
    departments: ["Board"],
    teams: [],
  },
  {
    id: 1n,
    name: "Connor Hester",
    role: "Co-Founder & President",
    bio: "Connor leads the strategic vision at ShapeTech Solutions, helping clients transform their businesses through technology. He has worked with dozens of companies from startups to $100M+ enterprises.",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Connor-512x491.png",
    linkedinUrl: "",
    sortOrder: 1n,
    departments: ["Production Department", "Sales Department"],
    teams: ["Team 2"],
  },
  {
    id: 2n,
    name: "Saša Veličković",
    role: "Co-Founder & President",
    bio: "Saša oversees client relations and business strategy, ensuring that every project is perfectly aligned with the client's long-term objectives.",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Sale-512x491.png",
    linkedinUrl: "",
    sortOrder: 2n,
    departments: ["Board"],
    teams: [],
  },
  {
    id: 3n,
    name: "Nenad Andrejević",
    role: "Chief Technology Officer",
    bio: "Nenad is the architectural lead, responsible for the technical integrity and scalability of the solutions we deliver.",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Neca-512x491.png",
    linkedinUrl: "",
    sortOrder: 3n,
    departments: ["Board", "Operations Department", "Production Department"],
    teams: ["CTO", "Team 1"],
  },
  {
    id: 4n,
    name: "Darko Milenković",
    role: "Chief Creative Officer",
    bio: "Darko sets the creative standard, blending high-end design with functional excellence to create immersive digital experiences.",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Dare-512x491.png",
    linkedinUrl: "",
    sortOrder: 4n,
    departments: ["Board", "Production Department"],
    teams: ["Design Department"],
  },
  {
    id: 5n,
    name: "Dušan Mitrović",
    role: "Co-Founder & Managing Partner",
    bio: "Dušan manages operational excellence across our engineering teams, ensuring robust delivery and technical growth.",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Smajli-512x491.png",
    linkedinUrl: "",
    sortOrder: 5n,
    departments: ["Board", "Production Department", "Sales Department"],
    teams: ["Team 4"],
  },
  {
    id: 6n,
    name: "Miodrag Vidojković",
    role: "Chief Executive Officer",
    bio: "Miodrag keeps our global operations running smoothly, bridging the gap between strategy and execution.",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Miske-512x491.png",
    linkedinUrl: "",
    sortOrder: 6n,
    departments: ["Board", "Executive", "Management Department"],
    teams: ["CEO", "Project Management"],
  },
  {
    id: 7n,
    name: "Nemanja Jotić",
    role: "Chief Financial Officer",
    bio: "Nemanja oversees the financial health and strategic growth planning for ShapeTech Solutions.",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Ares-512x491.png",
    linkedinUrl: "",
    sortOrder: 7n,
    departments: ["Operations Department"],
    teams: ["CFO"],
  },
  {
    id: 8n,
    name: "Nikola Olarić",
    role: "DevOps Team Lead",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Nidza-512x491.png",
    linkedinUrl: "",
    sortOrder: 8n,
    departments: ["Production Department"],
    teams: ["Team 5", "DevOps Team"],
  },
  {
    id: 9n,
    name: "Ana Mitrović",
    role: "Operations & Sales",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Njuksi-512x491.png",
    linkedinUrl: "",
    sortOrder: 9n,
    departments: ["Management Department", "Sales Department"],
    teams: ["Office Management"],
  },
  {
    id: 10n,
    name: "Andriana Miladinović",
    role: "Client Manager",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Andriana-512x491.png",
    linkedinUrl: "",
    sortOrder: 10n,
    departments: ["Production Department", "Management Department"],
    teams: ["Team 1", "Team 2", "Team 3", "Client Management"],
  },
  {
    id: 11n,
    name: "Sandra Marković",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2019/10/Sandra-512x491.png",
    linkedinUrl: "",
    sortOrder: 11n,
    departments: ["Production Department"],
    teams: ["Team 2"],
  },
  {
    id: 12n,
    name: "Milena Blagojević",
    role: "Back-end Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2020/07/Milena-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 12n,
    departments: ["Production Department"],
    teams: ["Team 1"],
  },
  {
    id: 13n,
    name: "Djordje Stojanović",
    role: "Team Lead & Solution Owner",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2020/11/Djo-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 13n,
    departments: ["Production Department", "Management Department"],
    teams: ["Team 1", "Team 5", "Client Management"],
  },
  {
    id: 14n,
    name: "Anastasios Spanos",
    role: "QA Lead",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2021/11/Tasos-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 14n,
    departments: ["Production Department"],
    teams: ["Quality Assurance"],
  },
  {
    id: 15n,
    name: "Uroš Terzić",
    role: "Back-end Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2021/11/Terza-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 15n,
    departments: ["Production Department"],
    teams: ["Team 1"],
  },
  {
    id: 16n,
    name: "Marija Veljković",
    role: "Back-end Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2021/11/Maka-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 16n,
    departments: ["Production Department"],
    teams: ["Team 2"],
  },
  {
    id: 17n,
    name: "Milan Stanković",
    role: "Frontend Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2021/11/Milan-Stankovic-dots-\u2013-1-512x491.png",
    linkedinUrl: "",
    sortOrder: 17n,
    departments: ["Production Department"],
    teams: ["Team 2"],
  },
  {
    id: 18n,
    name: "Katarina Tonić",
    role: "People Operations Manager",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2022/06/Kaca-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 18n,
    departments: ["Management Department"],
    teams: ["People Operations"],
  },
  {
    id: 19n,
    name: "Sara Milovanović",
    role: "Back-end Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2022/06/Sara-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 19n,
    departments: ["Production Department"],
    teams: ["Team 1"],
  },
  {
    id: 20n,
    name: "Marko Budiša",
    role: "Team Lead",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2022/06/Buda-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 20n,
    departments: ["Production Department"],
    teams: ["Team 2"],
  },
  {
    id: 21n,
    name: "Milica Prvulović",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2022/06/Micka-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 21n,
    departments: ["Production Department"],
    teams: ["Team 1", "DevOps Team"],
  },
  {
    id: 22n,
    name: "Filip Stamenković",
    role: "DevOps Engineer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2022/06/Filip-dots-512x491.png",
    linkedinUrl: "",
    sortOrder: 22n,
    departments: ["Production Department"],
    teams: ["Team 3", "Team 5", "DevOps Team"],
  },
  {
    id: 23n,
    name: "Marko Kostić",
    role: "DevOps Engineer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2023/02/Marko-Kostic-ST-512x491.png",
    linkedinUrl: "",
    sortOrder: 23n,
    departments: ["Production Department"],
    teams: ["Team 1", "Team 2", "Team 5", "DevOps Team"],
  },
  {
    id: 24n,
    name: "Matea Milosavljević",
    role: "Back-end Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2023/02/Matea-Milosavljevic-ST-512x491.png",
    linkedinUrl: "",
    sortOrder: 24n,
    departments: ["Production Department"],
    teams: ["Team 3"],
  },
  {
    id: 25n,
    name: "Slađan Milenović",
    role: "IT Administrator",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2023/02/\u0110ani-ST-1-512x491.png",
    linkedinUrl: "",
    sortOrder: 25n,
    departments: ["IT Support"],
    teams: [""],
  },
  {
    id: 26n,
    name: "Damjan Denić",
    role: "Team Lead",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2023/02/Damjan-Denic-siv-512x491.png",
    linkedinUrl: "",
    sortOrder: 26n,
    departments: ["Production Department"],
    teams: ["Team 4"],
  },
  {
    id: 27n,
    name: "Predrag Aleksov",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2023/04/Predrag-Aleksov-Full-stack-developer-shapetech-Nis-512x491.png",
    linkedinUrl: "",
    sortOrder: 27n,
    departments: ["Production Department"],
    teams: ["Team 2"],
  },
  {
    id: 28n,
    name: "Mihajlo Petrović",
    role: "Client Manager",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2024/01/MIhajlo-Petrovic-ShapeTech-Solutions-1-512x491.png",
    linkedinUrl: "",
    sortOrder: 28n,
    departments: ["Production Department", "Management Department"],
    teams: ["Team 1", "Team 2", "Team 3", "Client Management"],
  },
  {
    id: 29n,
    name: "Mila Teokarević",
    role: "UX/UI Designer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2024/01/Mila-Teokarevic-ShapeTech-Solutions-1-512x491.png",
    linkedinUrl: "",
    sortOrder: 29n,
    departments: ["Production Department"],
    teams: ["Design Department"],
  },
  {
    id: 30n,
    name: "Milena Radosavljević",
    role: "Project Manager",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/02/Milena-Radosavljevic-ShapeTech-Solutions-512x491.png",
    linkedinUrl: "",
    sortOrder: 30n,
    departments: ["Production Department", "Management Department"],
    teams: ["Team 2", "Project Management"],
  },
  {
    id: 31n,
    name: "Andrija Đorđević",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/04/Andrija-\u0110or\u0111evi\u0107-ShapeTech-Solutions-512x491.png",
    linkedinUrl: "",
    sortOrder: 31n,
    departments: ["Production Department"],
    teams: ["Team 1", "DevOps Team"],
  },
  {
    id: 32n,
    name: "Andria Trojanović",
    role: "Client Manager",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/04/Andria-Trojanovi\u0107-ShapeTech-Solutions-512x491.png",
    linkedinUrl: "",
    sortOrder: 32n,
    departments: ["Production Department", "Management Department"],
    teams: ["Team 3", "Client Management"],
  },
  {
    id: 33n,
    name: "Milica Antonijević",
    role: "Client Manager",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/04/Milica-Antonijevic-ShapeTech-Solutions-512x491.png",
    linkedinUrl: "",
    sortOrder: 33n,
    departments: ["Management Department"],
    teams: ["Client Management"],
  },
  {
    id: 34n,
    name: "Jana Ristić",
    role: "Business Development Representative",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/04/Jana-Risti\u0107-ShapeTech-Solutions-512x491.png",
    linkedinUrl: "",
    sortOrder: 34n,
    departments: ["Sales Department"],
    teams: [""],
  },
  {
    id: 35n,
    name: "Filip Minić",
    role: "Team Lead",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/04/Filip-Minic-ShapeTech-Solutions-512x491.png",
    linkedinUrl: "",
    sortOrder: 35n,
    departments: ["Production Department"],
    teams: ["Team 3"],
  },
  {
    id: 36n,
    name: "Dušan Ristić",
    role: "Back-end Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/07/Du\u0161an-Risti\u0107-ShapeTech-Solutions-512x491.png",
    linkedinUrl: "",
    sortOrder: 36n,
    departments: ["Production Department"],
    teams: ["Team 1"],
  },
  {
    id: 37n,
    name: "Teodora Velisavljević",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/08/Teodora-Velisavljevi\u0107-ST-512x491.png",
    linkedinUrl: "",
    sortOrder: 37n,
    departments: ["Production Department"],
    teams: ["Team 3", "DevOps Team"],
  },
  {
    id: 38n,
    name: "Marko Spasić",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2025/08/Marko-Spasi\u0107-St-512x491.png",
    linkedinUrl: "",
    sortOrder: 38n,
    departments: ["Production Department"],
    teams: ["Team 3"],
  },
  {
    id: 39n,
    name: "Sara Novosel",
    role: "Project Manager",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2026/03/Sara-Novosel-ST-512x491.png",
    linkedinUrl: "",
    sortOrder: 39n,
    departments: ["Production Department", "Management Department"],
    teams: ["Team 1", "Team 4", "Project Management"],
  },
  {
    id: 40n,
    name: "Irina Veličković",
    role: "People Operations Assistant",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2026/03/Irina-Veli\u010dkovi\u0107-ST-512x491.png",
    linkedinUrl: "",
    sortOrder: 40n,
    departments: ["Management Department"],
    teams: ["People Operations"],
  },
  {
    id: 41n,
    name: "Milica Savić",
    role: "Frontend Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2026/03/Milica-Savi\u0107-ST-512x491.png",
    linkedinUrl: "",
    sortOrder: 41n,
    departments: ["Production Department"],
    teams: ["Team 3"],
  },
  {
    id: 42n,
    name: "Dalibor Stanojević",
    role: "Full-stack Developer",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2026/03/Dalibor-Stanojevi\u0107-ST-512x491.png",
    linkedinUrl: "",
    sortOrder: 42n,
    departments: ["Production Department"],
    teams: ["Team 2"],
  },
  {
    id: 43n,
    name: "Miloš Videnović",
    role: "Project Manager",
    bio: "",
    avatarUrl:
      "https://shapetechsolutions.com/wp-content/uploads/2026/03/MIlo\u0161-Videnovi\u0107-ST-512x491.png",
    linkedinUrl: "",
    sortOrder: 43n,
    departments: ["Production Department", "Management Department"],
    teams: ["Team 3", "Team 5", "Project Management"],
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
      style={{ height: 60 }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="60" fill={topColor} />
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
        className="relative bg-card overflow-hidden py-16 md:py-24"
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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-foreground mb-6">
              About <span className="gradient-accent">ShapeTech Solutions</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
              We build and grow specialized commerce solutions for niche use cases,
              collectively powering $100s of Millions in annual volume across dozens of countries.
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
      className="relative bg-background py-16 overflow-hidden"
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
        <div className="flex flex-wrap justify-center items-end gap-4 md:gap-10 lg:gap-12">
          {STATS.map((stat, i) => {
            const offsets = [
              "lg:translate-y-0",
              "lg:-translate-y-2",
              "lg:translate-y-3",
              "lg:-translate-y-1",
            ];
            const sizes = [
              "text-4xl sm:text-5xl md:text-6xl lg:text-6xl",
              "text-3xl sm:text-4xl md:text-5xl lg:text-5xl",
              "text-5xl sm:text-6xl md:text-6xl lg:text-7xl",
              "text-3xl sm:text-4xl md:text-5xl lg:text-5xl",
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
        className="relative bg-card py-16 overflow-hidden"
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
                    "To build and grow specialized commerce solutions that solve our clients' complex commerce problems and scale their long-term growth."}
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
                    "To power the world's niche commerce use cases through robust, scalable, and beautifully designed technology products."}
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
      className="relative bg-background py-16 md:py-20 overflow-hidden"
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
              ShapeTech Solutions was founded with a clear focus: to build and grow specialized commerce solutions for niche use cases. We believe commerce is dominated by a near endless series of niche use cases, and generic software often fails to deliver optimal long-term outcomes. We built our company to allow us to design, own, and iterate a customized solution over the long-term for each merchant.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Today we power the commerce engines of individual merchants and entire industries, collectively facilitating $100s of Millions in annual transaction volume. From our offices in{" "}
              <span className="text-foreground font-medium">
                Sarasota, Florida (USA)
              </span>{" "}
              and{" "}
              <span className="text-foreground font-medium">Niš, Serbia</span>,
              our engineering teams manage robust platforms that support dozens of countries.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether running complex subscription billing cycles with our <span className="text-primary font-semibold">Subscriptions</span> engine, managing multi-currency digital wallets via <span className="text-primary font-semibold">Credits</span>, bridging Shopify to any commission model with <span className="text-primary font-semibold">Shopify Direct</span>, or syncing real-time field data into HubSpot through <span className="text-primary font-semibold">CRM Direct</span> — our focus is building solutions that last.
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
        className="relative bg-card py-12 md:py-20 overflow-hidden"
        data-ocid="about.values_section"
      >
        <BlobBackground />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-16"
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

          <div className="space-y-12 lg:space-y-20">
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
    <section className="bg-background py-16" data-ocid="about.offices_section">
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
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="group relative flex items-center gap-4 p-4 rounded-3xl bg-card/40 backdrop-blur-sm border border-border/40 hover:border-primary/40 hover:bg-card/60 transition-all duration-500 h-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden relative z-10">
          {member.avatarUrl ? (
            <img
              src={member.avatarUrl}
              alt={member.name}
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <span className="font-display font-bold text-primary text-sm">
              {initials}
            </span>
          )}
        </div>
        <div className="min-w-0 relative z-10">
          <h4 className="font-display font-bold text-foreground text-sm truncate group-hover:text-primary transition-colors duration-300">
            {member.name}
          </h4>
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold truncate opacity-80">
            {member.role}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.21, 0.45, 0.32, 0.9] }}
      className="group relative bg-card/30 backdrop-blur-md rounded-[2rem] border border-border/30 hover:border-primary/40 transition-all duration-500 overflow-hidden h-full flex flex-col"
      data-ocid={`about.team_card.${index + 1}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative p-6 lg:p-8 flex flex-col h-full flex-1">
        <div className="mb-6 relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          {member.avatarUrl ? (
            <img
              src={member.avatarUrl}
              alt={member.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/10 shadow-2xl relative z-10 transition-all duration-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-primary/5 border-2 border-primary/10 flex items-center justify-center relative z-10">
              <span className="font-display font-bold text-primary text-2xl">
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className="mb-5">
          <h3 className="font-display font-bold text-foreground text-xl lg:text-2xl leading-[1.1] mb-2 transition-colors duration-300">
            {member.name}
          </h3>
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {member.role}
          </Badge>
        </div>

        {member.bio && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            {member.bio}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-border/20">
          {member.linkedinUrl && member.linkedinUrl !== "#" ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-primary transition-all duration-300 group/link"
              data-ocid={`about.team_linkedin.${index + 1}`}
            >
              <div className="w-9 h-9 rounded-xl bg-border/40 flex items-center justify-center group-hover/link:bg-primary/10 transition-all duration-300">
                <FaLinkedinIn className="w-4 h-4" />
              </div>
              <span className="uppercase tracking-widest text-[10px]">Professional Profile</span>
            </a>
          ) : (
            <div className="h-9" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Team carousel section
// ---------------------------------------------------------------------------
function TeamCarouselSection({ label, members }: { label: string; members: TeamMember[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const descriptions: Record<string, string> = {
    "Board": "The visionary force steering ShapeTech Solutions towards global innovation.",
    "Management Department": "Ensuring our teams, clients, and projects run seamlessly and efficiently.",
    "Production Department": "Building the robust, scalable foundations that power our complex digital systems.",
    "Operations Department": "The engine room of our success, ensuring seamless delivery and client satisfaction.",
    "Sales Department": "Driving growth and expanding our footprint across global commerce niches.",
    "IT Support": "Maintaining our internal infrastructure securely and reliably."
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      if (!firstChild) return;
      const itemWidth = firstChild.offsetWidth + 32; // width + gap-8 (32px)
      const scrollAmount = itemWidth * (window.innerWidth >= 1024 ? 3 : 1);
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (members.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Category Info (Left) */}
      <div className="lg:w-1/3 lg:sticky lg:top-32 space-y-8 z-20">
        <div className="space-y-6">
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
            Department
          </Badge>
          <h3 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
            {label}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
            {descriptions[label] || `Driving excellence and innovation within our ${label.toLowerCase()} division.`}
          </p>
        </div>
      </div>

      {/* Carousel (Right) */}
      <div className="lg:w-2/3 w-full relative min-w-0 group/carousel">
        {/* Navigation Arrows - Repositioned to overlay on carousel */}
        {members.length > 2 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 rounded-full w-14 h-14 border-border/40 hover:border-primary/50 hover:text-primary transition-all duration-300 bg-card/90 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 hidden lg:flex shadow-xl"
              onClick={() => scroll("left")}
              aria-label={`Scroll ${label} left`}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 rounded-full w-14 h-14 border-border/40 hover:border-primary/50 hover:text-primary transition-all duration-300 bg-card/90 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 hidden lg:flex shadow-xl"
              onClick={() => scroll("right")}
              aria-label={`Scroll ${label} right`}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth w-full max-w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}} />
          {members.map((member, i) => (
            <div
              key={String(member.id)}
              className="w-[80vw] md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] shrink-0 snap-start"
            >
              <TeamMemberCard member={member} index={i} variant="detailed" />
            </div>
          ))}
          <div className="w-[20vw] shrink-0" />
        </div>

        <div className="hidden lg:block absolute top-0 right-0 bottom-12 w-24 bg-gradient-to-l from-card/20 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Team section
// ---------------------------------------------------------------------------
function TeamSection() {
  const { data: backendTeam, isLoading } = useTeam();

  const hasValidBackendTeam = backendTeam && backendTeam.length > 0 && backendTeam.some(m => m.departments && m.departments.length > 0);
  const allTeam = hasValidBackendTeam ? backendTeam : REAL_TEAM;

  const getMembers = (dept: string, team?: string) => {
    return allTeam.filter((m) => {
      const inDept = m.departments?.includes(dept);
      if (!team) return inDept;
      return inDept && m.teams?.includes(team);
    });
  };

  const board = getMembers("Board");
  const operations = getMembers("Operations Department");
  const production = getMembers("Production Department");
  const management = getMembers("Management Department");
  const itSupport = getMembers("IT Support");
  const sales = getMembers("Sales Department");

  const sections = [
    { id: "board", label: "Board", members: board },
    { id: "management", label: "Management Department", members: management },
    { id: "production", label: "Production Department", members: production },
    { id: "operations", label: "Operations Department", members: operations },
    { id: "sales", label: "Sales Department", members: sales },
    { id: "it", label: "IT Support", members: itSupport },
  ].filter(s => s.members.length > 0);

  return (
    <>
      <WaveDivider
        topColor="oklch(0.15 0.07 267)"
        bottomColor="oklch(0.22 0.05 270)"
      />
      <section
        className="relative bg-card py-16 lg:py-20 overflow-hidden"
        data-ocid="about.team_section"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full" />
          
          <div className="absolute -top-10 left-10 lg:left-20 opacity-[0.03] select-none">
            <span className="font-display font-black text-[25vw] lg:text-[22rem] leading-none text-primary block tracking-tighter">
              50+
            </span>
            <span className="font-display font-black text-[12vw] lg:text-[10rem] leading-none text-primary block -mt-10 lg:-mt-20 ml-12 lg:ml-24 tracking-[0.2em]">
              EXPERTS
            </span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 lg:mb-24"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <Badge
                  variant="outline"
                  className="mb-6 border-primary/30 text-primary uppercase tracking-[0.3em] text-[10px] font-bold px-4 py-1.5 rounded-full"
                >
                  Our People
                </Badge>
                <h2 className="font-display text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.05]">
                  The Talent Behind <br />
                  <span className="gradient-accent">ShapeTech</span>
                </h2>
                <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
                  A globally distributed team of designers, engineers, and strategists
                  committed to transforming businesses through technology.
                </p>
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="space-y-16">
              {[1, 2].map((s) => (
                <div key={s} className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/3 space-y-6">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-12 w-48" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <div className="lg:w-2/3 flex gap-6 overflow-hidden">
                    {[1, 2].map((i) => (
                      <Skeleton key={i} className="h-[280px] w-[300px] shrink-0 rounded-[2rem]" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-10 lg:space-y-12">
              {sections.map((section) => (
                <TeamCarouselSection
                  key={section.id}
                  label={section.label}
                  members={section.members}
                />
              ))}
            </div>
          )}
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
        className="relative overflow-hidden bg-background py-20"
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


