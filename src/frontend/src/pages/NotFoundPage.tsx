import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="bg-background min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />

      {/* Decorative background blobs */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05]"
        style={{
          background: `radial-gradient(circle, oklch(0.75 0.12 195), transparent 70%)`,
          borderRadius: "40% 60% 70% 30% / 50% 40% 60% 50%",
          animation: "flowing 12s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Visual Icon */}
          <div className="mx-auto w-24 h-24 rounded-3xl bg-card/50 backdrop-blur-md border border-border/50 flex items-center justify-center shadow-xl mb-8">
            <Compass className="size-10 text-primary opacity-80" />
          </div>

          <h1 className="font-display font-bold text-7xl md:text-9xl text-foreground mb-4 select-none">
            404
          </h1>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md mx-auto">
            The link you followed may be broken, or the page may have been removed. Let's get you back on track.
          </p>

          <Link to="/">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 px-8 transition-smooth shadow-elevated rounded-2xl"
            >
              <ArrowLeft className="size-4" />
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
