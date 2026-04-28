import { Button } from "@/components/ui/button";
import { Delete, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import AdminAboutTab from "@/components/admin/AdminAboutTab";
import AdminBlogTab from "@/components/admin/AdminBlogTab";
import AdminClientsTab from "@/components/admin/AdminClientsTab";
import AdminContactsTab from "@/components/admin/AdminContactsTab";
import AdminFaqTab from "@/components/admin/AdminFaqTab";
import AdminHeroTab from "@/components/admin/AdminHeroTab";
import AdminIndustriesTab from "@/components/admin/AdminIndustriesTab";
import AdminPartnersTab from "@/components/admin/AdminPartnersTab";
import AdminPortfolioTab from "@/components/admin/AdminPortfolioTab";
import AdminSettingsTab from "@/components/admin/AdminSettingsTab";
import AdminShapesTab from "@/components/admin/AdminShapesTab";
import AdminSolutionsTab from "@/components/admin/AdminSolutionsTab";
import AdminTeamTab from "@/components/admin/AdminTeamTab";
import AdminTestimonialsTab from "@/components/admin/AdminTestimonialsTab";

const ADMIN_PIN = "admin1234";

const TABS = [
  { value: "settings", label: "Settings", icon: "⚙️" },
  { value: "hero", label: "Hero", icon: "🏠" },
  { value: "about", label: "About", icon: "ℹ️" },
  { value: "clients", label: "Clients", icon: "🤝" },
  { value: "industries", label: "Industries", icon: "🏭" },
  { value: "shapes", label: "Shapes", icon: "🔷" },
  { value: "solutions", label: "Solutions", icon: "💡" },
  { value: "testimonials", label: "Testimonials", icon: "💬" },
  { value: "portfolio", label: "Portfolio", icon: "🗂️" },
  { value: "faq", label: "FAQ", icon: "❓" },
  { value: "team", label: "Team", icon: "👥" },
  { value: "partners", label: "Partners", icon: "🌐" },
  { value: "blog", label: "Blog", icon: "✍️" },
  { value: "contacts", label: "Contacts", icon: "📧" },
];

const PAD_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

function PinLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleKey(k: string) {
    if (k === "⌫") {
      setPin((p) => p.slice(0, -1));
      setError(false);
      return;
    }
    if (pin.length >= 8) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 8) {
      if (next === ADMIN_PIN) {
        toast.success("Welcome back!", { description: "Access granted." });
        onSuccess();
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => {
          setPin("");
          setShake(false);
        }, 700);
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      data-ocid="admin.login_section"
    >
      <div className="w-full max-w-xs flex flex-col items-center gap-8 px-4">
        {/* Logo */}
        <img
          src="/assets/logo.png"
          alt="Shapetech Solutions"
          className="h-12 object-contain"
        />

        {/* Card */}
        <div className="w-full bg-card border border-border rounded-2xl p-8 shadow-elevated">
          <h1 className="font-display font-bold text-xl text-foreground text-center mb-1">
            Admin Access
          </h1>
          <p className="text-xs text-muted-foreground text-center mb-6">
            Enter your 8-digit PIN to continue
          </p>

          {/* PIN dots */}
          <div
            className={`flex justify-center gap-3 mb-6 transition-all ${shake ? "animate-[wiggle_0.3s_ease-in-out_2]" : ""}`}
            data-ocid="admin.pin_display"
          >
            {["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"].map((dk, i) => (
              <div
                key={dk}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-150 ${
                  i < pin.length
                    ? error
                      ? "bg-destructive border-destructive"
                      : "bg-primary border-primary"
                    : "border-border bg-transparent"
                }`}
              />
            ))}
          </div>

          {error && (
            <p
              className="text-xs text-destructive text-center mb-4"
              data-ocid="admin.login_error_state"
            >
              Incorrect PIN. Please try again.
            </p>
          )}

          {/* Number pad */}
          <div className="grid grid-cols-3 gap-3" data-ocid="admin.pin_pad">
            {PAD_KEYS.map((k) =>
              k === "" ? (
                <div key="empty" />
              ) : (
                <button
                  key={k === "⌫" ? "backspace" : k}
                  type="button"
                  onClick={() => handleKey(k)}
                  className={`h-14 rounded-xl font-display font-semibold text-xl transition-smooth flex items-center justify-center
                    ${
                      k === "⌫"
                        ? "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                        : "bg-background border border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
                    }`}
                  data-ocid={`admin.pin_key_${k === "⌫" ? "back" : k}`}
                  aria-label={k === "⌫" ? "Delete" : `Digit ${k}`}
                >
                  {k === "⌫" ? <Delete className="size-5" /> : k}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  settings: AdminSettingsTab,
  hero: AdminHeroTab,
  about: AdminAboutTab,
  clients: AdminClientsTab,
  industries: AdminIndustriesTab,
  shapes: AdminShapesTab,
  solutions: AdminSolutionsTab,
  testimonials: AdminTestimonialsTab,
  portfolio: AdminPortfolioTab,
  faq: AdminFaqTab,
  team: AdminTeamTab,
  partners: AdminPartnersTab,
  blog: AdminBlogTab,
  contacts: AdminContactsTab,
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authenticated) {
    return <PinLogin onSuccess={() => setAuthenticated(true)} />;
  }

  const ActiveComponent = TAB_COMPONENTS[activeTab] ?? AdminSettingsTab;
  const activeTabLabel = TABS.find((t) => t.value === activeTab)?.label ?? "";

  function handleTabChange(value: string) {
    setActiveTab(value);
    setSidebarOpen(false);
  }

  return (
    <div
      className="flex h-screen overflow-hidden bg-background"
      data-ocid="admin.page"
    >
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border flex-shrink-0">
        {/* Sidebar header */}
        <div className="px-5 py-5 border-b border-border flex-shrink-0">
          <img
            src="/assets/logo.png"
            alt="Shapetech Solutions"
            className="h-10 object-contain"
          />
        </div>

        {/* Nav label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Content Manager
          </p>
        </div>

        {/* Nav items */}
        <nav
          className="flex-1 overflow-y-auto px-3 pb-4"
          data-ocid="admin.sidebar_nav"
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleTabChange(tab.value)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth mb-0.5 ${
                activeTab === tab.value
                  ? "bg-primary/15 text-primary border border-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              data-ocid={`admin.${tab.value}_tab`}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setAuthenticated(false)}
            data-ocid="admin.logout_button"
          >
            <LogOut className="size-4" /> Log out
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
          <aside className="relative z-50 flex flex-col w-72 bg-card border-r border-border">
            <div className="px-5 py-5 border-b border-border flex items-center justify-between">
              <img
                src="/assets/logo.png"
                alt="Shapetech Solutions"
                className="h-9 object-contain"
              />
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleTabChange(tab.value)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth mb-0.5 ${
                    activeTab === tab.value
                      ? "bg-primary/15 text-primary border border-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-ocid={`admin.mobile.${tab.value}_tab`}
                >
                  <span className="text-base leading-none">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setAuthenticated(false)}
              >
                <LogOut className="size-4" /> Log out
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button
            type="button"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            data-ocid="admin.menu_button"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="size-4 text-primary" />
            <span className="font-display font-semibold text-foreground text-sm">
              {activeTabLabel}
            </span>
          </div>
          <div className="ml-auto lg:hidden">
            <img
              src="/assets/logo.png"
              alt="Shapetech Solutions"
              className="h-7 object-contain"
            />
          </div>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
