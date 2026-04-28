import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddTestimonial,
  useDeleteTestimonial,
  useTestimonials,
} from "@/hooks/use-backend";
import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, AdminRow, ConfirmDelete, FormRow } from "./AdminShared";

const emptyForm = {
  authorName: "",
  authorTitle: "",
  company: "",
  quote: "",
  avatarUrl: "",
  sortOrder: 1n,
};

export default function AdminTestimonialsTab() {
  const { data: testimonials, isLoading } = useTestimonials();
  const add = useAddTestimonial();
  const del = useDeleteTestimonial();
  const [form, setForm] = useState(emptyForm);
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.authorName.trim() || !form.quote.trim()) {
      toast.error("Author name and quote are required.");
      return;
    }
    add.mutate(form, {
      onSuccess: () => {
        toast.success(`Testimonial from "${form.authorName}" added.`);
        setForm(emptyForm);
      },
      onError: () => toast.error("Failed to add testimonial."),
    });
  }

  function handleDelete(id: bigint, name: string) {
    del.mutate(id, {
      onSuccess: () => {
        toast.success(`Testimonial from "${name}" removed.`);
        setConfirmId(null);
      },
      onError: () => toast.error("Failed to delete."),
    });
  }

  if (isLoading) {
    return (
      <AdminCard title="Testimonials">
        <div className="space-y-3" data-ocid="admin.testimonials_loading_state">
          {["t1", "t2", "t3"].map((k) => (
            <div
              key={k}
              className="h-16 rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      </AdminCard>
    );
  }

  return (
    <AdminCard title="Testimonials">
      <p className="text-sm text-muted-foreground mb-5">
        Manage client quotes and testimonials shown on the homepage.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.testimonials_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add New Testimonial
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <FormRow label="Author Name" htmlFor="t-name">
            <Input
              id="t-name"
              required
              value={form.authorName}
              onChange={(e) =>
                setForm((f) => ({ ...f, authorName: e.target.value }))
              }
              placeholder="Jennifer Walsh"
              className="bg-card border-input text-foreground"
              data-ocid="admin.testimonials_name_input"
            />
          </FormRow>
          <FormRow label="Title / Role" htmlFor="t-title">
            <Input
              id="t-title"
              value={form.authorTitle}
              onChange={(e) =>
                setForm((f) => ({ ...f, authorTitle: e.target.value }))
              }
              placeholder="Chief Operating Officer"
              className="bg-card border-input text-foreground"
              data-ocid="admin.testimonials_title_input"
            />
          </FormRow>
          <FormRow label="Company" htmlFor="t-company">
            <Input
              id="t-company"
              value={form.company}
              onChange={(e) =>
                setForm((f) => ({ ...f, company: e.target.value }))
              }
              placeholder="Network Marketing Brand"
              className="bg-card border-input text-foreground"
              data-ocid="admin.testimonials_company_input"
            />
          </FormRow>
        </div>
        <FormRow label="Quote" htmlFor="t-quote">
          <Textarea
            id="t-quote"
            required
            rows={4}
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            placeholder="Write the full testimonial quote here…"
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.testimonials_quote_input"
          />
        </FormRow>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.testimonials_add_button"
        >
          <Plus className="size-4" />{" "}
          {add.isPending ? "Adding…" : "Add Testimonial"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.testimonials_list">
        {testimonials?.map((t, i) =>
          confirmId === t.id ? (
            <ConfirmDelete
              key={String(t.id)}
              label={t.authorName}
              onConfirm={() => handleDelete(t.id, t.authorName)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <AdminRow
              key={String(t.id)}
              label={t.authorName}
              sub={`${t.authorTitle}${t.company ? ` · ${t.company}` : ""}`}
              onDelete={() => setConfirmId(t.id)}
              index={i + 1}
              ocidPrefix="admin.testimonials"
              badge={
                <span className="ml-2 flex items-center gap-0.5 flex-shrink-0">
                  {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                    <Star
                      key={sk}
                      className="size-3 fill-primary text-primary"
                    />
                  ))}
                </span>
              }
            />
          ),
        )}
        {!testimonials?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.testimonials_empty_state"
          >
            No testimonials yet. Add your first one above.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
