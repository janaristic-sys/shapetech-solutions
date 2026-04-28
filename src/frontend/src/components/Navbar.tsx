import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Industries", to: "/industries" },
  { label: "Shapes", to: "/shapes" },
  { label: "Solutions", to: "/solutions" },
  { label: "Partners", to: "/partners" },
  { label: "Blog", to: "/blog" },
];

// Brand teal/cyan: #00bcd4 ≈ oklch(0.75 0.12 195)
const TEAL = "oklch(0.75 0.12 195)";
const TEAL_60 = "oklch(0.75 0.12 195 / 0.6)";

function ActiveDot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{ background: TEAL, boxShadow: `0 0 6px ${TEAL_60}` }}
      aria-hidden="true"
    />
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  const prevPathRef = useRef(location.pathname);
  if (prevPathRef.current !== location.pathname) {
    prevPathRef.current = location.pathname;
    if (open) setOpen(false);
  }

  // Keyboard close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeDrawer() {
    setOpen(false);
  }

  return (
    <>
      {/* ── Fixed header ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled ? "py-2" : "py-3",
        )}
        data-ocid="nav.header"
      >
        {/* Glassmorphism backdrop — appears on scroll */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 pointer-events-none",
            scrolled ? "opacity-100 backdrop-blur-2xl" : "opacity-0",
          )}
          style={
            scrolled
              ? {
                  background: "oklch(0.11 0.04 267 / 0.88)",
                  borderBottom: "1px solid oklch(0.24 0.05 270 / 0.35)",
                  boxShadow: "0 4px 40px rgba(0,0,0,0.55)",
                }
              : {}
          }
          aria-hidden="true"
        />

        {/* Teal accent bar — bottom of header when scrolled */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-px pointer-events-none transition-all duration-500",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.75 0.12 195 / 0.6) 40%, oklch(0.75 0.12 195 / 0.6) 60%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="Shapetech Solutions — home"
            data-ocid="nav.logo_link"
          >
            <img
              src="/assets/logo.png"
              alt="Shapetech Solutions"
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-90 group-hover:scale-[1.02]"
            />
          </Link>

          {/* ── Desktop navigation ── */}
          <nav
            className={cn(
              "hidden lg:flex items-center gap-0.5 rounded-full px-2 py-1.5 transition-all duration-500",
              scrolled
                ? "bg-foreground/[0.06] border border-border/20"
                : "bg-transparent border border-transparent",
            )}
            aria-label="Main navigation"
            data-ocid="nav.desktop_menu"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase()}_link`}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                    "flex items-center gap-1.5 group",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {/* Active pill background */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "oklch(0.75 0.12 195 / 0.12)",
                        border: "1px solid oklch(0.75 0.12 195 / 0.25)",
                      }}
                    />
                  )}
                  {/* Hover background */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-foreground/0 group-hover:bg-foreground/[0.06] transition-all duration-300" />
                  )}
                  {/* Active teal dot */}
                  {isActive && <ActiveDot />}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            {/* Desktop contact CTA */}
            <Link
              to="/contact"
              className="hidden lg:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
              data-ocid="nav.contact_button"
            >
              <Button
                size="sm"
                className={cn(
                  "relative overflow-hidden font-semibold px-5 rounded-full border-0",
                  "text-background transition-all duration-300",
                  "hover:scale-[1.04] active:scale-[0.98]",
                )}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.70 0.14 195) 0%, oklch(0.62 0.16 202) 100%)",
                  boxShadow: "0 0 20px oklch(0.75 0.12 195 / 0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 32px oklch(0.75 0.12 195 / 0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 20px oklch(0.75 0.12 195 / 0.35)";
                }}
              >
                <span className="relative z-10">Contact Us</span>
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "lg:hidden relative w-10 h-10 rounded-full transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                open
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              style={
                open
                  ? {
                      background: "oklch(0.75 0.12 195 / 0.18)",
                      border: "1px solid oklch(0.75 0.12 195 / 0.3)",
                    }
                  : {}
              }
              data-ocid="nav.hamburger_toggle"
            >
              <span className="absolute inset-0 flex items-center justify-center">
                <span
                  className="absolute transition-all duration-300"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open
                      ? "rotate(0deg) scale(1)"
                      : "rotate(-90deg) scale(0.7)",
                  }}
                >
                  <X size={20} />
                </span>
                <span
                  className="transition-all duration-300"
                  style={{
                    opacity: open ? 0 : 1,
                    transform: open
                      ? "rotate(90deg) scale(0.7)"
                      : "rotate(0deg) scale(1)",
                  }}
                >
                  <Menu size={20} />
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {/* Scrim backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-400",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={closeDrawer}
        onKeyDown={(e) => e.key === "Enter" && closeDrawer()}
        tabIndex={open ? 0 : -1}
        aria-label="Close menu overlay"
      />

      {/* Drawer panel — using <dialog> equivalent div with correct semantics */}
      <div
        id="mobile-nav-drawer"
        aria-hidden={!open}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 lg:hidden",
          "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none",
        )}
        style={{
          background: "oklch(0.14 0.04 267 / 0.98)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid oklch(0.24 0.05 270 / 0.3)",
          borderRadius: "0 0 2rem 2rem",
          boxShadow: "0 20px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Top teal accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.75 0.12 195 / 0.6) 40%, oklch(0.75 0.12 195 / 0.6) 60%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Header row with logo + close */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <Link
            to="/"
            onClick={closeDrawer}
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="Shapetech Solutions — home"
          >
            <img
              src="/assets/logo.png"
              alt="Shapetech Solutions"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
            className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ background: "oklch(0.20 0.04 267)" }}
            data-ocid="nav.mobile.close_button"
          >
            <X size={18} />
          </button>
        </div>

        <nav
          className="px-4 pb-5 pt-1 flex flex-col gap-1"
          aria-label="Mobile navigation"
          data-ocid="nav.mobile_menu"
        >
          {NAV_LINKS.map((link, i) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeDrawer}
                data-ocid={`nav.mobile.${link.label.toLowerCase()}_link`}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium",
                  "transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                style={{
                  transitionDelay: open ? `${i * 35}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(-12px)",
                  opacity: open ? 1 : 0,
                  background: isActive
                    ? "oklch(0.75 0.12 195 / 0.10)"
                    : "transparent",
                  border: isActive
                    ? "1px solid oklch(0.75 0.12 195 / 0.20)"
                    : "1px solid transparent",
                }}
              >
                {isActive && <ActiveDot />}
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Contact CTA */}
          <div
            className="mt-3 transition-all duration-300"
            style={{
              transitionDelay: open ? `${NAV_LINKS.length * 35}ms` : "0ms",
              transform: open ? "translateX(0)" : "translateX(-12px)",
              opacity: open ? 1 : 0,
            }}
          >
            <Link
              to="/contact"
              onClick={closeDrawer}
              data-ocid="nav.mobile.contact_button"
            >
              <Button
                className={cn(
                  "w-full rounded-2xl font-semibold border-0 text-background",
                  "transition-all duration-300 hover:opacity-90",
                )}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.70 0.14 195) 0%, oklch(0.62 0.16 202) 100%)",
                  boxShadow: "0 0 24px oklch(0.75 0.12 195 / 0.35)",
                }}
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
