import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIndustries } from "@/hooks/use-backend";
import type { Industry } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, AdminRow, ConfirmDelete, FormRow } from "./AdminShared";

function useAddIndustry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Industry, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["industries"] }),
  });
}
function useDeleteIndustry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["industries"] }),
  });
}

const emptyForm: Omit<Industry, "id"> = {
  title: "",
  description: "",
  iconName: "Briefcase",
  slug: "",
  sortOrder: 1n,
  highlights: [],
  featured: false,
};

export default function AdminIndustriesTab() {
  const { data: industries, isLoading } = useIndustries();
  const add = useAddIndustry();
  const del = useDeleteIndustry();
  const [form, setForm] = useState<Omit<Industry, "id">>(emptyForm);
  const [highlightsInput, setHighlightsInput] = useState("");
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Industry title is required.");
      return;
    }
    const highlights = highlightsInput
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);
    add.mutate(
      { ...form, highlights },
      {
        onSuccess: () => {
          toast.success(`"${form.title}" added.`);
          setForm(emptyForm);
          setHighlightsInput("");
        },
        onError: () => toast.error("Failed to add industry."),
      },
    );
  }

  function handleDelete(id: bigint, name: string) {
    del.mutate(id, {
      onSuccess: () => {
        toast.success(`"${name}" removed.`);
        setConfirmId(null);
      },
      onError: () => toast.error("Failed to delete."),
    });
  }

  if (isLoading) {
    return (
      <AdminCard title="Industries">
        <div className="space-y-3" data-ocid="admin.industries_loading_state">
          {["i1", "i2", "i3", "i4"].map((k) => (
            <div
              key={k}
              className="h-14 rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      </AdminCard>
    );
  }

  return (
    <AdminCard title="Industries">
      <p className="text-sm text-muted-foreground mb-5">
        Manage the industry verticals displayed on the Industries page.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.industries_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add New Industry
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormRow label="Title" htmlFor="ind-title">
            <Input
              id="ind-title"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Direct Selling & Network Marketing"
              className="bg-card border-input text-foreground"
              data-ocid="admin.industries_title_input"
            />
          </FormRow>
          <FormRow label="Slug (URL segment)" htmlFor="ind-slug">
            <Input
              id="ind-slug"
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="direct-selling"
              className="bg-card border-input text-foreground"
              data-ocid="admin.industries_slug_input"
            />
          </FormRow>
          <FormRow label="Icon Name (Lucide icon)" htmlFor="ind-icon">
            <Input
              id="ind-icon"
              value={form.iconName}
              onChange={(e) =>
                setForm((f) => ({ ...f, iconName: e.target.value }))
              }
              placeholder="Network"
              className="bg-card border-input text-foreground"
              data-ocid="admin.industries_icon_input"
            />
          </FormRow>
          <div className="flex items-center gap-3 pt-5">
            <input
              type="checkbox"
              id="ind-featured"
              checked={form.featured ?? false}
              onChange={(e) =>
                setForm((f) => ({ ...f, featured: e.target.checked }))
              }
              className="w-4 h-4 rounded border-input accent-primary"
              data-ocid="admin.industries_featured_checkbox"
            />
            <label
              htmlFor="ind-featured"
              className="text-sm font-medium text-foreground"
            >
              Mark as Featured industry
            </label>
          </div>
        </div>
        <FormRow label="Description" htmlFor="ind-desc">
          <Textarea
            id="ind-desc"
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Describe this industry vertical…"
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.industries_desc_input"
          />
        </FormRow>
        <FormRow label="Highlights (one per line)" htmlFor="ind-highlights">
          <Textarea
            id="ind-highlights"
            rows={4}
            value={highlightsInput}
            onChange={(e) => setHighlightsInput(e.target.value)}
            placeholder={
              "Commission Calculation & Bonus Engines\nGenealogy Tree Management\nDistributor Back-Office Portals"
            }
            className="bg-card border-input text-foreground resize-none font-mono text-sm"
            data-ocid="admin.industries_highlights_input"
          />
        </FormRow>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.industries_add_button"
        >
          <Plus className="size-4" />{" "}
          {add.isPending ? "Adding…" : "Add Industry"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.industries_list">
        {industries?.map((ind, i) =>
          confirmId === ind.id ? (
            <ConfirmDelete
              key={String(ind.id)}
              label={ind.title}
              onConfirm={() => handleDelete(ind.id, ind.title)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <AdminRow
              key={String(ind.id)}
              label={ind.title}
              sub={
                ind.description.substring(0, 80) +
                (ind.description.length > 80 ? "…" : "")
              }
              onDelete={() => setConfirmId(ind.id)}
              index={i + 1}
              ocidPrefix="admin.industries"
              badge={
                ind.featured ? (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-semibold flex-shrink-0">
                    Featured
                  </span>
                ) : undefined
              }
            />
          ),
        )}
        {!industries?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.industries_empty_state"
          >
            No industries configured yet.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
