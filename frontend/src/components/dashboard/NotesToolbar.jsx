import { Plus, Search, SlidersHorizontal } from "lucide-react";
import Button from "../ui/Button";

const sortOptions = [
  { label: "Newest first", value: "-createdAt" },
  { label: "Oldest first", value: "createdAt" },
  { label: "Recently updated", value: "-updatedAt" },
  { label: "Least recently updated", value: "updatedAt" },
  { label: "Title A-Z", value: "title" },
  { label: "Title Z-A", value: "-title" },
];

function NotesToolbar({
  search,
  sort,
  onSearchChange,
  onSortChange,
  onCreateClick,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-2xl border border-[var(--color-border)] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition-all placeholder:text-[var(--color-text-muted)] focus:border-indigo-300/30 focus:bg-white/[0.045] focus:ring-4 focus:ring-indigo-400/10"
          />
        </div>

        <div className="relative w-full lg:w-[230px]">
          <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-[var(--color-border)] bg-white/[0.03] py-3 pl-11 pr-10 text-sm text-[var(--color-text-primary)] outline-none transition-all focus:border-indigo-300/30 focus:bg-white/[0.045] focus:ring-4 focus:ring-indigo-400/10"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[var(--color-surface-2)] text-[var(--color-text-primary)]"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="button"
        onClick={onCreateClick}
        fullWidth={false}
        className="h-12 min-w-[160px] px-5 text-sm font-semibold"
      >
        <Plus className="h-4 w-4" />
        New Note
      </Button>
    </div>
  );
}

export default NotesToolbar;