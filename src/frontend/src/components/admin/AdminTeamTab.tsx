import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTeam } from "@/hooks/use-backend";
import type { TeamMember } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Linkedin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, ConfirmDelete, FormRow } from "./AdminShared";

function useAddTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<TeamMember, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team"] }),
  });
}
function useDeleteTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team"] }),
  });
}

const emptyForm: Omit<TeamMember, "id"> = {
  name: "",
  role: "",
  bio: "",
  avatarUrl: "",
  linkedinUrl: "",
  sortOrder: 1n,
};

export default function AdminTeamTab() {
  const { data: team, isLoading } = useTeam();
  const add = useAddTeamMember();
  const del = useDeleteTeamMember();
  const [form, setForm] = useState<Omit<TeamMember, "id">>(emptyForm);
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) {
      toast.error("Name and role are required.");
      return;
    }
    add.mutate(form, {
      onSuccess: () => {
        toast.success(`${form.name} added to team.`);
        setForm(emptyForm);
      },
      onError: () => toast.error("Failed to add team member."),
    });
  }

  function handleDelete(id: bigint, name: string) {
    del.mutate(id, {
      onSuccess: () => {
        toast.success(`${name} removed from team.`);
        setConfirmId(null);
      },
      onError: () => toast.error("Failed to delete."),
    });
  }

  if (isLoading) {
    return (
      <AdminCard title="Team Members">
        <div className="space-y-3" data-ocid="admin.team_loading_state">
          {["tm1", "tm2", "tm3", "tm4"].map((k) => (
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
    <AdminCard title="Team Members">
      <p className="text-sm text-muted-foreground mb-5">
        Manage the team profiles shown on the About page.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.team_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Add Team Member
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormRow label="Full Name" htmlFor="tm-name">
            <Input
              id="tm-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Sofia Marchetti"
              className="bg-card border-input text-foreground"
              data-ocid="admin.team_name_input"
            />
          </FormRow>
          <FormRow label="Role / Title" htmlFor="tm-role">
            <Input
              id="tm-role"
              required
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              placeholder="Head of Design"
              className="bg-card border-input text-foreground"
              data-ocid="admin.team_role_input"
            />
          </FormRow>
          <FormRow label="Avatar URL (optional)" htmlFor="tm-avatar">
            <Input
              id="tm-avatar"
              value={form.avatarUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, avatarUrl: e.target.value }))
              }
              placeholder="https://..."
              className="bg-card border-input text-foreground"
              data-ocid="admin.team_avatar_input"
            />
          </FormRow>
          <FormRow label="LinkedIn URL (optional)" htmlFor="tm-linkedin">
            <Input
              id="tm-linkedin"
              value={form.linkedinUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, linkedinUrl: e.target.value }))
              }
              placeholder="https://linkedin.com/in/..."
              className="bg-card border-input text-foreground"
              data-ocid="admin.team_linkedin_input"
            />
          </FormRow>
        </div>
        <FormRow label="Short Bio" htmlFor="tm-bio">
          <Textarea
            id="tm-bio"
            rows={3}
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            placeholder="Brief background, expertise, and what this person brings to the team…"
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.team_bio_input"
          />
        </FormRow>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.team_add_button"
        >
          <Plus className="size-4" /> {add.isPending ? "Adding…" : "Add Member"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.team_list">
        {team?.map((member, i) =>
          confirmId === member.id ? (
            <ConfirmDelete
              key={String(member.id)}
              label={member.name}
              onConfirm={() => handleDelete(member.id, member.name)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <div
              key={String(member.id)}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-smooth gap-3"
              data-ocid={`admin.team.item.${i + 1}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0 border border-primary/20">
                  {member.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {member.linkedinUrl && member.linkedinUrl !== "#" && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-smooth"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin className="size-4" />
                  </a>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => setConfirmId(member.id)}
                  data-ocid={`admin.team.delete_button.${i + 1}`}
                  aria-label={`Remove ${member.name}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ),
        )}
        {!team?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.team_empty_state"
          >
            No team members yet. Add your first team member above.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
