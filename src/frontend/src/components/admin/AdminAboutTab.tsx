import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAbout, useUpdateAbout } from "@/hooks/use-backend";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminCard, FormRow } from "./AdminShared";

export default function AdminAboutTab() {
  const { data: about, isLoading } = useAbout();
  const update = useUpdateAbout();

  const [form, setForm] = useState({
    title: "",
    body: "",
    mission: "",
    vision: "",
    yearsInBusiness: 0,
    projectsDelivered: 0,
    clientsSatisfied: 0,
  });

  useEffect(() => {
    if (about) {
      setForm({
        title: about.title,
        body: about.body,
        mission: about.mission,
        vision: about.vision,
        yearsInBusiness: about.yearsInBusiness,
        projectsDelivered: about.projectsDelivered,
        clientsSatisfied: about.clientsSatisfied,
      });
    }
  }, [about]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) {
      toast.error("Title and description are required.");
      return;
    }
    update.mutate(form, {
      onSuccess: () => toast.success("About section saved successfully."),
      onError: () => toast.error("Failed to save. Please try again."),
    });
  }

  if (isLoading) {
    return (
      <AdminCard title="About Section">
        <div className="space-y-3" data-ocid="admin.about_loading_state">
          {["a1", "a2", "a3", "a4", "a5"].map((k) => (
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
    <AdminCard title="About Section">
      <p className="text-sm text-muted-foreground mb-6">
        Edit the company description, mission, and vision shown on the About
        page and homepage.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        data-ocid="admin.about_form"
      >
        <FormRow label="Section Title" htmlFor="about-title">
          <Input
            id="about-title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. A Boutique Firm That Thinks Like Your Partner"
            className="bg-background border-input text-foreground"
            data-ocid="admin.about_title_input"
          />
        </FormRow>

        <FormRow label="Company Description" htmlFor="about-body">
          <Textarea
            id="about-body"
            rows={5}
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            placeholder="Describe your company, team, and what sets you apart…"
            className="bg-background border-input text-foreground"
            data-ocid="admin.about_body_input"
          />
        </FormRow>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormRow label="Mission Statement" htmlFor="about-mission">
            <Textarea
              id="about-mission"
              rows={3}
              value={form.mission}
              onChange={(e) =>
                setForm((f) => ({ ...f, mission: e.target.value }))
              }
              placeholder="Our mission is to…"
              className="bg-background border-input text-foreground resize-none"
              data-ocid="admin.about_mission_input"
            />
          </FormRow>

          <FormRow label="Vision Statement" htmlFor="about-vision">
            <Textarea
              id="about-vision"
              rows={3}
              value={form.vision}
              onChange={(e) =>
                setForm((f) => ({ ...f, vision: e.target.value }))
              }
              placeholder="Our vision is a world where…"
              className="bg-background border-input text-foreground resize-none"
              data-ocid="admin.about_vision_input"
            />
          </FormRow>
        </div>

        <div className="p-4 rounded-xl border border-border bg-muted/20">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
            Stats & Metrics
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <FormRow label="Years in Business" htmlFor="about-years">
              <Input
                id="about-years"
                type="number"
                min="0"
                value={form.yearsInBusiness}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    yearsInBusiness: Number(e.target.value),
                  }))
                }
                className="bg-background border-input text-foreground"
                data-ocid="admin.about_years_input"
              />
            </FormRow>
            <FormRow label="Projects Delivered" htmlFor="about-projects">
              <Input
                id="about-projects"
                type="number"
                min="0"
                value={form.projectsDelivered}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    projectsDelivered: Number(e.target.value),
                  }))
                }
                className="bg-background border-input text-foreground"
                data-ocid="admin.about_projects_input"
              />
            </FormRow>
            <FormRow label="Clients Satisfied (%)" htmlFor="about-clients">
              <Input
                id="about-clients"
                type="number"
                min="0"
                max="100"
                value={form.clientsSatisfied}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    clientsSatisfied: Number(e.target.value),
                  }))
                }
                className="bg-background border-input text-foreground"
                data-ocid="admin.about_clients_input"
              />
            </FormRow>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-smooth"
            disabled={update.isPending}
            data-ocid="admin.about_save_button"
          >
            {update.isPending ? "Saving…" : "Save About Section"}
          </Button>
        </div>
      </form>
    </AdminCard>
  );
}
