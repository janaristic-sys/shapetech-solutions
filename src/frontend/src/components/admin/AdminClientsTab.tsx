import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddClient, useClients, useDeleteClient } from "@/hooks/use-backend";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, AdminRow, ConfirmDelete, FormRow } from "./AdminShared";

export default function AdminClientsTab() {
  const { data: clients, isLoading } = useClients();
  const add = useAddClient();
  const del = useDeleteClient();
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  const [form, setForm] = useState({
    name: "",
    logoUrl: "",
    websiteUrl: "",
    sortOrder: 1n,
  });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Client name is required.");
      return;
    }
    add.mutate(form, {
      onSuccess: () => {
        toast.success(`"${form.name}" added.`);
        setForm({ name: "", logoUrl: "", websiteUrl: "", sortOrder: 1n });
      },
      onError: () => toast.error("Failed to add client."),
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
      <AdminCard title="Clients">
        <div className="space-y-3" data-ocid="admin.clients_loading_state">
          {["c1", "c2", "c3", "c4"].map((k) => (
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
    <AdminCard
      title="Clients"
      action={
        <span className="text-xs text-muted-foreground">
          {clients?.length ?? 0} total
        </span>
      }
    >
      <p className="text-sm text-muted-foreground mb-5">
        Manage the client logos displayed in the clients section on the
        homepage.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.clients_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add New Client
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <FormRow label="Client Name" htmlFor="client-name">
            <Input
              id="client-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Forever Living"
              className="bg-card border-input text-foreground"
              data-ocid="admin.clients_name_input"
            />
          </FormRow>
          <FormRow label="Logo URL (optional)" htmlFor="client-logo">
            <Input
              id="client-logo"
              value={form.logoUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, logoUrl: e.target.value }))
              }
              placeholder="https://..."
              className="bg-card border-input text-foreground"
              data-ocid="admin.clients_logo_input"
            />
          </FormRow>
          <FormRow label="Website URL (optional)" htmlFor="client-url">
            <Input
              id="client-url"
              value={form.websiteUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, websiteUrl: e.target.value }))
              }
              placeholder="https://foreverliving.com"
              className="bg-card border-input text-foreground"
              data-ocid="admin.clients_website_input"
            />
          </FormRow>
        </div>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.clients_add_button"
        >
          <Plus className="size-4" /> {add.isPending ? "Adding…" : "Add Client"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.clients_list">
        {clients?.map((client, i) =>
          confirmId === client.id ? (
            <ConfirmDelete
              key={String(client.id)}
              label={client.name}
              onConfirm={() => handleDelete(client.id, client.name)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <AdminRow
              key={String(client.id)}
              label={client.name}
              sub={client.websiteUrl || "No website"}
              onDelete={() => setConfirmId(client.id)}
              index={i + 1}
              ocidPrefix="admin.clients"
            />
          ),
        )}
        {!clients?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.clients_empty_state"
          >
            No clients yet. Add your first client above.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
