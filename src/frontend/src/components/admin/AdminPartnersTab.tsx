import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePartners } from "@/hooks/use-backend";
import type { Partner } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, AdminRow, ConfirmDelete, FormRow } from "./AdminShared";

function useAddPartner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Partner, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["partners"] }),
  });
}
function useDeletePartner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["partners"] }),
  });
}

const emptyForm: Omit<Partner, "id"> = {
  name: "",
  logoUrl: "",
  websiteUrl: "",
  description: "",
  sortOrder: 1n,
};

export default function AdminPartnersTab() {
  const { data: partners, isLoading } = usePartners();
  const add = useAddPartner();
  const del = useDeletePartner();
  const [form, setForm] = useState<Omit<Partner, "id">>(emptyForm);
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Partner name is required.");
      return;
    }
    add.mutate(form, {
      onSuccess: () => {
        toast.success(`"${form.name}" added as partner.`);
        setForm(emptyForm);
      },
      onError: () => toast.error("Failed to add partner."),
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
      <AdminCard title="Partners">
        <div className="space-y-3" data-ocid="admin.partners_loading_state">
          {["pa1", "pa2", "pa3"].map((k) => (
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
    <AdminCard title="Partners">
      <p className="text-sm text-muted-foreground mb-5">
        Manage the technology and services partners listed on the Partners page.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.partners_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add New Partner
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormRow label="Partner Name" htmlFor="p-name">
            <Input
              id="p-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Microsoft"
              className="bg-card border-input text-foreground"
              data-ocid="admin.partners_name_input"
            />
          </FormRow>
          <FormRow label="Website URL" htmlFor="p-url">
            <Input
              id="p-url"
              value={form.websiteUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, websiteUrl: e.target.value }))
              }
              placeholder="https://microsoft.com"
              className="bg-card border-input text-foreground"
              data-ocid="admin.partners_url_input"
            />
          </FormRow>
          <FormRow label="Logo URL (optional)" htmlFor="p-logo">
            <Input
              id="p-logo"
              value={form.logoUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, logoUrl: e.target.value }))
              }
              placeholder="https://..."
              className="bg-card border-input text-foreground"
              data-ocid="admin.partners_logo_input"
            />
          </FormRow>
        </div>
        <FormRow label="Partnership Description" htmlFor="p-desc">
          <Textarea
            id="p-desc"
            rows={2}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Certified Microsoft Azure partner for cloud solutions."
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.partners_desc_input"
          />
        </FormRow>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.partners_add_button"
        >
          <Plus className="size-4" />{" "}
          {add.isPending ? "Adding…" : "Add Partner"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.partners_list">
        {partners?.map((partner, i) =>
          confirmId === partner.id ? (
            <ConfirmDelete
              key={String(partner.id)}
              label={partner.name}
              onConfirm={() => handleDelete(partner.id, partner.name)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <AdminRow
              key={String(partner.id)}
              label={partner.name}
              sub={partner.description || partner.websiteUrl}
              onDelete={() => setConfirmId(partner.id)}
              index={i + 1}
              ocidPrefix="admin.partners"
            />
          ),
        )}
        {!partners?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.partners_empty_state"
          >
            No partners yet. Add your first partner above.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
