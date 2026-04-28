import { c as createLucideIcon, n as useSubmitContact, r as reactExports, j as jsxRuntimeExports, B as Button, q as Mail, M as MapPin, s as ue } from "./index-D_nmTd2T.js";
import { I as Input, T as Textarea } from "./textarea-CfNZcoSE.js";
import { L as Label } from "./label-B2iHRI2X.js";
import { m as motion } from "./proxy-Bnb69C09.js";
import { C as CircleCheck, U as Users } from "./users-BbR8xd-b.js";
import { L as LoaderCircle, a as Linkedin } from "./loader-circle-w1qGdSDJ.js";
import { A as Award, G as Globe } from "./globe-Bn4fJdg8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const INITIAL_FORM = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: "",
  message: ""
};
const PROJECT_TYPES = [
  "Direct Selling Platform",
  "HubSpot Integration",
  "Shopify Integration",
  "Custom Development",
  "Other"
];
const OFFICES = [
  {
    city: "Sarasota, Florida",
    country: "USA",
    address: "1800 2nd St, Suite 882\nSarasota, FL 34236",
    timezone: "EST (UTC-5)",
    tzLabel: "Eastern Time",
    flag: "🇺🇸",
    description: "Headquarters & Client Services"
  },
  {
    city: "Niš, Serbia",
    country: "Serbia",
    address: "Nikole Pašića 13\n18000 Niš, Serbia",
    timezone: "CET (UTC+1)",
    tzLabel: "Central European Time",
    flag: "🇷🇸",
    description: "Development & Engineering Center"
  }
];
const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: "office@shapetechsolutions.com",
    href: "mailto:office@shapetechsolutions.com",
    ocid: "contact.email_link"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/company/shapetech-solutions",
    href: "https://linkedin.com/company/shapetech-solutions",
    ocid: "contact.linkedin_link"
  }
];
const WHY_POINTS = [
  {
    icon: Users,
    title: "Specialized in Direct Selling",
    desc: "Deep domain expertise in MLM and direct selling platforms — we understand your business model, compensation structures, and compliance needs inside out."
  },
  {
    icon: Award,
    title: "Certified HubSpot & Shopify Partner",
    desc: "Official certifications and a proven track record of successful integrations mean less risk and faster delivery for your project."
  },
  {
    icon: Globe,
    title: "Global Team with Local Expertise",
    desc: "Our US and Serbia offices ensure round-the-clock support, cultural fluency, and a cost-effective delivery model that doesn't sacrifice quality."
  }
];
function MapPlaceholder({ flag, city }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-28 rounded-xl overflow-hidden",
      "aria-hidden": "true",
      style: { background: "oklch(0.13 0.05 267)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-20",
            style: {
              backgroundImage: "linear-gradient(oklch(0.75 0.12 195 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.12 195 / 0.4) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              top: "40%",
              left: 0,
              right: 0,
              height: "2px",
              background: "oklch(0.35 0.05 270)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              top: 0,
              bottom: 0,
              left: "30%",
              width: "2px",
              background: "oklch(0.35 0.05 270)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute",
            style: {
              top: 0,
              bottom: 0,
              left: "65%",
              width: "2px",
              background: "oklch(0.35 0.05 270)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute flex flex-col items-center",
            style: { top: "28%", left: "45%", transform: "translate(-50%, 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                  style: {
                    background: "oklch(0.75 0.12 195)",
                    boxShadow: "0 0 12px oklch(0.75 0.12 195 / 0.7)"
                  },
                  children: flag
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-0.5 h-2",
                  style: { background: "oklch(0.75 0.12 195)" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[10px] font-mono font-medium px-1.5 py-0.5 rounded",
            style: {
              background: "oklch(0.75 0.12 195 / 0.15)",
              color: "oklch(0.75 0.12 195)",
              border: "1px solid oklch(0.75 0.12 195 / 0.3)"
            },
            children: city
          }
        ) })
      ]
    }
  );
}
function ContactPage() {
  const submitContact = useSubmitContact();
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    submitContact.mutate(
      {
        name: form.name,
        email: form.email,
        company: form.company,
        message: `[Project Type: ${form.projectType || "Not specified"}]${form.phone ? `
[Phone: ${form.phone}]` : ""}

${form.message}`
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          ue.success("Message received! We'll be in touch within 24 hours.");
        },
        onError: () => {
          ue.error("Something went wrong. Please try again.");
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "contact.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden pt-24 pb-44 md:pt-32 md:pb-52",
        "data-ocid": "contact.hero_section",
        style: { background: "oklch(0.22 0.05 270)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] blur-3xl opacity-15",
              style: {
                background: "radial-gradient(circle at 70% 30%, oklch(0.75 0.12 195) 0%, transparent 60%)",
                borderRadius: "30% 70% 70% 30% / 40% 50% 50% 60%"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] blur-3xl opacity-[0.08]",
              style: {
                background: "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
                borderRadius: "60% 40% 40% 60% / 50% 60% 40% 50%"
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full border border-primary/30",
                    style: { background: "oklch(0.75 0.12 195 / 0.1)" },
                    children: "Let's Talk"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6", children: "Get In Touch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-xl", children: "Ready to shape your technology future? Let's talk. Our team responds within 24 hours." })
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
                      d: "M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,55 L1440,120 L0,120 Z",
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
        className: "py-16 md:py-24",
        "data-ocid": "contact.form_section",
        style: { background: "oklch(0.15 0.07 267)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-10 lg:gap-16 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", "data-ocid": "contact.form_col", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.45 },
              "data-ocid": "contact.success_state",
              className: "relative rounded-3xl overflow-hidden p-px",
              style: {
                background: "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.5), oklch(0.28 0.05 270 / 0.3), oklch(0.75 0.12 195 / 0.15))"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-[calc(1.5rem-1px)] p-14 text-center flex flex-col items-center gap-6",
                  style: { background: "oklch(0.22 0.05 270)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          "aria-hidden": "true",
                          className: "absolute inset-0 blur-2xl opacity-40 rounded-full",
                          style: {
                            background: "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "relative w-20 h-20 rounded-full flex items-center justify-center",
                          style: {
                            background: "oklch(0.75 0.12 195 / 0.15)",
                            border: "1px solid oklch(0.75 0.12 195 / 0.3)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-10 text-primary" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-3", children: "Message Received!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed max-w-sm mx-auto", children: "Thank you for reaching out. A solutions architect from our team will contact you within 24 business hours." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        className: "rounded-full border-border/60 hover:border-primary/40 text-foreground mt-2 transition-smooth",
                        onClick: () => {
                          setSubmitted(false);
                          setForm(INITIAL_FORM);
                        },
                        "data-ocid": "contact.send_another_button",
                        children: "Send another message"
                      }
                    )
                  ]
                }
              )
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "relative rounded-3xl overflow-hidden p-px",
              style: {
                background: "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.35), oklch(0.28 0.05 270 / 0.2), oklch(0.75 0.12 195 / 0.1))"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "absolute top-0 right-0 w-64 h-64 blur-3xl opacity-15 pointer-events-none",
                    style: {
                      background: "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: handleSubmit,
                    className: "relative rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6",
                    style: { background: "oklch(0.22 0.05 270)" },
                    "data-ocid": "contact.form",
                    noValidate: true,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Send Us a Message" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Tell us about your project and we'll be in touch." })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Label,
                            {
                              htmlFor: "name",
                              className: "text-foreground font-medium text-sm",
                              children: [
                                "Full Name ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "name",
                              value: form.name,
                              onChange: (e) => setForm({ ...form, name: e.target.value }),
                              onBlur: validate,
                              placeholder: "Alex Johnson",
                              className: "rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 h-11 focus:border-primary transition-smooth",
                              "data-ocid": "contact.name_input"
                            }
                          ),
                          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs text-destructive",
                              "data-ocid": "contact.name_field_error",
                              children: errors.name
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Label,
                            {
                              htmlFor: "email",
                              className: "text-foreground font-medium text-sm",
                              children: [
                                "Email Address ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "email",
                              type: "email",
                              value: form.email,
                              onChange: (e) => setForm({ ...form, email: e.target.value }),
                              onBlur: validate,
                              placeholder: "alex@company.com",
                              className: "rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 h-11 focus:border-primary transition-smooth",
                              "data-ocid": "contact.email_input"
                            }
                          ),
                          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs text-destructive",
                              "data-ocid": "contact.email_field_error",
                              children: errors.email
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "company",
                              className: "text-foreground font-medium text-sm",
                              children: "Company Name"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "company",
                              value: form.company,
                              onChange: (e) => setForm({ ...form, company: e.target.value }),
                              placeholder: "Acme Corp",
                              className: "rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 h-11 focus:border-primary transition-smooth",
                              "data-ocid": "contact.company_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Label,
                            {
                              htmlFor: "phone",
                              className: "text-foreground font-medium text-sm",
                              children: [
                                "Phone Number",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "phone",
                              type: "tel",
                              value: form.phone,
                              onChange: (e) => setForm({ ...form, phone: e.target.value }),
                              placeholder: "+1 (555) 000-0000",
                              className: "rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 h-11 focus:border-primary transition-smooth",
                              "data-ocid": "contact.phone_input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Label,
                          {
                            htmlFor: "projectType",
                            className: "text-foreground font-medium text-sm",
                            children: "Project Type"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "select",
                          {
                            id: "projectType",
                            value: form.projectType,
                            onChange: (e) => setForm({ ...form, projectType: e.target.value }),
                            "data-ocid": "contact.project_type_select",
                            className: "rounded-xl h-11 px-3 text-sm border transition-smooth outline-none focus:border-primary",
                            style: {
                              background: "oklch(0.15 0.07 267 / 0.6)",
                              borderColor: "oklch(0.35 0.04 270 / 0.6)",
                              color: form.projectType ? "oklch(0.95 0 0)" : "oklch(0.55 0.01 270)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select a project type" }),
                              PROJECT_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "option",
                                {
                                  value: type,
                                  style: {
                                    background: "oklch(0.18 0.07 267)",
                                    color: "oklch(0.92 0 0)"
                                  },
                                  children: type
                                },
                                type
                              ))
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Label,
                          {
                            htmlFor: "message",
                            className: "text-foreground font-medium text-sm",
                            children: [
                              "Message ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Textarea,
                          {
                            id: "message",
                            value: form.message,
                            onChange: (e) => setForm({ ...form, message: e.target.value }),
                            onBlur: validate,
                            placeholder: "Tell us about your project, goals, timeline and budget...",
                            rows: 5,
                            className: "rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 resize-none focus:border-primary transition-smooth",
                            "data-ocid": "contact.message_textarea"
                          }
                        ),
                        errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-destructive",
                            "data-ocid": "contact.message_field_error",
                            children: errors.message
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "submit",
                          disabled: submitContact.isPending,
                          "data-ocid": "contact.submit_button",
                          className: "w-full rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-smooth disabled:opacity-60 py-3.5",
                          style: {
                            background: "linear-gradient(90deg, oklch(0.75 0.12 195), oklch(0.65 0.14 205))",
                            color: "oklch(0.12 0.03 270)",
                            boxShadow: submitContact.isPending ? "none" : "0 0 28px oklch(0.75 0.12 195 / 0.35)"
                          },
                          children: [
                            submitContact.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
                            submitContact.isPending ? "Sending..." : "Send Message"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center -mt-2", children: "We'll respond within 24 business hours. No spam, ever." })
                    ]
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "lg:col-span-2 flex flex-col gap-6",
              "data-ocid": "contact.info_col",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.5, delay: 0.2 },
                  className: "flex flex-col gap-6",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-3xl border border-border/50 p-6 flex flex-col gap-4",
                        style: { background: "oklch(0.22 0.05 270)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base mb-1", children: "Contact Details" }),
                          CONTACT_DETAILS.map((item) => {
                            const Icon = item.icon;
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "a",
                              {
                                href: item.href,
                                target: item.href.startsWith("http") ? "_blank" : void 0,
                                rel: item.href.startsWith("http") ? "noopener noreferrer" : void 0,
                                "data-ocid": item.ocid,
                                className: "flex items-center gap-3 group",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      className: "flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-smooth group-hover:scale-105",
                                      style: {
                                        background: "oklch(0.75 0.12 195 / 0.12)",
                                        border: "1px solid oklch(0.75 0.12 195 / 0.2)"
                                      },
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary" })
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-0.5", children: item.label }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate group-hover:text-primary transition-smooth", children: item.value })
                                  ] })
                                ]
                              },
                              item.label
                            );
                          }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 pt-4 border-t border-border/40", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0",
                                style: {
                                  background: "oklch(0.75 0.12 195 / 0.1)",
                                  border: "1px solid oklch(0.75 0.12 195 / 0.15)"
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-4 text-primary" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary animate-ping opacity-60" })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground leading-snug", children: [
                                "We typically respond within",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "24 hours" })
                              ] })
                            ] })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base px-1", children: "Our Offices" }),
                      OFFICES.map((office, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, y: 12 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.4, delay: 0.3 + idx * 0.1 },
                          "data-ocid": `contact.office.${idx + 1}`,
                          className: "rounded-3xl overflow-hidden border border-border/50 group hover:border-primary/30 transition-smooth",
                          style: { background: "oklch(0.22 0.05 270)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPlaceholder, { flag: office.flag, city: office.city }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 flex items-center gap-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: office.flag }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm leading-tight", children: office.city }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: office.description })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs text-muted-foreground px-2 py-0.5 rounded-full border border-border/60 flex-shrink-0",
                                  style: { background: "oklch(0.15 0.07 267 / 0.5)" },
                                  children: office.timezone
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4 flex items-start gap-3 border-t border-border/30 pt-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-primary mt-0.5 flex-shrink-0" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed whitespace-pre-line", children: office.address }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: office.tzLabel })
                              ] })
                            ] })
                          ]
                        },
                        office.city
                      ))
                    ] })
                  ]
                }
              )
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 md:py-28 overflow-hidden",
        "data-ocid": "contact.why_section",
        style: { background: "oklch(0.19 0.08 260)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute inset-0 opacity-[0.04]",
              style: {
                backgroundImage: "repeating-linear-gradient(45deg, oklch(0.75 0.12 195) 0px, oklch(0.75 0.12 195) 1px, transparent 1px, transparent 40px)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5 },
                className: "text-center mb-14",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full border border-primary/30",
                      style: { background: "oklch(0.75 0.12 195 / 0.08)" },
                      children: "Why Choose Us"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground", children: [
                    "Why Work with ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-accent", children: "Shapetech?" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6 lg:gap-8", children: WHY_POINTS.map((point, idx) => {
              const Icon = point.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: idx * 0.12 },
                  "data-ocid": `contact.why.${idx + 1}`,
                  className: "relative rounded-3xl overflow-hidden p-px group transition-smooth hover:scale-[1.02]",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.3), oklch(0.28 0.05 270 / 0.15), oklch(0.75 0.12 195 / 0.08))"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-[calc(1.5rem-1px)] p-7 h-full flex flex-col gap-4",
                      style: { background: "oklch(0.22 0.05 270)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                            style: {
                              background: "oklch(0.75 0.12 195 / 0.15)",
                              border: "1px solid oklch(0.75 0.12 195 / 0.25)"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 text-primary" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base mb-2 leading-snug", children: point.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: point.desc })
                        ] })
                      ]
                    }
                  )
                },
                point.title
              );
            }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative py-16 overflow-hidden",
        "data-ocid": "contact.cta_section",
        style: { background: "oklch(0.22 0.05 270)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6 text-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-3", children: "Prefer to reach out directly?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "mailto:office@shapetechsolutions.com",
                  className: "font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground hover:text-primary transition-smooth",
                  "data-ocid": "contact.email_cta_link",
                  children: "office@shapetechsolutions.com"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-primary flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm", children: [
                  "Or give us a call —",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "tel:+19415551234",
                      className: "text-foreground hover:text-primary transition-smooth",
                      "data-ocid": "contact.phone_cta_link",
                      children: "+1 (941) 555-1234"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "relative overflow-hidden",
        style: { background: "oklch(0.22 0.05 270)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "0 0 1440 180",
            xmlns: "http://www.w3.org/2000/svg",
            className: "w-full block",
            preserveAspectRatio: "none",
            "aria-hidden": "true",
            role: "presentation",
            style: { height: "90px", display: "block" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "linearGradient",
                {
                  id: "teal-bottom-gradient",
                  x1: "0%",
                  y1: "0%",
                  x2: "100%",
                  y2: "100%",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "stop",
                      {
                        offset: "0%",
                        stopColor: "oklch(0.75 0.12 195)",
                        stopOpacity: "0.18"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "stop",
                      {
                        offset: "50%",
                        stopColor: "oklch(0.65 0.14 205)",
                        stopOpacity: "0.10"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "stop",
                      {
                        offset: "100%",
                        stopColor: "oklch(0.75 0.12 195)",
                        stopOpacity: "0.04"
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M0,40 C180,100 360,0 540,50 C720,100 900,20 1080,60 C1260,100 1360,30 1440,50 L1440,180 L0,180 Z",
                  fill: "url(#teal-bottom-gradient)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M0,80 C200,120 400,40 600,80 C800,120 1000,50 1200,80 C1320,100 1400,70 1440,80 L1440,180 L0,180 Z",
                  fill: "oklch(0.75 0.12 195 / 0.05)"
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
export {
  ContactPage as default
};
