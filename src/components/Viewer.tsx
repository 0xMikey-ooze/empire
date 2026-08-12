import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { Empire } from "@/types/empire";
import { EXHIBITS } from "@/data";
import { ViewerEngine } from "@/three/engine";
import { HotspotLayer } from "./HotspotLayer";
import { shouldPresentSelection } from "./viewer-selection";
import {
  RotateIcon,
  ZoomInIcon,
  ZoomOutIcon,
  PanIcon,
  LayersIcon,
  VaseIcon,
  TimelineIcon,
  ResetIcon,
  BulbIcon,
  CloseIcon,
  GridIcon,
  WireIcon,
  XrayIcon,
  EyeIcon,
  CheckIcon,
} from "./icons";

interface ViewerProps {
  empire: Empire; // the empire the viewer should display
  selectionRevision: number; // increments even when the same exhibit is selected again
  onSwap: (e: Empire) => void; // called mid-transition: panels should update
  reducedMotion: boolean;
  animating: boolean;
  focusHotspot: HotspotFocusRequest | null;
  onFocusHandled: () => void;
  onArtifacts: () => void;
  onTimeline: () => void;
  /** hands the parent a way to warm a dwelling before it is picked */
  onPrefetchReady?: (prefetch: (e: Empire) => void) => void;
}

export interface HotspotFocusRequest {
  empireId: string;
  hotspotId: string;
}

type ToolMode = "rotate" | "pan";

export const Viewer = memo(function Viewer({
  empire,
  selectionRevision,
  onSwap,
  reducedMotion,
  animating,
  focusHotspot,
  onFocusHandled,
  onArtifacts,
  onTimeline,
  onPrefetchReady,
}: ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ViewerEngine | null>(null);
  const currentEmpireRef = useRef<Empire | null>(null);
  const [engineReady, setEngineReady] = useState(false);
  const [markersVisible, setMarkersVisible] = useState(false);
  const [loading, setLoading] = useState<{ name: string; pct: number } | null>(null);
  const [loadError, setLoadError] = useState<{ name: string } | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [tool, setTool] = useState<ToolMode>("rotate");
  const [layersOpen, setLayersOpen] = useState(false);
  const [pointsOpen, setPointsOpen] = useState(false);
  const [inspecting, setInspecting] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(() => new Set());
  const layersRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState({ labels: true, grid: false, wire: false, xray: false });
  const [tipVisible, setTipVisible] = useState(true);
  const requestRef = useRef(0);
  const handledSelectionRevision = useRef(selectionRevision);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeHs = empire.hotspots.find((h) => h.id === activeId) ?? null;

  /* ── engine lifecycle ── */
  useEffect(() => {
    const engine = new ViewerEngine(canvasRef.current!);
    engineRef.current = engine;
    let cancelled = false;
    engine.init().then(async () => {
      if (cancelled) return;
      engine.setReducedMotion(reducedMotion);
      engine.onLoadProgress = (pct) => {
        setLoading((l) => (l ? { ...l, pct } : null));
      };
      setEngineReady(true);
      onPrefetchReady?.((e) => engine.preload(e));
      await presentEmpire(empire, { initial: true });
    });
    return () => {
      cancelled = true;
      engine.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engineRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    engineRef.current?.setAutoRotate(animating);
  }, [animating]);

  useEffect(() => {
    engineRef.current?.setPanMode(tool === "pan");
  }, [tool]);

  /* dismiss the layers menu on an outside click, or on Escape */
  useEffect(() => {
    if (!layersOpen && !pointsOpen) return;
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (layersOpen && !layersRef.current?.contains(target)) setLayersOpen(false);
      if (pointsOpen && !pointsRef.current?.contains(target)) setPointsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLayersOpen(false);
        setPointsOpen(false);
      }
    };
    // capture, so the menu closes even when the click lands on the canvas,
    // which stops propagation for its own orbit handling
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [layersOpen, pointsOpen]);

  /* ── empire switching ── */
  /* Every request gets a token. A newer request supersedes an older one at
     any point — while its model is still downloading, or mid-animation — so
     rapid clicking always lands on the last dwelling picked instead of
     dropping the clicks that arrive during a swap. */
  const presentEmpire = useCallback(
    async (next: Empire, opts: { initial?: boolean; force?: boolean } = {}) => {
      const engine = engineRef.current;
      if (!engine) return;
      if (currentEmpireRef.current?.id === next.id && !opts.initial && !opts.force) return;
      const token = ++requestRef.current;
      currentEmpireRef.current = next;
      setLoadError(null);
      engine.setXray(false);
      setLayers((previous) =>
        previous.xray ? { ...previous, xray: false } : previous,
      );
      setActiveId(null);
      setHoverId(null);
      setInspecting(false);
      setPointsOpen(false);
      setVisited(new Set());
      setMarkersVisible(false);

      // loading state if the fetch is slow
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
      loadingTimer.current = setTimeout(() => {
        if (token === requestRef.current) setLoading({ name: next.dwelling, pct: 8 });
      }, 400);
      const model = await engine.load(next).catch((e) => {
        console.error("model load failed", e);
        return null;
      });
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
      if (token !== requestRef.current) return; // a newer pick won while loading
      setLoading(null);
      if (!model) {
        setLoadError({ name: next.dwelling });
        return;
      }

      // the engine drives the exchange; panels flip at the handover so copy
      // and geometry change on the same beat
      await engine.transition(model, next, {
        instant: opts.initial,
        onMidpoint: () => {
          if (token === requestRef.current) onSwap(next);
        },
      });
      if (token !== requestRef.current) return; // superseded mid-animation

      setMarkersVisible(true);

      // warm the neighbours so the next pick is already in memory
      const idx = EXHIBITS.findIndex((e) => e.id === next.id);
      window.setTimeout(() => {
        if (token !== requestRef.current) return;
        engine.preload(EXHIBITS[(idx + 1) % EXHIBITS.length]);
        engine.preload(EXHIBITS[(idx - 1 + EXHIBITS.length) % EXHIBITS.length]);
      }, 1200);
    },
    [onSwap],
  );

  /* Every user selection has a revision, including re-selecting the active
     row. Retry only when that exhibit is not actually mounted. */
  useEffect(() => {
    if (!engineReady || handledSelectionRevision.current === selectionRevision) return;
    handledSelectionRevision.current = selectionRevision;
    if (shouldPresentSelection(empire.id, engineRef.current?.currentModel?.empireId)) {
      void presentEmpire(empire, { force: true });
    }
  }, [empire, engineReady, presentEmpire, selectionRevision]);

  /* external hotspot focus (from search) */
  useEffect(() => {
    if (!focusHotspot || !markersVisible) return;
    if (focusHotspot.empireId !== empire.id) return;
    if (engineRef.current?.currentModel?.empireId !== focusHotspot.empireId) return;

    if (empire.hotspots.some((hotspot) => hotspot.id === focusHotspot.hotspotId)) {
      setActiveId(focusHotspot.hotspotId);
    }
    onFocusHandled();
  }, [empire, focusHotspot, markersVisible, onFocusHandled]);

  /* camera + highlight follow the active marker */
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || !engineReady) return;
    if (activeHs) {
      engine.focusAnchor(activeHs.anchor, empire);
      engine.setHighlight(activeHs.anchor);
    } else {
      engine.setHighlight(null);
    }
  }, [activeId, engineReady]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!activeId) return;
    setVisited((previous) => {
      if (previous.has(activeId)) return previous;
      const next = new Set(previous);
      next.add(activeId);
      return next;
    });
  }, [activeId]);

  const resetView = useCallback(() => {
    setActiveId(null);
    setInspecting(false);
    engineRef.current?.setXray(layers.xray);
    engineRef.current?.frameEmpire(empire, true);
    setTool("rotate");
  }, [empire, layers.xray]);

  const toggleInspection = useCallback(() => {
    if (!empire.inspection) return;
    const next = !inspecting;
    setInspecting(next);
    setActiveId(null);
    const engine = engineRef.current;
    if (!engine) return;
    engine.setXray(next || layers.xray);
    if (next) engine.inspectEmpire(empire);
    else engine.frameEmpire(empire, true);
  }, [empire, inspecting, layers.xray]);

  /* layer toggles */
  const toggleLayer = (key: "labels" | "grid" | "wire" | "xray") => {
    const next = { ...layers, [key]: !layers[key] };
    setLayers(next);
    const engine = engineRef.current;
    if (!engine) return;
    if (key === "grid") engine.setGrid(next.grid);
    if (key === "wire") engine.setWireframe(next.wire);
    if (key === "xray") engine.setXray(next.xray || inspecting);
  };

  const LAYER_ITEMS: { key: "labels" | "grid" | "wire" | "xray"; label: string; icon: typeof GridIcon }[] = [
    { key: "labels", label: "Hotspot pins", icon: EyeIcon },
    { key: "grid", label: "Turntable grid", icon: GridIcon },
    { key: "wire", label: "Wireframe", icon: WireIcon },
    { key: "xray", label: "X-ray section", icon: XrayIcon },
  ];

  return (
    <div className="atlas-card relative h-full w-full overflow-hidden" data-panel="viewer">
      <div
        ref={containerRef}
        className="viewer-stage absolute inset-0"
        role="application"
        aria-label={`Interactive 3D viewer. Use arrow keys to rotate the ${empire.dwelling}, plus and minus to zoom.`}
        tabIndex={0}
        onKeyDown={(e) => {
          const eng = engineRef.current;
          if (!eng) return;
          const step = e.shiftKey ? 18 : 8;
          if (e.key === "ArrowLeft") eng.nudge(-step, 0);
          else if (e.key === "ArrowRight") eng.nudge(step, 0);
          else if (e.key === "ArrowUp") eng.nudge(0, step * 0.6);
          else if (e.key === "ArrowDown") eng.nudge(0, -step * 0.6);
          else if (e.key === "+" || e.key === "=") eng.zoomBy(0.85);
          else if (e.key === "-" || e.key === "_") eng.zoomBy(1.18);
          else if (e.key === "Home") resetView();
          else return;
          e.preventDefault();
        }}
      >
        <canvas ref={canvasRef} className="block h-full w-full touch-none" aria-label={`3D model of the ${empire.dwelling}`} />
        {/* holds the outgoing frame still while the next dwelling takes its
            place underneath, so a swap dissolves instead of blinking */}
      </div>

      {/* pins fixed to the dwelling */}
      <HotspotLayer
        engine={engineReady ? engineRef.current : null}
        empire={empire}
        containerRef={containerRef}
        activeId={activeId}
        hoverId={hoverId}
        onHover={setHoverId}
        onActivate={setActiveId}
        visible={markersVisible && layers.labels}
        revealOccluded={inspecting}
      />

      {empire.inspection && (
        <div className="absolute left-[76px] top-3 z-30 md:left-[82px]">
          <div className="atlas-card flex items-center gap-1 !rounded-full p-1 shadow-card">
            <button
              className={`rounded-full px-3 py-1.5 text-[0.78rem] font-semibold transition-colors ${!inspecting ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"}`}
              onClick={() => inspecting && toggleInspection()}
              aria-pressed={!inspecting}
            >
              Exterior
            </button>
            <button
              className={`rounded-full px-3 py-1.5 text-[0.78rem] font-semibold transition-colors ${inspecting ? "bg-terracotta text-white" : "text-ink-soft hover:bg-paper-deep"}`}
              onClick={() => !inspecting && toggleInspection()}
              aria-pressed={inspecting}
            >
              {empire.inspection.label}
            </button>
          </div>
        </div>
      )}

      <div className="absolute right-3 top-14 z-30 sm:top-3" ref={pointsRef}>
        <button
          className="atlas-card flex items-center gap-2 !rounded-full px-3 py-2 text-[0.78rem] font-semibold text-ink shadow-card"
          onClick={() => setPointsOpen((open) => !open)}
          aria-expanded={pointsOpen}
          aria-controls="learning-points"
        >
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1 text-[0.66rem] text-white">{visited.size}/{empire.hotspots.length}</span>
          Learning points
        </button>
        {pointsOpen && (
          <div id="learning-points" className="atlas-card mt-2 max-h-[min(420px,70vh)] w-[min(310px,calc(100vw-24px))] overflow-y-auto !rounded-2xl p-2" role="menu">
            <div className="px-2 pb-2 pt-1">
              <div className="kicker !text-[0.6rem] !text-terracotta">All model points</div>
              <p className="mt-1 text-[0.76rem] leading-snug text-ink-muted">Choose any point to move the camera and open its grounded explanation.</p>
            </div>
            {empire.hotspots.map((hotspot, index) => (
              <button
                key={hotspot.id}
                role="menuitem"
                className={`flex w-full items-start gap-2 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-paper-deep ${activeId === hotspot.id ? "bg-paper-deep" : ""}`}
                onClick={() => {
                  setActiveId(hotspot.id);
                  setPointsOpen(false);
                }}
              >
                <span className={`mt-0.5 grid h-5 min-w-5 place-items-center rounded-full text-[0.65rem] font-bold ${visited.has(hotspot.id) ? "bg-terracotta text-white" : "border border-line-strong text-ink-muted"}`}>{index + 1}</span>
                <span>
                  <span className="block text-[0.8rem] font-semibold text-ink">{hotspot.title}</span>
                  <span className="mt-0.5 block text-[0.7rem] leading-snug text-ink-muted">{hotspot.short}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── tool rail ── */}
      <div className="absolute left-2 top-1/2 z-30 -translate-y-1/2 md:left-3" role="toolbar" aria-label="Model tools" aria-orientation="vertical">
        {/* px keeps the active pill clear of the rail's own edges */}
        <div className="atlas-card flex w-[46px] flex-col items-center gap-0.5 !rounded-2xl px-1.5 py-2 sm:w-[58px] md:w-[68px] md:px-2 md:py-2.5">
          <button className={`tool-btn ${tool === "rotate" ? "is-on" : ""}`} onClick={() => setTool("rotate")} aria-pressed={tool === "rotate"}>
            <RotateIcon />
            <span>Rotate</span>
          </button>
          <button className={`tool-btn ${tool === "pan" ? "is-on" : ""}`} onClick={() => setTool(tool === "pan" ? "rotate" : "pan")} aria-pressed={tool === "pan"}>
            <PanIcon />
            <span>Pan</span>
          </button>
          {/* zoom acts on the camera directly rather than arming a mode, so it
              takes two plain buttons instead of a toggle that hides them */}
          <button className="tool-btn" onClick={() => engineRef.current?.zoomBy(0.78)}>
            <ZoomInIcon />
            <span>Zoom in</span>
          </button>
          <button className="tool-btn" onClick={() => engineRef.current?.zoomBy(1.28)}>
            <ZoomOutIcon />
            <span>Zoom out</span>
          </button>
          <div className="relative" ref={layersRef}>
            <button className={`tool-btn ${layersOpen ? "is-on" : ""}`} onClick={() => setLayersOpen((v) => !v)} aria-expanded={layersOpen} aria-haspopup="true">
              <LayersIcon />
              <span>Layers</span>
            </button>
            {layersOpen && (
              <div className="atlas-card absolute left-[70px] top-0 z-40 w-[168px] !rounded-xl p-1.5" role="menu">
                {LAYER_ITEMS.map((it) => (
                  <button
                    key={it.key}
                    role="menuitemcheckbox"
                    aria-checked={layers[it.key]}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[0.8rem] text-ink-soft transition-colors hover:bg-paper-deep"
                    onClick={() => toggleLayer(it.key)}
                  >
                    <it.icon className="h-4 w-4 text-slateblue" />
                    <span className="flex-1">{it.label}</span>
                    {layers[it.key] && <CheckIcon className="h-3.5 w-3.5 text-terracotta" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="tool-btn" onClick={onArtifacts}>
            <VaseIcon />
            <span>Artifacts</span>
          </button>
          <button className="tool-btn" onClick={onTimeline}>
            <TimelineIcon />
            <span>Timeline</span>
          </button>
          <div className="my-1 h-px w-9 bg-line-warm" />
          <button className="tool-btn" onClick={resetView}>
            <ResetIcon />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* ── active hotspot detail card ── */}
      {activeHs && (
        <div
          className="atlas-card absolute bottom-4 left-1/2 z-30 w-[min(430px,calc(100%-140px))] -translate-x-1/2 !rounded-2xl p-4"
          role="dialog"
          aria-label={activeHs.title}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="kicker !text-[0.62rem] !text-terracotta">{activeHs.category.replace("-", " ")}</div>
              <h3 className="font-display mt-0.5 text-[1.25rem] font-bold leading-tight text-ink">{activeHs.title}</h3>
            </div>
            <button className="rounded-md p-1 text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink" onClick={() => setActiveId(null)} aria-label="Close detail">
              <CloseIcon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
            </button>
          </div>
          <p className="font-display mt-2 text-[0.98rem] italic leading-snug text-ink-muted">{activeHs.short}</p>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-soft">{activeHs.detail}</p>
          {inspecting && empire.inspection && (
            <p className="mt-2 border-t border-line-warm pt-2 text-[0.68rem] italic leading-snug text-ink-muted">
              {empire.inspection.disclosure}
            </p>
          )}
        </div>
      )}

      {inspecting && empire.inspection && !activeHs && (
        <div className="atlas-card absolute bottom-4 left-1/2 z-30 w-[min(470px,calc(100%-140px))] -translate-x-1/2 !rounded-2xl p-3.5" role="status">
          <div className="kicker !text-[0.6rem] !text-terracotta">{empire.inspection.title}</div>
          <p className="mt-1 text-[0.8rem] leading-snug text-ink-soft">{empire.inspection.description}</p>
          <p className="mt-1.5 border-t border-line-warm pt-1.5 text-[0.68rem] italic leading-snug text-ink-muted">{empire.inspection.disclosure}</p>
        </div>
      )}

      {/* ── tip card ── */}
      {tipVisible && !activeHs && (
        <div className="absolute bottom-4 right-4 z-30 hidden w-[210px] rounded-2xl border border-line-strong bg-[#efe4cf] p-3.5 shadow-card md:block">
          <div className="flex items-center justify-between">
            <span className="font-display flex items-center gap-1.5 text-[0.95rem] font-bold text-ink">
              <BulbIcon className="h-4 w-4 text-gold" />
              Tip
            </span>
            <button className="rounded p-0.5 text-ink-muted transition-colors hover:text-ink" onClick={() => setTipVisible(false)} aria-label="Dismiss tip">
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="font-display mt-1.5 text-[0.88rem] italic leading-snug text-ink-soft">
            Drag to rotate. Scroll to zoom. Hover a pin on the building to read it.
          </p>
        </div>
      )}

      {/* ── loading experience ── */}
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-paper/85 backdrop-blur-[2px]" role="status" aria-live="polite">
          <div className="flex w-[240px] flex-col items-center text-center">
            <svg viewBox="0 0 120 120" className="loading-compass h-20 w-20 text-terracotta" aria-hidden>
              <g fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="60" cy="60" r="46" opacity="0.4" />
                <circle cx="60" cy="60" r="34" opacity="0.25" />
                <path d="M60 14v10M60 96v10M14 60h10M96 60h10" />
                <path d="M60 24l7 36-7 36-7-36 7-36z" fill="currentColor" stroke="none" opacity="0.8" />
                <path d="M24 60l36-7 36 7-36 7-36-7z" fill="currentColor" stroke="none" opacity="0.3" />
              </g>
            </svg>
            <svg viewBox="0 0 160 40" className="mt-3 w-[150px] text-ink-muted" aria-hidden>
              <path className="loading-line" d="M10 34 L50 34 L60 18 L70 30 L80 10 L92 30 L102 18 L112 34 L150 34" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <h3 className="font-display mt-3 text-[1.25rem] font-bold text-ink">Loading {loading.name}</h3>
            <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-line-warm">
              <div className="h-full rounded-full bg-terracotta transition-all duration-300" style={{ width: `${loading.pct}%` }} />
            </div>
            <p className="loading-fact font-display mt-3 text-[0.85rem] italic text-ink-muted">Preparing the museum hall…</p>
          </div>
        </div>
      )}

      {loadError && !loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-paper/85 backdrop-blur-[2px]" role="alert">
          <div className="atlas-card w-[min(360px,calc(100%-32px))] !rounded-2xl p-5 text-center">
            <h3 className="font-display text-[1.2rem] font-bold text-ink">Could not load {loadError.name}</h3>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-muted">The model request failed. Check your connection and try again.</p>
            <button className="btn-primary mt-4" onClick={() => void presentEmpire(empire, { force: true })}>Retry model</button>
          </div>
        </div>
      )}
    </div>
  );
});
