import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBlogPost,
  useBlogPosts,
  useDeleteBlogPost,
} from "@/hooks/use-backend";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminCard, ConfirmDelete, FormRow } from "./AdminShared";

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  authorName: "",
  publishedAt: new Date().toISOString().split("T")[0],
  tags: [] as string[],
  published: true,
};

export default function AdminBlogTab() {
  const { data: posts, isLoading } = useBlogPosts(false);
  const add = useAddBlogPost();
  const del = useDeleteBlogPost();
  const [form, setForm] = useState(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Post title is required.");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Slug (URL) is required.");
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
          toast.success(
            `"${form.title}" ${form.published ? "published" : "saved as draft"}.`,
          );
          setForm(emptyForm);
          setTagsInput("");
        },
        onError: () => toast.error("Failed to add post."),
      },
    );
  }

  function handleDelete(id: bigint, title: string) {
    del.mutate(id, {
      onSuccess: () => {
        toast.success(`"${title}" deleted.`);
        setConfirmId(null);
      },
      onError: () => toast.error("Failed to delete."),
    });
  }

  if (isLoading) {
    return (
      <AdminCard title="Blog Posts">
        <div className="space-y-3" data-ocid="admin.blog_loading_state">
          {["bl1", "bl2", "bl3"].map((k) => (
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
    <AdminCard title="Blog Posts">
      <p className="text-sm text-muted-foreground mb-5">
        Write and manage blog posts. Toggle published status to show or hide
        posts on the site.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-4 mb-6 p-4 rounded-xl bg-background border border-border"
        data-ocid="admin.blog_add_form"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          New Blog Post
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormRow label="Title" htmlFor="b-title">
            <Input
              id="b-title"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="How AI is Reshaping Enterprise Software"
              className="bg-card border-input text-foreground"
              data-ocid="admin.blog_title_input"
            />
          </FormRow>
          <FormRow label="Slug (URL path)" htmlFor="b-slug">
            <Input
              id="b-slug"
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="ai-reshaping-enterprise-software"
              className="bg-card border-input text-foreground"
              data-ocid="admin.blog_slug_input"
            />
          </FormRow>
          <FormRow label="Author Name" htmlFor="b-author">
            <Input
              id="b-author"
              value={form.authorName}
              onChange={(e) =>
                setForm((f) => ({ ...f, authorName: e.target.value }))
              }
              placeholder="Priya Nair"
              className="bg-card border-input text-foreground"
              data-ocid="admin.blog_author_input"
            />
          </FormRow>
          <FormRow label="Publish Date" htmlFor="b-date">
            <Input
              id="b-date"
              type="date"
              value={form.publishedAt}
              onChange={(e) =>
                setForm((f) => ({ ...f, publishedAt: e.target.value }))
              }
              className="bg-card border-input text-foreground"
              data-ocid="admin.blog_date_input"
            />
          </FormRow>
        </div>
        <FormRow label="Excerpt / Summary" htmlFor="b-excerpt">
          <Textarea
            id="b-excerpt"
            rows={2}
            value={form.excerpt}
            onChange={(e) =>
              setForm((f) => ({ ...f, excerpt: e.target.value }))
            }
            placeholder="A short 1-2 sentence summary of the post…"
            className="bg-card border-input text-foreground resize-none"
            data-ocid="admin.blog_excerpt_input"
          />
        </FormRow>
        <FormRow label="Tags (comma-separated)" htmlFor="b-tags">
          <Input
            id="b-tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="AI, Strategy, Enterprise"
            className="bg-card border-input text-foreground"
            data-ocid="admin.blog_tags_input"
          />
        </FormRow>

        {/* Published toggle */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-smooth ${
              form.published ? "bg-primary" : "bg-muted"
            }`}
            aria-label="Toggle published"
            data-ocid="admin.blog_published_toggle"
          >
            <span
              className={`inline-block h-3.5 w-3.5 rounded-full bg-foreground transform transition-smooth ${
                form.published ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-foreground select-none">
            {form.published ? (
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5 text-primary" />
                Publish immediately
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <EyeOff className="size-3.5 text-muted-foreground" />
                Save as Draft
              </span>
            )}
          </span>
        </div>

        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 w-fit transition-smooth"
          disabled={add.isPending}
          data-ocid="admin.blog_add_button"
        >
          <Plus className="size-4" /> {add.isPending ? "Saving…" : "Add Post"}
        </Button>
      </form>

      <div className="flex flex-col gap-2" data-ocid="admin.blog_list">
        {posts?.map((post, i) =>
          confirmId === post.id ? (
            <ConfirmDelete
              key={String(post.id)}
              label={post.title}
              onConfirm={() => handleDelete(post.id, post.title)}
              onCancel={() => setConfirmId(null)}
              isPending={del.isPending}
              index={i + 1}
            />
          ) : (
            <div
              key={String(post.id)}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-smooth gap-3"
              data-ocid={`admin.blog.item.${i + 1}`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {post.authorName} · {post.publishedAt}
                  </p>
                </div>
                <Badge
                  variant={post.published ? "default" : "secondary"}
                  className={`flex-shrink-0 text-xs ${
                    post.published
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <button
                type="button"
                className="p-1.5 rounded text-destructive hover:bg-destructive/10 transition-smooth flex-shrink-0"
                onClick={() => setConfirmId(post.id)}
                aria-label={`Delete "${post.title}"`}
                data-ocid={`admin.blog.delete_button.${i + 1}`}
              >
                <span className="text-xs font-bold">✕</span>
              </button>
            </div>
          ),
        )}
        {!posts?.length && (
          <p
            className="text-sm text-muted-foreground text-center py-6"
            data-ocid="admin.blog_empty_state"
          >
            No blog posts yet. Write your first post above.
          </p>
        )}
      </div>
    </AdminCard>
  );
}
