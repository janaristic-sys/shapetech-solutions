import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddPortfolioItem,
  useDeletePortfolioItem,
  usePortfolio,
} from "@/hooks/use-backend";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, AdminRow, ConfirmDelete, FormRow } from "./AdminShared";

const emptyForm = {
  title: "",
  description: "",
  imageUrl: "",
  clientName: "",
  tags: [] as string[],
  launchDate: "",
  sortOrder: 1n,
};

export default function AdminPortfolioTab() {
  const { data: portfolio, isLoading } = usePortfolio();
  const add = useAddPortfolioItem();
  const del = useDeletePortfolioItem();
  const [form, setForm] = useState(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Project title is required.");
      return;
    }
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    add.mutate(
      { ...form, tags },
      {
        onSuccess: () => {
          toast.success(`"${form.title}" added to portfolio.`);
          setForm(emptyForm);
          setTagsInput("");
        },
        onError: () => toast.error("Failed to add portfolio item."),
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
      <AdminCard title="Portfolio / Recent Launches">
        <div className="space-y-3" data-ocid="admin.portfolio_loading_state">
          {["p1", "p2", "p3"].map((k) => (
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
    <AdminCard title="Portfolio / Recent Launches">
      <p className="text-sm text-muted-foreground mb-5">
        Showcase your best work. These projects appear in the Recent Launches
        section.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.portfolio_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add New Project
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormRow label="Project Title" htmlFor="p-title">
            <Input
              id="p-title"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Distributor Back-Office Platform"
              className="bg-card border-input text-foreground"
              data-ocid="admin.portfolio_title_input"
            />
          </FormRow>
          <FormRow label="Client Name" htmlFor="p-client">
            <Input
              id="p-client"
              value={form.clientName}
              onChange={(e) =>
                setForm((f) => ({ ...f, clientName: e.target.value }))
              }
              placeholder="Confidential · Direct Selling"
              className="bg-card border-input text-foreground"
              data-ocid="admin.portfolio_client_input"
            />
          </FormRow>
          <FormRow label="Image URL (optional)" htmlFor="p-image">
            <Input
              id="p-image"
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageUrl: e.target.value }))
              }
              placeholder="https://..."
              className="bg-card border-input text-foreground"
              data-ocid="admin.portfolio_image_input"
            />
          </FormRow>
          <FormRow label="Launch Date" htmlFor="p-date">
            <Input
              id="p-date"
              value={form.launchDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, launchDate: e.target.value }))
              }
              placeholder="2025-Q1 or 2025"
              className="bg-card border-input text-foreground"
              data-ocid="admin.portfolio_date_input"
            />
          </FormRow>
        </div>
        <FormRow label="Description" htmlFor="p-desc">
          <Textarea
            id="p-desc"
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Describe the project, the challenge solved, and the outcome…"
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.portfolio_desc_input"
          />
        </FormRow>
        <FormRow label="Tags (comma-separated)" htmlFor="p-tags">
          <Input
            id="p-tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="React, Node.js, Commission Engine"
            className="bg-card border-input text-foreground"
            data-ocid="admin.portfolio_tags_input"
          />
        </FormRow>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.portfolio_add_button"
        >
          <Plus className="size-4" />{" "}
          {add.isPending ? "Adding…" : "Add Project"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.portfolio_list">
        {portfolio?.map((item, i) =>
          confirmId === item.id ? (
            <ConfirmDelete
              key={String(item.id)}
              label={item.title}
              onConfirm={() => handleDelete(item.id, item.title)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <AdminRow
              key={String(item.id)}
              label={item.title}
              sub={`${item.clientName}${item.launchDate ? ` · ${item.launchDate}` : ""}`}
              onDelete={() => setConfirmId(item.id)}
              index={i + 1}
              ocidPrefix="admin.portfolio"
            />
          ),
        )}
        {!portfolio?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.portfolio_empty_state"
          >
            No portfolio items yet. Add your first project above.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
