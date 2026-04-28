import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useHero, useUpdateHero } from "@/hooks/use-backend";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminCard, FormRow } from "./AdminShared";

export default function AdminHeroTab() {
  const { data: hero, isLoading } = useHero();
  const update = useUpdateHero();

  const [form, setForm] = useState({
    headline: "",
    subheadline: "",
    ctaPrimary: "",
    ctaSecondary: "",
    ctaPrimaryUrl: "",
    ctaSecondaryUrl: "",
  });

  useEffect(() => {
    if (hero) {
      setForm({
        headline: hero.headline,
        subheadline: hero.subheadline,
        ctaPrimary: hero.ctaPrimary,
        ctaSecondary: hero.ctaSecondary,
        ctaPrimaryUrl: hero.ctaPrimaryUrl,
        ctaSecondaryUrl: hero.ctaSecondaryUrl,
      });
    }
  }, [hero]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.headline.trim()) {
      toast.error("Headline is required.");
      return;
    }
    update.mutate(form, {
      onSuccess: () => toast.success("Hero section saved successfully."),
      onError: () => toast.error("Failed to save. Please try again."),
    });
  }

  if (isLoading) {
    return (
      <AdminCard title="Hero Section">
        <div className="space-y-3" data-ocid="admin.hero_loading_state">
          {["h1", "h2", "h3", "h4"].map((k) => (
            <div
              key={k}
              className="h-10 rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      </AdminCard>
    );
  }

  return (
    <AdminCard title="Hero Section">
      <p className="text-sm text-muted-foreground mb-6">
        Edit the main hero banner that visitors see first on the homepage.
      </p>

      {/* Preview */}
      {form.headline && (
        <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Preview
          </p>
          <p className="font-display font-bold text-lg text-foreground leading-tight mb-1">
            {form.headline}
          </p>
          {form.subheadline && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {form.subheadline}
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        data-ocid="admin.hero_form"
      >
        <FormRow label="Main Headline" htmlFor="hero-headline">
          <Input
            id="hero-headline"
            value={form.headline}
            onChange={(e) =>
              setForm((f) => ({ ...f, headline: e.target.value }))
            }
            placeholder="e.g. Shaping the Future of Your Business"
            className="bg-background border-input text-foreground"
            data-ocid="admin.hero_headline_input"
          />
        </FormRow>

        <FormRow label="Subheadline / Supporting Text" htmlFor="hero-sub">
          <Textarea
            id="hero-sub"
            rows={3}
            value={form.subheadline}
            onChange={(e) =>
              setForm((f) => ({ ...f, subheadline: e.target.value }))
            }
            placeholder="A brief supporting description shown below the headline"
            className="bg-background border-input text-foreground resize-none"
            data-ocid="admin.hero_subheadline_input"
          />
        </FormRow>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormRow label="Primary Button Text" htmlFor="hero-cta1">
            <Input
              id="hero-cta1"
              value={form.ctaPrimary}
              onChange={(e) =>
                setForm((f) => ({ ...f, ctaPrimary: e.target.value }))
              }
              placeholder="e.g. Get Started"
              className="bg-background border-input text-foreground"
              data-ocid="admin.hero_cta_primary_input"
            />
          </FormRow>
          <FormRow label="Primary Button URL" htmlFor="hero-cta1-url">
            <Input
              id="hero-cta1-url"
              value={form.ctaPrimaryUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, ctaPrimaryUrl: e.target.value }))
              }
              placeholder="/contact"
              className="bg-background border-input text-foreground"
              data-ocid="admin.hero_cta_primary_url_input"
            />
          </FormRow>
          <FormRow label="Secondary Button Text" htmlFor="hero-cta2">
            <Input
              id="hero-cta2"
              value={form.ctaSecondary}
              onChange={(e) =>
                setForm((f) => ({ ...f, ctaSecondary: e.target.value }))
              }
              placeholder="e.g. View Our Work"
              className="bg-background border-input text-foreground"
              data-ocid="admin.hero_cta_secondary_input"
            />
          </FormRow>
          <FormRow label="Secondary Button URL" htmlFor="hero-cta2-url">
            <Input
              id="hero-cta2-url"
              value={form.ctaSecondaryUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, ctaSecondaryUrl: e.target.value }))
              }
              placeholder="/solutions"
              className="bg-background border-input text-foreground"
              data-ocid="admin.hero_cta_secondary_url_input"
            />
          </FormRow>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-smooth"
            disabled={update.isPending}
            data-ocid="admin.hero_save_button"
          >
            {update.isPending ? "Saving…" : "Save Hero Section"}
          </Button>
        </div>
      </form>
    </AdminCard>
  );
}
