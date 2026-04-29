import { motion } from "motion/react";
import type { Client } from "@/types";

interface LogoTickerProps {
  clients: Client[];
}

export default function LogoTicker({ clients }: LogoTickerProps) {
  // Duplicate the clients array to create a seamless loop
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="relative w-full overflow-hidden py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-card before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-card after:to-transparent">
      <motion.div
        className="flex gap-20 whitespace-nowrap items-center w-max"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedClients.map((client, i) => (
          <div
            key={`${client.id}-${i}`}
            className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-smooth"
          >
            {client.logoUrl ? (
              <img
                src={client.logoUrl}
                alt={client.name}
                className="h-10 w-auto object-contain max-w-[140px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).nextSibling!.textContent = client.name;
                }}
              />
            ) : (
              <span className="font-display font-bold text-xl tracking-tight">
                {client.name}
              </span>
            )}
            <span className="hidden">{/* Fallback text container */}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
