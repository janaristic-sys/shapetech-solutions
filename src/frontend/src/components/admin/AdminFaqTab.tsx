import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFaq } from "@/hooks/use-backend";
import type { FaqItem } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, ConfirmDelete, FormRow } from "./AdminShared";

function useAddFaq() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<FaqItem, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faq"] }),
  });
}
function useDeleteFaq() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faq"] }),
  });
}

export default function AdminFaqTab() {
  const { data: faq, isLoading } = useFaq();
  const add = useAddFaq();
  const del = useDeleteFaq();
  const [form, setForm] = useState({ question: "", answer: "", sortOrder: 1n });
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error("Both question and answer are required.");
      return;
    }
    add.mutate(form, {
      onSuccess: () => {
        toast.success("FAQ item added.");
        setForm({ question: "", answer: "", sortOrder: 1n });
      },
      onError: () => toast.error("Failed to add FAQ item."),
    });
  }

  function handleDelete(id: bigint) {
    del.mutate(id, {
      onSuccess: () => {
        toast.success("FAQ item removed.");
        setConfirmId(null);
      },
      onError: () => toast.error("Failed to delete."),
    });
  }

  if (isLoading) {
    return (
      <AdminCard title="FAQ">
        <div className="space-y-3" data-ocid="admin.faq_loading_state">
          {["f1", "f2", "f3", "f4"].map((k) => (
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
    <AdminCard title="FAQ">
      <p className="text-sm text-muted-foreground mb-5">
        Manage frequently asked questions shown on the homepage and FAQ section.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.faq_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add New FAQ Item
        </p>
        <FormRow label="Question" htmlFor="faq-q">
          <Input
            id="faq-q"
            required
            value={form.question}
            onChange={(e) =>
              setForm((f) => ({ ...f, question: e.target.value }))
            }
            placeholder="Do you specialize in direct selling software?"
            className="bg-card border-input text-foreground"
            data-ocid="admin.faq_question_input"
          />
        </FormRow>
        <FormRow label="Answer" htmlFor="faq-a">
          <Textarea
            id="faq-a"
            required
            rows={4}
            value={form.answer}
            onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
            placeholder="Write the full answer here…"
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.faq_answer_input"
          />
        </FormRow>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.faq_add_button"
        >
          <Plus className="size-4" />{" "}
          {add.isPending ? "Adding…" : "Add FAQ Item"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.faq_list">
        {faq?.map((item, i) =>
          confirmId === item.id ? (
            <ConfirmDelete
              key={String(item.id)}
              label={item.question.substring(0, 60)}
              onConfirm={() => handleDelete(item.id)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <div
              key={String(item.id)}
              className="flex items-start justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-smooth gap-3"
              data-ocid={`admin.faq.item.${i + 1}`}
            >
              <div className="flex gap-2 flex-col flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {item.question}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {item.answer}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                  aria-label="Move up"
                  data-ocid={`admin.faq.up_button.${i + 1}`}
                >
                  <ArrowUp className="size-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                  aria-label="Move down"
                  data-ocid={`admin.faq.down_button.${i + 1}`}
                >
                  <ArrowDown className="size-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded text-destructive hover:bg-destructive/10 transition-smooth"
                  onClick={() => setConfirmId(item.id)}
                  aria-label="Delete FAQ item"
                  data-ocid={`admin.faq.delete_button.${i + 1}`}
                >
                  <span className="text-xs">✕</span>
                </button>
              </div>
            </div>
          ),
        )}
        {!faq?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.faq_empty_state"
          >
            No FAQ items yet. Add your first question above.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
