import { motion } from "motion/react";
import type { Client } from "@/types";
import { useState } from "react";

interface LogoTickerProps {
  clients: Client[];
}

export default function LogoTicker({ clients = [] }: LogoTickerProps) {
  if (!clients || clients.length === 0) return null;

  // Duplicate the clients array to create a seamless loop
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-card to-transparent" />

      <motion.div
        className="flex gap-24 whitespace-nowrap items-center w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedClients.map((client, i) => (
          <div
            key={`${client.id}-${i}`}
            className="flex items-center justify-center min-w-[150px]"
          >
            <LogoImage client={client} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function LogoImage({ client }: { client: Client }) {
  const [error, setError] = useState(false);

  if (error || !client.logoUrl) {
    return (
      <span className="font-display font-bold text-2xl text-muted-foreground/40 tracking-tight transition-smooth hover:text-muted-foreground">
        {client.name}
      </span>
    );
  }

  return (
    <img
      src={client.logoUrl}
      alt={client.name}
      className="h-12 w-auto object-contain max-w-[180px] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-smooth"
      onError={() => setError(true)}
    />
  );
}
