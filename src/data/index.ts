import type { Empire } from "@/types/empire";
import { noah } from "./empires/noah";
import { covenant } from "./empires/covenant";
import { tabernacle } from "./empires/tabernacle";
import { temple } from "./empires/temple";
import { babylon } from "./empires/babylon";
import { priest } from "./empires/priest";
import { courseOfTime } from "./empires/course-of-time";

export const EXHIBITS: Empire[] = [noah, covenant, tabernacle, priest, temple, babylon, courseOfTime];

export const exhibitById = (id: string): Empire => EXHIBITS.find((e) => e.id === id) ?? EXHIBITS[0];

export const DEFAULT_EXHIBIT_ID = "noah";

/** Resolve per-empire image paths (thumbnail derived from hero set) */
export const empireImages = (e: Empire) => ({
  thumbnail: `/img/${e.id}/thumbnail.webp`,
  hero: `/img/${e.id}/hero.webp`,
  interior: e.interior.image,
  floorPlan: e.floorPlan.image,
  artifacts: e.artifacts.image,
  dailyLife: e.dailyLife.image,
  map: e.geography.image,
});

/** Every static asset path an exhibit asks the client to load. */
export function exhibitAssetPaths(exhibit: Empire): string[] {
  return [exhibit.modelPath, ...Object.values(empireImages(exhibit))];
}

/** Global search index built from the dataset */
export interface SearchEntry {
  kind: "exhibit" | "feature" | "section" | "artifact" | "material";
  title: string;
  subtitle: string;
  empireId: string;
  hotspotId?: string;
}

export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const e of EXHIBITS) {
    out.push({ kind: "exhibit", title: e.name, subtitle: `${e.dwelling} — ${e.subtitle}`, empireId: e.id });
    for (const h of e.hotspots)
      out.push({ kind: "feature", title: h.title, subtitle: `${e.dwelling} · ${h.short}`, empireId: e.id, hotspotId: h.id });
    for (const r of e.floorPlan.rooms)
      out.push({ kind: "section", title: r.name, subtitle: `${e.dwelling} plan`, empireId: e.id });
    for (const a of e.artifacts.items)
      out.push({ kind: "artifact", title: a.name, subtitle: `${e.dwelling} · ${a.purpose}`, empireId: e.id });
    for (const k of e.keywords)
      out.push({ kind: "material", title: k, subtitle: `Related to ${e.name}`, empireId: e.id });
  }
  return out;
}
