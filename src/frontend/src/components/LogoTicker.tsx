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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />

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
  const inner = <LogoImage client={client} />;

  if (client.solutionSlug) {
    return (
      <Link
        to="/solutions/$solutionId"
        params={{ solutionId: client.solutionSlug }}
        className="group flex items-center justify-center min-w-[120px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        title={`See our work for ${client.name}`}
        data-ocid={`ticker.client.${client.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {inner}
      </Link>
    );
  }

  if (client.shapeSlug) {
    return (
      <Link
        to="/shapes/$shapeId"
        params={{ shapeId: client.shapeSlug }}
        className="group flex items-center justify-center min-w-[120px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        title={`See our shape: ${client.name}`}
        data-ocid={`ticker.client.${client.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-center min-w-[120px] cursor-default">
      {inner}
    </div>
  );
}

function LogoImage({ client }: { client: Client }) {
  // Always force text fallback until safe transparent logos are provided
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
