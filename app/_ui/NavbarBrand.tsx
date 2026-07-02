type NavbarBrandProps = {
  title?: string;
  href?: string;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
};

export default function NavbarBrand({
  title = "Silas Barimah",
  href = "/",
  onMenuToggle,
  isMenuOpen = false,
}: NavbarBrandProps) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <button
        type="button"
        className="rounded-full border border-white/70 bg-white/70 p-2 text-gray-700 shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition hover:bg-white"
        aria-label="Open apps menu"
        aria-expanded={isMenuOpen}
        onClick={onMenuToggle}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 fill-none stroke-current stroke-2 transition-transform ${isMenuOpen ? "rotate-90" : ""}`}
          aria-hidden="true"
        >
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      </button>
      
      

      <a href={href} className="flex items-center gap-2 rounded-full px-1 py-1 transition hover:bg-white/60">
        <img src={"/logo.png"} 
          width={110}
        />
        {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_8px_24px_rgba(2,6,23,0.2)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M12 6.5 5.5 17.5h13L12 6.5Zm0 3.3 3.9 6.2H8.1l3.9-6.2Z" />
          </svg>
        </div>
        <span className="hidden text-lg font-semibold tracking-tight text-slate-900 sm:inline">{title}</span> */}
      </a>
    </div>
  );
}
