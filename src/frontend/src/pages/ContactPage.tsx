import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/use-backend";
import {
  Award,
  CheckCircle2,
  Clock,
  Globe,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: "",
  message: "",
};

const PROJECT_TYPES = [
  "Direct Selling Platform",
  "HubSpot Integration",
  "Shopify Integration",
  "Custom Development",
  "Other",
];

const OFFICES = [
  {
    city: "Sarasota, Florida",
    country: "USA",
    address: "1800 2nd St, Suite 882\nSarasota, FL 34236",
    timezone: "EST (UTC-5)",
    tzLabel: "Eastern Time",
    flag: "🇺🇸",
    description: "Headquarters & Client Services",
  },
  {
    city: "Niš, Serbia",
    country: "Serbia",
    address: "Nikole Pašića 13\n18000 Niš, Serbia",
    timezone: "CET (UTC+1)",
    tzLabel: "Central European Time",
    flag: "🇷🇸",
    description: "Development & Engineering Center",
  },
];

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: "office@shapetechsolutions.com",
    href: "mailto:office@shapetechsolutions.com",
    ocid: "contact.email_link",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/company/shapetech-solutions",
    href: "https://linkedin.com/company/shapetech-solutions",
    ocid: "contact.linkedin_link",
  },
];

const WHY_POINTS = [
  {
    icon: Users,
    title: "Specialized in Direct Selling",
    desc: "Deep domain expertise in MLM and direct selling platforms — we understand your business model, compensation structures, and compliance needs inside out.",
  },
  {
    icon: Award,
    title: "Certified HubSpot & Shopify Partner",
    desc: "Official certifications and a proven track record of successful integrations mean less risk and faster delivery for your project.",
  },
  {
    icon: Globe,
    title: "Global Team with Local Expertise",
    desc: "Our US and Serbia offices ensure round-the-clock support, cultural fluency, and a cost-effective delivery model that doesn't sacrifice quality.",
  },
];

// Map placeholder grid pattern component
function MapPlaceholder({ flag, city }: { flag: string; city: string }) {
  return (
    <div
      className="relative w-full h-28 rounded-xl overflow-hidden"
      aria-hidden="true"
      style={{ background: "oklch(0.13 0.05 267)" }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.12 195 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.12 195 / 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Road lines */}
      <div
        className="absolute"
        style={{
          top: "40%",
          left: 0,
          right: 0,
          height: "2px",
          background: "oklch(0.35 0.05 270)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: 0,
          bottom: 0,
          left: "30%",
          width: "2px",
          background: "oklch(0.35 0.05 270)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: 0,
          bottom: 0,
          left: "65%",
          width: "2px",
          background: "oklch(0.35 0.05 270)",
        }}
      />
      {/* Pin */}
      <div
        className="absolute flex flex-col items-center"
        style={{ top: "28%", left: "45%", transform: "translate(-50%, 0)" }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
          style={{
            background: "oklch(0.75 0.12 195)",
            boxShadow: "0 0 12px oklch(0.75 0.12 195 / 0.7)",
          }}
        >
          {flag}
        </div>
        <div
          className="w-0.5 h-2"
          style={{ background: "oklch(0.75 0.12 195)" }}
        />
      </div>
      {/* Label */}
      <div className="absolute bottom-2 right-3">
        <span
          className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded"
          style={{
            background: "oklch(0.75 0.12 195 / 0.15)",
            color: "oklch(0.75 0.12 195)",
            border: "1px solid oklch(0.75 0.12 195 / 0.3)",
          }}
        >
          {city}
        </span>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const submitContact = useSubmitContact();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    submitContact.mutate(
      {
        name: form.name,
        email: form.email,
        company: form.company,
        message: `[Project Type: ${form.projectType || "Not specified"}]${form.phone ? `\n[Phone: ${form.phone}]` : ""}\n\n${form.message}`,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Message received! We'll be in touch within 24 hours.");
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  }

  return (
    <div data-ocid="contact.page">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-24 pb-44 md:pt-32 md:pb-52"
        data-ocid="contact.hero_section"
        style={{ background: "oklch(0.22 0.05 270)" }}
      >
        {/* Organic blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, oklch(0.75 0.12 195) 0%, transparent 60%)",
            borderRadius: "30% 70% 70% 30% / 40% 50% 50% 60%",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] blur-3xl opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
            borderRadius: "60% 40% 40% 60% / 50% 60% 40% 50%",
          }}
        />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full border border-primary/30"
              style={{ background: "oklch(0.75 0.12 195 / 0.1)" }}
            >
              Let's Talk
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
              Get In Touch
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-xl">
              Ready to shape your technology future? Let's talk. Our team
              responds within 24 hours.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 leading-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "120px" }}
          >
            <path
              d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,55 L1440,120 L0,120 Z"
              fill="oklch(0.15 0.07 267)"
            />
          </svg>
        </div>
      </section>

      {/* ── Main Form + Info ──────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-24"
        data-ocid="contact.form_section"
        style={{ background: "oklch(0.15 0.07 267)" }}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* LEFT — Form */}
            <div className="lg:col-span-3" data-ocid="contact.form_col">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  data-ocid="contact.success_state"
                  className="relative rounded-3xl overflow-hidden p-px"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.5), oklch(0.28 0.05 270 / 0.3), oklch(0.75 0.12 195 / 0.15))",
                  }}
                >
                  <div
                    className="rounded-[calc(1.5rem-1px)] p-14 text-center flex flex-col items-center gap-6"
                    style={{ background: "oklch(0.22 0.05 270)" }}
                  >
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 blur-2xl opacity-40 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
                        }}
                      />
                      <div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: "oklch(0.75 0.12 195 / 0.15)",
                          border: "1px solid oklch(0.75 0.12 195 / 0.3)",
                        }}
                      >
                        <CheckCircle2 className="size-10 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-3xl text-foreground mb-3">
                        Message Received!
                      </h2>
                      <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
                        Thank you for reaching out. A solutions architect from
                        our team will contact you within 24 business hours.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full border-border/60 hover:border-primary/40 text-foreground mt-2 transition-smooth"
                      onClick={() => {
                        setSubmitted(false);
                        setForm(INITIAL_FORM);
                      }}
                      data-ocid="contact.send_another_button"
                    >
                      Send another message
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative rounded-3xl overflow-hidden p-px"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.35), oklch(0.28 0.05 270 / 0.2), oklch(0.75 0.12 195 / 0.1))",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-15 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, oklch(0.75 0.12 195) 0%, transparent 70%)",
                    }}
                  />

                  <form
                    onSubmit={handleSubmit}
                    className="relative rounded-[calc(1.5rem-1px)] p-8 flex flex-col gap-6"
                    style={{ background: "oklch(0.22 0.05 270)" }}
                    data-ocid="contact.form"
                    noValidate
                  >
                    <div>
                      <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                        Send Us a Message
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Tell us about your project and we'll be in touch.
                      </p>
                    </div>

                    {/* Row 1: Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="name"
                          className="text-foreground font-medium text-sm"
                        >
                          Full Name <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          onBlur={validate}
                          placeholder="Alex Johnson"
                          className="rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 h-11 focus:border-primary transition-smooth"
                          data-ocid="contact.name_input"
                        />
                        {errors.name && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="contact.name_field_error"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="email"
                          className="text-foreground font-medium text-sm"
                        >
                          Email Address <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          onBlur={validate}
                          placeholder="alex@company.com"
                          className="rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 h-11 focus:border-primary transition-smooth"
                          data-ocid="contact.email_input"
                        />
                        {errors.email && (
                          <p
                            className="text-xs text-destructive"
                            data-ocid="contact.email_field_error"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Company + Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="company"
                          className="text-foreground font-medium text-sm"
                        >
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          value={form.company}
                          onChange={(e) =>
                            setForm({ ...form, company: e.target.value })
                          }
                          placeholder="Acme Corp"
                          className="rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 h-11 focus:border-primary transition-smooth"
                          data-ocid="contact.company_input"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label
                          htmlFor="phone"
                          className="text-foreground font-medium text-sm"
                        >
                          Phone Number{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          placeholder="+1 (555) 000-0000"
                          className="rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 h-11 focus:border-primary transition-smooth"
                          data-ocid="contact.phone_input"
                        />
                      </div>
                    </div>

                    {/* Row 3: Project Type */}
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="projectType"
                        className="text-foreground font-medium text-sm"
                      >
                        Project Type
                      </Label>
                      <select
                        id="projectType"
                        value={form.projectType}
                        onChange={(e) =>
                          setForm({ ...form, projectType: e.target.value })
                        }
                        data-ocid="contact.project_type_select"
                        className="rounded-xl h-11 px-3 text-sm border transition-smooth outline-none focus:border-primary"
                        style={{
                          background: "oklch(0.15 0.07 267 / 0.6)",
                          borderColor: "oklch(0.35 0.04 270 / 0.6)",
                          color: form.projectType
                            ? "oklch(0.95 0 0)"
                            : "oklch(0.55 0.01 270)",
                        }}
                      >
                        <option value="" disabled>
                          Select a project type
                        </option>
                        {PROJECT_TYPES.map((type) => (
                          <option
                            key={type}
                            value={type}
                            style={{
                              background: "oklch(0.18 0.07 267)",
                              color: "oklch(0.92 0 0)",
                            }}
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 4: Message */}
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="message"
                        className="text-foreground font-medium text-sm"
                      >
                        Message <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        onBlur={validate}
                        placeholder="Tell us about your project, goals, timeline and budget..."
                        rows={5}
                        className="rounded-xl border-border/60 bg-background/60 text-foreground placeholder:text-muted-foreground/50 resize-none focus:border-primary transition-smooth"
                        data-ocid="contact.message_textarea"
                      />
                      {errors.message && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.message_field_error"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitContact.isPending}
                      data-ocid="contact.submit_button"
                      className="w-full rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-smooth disabled:opacity-60 py-3.5"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.75 0.12 195), oklch(0.65 0.14 205))",
                        color: "oklch(0.12 0.03 270)",
                        boxShadow: submitContact.isPending
                          ? "none"
                          : "0 0 28px oklch(0.75 0.12 195 / 0.35)",
                      }}
                    >
                      {submitContact.isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Send className="size-4" />
                      )}
                      {submitContact.isPending ? "Sending..." : "Send Message"}
                    </button>

                    <p className="text-xs text-muted-foreground text-center -mt-2">
                      We'll respond within 24 business hours. No spam, ever.
                    </p>
                  </form>
                </motion.div>
              )}
            </div>

            {/* RIGHT — Contact Info */}
            <div
              className="lg:col-span-2 flex flex-col gap-6"
              data-ocid="contact.info_col"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-6"
              >
                {/* Contact details card */}
                <div
                  className="rounded-3xl border border-border/50 p-6 flex flex-col gap-4"
                  style={{ background: "oklch(0.22 0.05 270)" }}
                >
                  <h3 className="font-display font-semibold text-foreground text-base mb-1">
                    Contact Details
                  </h3>

                  {CONTACT_DETAILS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        data-ocid={item.ocid}
                        className="flex items-center gap-3 group"
                      >
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-smooth group-hover:scale-105"
                          style={{
                            background: "oklch(0.75 0.12 195 / 0.12)",
                            border: "1px solid oklch(0.75 0.12 195 / 0.2)",
                          }}
                        >
                          <Icon className="size-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground font-medium mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm text-foreground truncate group-hover:text-primary transition-smooth">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}

                  {/* Response time notice */}
                  <div className="flex items-center gap-3 mt-1 pt-4 border-t border-border/40">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                      style={{
                        background: "oklch(0.75 0.12 195 / 0.1)",
                        border: "1px solid oklch(0.75 0.12 195 / 0.15)",
                      }}
                    >
                      <Clock className="size-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                      </div>
                      <span className="text-xs text-muted-foreground leading-snug">
                        We typically respond within{" "}
                        <span className="text-foreground font-medium">
                          24 hours
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Office location cards */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display font-semibold text-foreground text-base px-1">
                    Our Offices
                  </h3>
                  {OFFICES.map((office, idx) => (
                    <motion.div
                      key={office.city}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                      data-ocid={`contact.office.${idx + 1}`}
                      className="rounded-3xl overflow-hidden border border-border/50 group hover:border-primary/30 transition-smooth"
                      style={{ background: "oklch(0.22 0.05 270)" }}
                    >
                      {/* Map placeholder */}
                      <div className="p-3 pb-0">
                        <MapPlaceholder flag={office.flag} city={office.city} />
                      </div>

                      {/* Office header */}
                      <div className="px-5 py-3 flex items-center gap-3">
                        <span className="text-xl">{office.flag}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-foreground text-sm leading-tight">
                            {office.city}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {office.description}
                          </p>
                        </div>
                        <span
                          className="text-xs text-muted-foreground px-2 py-0.5 rounded-full border border-border/60 flex-shrink-0"
                          style={{ background: "oklch(0.15 0.07 267 / 0.5)" }}
                        >
                          {office.timezone}
                        </span>
                      </div>

                      {/* Address */}
                      <div className="px-5 pb-4 flex items-start gap-3 border-t border-border/30 pt-3">
                        <MapPin className="size-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                            {office.address}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            {office.tzLabel}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Work With Shapetech ───────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        data-ocid="contact.why_section"
        style={{ background: "oklch(0.19 0.08 260)" }}
      >
        {/* Diagonal background accent */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(0.75 0.12 195) 0px, oklch(0.75 0.12 195) 1px, transparent 1px, transparent 40px)",
          }}
        />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full border border-primary/30"
              style={{ background: "oklch(0.75 0.12 195 / 0.08)" }}
            >
              Why Choose Us
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              Why Work with <span className="gradient-accent">Shapetech?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {WHY_POINTS.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  data-ocid={`contact.why.${idx + 1}`}
                  className="relative rounded-3xl overflow-hidden p-px group transition-smooth hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.75 0.12 195 / 0.3), oklch(0.28 0.05 270 / 0.15), oklch(0.75 0.12 195 / 0.08))",
                  }}
                >
                  <div
                    className="rounded-[calc(1.5rem-1px)] p-7 h-full flex flex-col gap-4"
                    style={{ background: "oklch(0.22 0.05 270)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "oklch(0.75 0.12 195 / 0.15)",
                        border: "1px solid oklch(0.75 0.12 195 / 0.25)",
                      }}
                    >
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-base mb-2 leading-snug">
                        {point.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Email CTA Strip ───────────────────────────────────────────────── */}
      <section
        className="relative py-16 overflow-hidden"
        data-ocid="contact.cta_section"
        style={{ background: "oklch(0.22 0.05 270)" }}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground text-base mb-3">
              Prefer to reach out directly?
            </p>
            <a
              href="mailto:office@shapetechsolutions.com"
              className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground hover:text-primary transition-smooth"
              data-ocid="contact.email_cta_link"
            >
              office@shapetechsolutions.com
            </a>

            {/* Phone */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Phone className="size-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground text-sm">
                Or give us a call —{" "}
                <a
                  href="tel:+19415551234"
                  className="text-foreground hover:text-primary transition-smooth"
                  data-ocid="contact.phone_cta_link"
                >
                  +1 (941) 555-1234
                </a>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom organic teal gradient shape ───────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden"
        style={{ background: "oklch(0.22 0.05 270)" }}
      >
        <svg
          viewBox="0 0 1440 180"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          aria-hidden="true"
          role="presentation"
          style={{ height: "90px", display: "block" }}
        >
          <defs>
            <linearGradient
              id="teal-bottom-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="oklch(0.75 0.12 195)"
                stopOpacity="0.18"
              />
              <stop
                offset="50%"
                stopColor="oklch(0.65 0.14 205)"
                stopOpacity="0.10"
              />
              <stop
                offset="100%"
                stopColor="oklch(0.75 0.12 195)"
                stopOpacity="0.04"
              />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C180,100 360,0 540,50 C720,100 900,20 1080,60 C1260,100 1360,30 1440,50 L1440,180 L0,180 Z"
            fill="url(#teal-bottom-gradient)"
          />
          <path
            d="M0,80 C200,120 400,40 600,80 C800,120 1000,50 1200,80 C1320,100 1400,70 1440,80 L1440,180 L0,180 Z"
            fill="oklch(0.75 0.12 195 / 0.05)"
          />
        </svg>
      </div>
    </div>
  );
}
