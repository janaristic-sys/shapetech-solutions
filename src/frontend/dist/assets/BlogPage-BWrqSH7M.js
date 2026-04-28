import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button } from "./index-D_nmTd2T.js";
import { m as motion } from "./proxy-Bnb69C09.js";
import { B as BookOpen } from "./book-open-C4JJl_Vi.js";
import { A as ArrowRight } from "./arrow-right-CdNqVWgW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function BlogPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "blog.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden pt-24 pb-44 md:pt-32 md:pb-52",
        "data-ocid": "blog.hero_section",
        style: { background: "oklch(0.22 0.05 270)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute -top-20 right-20 w-80 h-80 blur-3xl opacity-15",
              style: {
                background: "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
                borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute bottom-20 left-10 w-64 h-64 blur-3xl opacity-[0.08]",
              style: {
                background: "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
                borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 28 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              className: "max-w-3xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full border border-primary/30",
                    style: { background: "oklch(0.75 0.12 195 / 0.1)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "size-3.5" }),
                      "Insights & Resources"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6", children: [
                  "Insights & ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-accent", children: "Articles" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-xl", children: "Technology strategy, platform deep-dives, and direct-selling growth insights from the Shapetech Solutions team." })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute bottom-0 left-0 right-0 leading-none",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  "aria-hidden": "true",
                  viewBox: "0 0 1440 120",
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "w-full block",
                  preserveAspectRatio: "none",
                  style: { height: "120px" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M0,40 C180,100 360,0 540,50 C720,100 900,10 1080,55 C1260,95 1380,20 1440,45 L1440,120 L0,120 Z",
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
        className: "bg-background py-24 md:py-32",
        "data-ocid": "blog.coming_soon_section",
        style: { background: "oklch(0.15 0.07 267)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-3xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 28 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "flex flex-col items-center text-center gap-6",
            "data-ocid": "blog.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-24 h-24 rounded-3xl flex items-center justify-center",
                  style: {
                    background: "oklch(0.75 0.12 195 / 0.10)",
                    border: "1px solid oklch(0.75 0.12 195 / 0.25)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-11 text-primary", strokeWidth: 1.5 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-1 rounded-full",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.75 0.12 195), oklch(0.65 0.14 205 / 0.3))"
                  },
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight", children: [
                "Articles ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-accent", children: "Coming Soon" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-xl", children: "Our team is working on new insights, case studies, and industry deep-dives on direct selling technology, HubSpot strategy, and digital transformation. Check back soon." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": "blog.contact_cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "rounded-full font-semibold gap-2 px-10 h-12 transition-smooth mt-2",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.75 0.12 195), oklch(0.65 0.14 205))",
                    boxShadow: "0 0 24px oklch(0.75 0.12 195 / 0.4)",
                    color: "oklch(0.10 0.03 270)"
                  },
                  children: [
                    "Get in Touch ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                  ]
                }
              ) })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 overflow-hidden",
        "data-ocid": "blog.newsletter_section",
        style: { background: "oklch(0.19 0.08 260)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute inset-0 opacity-[0.03]",
              style: {
                backgroundImage: "repeating-linear-gradient(135deg, oklch(0.75 0.12 195) 0px, oklch(0.75 0.12 195) 2px, transparent 2px, transparent 50px)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-2xl mx-auto px-4 sm:px-6 text-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mb-4", children: [
                  "Want more",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-accent", children: "industry insights?" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-8 leading-relaxed", children: "Our team regularly publishes in-depth guides on direct-selling technology, HubSpot strategy, and e-commerce best practices. Reach out to stay connected." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": "blog.contact_cta_bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "rounded-full font-semibold gap-2 px-10 h-12 transition-smooth",
                    style: {
                      background: "linear-gradient(90deg, oklch(0.75 0.12 195), oklch(0.65 0.14 205))",
                      boxShadow: "0 0 24px oklch(0.75 0.12 195 / 0.4)",
                      color: "oklch(0.10 0.03 270)"
                    },
                    children: [
                      "Get in Touch ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
                    ]
                  }
                ) })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  BlogPage as default
};
