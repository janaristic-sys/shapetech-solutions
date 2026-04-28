import { useSettings } from "@/hooks/use-backend";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

// Brand teal/cyan: #00bcd4 ≈ oklch(0.75 0.12 195)
const TEAL = "oklch(0.75 0.12 195)";
const TEAL_60 = "oklch(0.75 0.12 195 / 0.6)";
const TEAL_BG = "oklch(0.75 0.12 195 / 0.08)";
const TEAL_BG_HOVER = "oklch(0.75 0.12 195 / 0.14)";
const TEAL_GLOW = "oklch(0.75 0.12 195 / 0.3)";

const COMPANY_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Industries", to: "/industries" },
  { label: "Shapes", to: "/shapes" },
  { label: "Solutions", to: "/solutions" },
  { label: "Partners", to: "/partners" },
];

const OFFICES = [
  { city: "Sarasota, FL", country: "USA" },
  { city: "Niš", country: "Serbia" },
];

function FooterNavLink({
  to,
  label,
  ocid,
}: {
  to: string;
  label: string;
  ocid: string;
}) {
  return (
    <li>
      <Link
        to={to}
        data-ocid={ocid}
        className={cn(
          "group flex items-center gap-1.5 text-sm transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded",
        )}
        style={{ color: "oklch(0.58 0.02 270)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color =
            "oklch(0.95 0 0)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color =
            "oklch(0.58 0.02 270)";
        }}
      >
        <span
          className="inline-block w-0 h-px rounded-full transition-all duration-300 group-hover:w-3 flex-shrink-0"
          style={{ background: TEAL }}
        />
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;
  const { data: settings } = useSettings();

  const email = settings?.email ?? "office@shapetechsolutions.com";
  const linkedin =
    settings?.linkedinUrl ??
    "https://www.linkedin.com/company/shapetech-solutions/";
  const tagline = settings?.tagline ?? "Shaping the Future of Your Business";

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "oklch(0.08 0.04 267)" }}
      data-ocid="footer.section"
    >
      {/* Fluid wave SVG divider at the top */}
      <div
        className="absolute top-0 left-0 right-0 w-full leading-none pointer-events-none"
        style={{ marginTop: "-2px" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "80px" }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,100 L0,45 Q180,80 360,50 Q540,20 720,40 Q900,60 1080,30 Q1260,0 1440,25 L1440,100 Z"
            fill="oklch(0.10 0.04 267)"
          />
        </svg>
      </div>

      {/* Ambient teal glow blobs */}
      <div
        className="absolute top-20 left-[-6%] w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.12 195 / 0.05) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 right-[-3%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.12 195 / 0.04) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-0">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 pb-14">
          {/* ── Brand column ── */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col gap-5">
            <Link
              to="/"
              className="flex items-center w-fit group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label="Shapetech Solutions — home"
            >
              <img
                src="/assets/logo.png"
                alt="Shapetech Solutions"
                className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "oklch(0.58 0.02 270)" }}
            >
              {tagline}
            </p>

            {/* Office locations */}
            <div className="flex flex-col gap-2.5">
              {OFFICES.map((office) => (
                <div
                  key={office.city}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: "oklch(0.52 0.02 270)" }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0 p-1 rounded-lg border border-primary/20 text-primary"
                    style={{ background: TEAL_BG }}
                  >
                    <MapPin size={11} />
                  </span>
                  <span>
                    {office.city},{" "}
                    <span style={{ color: "oklch(0.58 0.02 270)" }}>
                      {office.country}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-ocid="footer.linkedin_link"
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-border/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ background: "oklch(0.13 0.04 267)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = TEAL_60;
                  el.style.background = TEAL_BG_HOVER;
                  el.style.boxShadow = `0 0 14px ${TEAL_GLOW}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "";
                  el.style.background = "oklch(0.13 0.04 267)";
                  el.style.boxShadow = "";
                }}
              >
                <FaLinkedinIn
                  size={16}
                  style={{ color: "oklch(0.58 0.02 270)" }}
                />
              </a>

              <a
                href={`mailto:${email}`}
                aria-label="Email us"
                data-ocid="footer.email_icon_link"
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-border/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ background: "oklch(0.13 0.04 267)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = TEAL_60;
                  el.style.background = TEAL_BG_HOVER;
                  el.style.boxShadow = `0 0 14px ${TEAL_GLOW}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "";
                  el.style.background = "oklch(0.13 0.04 267)";
                  el.style.boxShadow = "";
                }}
              >
                <Mail size={15} style={{ color: "oklch(0.58 0.02 270)" }} />
              </a>
            </div>
          </div>

          {/* ── Company navigation ── */}
          <div className="lg:col-span-3">
            <h3
              className="font-display font-semibold text-xs uppercase tracking-[0.18em] mb-5 flex items-center gap-2"
              style={{ color: "oklch(0.95 0 0)" }}
            >
              <span
                className="inline-block w-3 h-px rounded-full flex-shrink-0"
                style={{ background: TEAL }}
              />
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <FooterNavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  ocid={`footer.${link.label.toLowerCase()}_link`}
                />
              ))}
            </ul>
          </div>

          {/* ── Services + contact ── */}
          <div className="lg:col-span-4">
            <h3
              className="font-display font-semibold text-xs uppercase tracking-[0.18em] mb-5 flex items-center gap-2"
              style={{ color: "oklch(0.95 0 0)" }}
            >
              <span
                className="inline-block w-3 h-px rounded-full flex-shrink-0"
                style={{ background: TEAL }}
              />
              Services &amp; Connect
            </h3>

            <ul className="flex flex-col gap-2.5 mb-6">
              {SERVICE_LINKS.map((link) => (
                <FooterNavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  ocid={`footer.${link.label.toLowerCase()}_link`}
                />
              ))}
            </ul>

            {/* Email contact */}
            <a
              href={`mailto:${email}`}
              data-ocid="footer.email_link"
              className="group flex items-center gap-2.5 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              style={{ color: "oklch(0.58 0.02 270)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = TEAL;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.58 0.02 270)";
              }}
            >
              <span
                className="flex-shrink-0 p-1 rounded-lg border border-primary/20 text-primary transition-all duration-300 group-hover:bg-primary/20"
                style={{ background: TEAL_BG }}
              >
                <Mail size={11} />
              </span>
              <span className="break-all min-w-0">{email}</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-fluid" />
        <div
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: "oklch(0.46 0.02 270)" }}
        >
          <span>© {year} ShapeTech Solutions. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              style={{ color: TEAL }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.84 0.12 195)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = TEAL;
              }}
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
