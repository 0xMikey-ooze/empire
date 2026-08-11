import { memo } from "react";
import { CloseIcon, ArrowRightIcon } from "./icons";

interface Props {
  onDismiss: () => void;
}

export const TRIPO_URL = "https://studio.tripo3d.com/?utm_source=brand&utm_medium=creator&utm_campaign=suj";

/** A single line of credit above the header, dismissible for good. */
export const Banner = memo(function Banner({ onDismiss }: Props) {
  return (
    <div
      className="relative z-50 flex flex-none items-center justify-center gap-x-3 gap-y-1 border-b border-line-strong bg-cream px-11 py-2 text-center xl:h-10 xl:py-0"
      role="region"
      aria-label="Credits"
    >
      <p className="text-[0.78rem] leading-snug text-ink-soft sm:text-[0.82rem]">
        Every 3D model in this atlas was built with{" "}
        <span className="font-medium text-ink">Tripo AI</span>.
        <a
          href={TRIPO_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-1.5 inline-flex items-center gap-1 font-medium text-terracotta underline decoration-terracotta-soft decoration-1 underline-offset-2 transition-colors hover:text-terracotta-deep"
        >
          Take a look
          <ArrowRightIcon className="h-3 w-3" aria-hidden />
        </a>
      </p>

      <button
        onClick={onDismiss}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink"
        aria-label="Dismiss credits"
      >
        <CloseIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
});
