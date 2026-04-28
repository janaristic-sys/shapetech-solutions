import { Button } from "@/components/ui/button";
// Shared utility components for admin tabs
import { AlertCircle, CheckCircle2, Loader2, Trash2 } from "lucide-react";

interface AdminCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function AdminCard({ title, children, action }: AdminCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-foreground text-lg">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
}

export function MutationStatus({
  isPending,
  isError,
  isSuccess,
  errorMessage = "Something went wrong. Please try again.",
  successMessage = "Saved successfully.",
}: {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage?: string;
  successMessage?: string;
}) {
  if (isPending) {
    return (
      <div
        className="flex items-center gap-2 text-sm text-muted-foreground"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="size-4 animate-spin" /> Saving…
      </div>
    );
  }
  if (isError) {
    return (
      <div
        className="flex items-center gap-2 text-sm text-destructive"
        data-ocid="admin.error_state"
      >
        <AlertCircle className="size-4" /> {errorMessage}
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div
        className="flex items-center gap-2 text-sm text-primary"
        data-ocid="admin.success_state"
      >
        <CheckCircle2 className="size-4" /> {successMessage}
      </div>
    );
  }
  return null;
}

interface DeleteRowProps {
  label: string;
  sub?: string;
  onDelete: () => void;
  isPending?: boolean;
  index: number;
  ocidPrefix: string;
  badge?: React.ReactNode;
}

export function AdminRow({
  label,
  sub,
  onDelete,
  isPending,
  index,
  ocidPrefix,
  badge,
}: DeleteRowProps) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-smooth"
      data-ocid={`${ocidPrefix}.item.${index}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {label}
          </p>
          {sub && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {sub}
            </p>
          )}
        </div>
        {badge}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-destructive hover:bg-destructive/10 flex-shrink-0 ml-3"
        onClick={onDelete}
        disabled={isPending}
        data-ocid={`${ocidPrefix}.delete_button.${index}`}
        aria-label={`Delete ${label}`}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function FormRow({
  label,
  htmlFor,
  children,
}: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

interface ConfirmDeleteProps {
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
  index: number;
}

export function ConfirmDelete({
  label,
  onConfirm,
  onCancel,
  isPending,
  index,
}: ConfirmDeleteProps) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-lg border border-destructive/40 bg-destructive/5"
      data-ocid={`admin.confirm_delete.${index}`}
    >
      <p className="text-sm text-foreground">
        Delete <span className="font-semibold">{label}</span>?
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={isPending}
          data-ocid={`admin.cancel_button.${index}`}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onConfirm}
          disabled={isPending}
          data-ocid={`admin.confirm_button.${index}`}
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
        </Button>
      </div>
    </div>
  );
}
