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
  MotionIcon,
} from "./icons";

interface HeaderProps {
  onSearchOpen: () => void;
  reducedMotion: boolean;
  onToggleMotion: () => void;
  onNav: (id: string) => void;
  activeNav: string;
}

const NAV = [
  { id: "explore", label: "Explore", icon: CompassIcon },
  { id: "empires", label: "Empires", icon: EmpiresIcon },
  { id: "lessons", label: "Lessons", icon: LessonsIcon },
  { id: "library", label: "Library", icon: LibraryIcon },
  { id: "notes", label: "Notes", icon: NotesIcon },
];

export const Header = memo(function Header({ onSearchOpen, reducedMotion, onToggleMotion, onNav, activeNav }: HeaderProps) {
  return (
    <header className="relative z-40 flex h-[68px] flex-none items-center gap-4 border-b border-line-warm bg-paper px-5">
      {/* Logo */}
      <div className="flex flex-none items-center gap-2.5">
        <TempleIcon className="h-8 w-8 text-terracotta" aria-hidden />
        <div className="leading-none">
          <div className="font-display text-[1.45rem] font-bold tracking-[0.01em] text-ink">Empire Atlas</div>
          <div className="font-display mt-1 text-[0.82rem] font-medium italic text-terracotta">Explore how civilizations lived</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
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
        aria-label="Search empires, houses, features"
      >
        <SearchIcon className="h-4 w-4 flex-none text-ink-muted" />
        <span className="flex-1 truncate text-[0.84rem] italic text-ink-muted">Search empires, houses…</span>
        <kbd className="hidden rounded border border-line-warm bg-paper px-1.5 py-0.5 text-[0.62rem] font-medium text-ink-muted xl:block">⌘K</kbd>
      </button>
      {/* compact search (mobile) */}
      <button
        onClick={onSearchOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line-warm bg-surface text-ink-muted transition-colors hover:border-line-strong md:hidden"
        aria-label="Search empires, houses, features"
      >
        <SearchIcon className="h-4 w-4" />
      </button>

      {/* Reduced motion toggle */}
      <button
        onClick={onToggleMotion}
        className={`tool-btn !w-11 rounded-xl border border-line-warm bg-surface ${reducedMotion ? "is-on" : ""}`}
        title={reducedMotion ? "Enable full motion" : "Reduce motion"}
        aria-pressed={reducedMotion}
        aria-label="Toggle reduced motion"
      >
        <MotionIcon className="!h-[18px] !w-[18px]" />
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
