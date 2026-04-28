import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useShapes } from "@/hooks/use-backend";
import type { Shape } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, AdminRow, ConfirmDelete, FormRow } from "./AdminShared";

function useAddShape() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Shape, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shapes"] }),
  });
}
function useDeleteShape() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shapes"] }),
  });
}

const emptyForm: Omit<Shape, "id"> = {
  title: "",
  description: "",
  iconName: "Shapes",
  slug: "",
  sortOrder: 1n,
};

export default function AdminShapesTab() {
  const { data: shapes, isLoading } = useShapes();
  const add = useAddShape();
  const del = useDeleteShape();
  const [form, setForm] = useState<Omit<Shape, "id">>(emptyForm);
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
      onError: () => toast.error("Failed to add shape."),
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
      <AdminCard title="Shapes (Process Steps)">
        <div className="space-y-3" data-ocid="admin.shapes_loading_state">
          {["sh1", "sh2", "sh3", "sh4"].map((k) => (
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
    <AdminCard title="Shapes (Process Steps)">
      <p className="text-sm text-muted-foreground mb-5">
        These are the process steps or service shapes shown in the Shapes
        section.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.shapes_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add New Shape
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormRow label="Title" htmlFor="sh-title">
            <Input
              id="sh-title"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Discovery & Strategy"
              className="bg-card border-input text-foreground"
              data-ocid="admin.shapes_title_input"
            />
          </FormRow>
          <FormRow label="Slug" htmlFor="sh-slug">
            <Input
              id="sh-slug"
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="discovery"
              className="bg-card border-input text-foreground"
              data-ocid="admin.shapes_slug_input"
            />
          </FormRow>
          <FormRow label="Icon Name (Lucide)" htmlFor="sh-icon">
            <Input
              id="sh-icon"
              value={form.iconName}
              onChange={(e) =>
                setForm((f) => ({ ...f, iconName: e.target.value }))
              }
              placeholder="Compass"
              className="bg-card border-input text-foreground"
              data-ocid="admin.shapes_icon_input"
            />
          </FormRow>
        </div>
        <FormRow label="Short Description" htmlFor="sh-desc">
          <Textarea
            id="sh-desc"
            rows={2}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="One-line description of this step…"
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.shapes_desc_input"
          />
        </FormRow>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.shapes_add_button"
        >
          <Plus className="size-4" /> {add.isPending ? "Adding…" : "Add Shape"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.shapes_list">
        {shapes?.map((shape, i) =>
          confirmId === shape.id ? (
            <ConfirmDelete
              key={String(shape.id)}
              label={shape.title}
              onConfirm={() => handleDelete(shape.id, shape.title)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <AdminRow
              key={String(shape.id)}
              label={`${i + 1}. ${shape.title}`}
              sub={shape.description}
              onDelete={() => setConfirmId(shape.id)}
              index={i + 1}
              ocidPrefix="admin.shapes"
            />
          ),
        )}
        {!shapes?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.shapes_empty_state"
          >
            No shapes configured yet.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
