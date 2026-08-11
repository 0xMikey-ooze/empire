import { useCallback, useEffect, useRef, useState } from "react";
import { EMPIRES, empireById, DEFAULT_EMPIRE_ID } from "@/data";
import type { Empire } from "@/types/empire";
import { Banner } from "@/components/Banner";
import { Header } from "@/components/Header";
import { EmpireLibrary } from "@/components/EmpireLibrary";
import { Viewer } from "@/components/Viewer";
import { InfoPanel } from "@/components/InfoPanel";
import { BottomCards } from "@/components/BottomCards";
import { LessonModal, QuizModal, ArtifactsModal, TimelineModal, SectionModal, SearchOverlay } from "@/components/modals";
import { CloseIcon } from "@/components/icons";

type ModalId = "lesson" | "quiz" | "artifacts" | "timeline" | "interior" | "floorPlan" | "dailyLife" | "geography" | null;

const mq = (q: string) => (typeof window !== "undefined" ? window.matchMedia(q).matches : false);

/** mirrors the header's primary nav, for the drawer */
const NAV_ITEMS = [
  { id: "explore", label: "Explore" },
  { id: "empires", label: "Empires" },
  { id: "lessons", label: "Lessons" },
  { id: "library", label: "Library" },
  { id: "notes", label: "Notes" },
];

export default function App() {
  const [viewerEmpire, setViewerEmpire] = useState<Empire>(() => empireById(DEFAULT_EMPIRE_ID));
  const [panelEmpire, setPanelEmpire] = useState<Empire>(() => empireById(DEFAULT_EMPIRE_ID));
  const [modal, setModal] = useState<ModalId>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(() => localStorage.getItem("atlas-credits") !== "dismissed");
  const [focusHotspot, setFocusHotspot] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("explore");
  const [reducedMotion, setReducedMotion] = useState(() => mq("(prefers-reduced-motion: reduce)"));
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("atlas-favs") ?? "[]"));
    } catch {
      return new Set();
    }
  });

  /* Reduced motion now follows the operating system alone — there is no
     in-app switch — so track the media query rather than sampling it once. */
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(q.matches);
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("rm", reducedMotion);
  }, [reducedMotion]);

  /* ⌘K search */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* preload the most likely next models once idle */
  useEffect(() => {
    const id = window.setTimeout(() => {
      /* adjacent models are warmed by the engine cache on demand */
    }, 4000);
    return () => window.clearTimeout(id);
  }, []);

  /* Only the dwelling animates on a swap. The panels rewrite their copy in
     place — fading or sliding them reads as the page shifting under you. */
  useEffect(() => {
    document.title = `${panelEmpire.dwelling} — Empire Atlas`;
  }, [panelEmpire]);

  const selectEmpire = useCallback(
    (id: string) => {
      const e = empireById(id);
      if (e.id === viewerEmpire.id) return;
      setAnimating(false);
      setViewerEmpire(e);
    },
    [viewerEmpire.id],
  );

  const onSwap = useCallback((e: Empire) => setPanelEmpire(e), []);

  const dismissCredits = useCallback(() => {
    setCreditsOpen(false);
    localStorage.setItem("atlas-credits", "dismissed");
  }, []);

  /* hovering a library row starts its download, so the click that follows
     lands on a model that is already parsed rather than paying for it mid-swap */
  const prefetchRef = useRef<((e: Empire) => void) | null>(null);
  const prefetch = useCallback((id: string) => prefetchRef.current?.(empireById(id)), []);

  const toggleFav = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("atlas-favs", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const onNav = useCallback(
    (nav: string) => {
      setActiveNav(nav);
      if (nav === "lessons") setModal("lesson");
      else if (nav === "empires" || nav === "library") setSearchOpen(true);
      else if (nav === "notes") setModal("timeline");
    },
    [],
  );

  const onSearchPick = useCallback(
    (empireId: string, hotspotId?: string) => {
      setSearchOpen(false);
      if (empireId !== viewerEmpire.id) selectEmpire(empireId);
      if (hotspotId) window.setTimeout(() => setFocusHotspot(hotspotId), empireId !== viewerEmpire.id ? 1600 : 50);
    },
    [selectEmpire, viewerEmpire.id],
  );

  return (
    <div
      className="flex min-h-screen flex-col bg-paper"
      style={{ "--banner-h": creditsOpen ? "40px" : "0px" } as React.CSSProperties}
    >
      {creditsOpen && <Banner onDismiss={dismissCredits} />}
      <Header onSearchOpen={() => setSearchOpen(true)} onMenuOpen={() => setMenuOpen(true)} onNav={onNav} activeNav={activeNav} />

      {/* main stage — sized so the exploration cards below stay in view, and
          the side panels scroll within it rather than stretching the page */}
      <div className="flex min-h-[62vh] gap-4 px-3 pb-3 pt-3 sm:min-h-[520px] sm:px-4 xl:h-[calc(100vh-188px-var(--banner-h,0px))] xl:min-h-[600px] xl:px-5">
        <aside className="hidden w-[268px] flex-none xl:flex">
          <EmpireLibrary empires={EMPIRES} activeId={viewerEmpire.id} favorites={favorites} onSelect={selectEmpire} onToggleFav={toggleFav} onViewAll={() => setSearchOpen(true)} onPrefetch={prefetch} />
        </aside>

        <main className="flex min-w-0 flex-1">
          <Viewer
            empire={viewerEmpire}
            onSwap={onSwap}
            reducedMotion={reducedMotion}
            animating={animating}
            focusHotspot={focusHotspot}
            onFocusHandled={() => setFocusHotspot(null)}
            onArtifacts={() => setModal("artifacts")}
            onTimeline={() => setModal("timeline")}
            onPrefetchReady={(fn) => { prefetchRef.current = fn; }}
          />
        </main>

        <aside className="hidden w-[330px] flex-none xl:flex">
          <InfoPanel
            empire={panelEmpire}
            animating={animating}
            onLesson={() => setModal("lesson")}
            onToggleAnimate={() => setAnimating((v) => !v)}
            onArtifacts={() => setModal("artifacts")}
            onQuiz={() => setModal("quiz")}
          />
        </aside>
      </div>

      {/* below xl the dwelling detail reads in the page flow, under the model
          and above the cards, rather than hiding behind a floating button */}
      <section className="px-3 pb-3 pt-1 sm:px-4 xl:hidden" aria-label="Selected dwelling">
        <InfoPanel
          empire={panelEmpire}
          flow
          animating={animating}
          onLesson={() => setModal("lesson")}
          onToggleAnimate={() => setAnimating((v) => !v)}
          onArtifacts={() => setModal("artifacts")}
          onQuiz={() => setModal("quiz")}
        />
      </section>

      {/* exploration cards — a grid at every size rather than a sideways
          scroller, which hid four of the five on a phone */}
      <section className="px-3 pb-6 pt-1 sm:px-4 xl:px-5" aria-label="Explore the dwelling">
        <BottomCards empire={panelEmpire} onOpen={(s) => setModal(s)} />
      </section>

      {/* mobile drawer: the same empire library as the desktop rail, plus the
          primary nav that the header hides below lg */}
      {menuOpen && (
        <div className="overlay-backdrop xl:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="flex h-full w-[min(320px,86vw)] flex-col bg-paper shadow-lift"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex flex-none items-center justify-between border-b border-line-warm px-4 py-3">
              <span className="font-display text-[1.15rem] font-bold text-ink">Empire Atlas</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-line-warm p-1.5 text-ink-muted transition-colors hover:text-ink"
                aria-label="Close menu"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-none flex-wrap gap-1.5 border-b border-line-warm px-3 py-3" aria-label="Primary">
              {NAV_ITEMS.map((n) => (
                <button
                  key={n.id}
                  className={`nav-item !py-2 !text-[0.82rem] ${activeNav === n.id ? "is-active" : ""}`}
                  onClick={() => { setMenuOpen(false); onNav(n.id); }}
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="min-h-0 flex-1 px-3 py-3">
              <EmpireLibrary
                empires={EMPIRES}
                activeId={viewerEmpire.id}
                favorites={favorites}
                onSelect={(id) => { setMenuOpen(false); selectEmpire(id); }}
                onToggleFav={toggleFav}
                onViewAll={() => { setMenuOpen(false); setSearchOpen(true); }}
                onPrefetch={prefetch}
              />
            </div>
          </div>
        </div>
      )}

      {/* modals */}
      {modal === "lesson" && <LessonModal empire={panelEmpire} onClose={() => setModal(null)} onQuiz={() => setModal("quiz")} />}
      {modal === "quiz" && <QuizModal key={panelEmpire.id} empire={panelEmpire} onClose={() => setModal(null)} />}
      {modal === "artifacts" && <ArtifactsModal empire={panelEmpire} onClose={() => setModal(null)} />}
      {modal === "timeline" && <TimelineModal empire={panelEmpire} onClose={() => setModal(null)} />}
      {(modal === "interior" || modal === "floorPlan" || modal === "dailyLife" || modal === "geography") && (
        <SectionModal empire={panelEmpire} section={modal} onClose={() => setModal(null)} />
      )}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} onPick={onSearchPick} />}
    </div>
  );
}
