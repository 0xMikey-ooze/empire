import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EMPIRES, empireById, empireImages, DEFAULT_EMPIRE_ID } from "@/data";
import type { Empire } from "@/types/empire";
import { Header } from "@/components/Header";
import { EmpireLibrary } from "@/components/EmpireLibrary";
import { Viewer } from "@/components/Viewer";
import { InfoPanel } from "@/components/InfoPanel";
import { BottomCards } from "@/components/BottomCards";
import { LessonModal, QuizModal, ArtifactsModal, TimelineModal, SectionModal, SearchOverlay } from "@/components/modals";
import { CloseIcon, HeartIcon } from "@/components/icons";

type ModalId = "lesson" | "quiz" | "artifacts" | "timeline" | "interior" | "floorPlan" | "dailyLife" | "geography" | null;

const mq = (q: string) => (typeof window !== "undefined" ? window.matchMedia(q).matches : false);

export default function App() {
  const [viewerEmpire, setViewerEmpire] = useState<Empire>(() => empireById(DEFAULT_EMPIRE_ID));
  const [panelEmpire, setPanelEmpire] = useState<Empire>(() => empireById(DEFAULT_EMPIRE_ID));
  const [modal, setModal] = useState<ModalId>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [focusHotspot, setFocusHotspot] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("explore");
  const [reducedMotion, setReducedMotion] = useState(() => mq("(prefers-reduced-motion: reduce)"));
  const [isNarrow, setIsNarrow] = useState(() => mq("(max-width: 1023px)"));
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("atlas-favs") ?? "[]"));
    } catch {
      return new Set();
    }
  });

  /* media listeners */
  useEffect(() => {
    const b = window.matchMedia("(max-width: 1023px)");
    const fb = () => setIsNarrow(b.matches);
    b.addEventListener("change", fb);
    return () => b.removeEventListener("change", fb);
  }, []);

  /* reduced motion class on body */
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

  const empireStrip = useMemo(
    () => (
      <div className="atlas-scroll flex gap-2 overflow-x-auto px-4 py-2 lg:hidden" role="listbox" aria-label="Empires">
        {EMPIRES.map((e) => (
          <button
            key={e.id}
            role="option"
            aria-selected={e.id === viewerEmpire.id}
            onClick={() => selectEmpire(e.id)}
            className={`flex flex-none items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 transition-colors ${
              e.id === viewerEmpire.id ? "border-terracotta-soft bg-cream" : "border-line-warm bg-surface"
            }`}
          >
            <img src={empireImages(e).thumbnail} alt="" className="h-7 w-7 rounded-full border border-line-warm object-cover" />
            <span className="font-display whitespace-nowrap text-[0.85rem] font-bold text-ink">{e.name}</span>
            {favorites.has(e.id) && <HeartIcon className="h-3 w-3 text-terracotta" filled />}
          </button>
        ))}
      </div>
    ),
    [viewerEmpire.id, favorites, selectEmpire],
  );

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Header onSearchOpen={() => setSearchOpen(true)} reducedMotion={reducedMotion} onToggleMotion={() => setReducedMotion((v) => !v)} onNav={onNav} activeNav={activeNav} />

      {empireStrip}

      {/* main stage — sized so the exploration cards below stay in view, and
          the side panels scroll within it rather than stretching the page */}
      <div className="flex min-h-[560px] gap-4 px-4 pb-3 pt-3 lg:h-[calc(100vh-188px)] lg:min-h-[600px] lg:px-5">
        <aside className="hidden w-[268px] flex-none lg:flex">
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

        <aside className="hidden w-[330px] flex-none lg:flex">
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

      {/* bottom educational cards — peeking below the stage, scroll for the rest */}
      <section className="hidden px-4 pb-5 pt-1 md:block lg:px-5" aria-label="Explore the dwelling">
        <BottomCards empire={panelEmpire} onOpen={(s) => setModal(s)} />
      </section>

      {/* mobile: horizontally scrolling cards */}
      <section className="atlas-scroll flex gap-3 overflow-x-auto px-4 pb-4 md:hidden" aria-label="Explore the dwelling">
        {(["interior", "floorPlan", "artifacts", "dailyLife", "geography"] as const).map((s) => (
          <button key={s} onClick={() => setModal(s)} className="atlas-card w-[150px] flex-none p-2 text-left">
            <img src={panelEmpire[s].image} alt="" className="h-[86px] w-full rounded-lg border border-line-warm object-cover" />
            <span className="font-display mt-1.5 block truncate text-[0.85rem] font-bold text-ink">{panelEmpire[s].title}</span>
            <span className="block truncate text-[0.68rem] text-ink-muted">{panelEmpire[s].kicker}</span>
          </button>
        ))}
      </section>

      {/* mobile details fab + sheet */}
      {isNarrow && (
        <>
          <button className="btn-primary fixed bottom-5 right-4 z-50 !rounded-full shadow-lift" onClick={() => setInfoOpen(true)} aria-haspopup="dialog">
            {panelEmpire.dwelling}
          </button>
          {infoOpen && (
            <div className="overlay-backdrop flex items-end" onClick={() => setInfoOpen(false)}>
              <div className="modal-panel max-h-[82vh] w-full overflow-hidden rounded-b-none" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <div className="flex justify-end p-2">
                  <button onClick={() => setInfoOpen(false)} className="rounded-lg border border-line-warm p-1.5 text-ink-muted" aria-label="Close details">
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
                <InfoPanel
                  empire={panelEmpire}
                  animating={animating}
                  onLesson={() => { setInfoOpen(false); setModal("lesson"); }}
                  onToggleAnimate={() => setAnimating((v) => !v)}
                  onArtifacts={() => { setInfoOpen(false); setModal("artifacts"); }}
                  onQuiz={() => { setInfoOpen(false); setModal("quiz"); }}
                />
              </div>
            </div>
          )}
        </>
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
