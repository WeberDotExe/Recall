import { Clock3, FileText, Trash2 } from "lucide-react";

function formatDate(dateString) {
  if (!dateString) return "Recently updated";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function NoteCard({ note, onDeleteClick, onViewDetails }) {
  const title = note?.title || "Untitled note";
  const description = note?.description || "No description available.";
  const updatedAt = note?.updatedAt || note?.createdAt;

  return (
    <article className="group rounded-[26px] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300/20 hover:shadow-[0_22px_50px_rgba(0,0,0,0.26)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-indigo-300/15 bg-indigo-300/[0.08] text-indigo-200">
            <FileText className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
              {title}
            </h3>

            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Personal note
            </p>
          </div>
        </div>

        <span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          Note
        </span>
      </div>

      <p className="line-clamp-4 min-h-[96px] text-sm leading-7 text-[var(--color-text-secondary)]">
        {description}
      </p>

      <div className="mt-5 flex flex-col gap-3 border-t border-white/6 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <Clock3 className="h-3.5 w-3.5" />
          <span>Updated {formatDate(updatedAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewDetails?.(note._id)}
            className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] transition hover:border-indigo-300/20 hover:text-[var(--color-text-primary)]"
          >
            View details
          </button>

          <button
            type="button"
            onClick={() => onDeleteClick?.(note)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-400/15 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:border-red-400/25 hover:bg-red-500/15 hover:text-red-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;