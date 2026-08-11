import type { Empire } from "@/types/empire";
import { roman } from "./empires/roman";
import { egypt } from "./empires/egypt";
import { persian } from "./empires/persian";
import { han } from "./empires/han";
import { byzantine } from "./empires/byzantine";
import { ottoman } from "./empires/ottoman";
import { mughal } from "./empires/mughal";
import { inca } from "./empires/inca";

export const EMPIRES: Empire[] = [roman, egypt, persian, han, byzantine, ottoman, mughal, inca];

export const empireById = (id: string): Empire => EMPIRES.find((e) => e.id === id) ?? EMPIRES[0];

export const DEFAULT_EMPIRE_ID = "roman";

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

/** Global search index built from the dataset */
export interface SearchEntry {
  kind: "empire" | "dwelling" | "feature" | "room" | "artifact" | "material";
  title: string;
  subtitle: string;
  empireId: string;
  hotspotId?: string;
}

export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const e of EMPIRES) {
    out.push({ kind: "empire", title: e.name, subtitle: `${e.dwelling} — ${e.subtitle}`, empireId: e.id });
    out.push({ kind: "dwelling", title: e.dwelling, subtitle: `Dwelling of ${e.name}`, empireId: e.id });
    for (const h of e.hotspots)
      out.push({ kind: "feature", title: h.title, subtitle: `${e.dwelling} · ${h.short}`, empireId: e.id, hotspotId: h.id });
    for (const r of e.floorPlan.rooms)
      out.push({ kind: "room", title: r.name, subtitle: `${e.dwelling} floor plan`, empireId: e.id });
    for (const a of e.artifacts.items)
      out.push({ kind: "artifact", title: a.name, subtitle: `${e.dwelling} · ${a.purpose}`, empireId: e.id });
    for (const k of e.keywords)
      out.push({ kind: "material", title: k, subtitle: `Related to ${e.name}`, empireId: e.id });
  }
  return out;
}
