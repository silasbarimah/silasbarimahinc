import { type FormEvent } from "react";

type NavbarSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
};

export default function NavbarSearch({ value, onChange, onSubmit, loading = false }: NavbarSearchProps) {
  return (
    <form onSubmit={onSubmit} className="flex w-full justify-center">
      <div className="flex w-full max-w-2xl items-center">
        <label className="flex flex-1 items-center rounded-l-full border border-r-0 border-white/70 bg-white/70 px-4 py-2.5 text-gray-500 shadow-[0_6px_20px_rgba(15,23,42,0.06)] backdrop-blur">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-4.2-4.2" />
          </svg>
          <input
            type="search"
            placeholder="Search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            autoFocus
            className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            aria-label="Search"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-r-full border border-white/70 bg-white/70 px-4 py-2.5 text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Search"
        >
          {loading ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin fill-none stroke-current stroke-2" aria-hidden="true">
              <circle cx="12" cy="12" r="8" className="opacity-30" />
              <path d="M20 12a8 8 0 0 1-8 8" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
              <circle cx="11" cy="11" r="6" />
              <path d="m20 20-4.2-4.2" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="ml-2 hidden rounded-full bg-white/80 p-3 text-gray-700 shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition hover:bg-white lg:flex"
          aria-label="Voice search"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm-5 1a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7Z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
