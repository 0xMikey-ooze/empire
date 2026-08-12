import { memo } from "react";
import {
  TempleIcon,
  CompassIcon,
  EmpiresIcon,
  LessonsIcon,
  LibraryIcon,
  NotesIcon,
  SearchIcon,
  ChevronDownIcon,
  MenuIcon,
} from "./icons";

interface HeaderProps {
  onSearchOpen: () => void;
  /** opens the drawer that carries navigation and Bible discoveries on small screens */
  onMenuOpen: () => void;
  onNav: (id: string) => void;
  activeNav: string;
}

const NAV = [
  { id: "explore", label: "Explore", icon: CompassIcon },
  { id: "structures", label: "Structures", icon: EmpiresIcon },
  { id: "lessons", label: "Lessons", icon: LessonsIcon },
  { id: "library", label: "Library", icon: LibraryIcon },
  { id: "notes", label: "Notes", icon: NotesIcon },
];

export const Header = memo(function Header({ onSearchOpen, onMenuOpen, onNav, activeNav }: HeaderProps) {
  return (
    <header className="relative z-40 flex h-[68px] flex-none items-center gap-2.5 border-b border-line-warm bg-paper px-3 sm:gap-4 sm:px-5">
      {/* navigation and Bible discoveries live in a drawer below lg */}
      <button
        onClick={onMenuOpen}
        className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-line-warm bg-surface text-slateblue transition-colors hover:border-line-strong xl:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {/* Logo */}
      <div className="flex min-w-0 flex-none items-center gap-2.5">
        <TempleIcon className="h-8 w-8 flex-none text-terracotta" aria-hidden />
        <div className="min-w-0 leading-none">
          <div className="font-display truncate text-[1.25rem] font-bold tracking-[0.01em] text-ink sm:text-[1.45rem]">Bible Discovery</div>
          <div className="font-display mt-1 hidden text-[0.82rem] font-medium italic text-terracotta sm:block">Explore Scripture in interactive 3D</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="ml-6 hidden items-center gap-1 xl:flex" aria-label="Primary">
        {NAV.map((n) => (
          <button
            key={n.id}
            className={`nav-item ${activeNav === n.id ? "is-active" : ""}`}
            onClick={() => onNav(n.id)}
            aria-current={activeNav === n.id ? "page" : undefined}
          >
            <n.icon />
            {n.label}
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Search */}
      <button
        onClick={onSearchOpen}
        className="group hidden h-10 w-[min(300px,26vw)] items-center gap-2.5 rounded-full border border-line-warm bg-surface px-4 text-left transition-colors hover:border-line-strong md:flex"
        aria-label="Search biblical structures, objects, and features"
      >
        <SearchIcon className="h-4 w-4 flex-none text-ink-muted" />
        <span className="flex-1 truncate text-[0.84rem] italic text-ink-muted">Search Bible discoveries…</span>
        <kbd className="hidden rounded border border-line-warm bg-paper px-1.5 py-0.5 text-[0.62rem] font-medium text-ink-muted xl:block">⌘K</kbd>
      </button>
      {/* compact search (mobile) */}
      <button
        onClick={onSearchOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line-warm bg-surface text-ink-muted transition-colors hover:border-line-strong md:hidden"
        aria-label="Search biblical structures, objects, and features"
      >
        <SearchIcon className="h-4 w-4" />
      </button>

      {/* Profile */}
      <button className="flex flex-none items-center gap-1.5 rounded-full" aria-label="Profile">
        <span className="relative block h-9 w-9 overflow-hidden rounded-full border border-line-strong bg-paper-deep">
          {/* marble-bust style avatar */}
          <svg viewBox="0 0 36 36" className="h-full w-full">
            <rect width="36" height="36" fill="#e9dfce" />
            <ellipse cx="18" cy="15" rx="6.5" ry="7.5" fill="#cfc3ae" />
            <path d="M18 22c-5 0-8.5 3-9.5 8.5V36h19v-5.5C26.5 25 23 22 18 22z" fill="#c3b49c" />
            <path d="M12.5 12.5c1-3 3-4.5 5.5-4.5s4.5 1.5 5.5 4.5" fill="none" stroke="#a4957c" strokeWidth="1" />
          </svg>
        </span>
        <ChevronDownIcon className="h-4 w-4 text-ink-muted" />
      </button>
    </header>
  );
});
