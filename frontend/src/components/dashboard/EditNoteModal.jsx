import { LoaderCircle, X } from "lucide-react";
import EditNoteForm from "./EditNoteForm";

function EditNoteModal({
  isOpen,
  noteId,
  note,
  isLoadingNote,
  onClose,
  onSuccess,
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-6 sm:py-6"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Note details
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
              View and update note
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Review the full note, make changes, and save them back to your
              Recall workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] transition hover:border-white/15 hover:text-[var(--color-text-primary)]"
            aria-label="Close edit note modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          {isLoadingNote ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/70 px-6 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-indigo-300/15 bg-indigo-300/[0.08] text-indigo-200">
                <LoaderCircle className="h-7 w-7 animate-spin" />
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
                Loading note details
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
                Fetching the latest version of this note from your workspace.
              </p>
            </div>
          ) : (
            <EditNoteForm
              noteId={noteId}
              initialNote={note}
              onClose={onClose}
              onSuccess={onSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditNoteModal;