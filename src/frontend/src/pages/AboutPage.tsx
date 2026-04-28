import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAbout, useTeam } from "@/hooks/use-backend";
import type { TeamMember } from "@/types";
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
  { value: "20+", label: "International Team" },
  { value: "50+", label: "Projects Delivered" },
  { value: "2", label: "Global Offices" },
  { value: "100+", label: "Years Tech Experience" },
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
    name: "Gordon Hester",
    role: "Co-Founder & Chairman of the Board",
    bio: 'Gordon is a 30+ year veteran of direct selling with experience on both the field and operations side of the business. He co-founded ShapeTech Solutions in 2018 to provide transformative technology solutions for direct selling businesses worldwide. He is the author of "Positioned Right: The Forces Shaping the Future of Direct Selling and Network Marketing" and sits on the DSA/DSEF Board.',
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Connor Hester",
    role: "Co-Founder & CEO",
    bio: "Connor spends most of his time using an overly complex story or analogy to explain something that could have been said in a few words. However, when not annoying the staff, Connor works on helping to develop new business, managing client projects ranging from product launches to company modernization projects and overall, leading the continued scaling of the ShapeTech operations. He has worked with over a half-dozen companies ranging from pre-product startups to $100 million+ in revenue. He can constantly be found either reading a new book or on the tennis court.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Saša Veličković",
    role: "Co-Founder & Client Manager",
    bio: "Probably the first person you'll meet from our team, Saša will help define the problem and suggest ways to fix it. He knows what everyone on the team does, understands the processes and works with others to define the project. His job includes client communication, business analysis and problem-solving. Saša has a way of making others feel better, motivating them and supporting them, which makes him a great Client Manager, Colleague and Mentor.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Nenad Andrejević",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Nenad is a co-founder and the technical backbone of ShapeTech Solutions. As Chief Technology Officer, he oversees the architecture and delivery of complex full-stack solutions, ensuring our technology choices are always aligned with client goals and industry best practices.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "Darko Milenković",
    role: "Co-Founder & Creative Director",
    bio: "Darko is a Senior Web and Graphic designer passionate about making people see things his way. He has worked on a vast range of projects; whatever request you can think of he's probably done it for one of our clients. His greatest abilities include Visual Identity, UX, designing graphics and photo manipulation. Internally, he is our Creative Director, Mentor and Team Lead to the Creative team.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "Dušan Mitrović",
    role: "Co-Founder & Managing Partner",
    bio: "Dušan is a co-founder and Managing Partner at ShapeTech Solutions. He brings deep expertise in full-stack development and project delivery, helping guide the engineering team toward scalable and robust solutions for clients across the direct selling and technology sectors.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 6n,
  },
  {
    id: 7n,
    name: "Miodrag Vidojković",
    role: "VP of Operations",
    bio: "Miodrag oversees day-to-day operations at ShapeTech Solutions, ensuring projects run smoothly from kickoff to delivery. His operational expertise keeps the team aligned and clients informed, making him the anchor of ShapeTech's delivery process.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 7n,
  },
  {
    id: 8n,
    name: "Nemanja Jotić",
    role: "VP of Finances",
    bio: "Nemanja manages the financial health of ShapeTech Solutions, overseeing budgeting, forecasting, and financial strategy. His expertise ensures the company remains well-positioned for sustainable growth and continued investment in talent and technology.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 8n,
  },
  {
    id: 9n,
    name: "Nikola Olarić",
    role: "Back-end Developer",
    bio: "Nikola is a back-end developer at ShapeTech Solutions, specializing in building robust and scalable server-side systems. He works closely with the team to deliver clean, efficient code that powers ShapeTech's client solutions.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 9n,
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
              Our international team of 20+ business consultants, developers,
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
        className="relative bg-card py-24 overflow-hidden"
        data-ocid="about.values_section"
      >
        <BlobBackground />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
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
              Our Values
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              The Principles That{" "}
              <span className="gradient-accent">Guide Our Work</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Five core values that shape every decision, every project, and
              every client relationship at Shapetech Solutions.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              const radii = [
                "24px 8px 24px 8px",
                "8px 24px 8px 24px",
                "20px 8px 20px 8px",
                "8px 20px 8px 20px",
                "24px 24px 8px 24px",
              ];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  data-ocid={`about.value.${i + 1}`}
                  className="group relative overflow-hidden card-fluid border border-border hover:border-primary/40 p-7"
                  style={{ borderRadius: radii[i % radii.length] }}
                >
                  <div
                    className="pointer-events-none absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-smooth"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
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
function TeamMemberCard({
  member,
  index,
}: { member: TeamMember; index: number }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const radii = [
    "24px 8px 24px 8px",
    "8px 24px 8px 24px",
    "20px 20px 6px 20px",
    "6px 20px 20px 6px",
    "24px 6px 6px 24px",
    "6px 24px 24px 6px",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.5 }}
      data-ocid={`about.team_member.${index + 1}`}
      className="group relative overflow-hidden bg-card border border-border hover:border-primary/40 transition-smooth card-fluid h-full"
      style={{ borderRadius: radii[index % radii.length] }}
    >
      <div
        className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-smooth"
        aria-hidden="true"
      />
      <div className="relative p-6">
        <div className="mb-5">
          {member.avatarUrl ? (
            <img
              src={member.avatarUrl}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center float-subtle">
              <span className="font-display font-bold text-primary text-lg">
                {initials}
              </span>
            </div>
          )}
        </div>
        <h3 className="font-display font-semibold text-foreground text-lg leading-snug">
          {member.name}
        </h3>
        <p className="text-primary text-sm font-medium mt-0.5 mb-3">
          {member.role}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
          {member.bio}
        </p>
        {member.linkedinUrl && member.linkedinUrl !== "#" && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            data-ocid={`about.team_linkedin.${index + 1}`}
          >
            <FaLinkedinIn className="w-3.5 h-3.5" />
            LinkedIn
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Team section
// ---------------------------------------------------------------------------
function TeamSection() {
  const { data: backendTeam, isLoading } = useTeam();
  // Use real hardcoded members when backend returns empty
  const team = backendTeam && backendTeam.length > 0 ? backendTeam : REAL_TEAM;

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
            className="text-center mb-16"
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
              A diverse, globally distributed crew of builders, designers, and
              strategists dedicated to your success.
            </p>
          </motion.div>

          {isLoading ? (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="about.team.loading_state"
            >
              {(["a", "b", "c"] as const).map((key) => (
                <div
                  key={key}
                  className="bg-background rounded-3xl p-6 space-y-4"
                >
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
              {[...team]
                .sort((a, b) => Number(a.sortOrder - b.sortOrder))
                .map((member, i) => (
                  <div
                    key={String(member.id)}
                    className={i === 0 ? "lg:row-span-2" : ""}
                  >
                    <TeamMemberCard member={member} index={i} />
                  </div>
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
