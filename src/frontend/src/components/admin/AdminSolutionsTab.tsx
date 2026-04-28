import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSolutions } from "@/hooks/use-backend";
import type { Solution } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, AdminRow, ConfirmDelete, FormRow } from "./AdminShared";

function useAddSolution() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Solution, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["solutions"] }),
  });
}
function useDeleteSolution() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["solutions"] }),
  });
}

const emptyForm: Omit<Solution, "id"> = {
  title: "",
  description: "",
  iconName: "Layers",
  slug: "",
  sortOrder: 1n,
};

export default function AdminSolutionsTab() {
  const { data: solutions, isLoading } = useSolutions();
  const add = useAddSolution();
  const del = useDeleteSolution();
  const [form, setForm] = useState<Omit<Solution, "id">>(emptyForm);
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    add.mutate(form, {
      onSuccess: () => {
        toast.success(`"${form.title}" added.`);
        setForm(emptyForm);
      },
      onError: () => toast.error("Failed to add solution."),
    });
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
      <AdminCard title="Solutions">
        <div className="space-y-3" data-ocid="admin.solutions_loading_state">
          {["sol1", "sol2", "sol3", "sol4"].map((k) => (
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
    <AdminCard title="Solutions">
      <p className="text-sm text-muted-foreground mb-5">
        Manage the services and solutions shown on the Solutions page.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.solutions_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add New Solution
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormRow label="Title" htmlFor="sol-title">
            <Input
              id="sol-title"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Direct Selling Software"
              className="bg-card border-input text-foreground"
              data-ocid="admin.solutions_title_input"
            />
          </FormRow>
          <FormRow label="Slug" htmlFor="sol-slug">
            <Input
              id="sol-slug"
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="direct-selling-software"
              className="bg-card border-input text-foreground"
              data-ocid="admin.solutions_slug_input"
            />
          </FormRow>
          <FormRow label="Icon Name (Lucide)" htmlFor="sol-icon">
            <Input
              id="sol-icon"
              value={form.iconName}
              onChange={(e) =>
                setForm((f) => ({ ...f, iconName: e.target.value }))
              }
              placeholder="Network"
              className="bg-card border-input text-foreground"
              data-ocid="admin.solutions_icon_input"
            />
          </FormRow>
        </div>
        <FormRow label="Description" htmlFor="sol-desc">
          <Textarea
            id="sol-desc"
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Describe what this solution does and who it's for…"
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.solutions_desc_input"
          />
        </FormRow>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.solutions_add_button"
        >
          <Plus className="size-4" />{" "}
          {add.isPending ? "Adding…" : "Add Solution"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.solutions_list">
        {solutions?.map((sol, i) =>
          confirmId === sol.id ? (
            <ConfirmDelete
              key={String(sol.id)}
              label={sol.title}
              onConfirm={() => handleDelete(sol.id, sol.title)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <AdminRow
              key={String(sol.id)}
              label={sol.title}
              sub={
                sol.description.substring(0, 80) +
                (sol.description.length > 80 ? "…" : "")
              }
              onDelete={() => setConfirmId(sol.id)}
              index={i + 1}
              ocidPrefix="admin.solutions"
            />
          ),
        )}
        {!solutions?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.solutions_empty_state"
          >
            No solutions configured yet.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
