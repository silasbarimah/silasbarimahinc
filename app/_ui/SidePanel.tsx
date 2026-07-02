import type { ReactNode } from "react";

type SidePanelProps = {
  open: boolean;
  title?: ReactNode;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  widthClass?: string;
  closeLabel?: string;
};

export default function SidePanel({
  open,
  title,
  onClose,
  children,
  className = "",
  widthClass = "w-[320px]",
  closeLabel = "Close panel",
}: SidePanelProps) {
  if (!open) {
    return null;
  }

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-[60] flex h-screen ${widthClass} max-w-[90vw] flex-col rounded-r-[1.75rem] border border-white/40 bg-white p-4 shadow-[12px_0_40px_rgba(15,23,42,0.14)] backdrop-blur-2xl ${className}`.trim()}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>{title}</div>
        {onClose ? (
          <button
            type="button"
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto">{children}</div>
    </aside>
  );
}
