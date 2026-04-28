import { Toaster } from "@/components/ui/sonner";
import { useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef<string>("");

  // Mount fade-in
  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  // Scroll to top and animate on route change
  useEffect(() => {
    const path = location.pathname;
    if (prevPathRef.current === path) return;
    prevPathRef.current = path;

    // Only animate on actual navigation (not first mount)
    if (mounted) {
      setVisible(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      const t = setTimeout(() => setVisible(true), 60);
      return () => clearTimeout(t);
    }
  }, [location.pathname, mounted]);

  return (
    <div
      className="min-h-screen flex flex-col text-foreground"
      style={{ background: "oklch(0.10 0.04 267)" }}
    >
      <Navbar />

      <main
        className="flex-1 pt-16"
        style={{
          transition: "opacity 0.35s ease, transform 0.35s ease",
          opacity: mounted && visible ? 1 : 0,
          transform: mounted && visible ? "translateY(0)" : "translateY(6px)",
          willChange: "opacity, transform",
        }}
      >
        {children}
      </main>

      {!hideFooter && <Footer />}
      <Toaster position="bottom-right" />
    </div>
  );
}
