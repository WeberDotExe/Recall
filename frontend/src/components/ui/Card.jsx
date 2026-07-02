import { cn } from "../../utils/cn";

function Card({ children, className }) {
  return (
    <div
      className={cn(
        "surface-card rounded-[28px] p-6 transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;