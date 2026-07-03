import { LoaderCircle, Trash2, X } from "lucide-react";

function DeleteNoteModal({
  isOpen,
  note,
  isDeleting,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !note) return null;

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
      <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/35 to-transparent" />

        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-red-300/80">
              Delete note
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
              Delete this note permanently?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              This action can’t be undone. The selected note will be removed from
              your Recall workspace permanently.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] transition hover:border-white/15 hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Close delete note modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <div className="rounded-2xl border border-red-400/15 bg-red-500/10 px-4 py-4">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              {note.title || "Untitled note"}
            </p>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">
              {note.description || "No description available."}
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-white/15 hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete note
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteNoteModal;