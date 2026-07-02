import type { ReactNode } from "react";

type MenuSectionItem = {
  label: string;
  icon: ReactNode;
  description: string;
  iconColor?: string;
  danger?: boolean;
};

type MenuSection = {
  title: string;
  items: MenuSectionItem[];
};

type MenuSectionListProps = {
  sections: MenuSection[];
  onItemClick?: (item: MenuSectionItem) => void;
  className?: string;
};

export default function MenuSectionList({
  sections,
  onItemClick,
  className = "",
}: MenuSectionListProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()}>
      {sections.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
            {section.title}
          </p>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex items-center rounded-[0.95rem] border border-transparent px-3 py-2.5 text-left text-sm transition ${
                  item.danger
                    ? "text-rose-600 hover:bg-rose-50/80"
                    : "text-slate-700 hover:border-white/70 hover:bg-white/70"
                }`}
                onClick={() => onItemClick?.(item)}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center text-base ${item.iconColor ?? "text-slate-600"}`}>
                    <span>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
