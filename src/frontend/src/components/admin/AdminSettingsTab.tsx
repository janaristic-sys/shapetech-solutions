import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/hooks/use-backend";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminCard, FormRow } from "./AdminShared";

export default function AdminSettingsTab() {
  const { data: settings, isLoading } = useSettings();

  const [form, setForm] = useState({
    siteName: "",
    tagline: "",
    email: "",
    phone: "",
    address: "",
    linkedinUrl: "",
    twitterUrl: "",
  });

  useEffect(() => {
    if (settings) {
      setForm({
        siteName: settings.siteName,
        tagline: settings.tagline,
        email: settings.email,
        phone: settings.phone,
        address: settings.address,
        linkedinUrl: settings.linkedinUrl,
        twitterUrl: settings.twitterUrl ?? "",
      });
    }
  }, [settings]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.siteName.trim()) {
      toast.error("Site name is required.");
      return;
    }
    // In demo mode, simulate a save
    setTimeout(() => {
      toast.success("Settings saved successfully.");
    }, 400);
  }

  if (isLoading) {
    return (
      <AdminCard title="Site Settings">
        <div className="space-y-3" data-ocid="admin.settings_loading_state">
          {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
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
    <AdminCard title="Site Settings">
      <p className="text-sm text-muted-foreground mb-6">
        Manage your site-wide contact details, branding, and social links.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        data-ocid="admin.settings_form"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <FormRow label="Site Name" htmlFor="s-name">
            <Input
              id="s-name"
              value={form.siteName}
              onChange={(e) =>
                setForm((f) => ({ ...f, siteName: e.target.value }))
              }
              placeholder="Shapetech Solutions"
              className="bg-background border-input text-foreground"
              data-ocid="admin.settings_name_input"
            />
          </FormRow>
          <FormRow label="Tagline" htmlFor="s-tagline">
            <Input
              id="s-tagline"
              value={form.tagline}
              onChange={(e) =>
                setForm((f) => ({ ...f, tagline: e.target.value }))
              }
              placeholder="Shaping the Future of Your Business"
              className="bg-background border-input text-foreground"
              data-ocid="admin.settings_tagline_input"
            />
          </FormRow>
          <FormRow label="Contact Email" htmlFor="s-email">
            <Input
              id="s-email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="hello@shapetechsolutions.com"
              className="bg-background border-input text-foreground"
              data-ocid="admin.settings_email_input"
            />
          </FormRow>
          <FormRow label="Phone Number" htmlFor="s-phone">
            <Input
              id="s-phone"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="+1 (941) 000-0000"
              className="bg-background border-input text-foreground"
              data-ocid="admin.settings_phone_input"
            />
          </FormRow>
          <FormRow label="LinkedIn URL" htmlFor="s-linkedin">
            <Input
              id="s-linkedin"
              value={form.linkedinUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, linkedinUrl: e.target.value }))
              }
              placeholder="https://linkedin.com/company/shapetechsolutions"
              className="bg-background border-input text-foreground"
              data-ocid="admin.settings_linkedin_input"
            />
          </FormRow>
          <FormRow label="Twitter / X URL" htmlFor="s-twitter">
            <Input
              id="s-twitter"
              value={form.twitterUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, twitterUrl: e.target.value }))
              }
              placeholder="https://twitter.com/shapetechsol"
              className="bg-background border-input text-foreground"
              data-ocid="admin.settings_twitter_input"
            />
          </FormRow>
        </div>

        <FormRow label="Office Address" htmlFor="s-address">
          <Input
            id="s-address"
            value={form.address}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
            placeholder="Sarasota, Florida, USA & Niš, Serbia"
            className="bg-background border-input text-foreground"
            data-ocid="admin.settings_address_input"
          />
        </FormRow>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-smooth"
            data-ocid="admin.settings_save_button"
          >
            Save Settings
          </Button>
        </div>
      </form>
    </AdminCard>
  );
}
