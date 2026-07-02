import type { ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
};

export default function IconButton({
  icon,
  label,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-full transition hover:bg-white/70 ${className}`.trim()}
      aria-label={ariaLabel ?? label}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
