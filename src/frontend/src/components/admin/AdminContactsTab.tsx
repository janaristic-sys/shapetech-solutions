import { useContactSubmissions } from "@/hooks/use-backend";
import { Building2, Calendar, Mail, MessageSquare, User } from "lucide-react";
import { AdminCard } from "./AdminShared";

export default function AdminContactsTab() {
  const { data: submissions, isLoading } = useContactSubmissions();

  if (isLoading) {
    return (
      <AdminCard title="Contact Submissions">
        <div className="space-y-3" data-ocid="admin.contacts_loading_state">
          {["ct1", "ct2", "ct3"].map((k) => (
            <div
              key={k}
              className="h-28 rounded-xl bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      </AdminCard>
    );
  }

  return (
    <AdminCard title="Contact Submissions">
      <p className="text-sm text-muted-foreground mb-5">
        View-only list of contact form submissions from visitors. Newest first.
      </p>

      <div className="flex flex-col gap-3" data-ocid="admin.contacts_list">
        {submissions?.map((sub, i) => (
          <div
            key={String(sub.id)}
            className="p-5 rounded-xl border border-border bg-background hover:border-primary/20 transition-smooth"
            data-ocid={`admin.contacts.item.${i + 1}`}
          >
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {sub.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {sub.name}
                  </p>
                  {sub.company && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 className="size-3" /> {sub.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <a
                  href={`mailto:${sub.email}`}
                  className="flex items-center gap-1 hover:text-primary transition-smooth"
                >
                  <Mail className="size-3" /> {sub.email}
                </a>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(
                    Number(sub.submittedAt) / 1_000_000,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="flex items-start gap-2 bg-card border border-border rounded-lg p-3">
              <MessageSquare className="size-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sub.message}
              </p>
            </div>
          </div>
        ))}

        {!submissions?.length && (
          <div
            className="text-center py-12"
            data-ocid="admin.contacts_empty_state"
          >
            <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Mail className="size-6 text-muted-foreground/40" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              No submissions yet
            </p>
            <p className="text-xs text-muted-foreground">
              Contact form submissions will appear here when visitors reach out.
            </p>
          </div>
        )}
      </div>
    </AdminCard>
  );
}
