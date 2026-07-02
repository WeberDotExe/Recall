import { Brain, LogOut } from "lucide-react";
import Button from "../ui/Button";

function DashboardHeader({ onLogout }) {
  return (
    <>
      {/* MOBILE HEADER */}
      <div className="rounded-[24px] border border-white/6 bg-[linear-gradient(135deg,rgba(124,137,255,0.10),rgba(95,168,255,0.04))] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.22)] lg:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-indigo-300/15 bg-indigo-300/[0.08] text-indigo-200">
              <Brain className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
                Recall
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                Search, sort, and manage your notes in one calm workspace.
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={onLogout}
            fullWidth={false}
            className="h-10 px-3 text-sm font-medium shrink-0"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* DESKTOP / LARGE SCREEN HEADER */}
      <div className="hidden rounded-[28px] border border-white/6 bg-[linear-gradient(135deg,rgba(124,137,255,0.12),rgba(95,168,255,0.04))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] lg:block lg:p-7">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex w-fit items-center rounded-full border border-indigo-300/20 bg-indigo-300/[0.08] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-indigo-200">
              Recall Workspace
            </span>

            <div className="mt-4 space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                Your notes, in one focused workspace.
              </h1>

              <p className="max-w-xl text-base leading-7 text-[var(--color-text-secondary)]">
                Search faster, sort clearly, and keep your ideas easy to revisit
                without turning your dashboard into clutter.
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={onLogout}
            fullWidth={false}
            className="h-11 px-4 text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              Status
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-primary)]">
              Active workspace
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              Focus
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-primary)]">
              Notes + planning
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              Workflow
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-primary)]">
              Search, sort, manage
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;