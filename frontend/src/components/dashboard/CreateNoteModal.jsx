import { X } from "lucide-react";
import CreateNoteForm from "./CreateNoteForm";

function CreateNoteModal({ isOpen, onClose, onSuccess }) {
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
              New note
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-2xl">
              Capture something important
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Add a clean title and a useful description so your note is easy to
              find later.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] transition hover:border-white/15 hover:text-[var(--color-text-primary)]"
            aria-label="Close create note modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <CreateNoteForm onClose={onClose} onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}

export default CreateNoteModal;