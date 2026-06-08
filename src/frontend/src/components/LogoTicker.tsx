import { motion } from "motion/react";
import type { Client } from "@/types";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface LogoTickerProps {
  clients: Client[];
}

export default function LogoTicker({ clients = [] }: LogoTickerProps) {
  if (!clients || clients.length === 0) return null;

  // Quadruple so the seamless loop never shows a gap
  const items = [...clients, ...clients, ...clients, ...clients];

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Left fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40"
        style={{
          background:
            "linear-gradient(to right, oklch(0.13 0.05 267), transparent)",
        }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40"
        style={{
          background:
            "linear-gradient(to left, oklch(0.13 0.05 267), transparent)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="flex items-center gap-16 md:gap-24 w-max py-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {items.map((client, i) => (
          <TickerItem key={`${client.id}-${i}`} client={client} />
        ))}
      </motion.div>
    </div>
  );
}

function TickerItem({ client }: { client: Client }) {
  const href = client.solutionSlug
    ? `/solutions#${client.solutionSlug}`
    : client.shapeSlug
      ? `/shapes#${client.shapeSlug}`
      : null;

  const inner = <LogoImage client={client} />;

  if (!href) {
    return (
      <div className="flex items-center justify-center min-w-[120px] cursor-default">
        {inner}
      </div>
    );
  }

  return (
    <Link
      to={href}
      className="group flex items-center justify-center min-w-[120px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
      title={`See our work for ${client.name}`}
      data-ocid={`ticker.client.${client.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {inner}
    </Link>
  );
}

function LogoImage({ client }: { client: Client }) {
  const [error, setError] = useState(false);

  if (error || !client.logoUrl) {
    return (
      <span
        className="
          font-display font-bold text-xl md:text-2xl tracking-tight
          text-muted-foreground/30 group-hover:text-primary
          transition-colors duration-300
        "
      >
        {client.name}
      </span>
    );
  }

  return (
    <img
      src={client.logoUrl}
      alt={client.name}
      className="
        h-8 md:h-10 w-auto object-contain max-w-[160px]
        grayscale opacity-35
        group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105
        transition-all duration-300
      "
      onError={() => setError(true)}
      draggable={false}
    />
  );
}
