import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-[linear-gradient(135deg,#7c89ff_0%,#5fa8ff_100%)] text-white shadow-[0_12px_35px_rgba(124,137,255,0.22)] hover:brightness-110",

  secondary:
    "border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-primary)] hover:bg-white/[0.06]",

  outline:
    "border border-cyan-400/30 bg-cyan-400/[0.04] text-cyan-300 hover:bg-cyan-400/[0.08]",

  danger:
    "bg-[var(--color-error)] text-white hover:brightness-110",
};

function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = true,
  className,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        fullWidth && "w-full",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export default Button;