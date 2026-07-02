import { cn } from "../../utils/cn";

function Input({
  label,
  error,
  registration,
  className,
  leftIcon,
  rightElement,
  ...props
}) {
  return (
    <div className="space-y-2.5">
      {label && (
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {leftIcon}
          </span>
        )}

        <input
          className={cn(
            "w-full rounded-2xl border bg-white/[0.03] py-3 text-[var(--color-text-primary)] outline-none transition-all",
            "border-[var(--color-border)] placeholder:text-[var(--color-text-muted)]",
            "focus:border-[rgba(56,189,248,0.55)] focus:bg-white/[0.045] focus:ring-4 focus:ring-cyan-400/10",
            leftIcon ? "pl-11 pr-4" : "px-4",
            rightElement ? "pr-12" : "",
            error &&
              "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-red-400/10",
            className
          )}
          {...registration}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-[var(--color-error)]">{error.message}</p>
      )}
    </div>
  );
}

export default Input;