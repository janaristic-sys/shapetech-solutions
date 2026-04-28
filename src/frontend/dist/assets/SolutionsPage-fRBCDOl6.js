import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button } from "./index-D_nmTd2T.js";
import { B as Badge } from "./badge-CCzfYSpZ.js";
import { S as Skeleton } from "./skeleton-C-VMQEDQ.js";
import { m as motion } from "./proxy-Bnb69C09.js";
import { U as Users, C as CircleCheck } from "./users-BbR8xd-b.js";
import { S as ShoppingBag } from "./shopping-bag-Cr3Dg_U7.js";
import { C as CodeXml } from "./code-xml-DjPSb611.js";
import { A as ArrowRight } from "./arrow-right-CdNqVWgW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode);
const SOLUTIONS = [
  {
    id: 1,
    slug: "direct-selling",
    icon: Users,
    tag: "Flagship Platform",
    title: "Direct Selling Platform",
    tagline: "The most comprehensive direct selling platform on the market.",
    description: "A fully integrated commission engine and back-office platform built specifically for direct selling, MLM, and network marketing companies. Supporting binary, unilevel, matrix, and hybrid compensation plans — everything your field needs in one place.",
    features: [
      "Multi-tier Commission Engine",
      "Distributor Management Portal",
      "Genealogy Tree Visualization",
      "Autoship & Subscriptions",
      "Global Payment Processing",
      "Compliance & Tax Reporting",
      "Mobile App for Distributors",
      "API-first Architecture"
    ]
  },
  {
    id: 2,
    slug: "hubspot-integration",
    icon: ChartNoAxesColumn,
    tag: "Marketing Automation",
    title: "HubSpot Integration",
    tagline: "Enterprise HubSpot implementations tailored for direct selling.",
    description: "Custom objects for distributors, commissions, and downlines. Marketing automation workflows, HubSpot and Shopify bi-directional sync, sales pipeline automation, and CRM data migration. Certified HubSpot Partner.",
    features: [
      "Custom CRM Objects",
      "Data Migration & Cleanup",
      "Marketing Automation",
      "Bi-directional Shopify Sync",
      "Pipeline & Deal Automation",
      "Custom Dashboards & Reporting",
      "HubSpot Training & Onboarding"
    ]
  },
  {
    id: 3,
    slug: "shopify-integration",
    icon: ShoppingBag,
    tag: "E-Commerce",
    title: "Shopify Integration",
    tagline: "Custom Shopify storefronts built for direct selling businesses.",
    description: "Distributor-specific pricing and product catalogs, commission attribution at checkout, autoship subscription app integration, custom checkout flows, and headless commerce implementations. Shopify Partner status.",
    features: [
      "Custom Storefront Design",
      "Distributor Pricing Tiers",
      "Commission Attribution",
      "Autoship Integration",
      "Custom Checkout Flows",
      "Headless Commerce",
      "Shopify Plus Expertise"
    ]
  },
  {
    id: 4,
    slug: "custom-development",
    icon: CodeXml,
    tag: "Engineering",
    title: "Custom Development",
    tagline: "Bespoke software solutions when off-the-shelf doesn't fit.",
    description: "Web applications, mobile apps, API integrations, legacy system modernization, and cloud migrations — delivered through an agile methodology with bi-weekly demos and full transparency into progress.",
    features: [
      "Web Application Development",
      "Mobile App Development",
      "API Design & Integration",
      "Legacy System Modernization",
      "Cloud Infrastructure",
      "DevOps & CI/CD",
      "Ongoing Support & Maintenance"
    ]
  }
];
function SolutionSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: ["f1", "f2", "f3", "f4", "f5", "f6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }, k)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-3xl" })
  ] });
}
function WaveDivider({ flip = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative -my-px leading-none overflow-hidden",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          viewBox: "0 0 1440 80",
          xmlns: "http://www.w3.org/2000/svg",
          className: "w-full block",
          preserveAspectRatio: "none",
          style: { height: "80px", transform: flip ? "scaleY(-1)" : void 0 },
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z",
              fill: "oklch(0.22 0.05 270)"
            }
          )
        }
      )
    }
  );
}
function PartnerBadge({ name, subtitle }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center gap-3 px-8 py-6 rounded-3xl border-2 border-primary/40 bg-primary/5 backdrop-blur-sm hover:border-primary/70 hover:bg-primary/10 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 rounded-2xl flex items-center justify-center",
            style: {
              background: "oklch(0.75 0.12 195 / 0.15)",
              border: "1px solid oklch(0.75 0.12 195 / 0.4)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-7 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: subtitle })
        ] })
      ]
    }
  );
}
function SolutionRow({
  solution,
  index,
  isLoading
}) {
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SolutionSkeleton, {});
  const Icon = solution.icon;
  const isEven = index % 2 !== 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 48 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
      "data-ocid": `solutions.item.${index + 1}`,
      className: `grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? "lg:[&>*:first-child]:order-2" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col gap-6 relative",
            style: {
              borderLeft: "3px solid oklch(0.75 0.12 195 / 0.6)",
              paddingLeft: "1.5rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    style: {
                      background: "oklch(0.75 0.12 195 / 0.15)",
                      border: "1px solid oklch(0.75 0.12 195 / 0.35)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-primary border-primary/30 bg-primary/10 font-semibold text-xs tracking-widest uppercase px-3 py-1",
                    children: solution.tag
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-2", children: solution.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium text-lg leading-snug", children: solution.tagline })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: solution.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: solution.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-2.5 text-sm text-foreground/85",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-primary flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
                  ]
                },
                f
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": `solutions.cta.${index + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 rounded-xl transition-smooth h-10 px-5",
                  children: [
                    "Enquire About This Solution",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                  ]
                }
              ) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute inset-0 -m-6 rounded-[3rem] blur-3xl opacity-12 pointer-events-none",
              style: {
                background: "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "relative rounded-3xl p-px",
              style: {
                background: "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.7), oklch(0.28 0.05 270 / 0.4), oklch(0.75 0.12 195 / 0.3))"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center self-start",
                    style: {
                      background: "oklch(0.75 0.12 195 / 0.18)",
                      border: "1px solid oklch(0.75 0.12 195 / 0.4)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-9 text-primary", strokeWidth: 1.5 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-4xl text-primary opacity-40", children: String(index + 1).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-px flex-1",
                      style: { background: "oklch(0.75 0.12 195 / 0.25)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full",
                      style: {
                        background: "oklch(0.75 0.12 195 / 0.15)",
                        color: "oklch(0.75 0.12 195)",
                        border: "1px solid oklch(0.75 0.12 195 / 0.35)"
                      },
                      children: solution.tag
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: solution.features.slice(0, 6).map((f, fi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.92 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    transition: { delay: fi * 0.06, duration: 0.3 },
                    className: "flex items-center gap-2 rounded-xl bg-background/50 border border-border/50 px-3 py-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80 leading-tight", children: f })
                    ]
                  },
                  f
                )) })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function SolutionsPage() {
  const solutions = SOLUTIONS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "solutions.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative bg-card overflow-hidden pt-24 pb-44 md:pt-32 md:pb-56",
        "data-ocid": "solutions.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] opacity-15 blur-3xl",
              style: {
                background: "radial-gradient(circle at 60% 40%, oklch(0.75 0.12 195) 0%, transparent 65%)",
                borderRadius: "40% 60% 60% 40% / 50% 50% 70% 50%"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute bottom-10 left-0 w-[500px] h-[400px] opacity-[0.08] blur-3xl",
              style: {
                background: "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
                borderRadius: "60% 40% 40% 60% / 40% 60% 40% 60%"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 32 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
                className: "max-w-3xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm", children: "Our Solutions" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6", children: [
                    "Comprehensive",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-accent", children: "Technology Solutions" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl", children: "Purpose-built technology for direct selling and e-commerce organisations — from commission engines and distributor portals to HubSpot, Shopify, and custom engineering." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.25, duration: 0.55 },
                className: "mt-12 flex flex-wrap gap-10",
                children: [
                  { value: "150+", label: "Projects Delivered" },
                  { value: "8+", label: "Years of Excellence" },
                  { value: "98%", label: "Client Satisfaction" }
                ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-4xl text-primary leading-none", children: stat.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: stat.label })
                ] }, stat.label))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute bottom-0 left-0 right-0 leading-none",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  viewBox: "0 0 1440 120",
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "w-full block",
                  preserveAspectRatio: "none",
                  style: { height: "120px" },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z",
                      fill: "oklch(0.15 0.07 267)"
                    }
                  )
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-20 md:py-32",
        "data-ocid": "solutions.list_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground mb-4", children: [
                  "What We ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-accent", children: "Deliver" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Each solution is built on years of direct selling and digital commerce expertise, refined across 150+ client engagements." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-28 md:gap-36", children: solutions.map((sol, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SolutionRow, { solution: sol, index: i }, sol.id)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card py-20 md:py-24",
        "data-ocid": "solutions.partners_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/10", children: "Certified & Verified" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mt-2 mb-3", children: [
                  "Official ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-accent", children: "Partner Status" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-lg mx-auto", children: "Recognised certifications that demonstrate our expertise and commitment to the highest implementation standards." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PartnerBadge,
              {
                name: "HubSpot Certified Partner",
                subtitle: "CRM, automation & integrations"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PartnerBadge,
              {
                name: "Shopify Partner",
                subtitle: "Storefronts, apps & custom builds"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { flip: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden py-28 md:py-36 bg-background",
        "data-ocid": "solutions.cta_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute inset-0 opacity-[0.03]",
              style: {
                backgroundImage: "repeating-linear-gradient(45deg, oklch(0.75 0.12 195) 0px, oklch(0.75 0.12 195) 2px, transparent 2px, transparent 40px)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute inset-0 flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-[600px] h-[300px] blur-3xl opacity-15",
                  style: {
                    background: "radial-gradient(ellipse, oklch(0.75 0.12 195) 0%, transparent 70%)",
                    borderRadius: "50%"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container max-w-3xl mx-auto px-4 sm:px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.55 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10", children: "Get In Touch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground mb-5 leading-tight", children: [
                  "Not sure which solution fits?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-accent", children: "Let's talk." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-10 max-w-xl mx-auto", children: "Tell us about your challenge and we'll design the right solution around your goals, timeline, and budget — no obligation." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": "solutions.contact_cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "rounded-full font-semibold gap-2 px-8 h-12 transition-smooth",
                      style: {
                        background: "linear-gradient(90deg, oklch(0.75 0.12 195), oklch(0.65 0.14 200))",
                        boxShadow: "0 0 24px oklch(0.75 0.12 195 / 0.4)"
                      },
                      children: [
                        "Start the Conversation",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", "data-ocid": "solutions.about_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "rounded-full border-border/60 text-foreground hover:bg-card/60 font-semibold gap-2 px-8 h-12 transition-smooth",
                      children: "Meet the Team"
                    }
                  ) })
                ] })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  SolutionsPage as default
};
