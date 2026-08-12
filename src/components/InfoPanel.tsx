import { memo } from "react";
import type { Empire } from "@/types/empire";
import { empireImages } from "@/data";
import {
  LaurelIcon,
  MoreIcon,
  PeriodIcon,
  MapPinIcon,
  MaterialsIcon,
  FeatureIcon,
  OccupantsIcon,
  ArrowRightIcon,
  PlayIcon,
  VaseIcon,
  QuizIcon,
} from "./icons";

const FACT_ICONS = { period: PeriodIcon, region: MapPinIcon, materials: MaterialsIcon, feature: FeatureIcon, occupants: OccupantsIcon };

interface Props {
  empire: Empire;
  /** Laid out in the page flow rather than in the fixed-height desktop rail:
   *  the panel takes whatever height its content needs and scrolls with the
   *  page instead of inside itself. */
  flow?: boolean;
  animating: boolean;
  onLesson: () => void;
  onToggleAnimate: () => void;
  onArtifacts: () => void;
  onQuiz: () => void;
}

export const InfoPanel = memo(function InfoPanel({ empire, flow = false, animating, onLesson, onToggleAnimate, onArtifacts, onQuiz }: Props) {
  const selectionLabel =
    empire.kind === "vision"
      ? "Selected Vision"
      : empire.kind === "sacred-object"
        ? "Selected Sacred Object"
        : empire.kind === "biblical-structure"
          ? "Selected Structure"
          : "Selected Exhibit";

  return (
    <div
      className={`atlas-card flex w-full flex-col overflow-hidden ${flow ? "" : "h-full"}`}
      data-panel="info"
    >
      <div className={flow ? "px-5 pb-5 pt-5" : "atlas-scroll min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-5"}>
        {/* header */}
        <div className="flex items-center justify-between">
          <span className="kicker flex items-center gap-2">
            <LaurelIcon className="h-5 w-5 text-gold" aria-hidden />
            {selectionLabel}
          </span>
          <button className="rounded-md p-1 text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink" aria-label="More options">
            <MoreIcon className="h-5 w-5" />
          </button>
        </div>

        <h2 className="font-display mt-2 text-[1.9rem] font-bold leading-none text-ink">{empire.dwelling}</h2>
        <p className="font-display mt-1.5 text-[1.02rem] font-medium italic text-terracotta">{empire.subtitle}</p>

        {/* Stacked in the narrow desktop rail, but side by side once the
            panel runs the full width of the page — otherwise the illustration
            balloons to several hundred pixels tall and the prose runs to
            unreadably long lines. */}
        <div className={flow ? "sm:flex sm:items-start sm:gap-6" : ""}>
          {/* the illustration is the artefact here — show all of it rather
              than cropping it to a fixed ratio */}
          <div
            className={`relative mt-4 overflow-hidden rounded-xl border border-line-warm bg-paper-deep ${
              flow ? "sm:w-[44%] sm:flex-none" : ""
            }`}
          >
            <img
              src={empireImages(empire).hero}
              alt={`Illustration of the ${empire.dwelling}`}
              className="block h-auto w-full object-contain"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div className={flow ? "min-w-0 sm:flex-1" : ""}>
            <p className="font-display mt-4 text-[1.06rem] leading-[1.45] text-ink-soft">{empire.description}</p>

            {/* key facts */}
            <h3 className="kicker mt-5">Key Facts</h3>
            <dl className="mt-2 divide-y divide-line-warm/70">
              {empire.facts.map((f) => {
                const Icon = FACT_ICONS[f.icon];
                return (
                  <div key={f.label} className="flex items-center justify-between gap-3 py-[9px]">
                    <dt className="flex flex-none items-center gap-2.5 text-[0.86rem] font-medium text-ink-soft">
                      <Icon className="h-[17px] w-[17px] flex-none text-terracotta" aria-hidden />
                      {f.label}
                    </dt>
                    <dd className="min-w-0 max-w-[52%] text-right text-[0.85rem] leading-snug text-ink">{f.value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>

      {/* actions — pinned below the detail in the rail, and in the flow of the
          page when the panel is laid out inline */}
      <div className="flex-none space-y-2 border-t border-line-warm/70 px-4 pb-4 pt-3">
        <button className="btn-primary w-full !justify-between !py-2.5" onClick={onLesson}>
          <span className="pl-1">View Lesson</span>
          <ArrowRightIcon className="h-4 w-4" />
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className={`btn-outline !py-2.5 ${animating ? "!border-terracotta-soft !text-terracotta-deep !bg-[#fdf1e7]" : ""}`} onClick={onToggleAnimate} aria-pressed={animating}>
            <PlayIcon className="h-4 w-4" />
            {animating ? "Stop" : "Animate"}
          </button>
          <button className="btn-outline !py-2.5" onClick={onArtifacts}>
            <VaseIcon className="h-4 w-4" />
            Artifacts
          </button>
        </div>
        <button className="btn-outline w-full !py-2.5" onClick={onQuiz}>
          <QuizIcon className="h-4 w-4" />
          Quiz
        </button>
      </div>
    </div>
  );
});
