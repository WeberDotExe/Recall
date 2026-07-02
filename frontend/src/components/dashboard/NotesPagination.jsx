import { ChevronLeft, ChevronRight } from "lucide-react";

function NotesPagination({
  currentPage,
  totalPages,
  totalNotes,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[var(--color-text-secondary)]">
        {totalNotes} total notes
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex h-10 items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white/[0.03] px-4 text-sm text-[var(--color-text-secondary)] transition hover:border-indigo-300/20 hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {pages.map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`h-10 min-w-10 rounded-2xl border px-3 text-sm font-medium transition ${
                  isActive
                    ? "border-indigo-300/20 bg-indigo-300/[0.10] text-indigo-100"
                    : "border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-secondary)] hover:border-indigo-300/20 hover:text-[var(--color-text-primary)]"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex h-10 items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white/[0.03] px-4 text-sm text-[var(--color-text-secondary)] transition hover:border-indigo-300/20 hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default NotesPagination;