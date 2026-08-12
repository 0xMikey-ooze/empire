import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { babylon } from "../src/data/empires/babylon";
import { covenant } from "../src/data/empires/covenant";
import { noah } from "../src/data/empires/noah";
import { tabernacle } from "../src/data/empires/tabernacle";
import { temple } from "../src/data/empires/temple";
import { DEFAULT_EXHIBIT_ID, EXHIBITS, exhibitAssetPaths } from "../src/data";

const exhibits = [noah, covenant, tabernacle, temple, babylon];

describe("biblical exhibits", () => {
  test("Bible Discovery contains only the five biblical exhibits", () => {
    expect(DEFAULT_EXHIBIT_ID).toBe("noah");
    expect(EXHIBITS.map((exhibit) => exhibit.id)).toEqual(["noah", "covenant", "tabernacle", "temple", "babylon"]);
    expect(EXHIBITS.every((exhibit) => exhibit.kind !== "civilization")).toBe(true);
  });

  test("every exhibit exposes an inspection view and a complete clickable point list", () => {
    for (const exhibit of exhibits) {
      expect(exhibit.kind).not.toBe("civilization");
      expect(exhibit.inspection).toBeDefined();
      expect(exhibit.hotspots.length).toBeGreaterThanOrEqual(6);
      expect(new Set(exhibit.hotspots.map((hotspot) => hotspot.id)).size).toBe(exhibit.hotspots.length);
    }
  });

  test("every exhibit's model and illustration paths resolve to shipped assets", () => {
    for (const exhibit of exhibits) {
      for (const assetPath of exhibitAssetPaths(exhibit)) {
        const assetUrl = new URL(`../public${assetPath}`, import.meta.url);
        expect(readFileSync(assetUrl).byteLength).toBeGreaterThan(0);
      }
    }
  });

  test("Noah's ark distinguishes singular wording from an exclusive count", () => {
    const door = noah.hotspots.find((hotspot) => hotspot.id === "door");

    expect(door?.detail).toContain("in the singular");
    expect(door?.detail).toContain("does not add the word");
    expect(door?.detail).toContain('"only."');
    expect(noah.inspection?.description).not.toContain("single side door");
    expect(noah.facts.find((fact) => fact.label === "Occupants")?.value).toContain("by sevens");
    expect(noah.floorPlan.image).toEndWith(".svg");
  });

  test("Noah's Hebrew word note does not turn typology into translation", () => {
    const pitch = noah.hotspots.find((hotspot) => hotspot.id === "pitch");
    const commentary = noah.lesson.blocks.find((block) => block.heading === "The library's commentary")?.body;
    const content = JSON.stringify(noah);

    expect(pitch?.detail).toContain("distinct terms");
    expect(pitch?.detail).toContain("typological commentary, not translation");
    expect(commentary).toContain("does not say gopher means atonement");
    expect(content).not.toContain("gopher' means atonement");
  });

  test("the Ark's staves remain with it when their ends become visible", () => {
    const staves = covenant.hotspots.find((hotspot) => hotspot.id === "staves");
    const covenantPlan = readFileSync(new URL("../public/img/covenant/floor-plan.svg", import.meta.url), "utf8");

    expect(staves?.detail).toContain("drawn forward");
    expect(staves?.detail).toContain("remained there");
    expect(JSON.stringify(covenant)).not.toContain("at last drawn out");
    expect(covenant.floorPlan.image).toEndWith(".svg");
    expect(covenantPlan.toLowerCase()).not.toContain("archive no");
  });

  test("the tabernacle board count includes both western corner boards", () => {
    const boards = tabernacle.hotspots.find((hotspot) => hotspot.id === "boards");

    expect(boards?.detail).toContain("two corner boards");
    expect(tabernacle.floorPlan.image).toEndWith(".svg");
  });

  test("Solomon's temple plan keeps porch and side chambers outside the 60 by 20 house", () => {
    const plan = readFileSync(new URL("../public/img/temple/floor-plan.svg", import.meta.url), "utf8");
    const chamberRear = Number(plan.match(/data-part="side-chambers" d="M(\d+)/)?.[1]);
    const houseRear = Number(plan.match(/data-part="house" x="(\d+)/)?.[1]);

    expect(temple.floorPlan.text).toContain("The house ran sixty cubits by twenty");
    expect(temple.floorPlan.image).toEndWith(".svg");
    expect(temple.inspection?.disclosure).toContain("not taken from Ezekiel");
    // The side chambers wrapped the house and oracle (1 Kings 6:5), so their
    // rear edge must extend beyond the house's rear wall in this plan.
    expect(chamberRear).toBeLessThan(houseRear);
  });

  test("Solomon's Temple evidence and furnishings match the cited record", () => {
    const materials = temple.facts.find((fact) => fact.label === "Materials")?.value;

    expect(materials).toContain("1 Kings 6:7, 15, 20, 23");
    expect(temple.artifacts.image).toBe("/img/temple/artifacts-v2.webp");
    expect(temple.artifacts.text).toContain("not a scale arrangement");
  });

  test("Daniel's image is presented as a material study, not an invented interior", () => {
    expect(babylon.kind).toBe("vision");
    expect(babylon.inspection?.mode).toBe("material-layers");
    expect(babylon.inspection?.disclosure).toContain("not dimensions");
    expect(babylon.inspection?.disclosure).toContain("interior");

    // The reconstruction stands off-centre on a broad pedestal. These points
    // must follow the camera sightline so they stay on the named body regions
    // instead of snapping to the pedestal's geometric centre.
    const bodyPoints = new Set(["breast", "belly", "legs", "feet", "toes"]);
    expect(
      babylon.hotspots
        .filter((hotspot) => bodyPoints.has(hotspot.id))
        .every((hotspot) => hotspot.snap === "view"),
    ).toBe(true);
  });

  test("Daniel explicitly names the king while Babylon remains a contextual connection", () => {
    const lesson = babylon.lesson.blocks.find((block) => block.heading === "The head of gold")?.body;
    const materialStudy = readFileSync(new URL("../public/img/babylon/floor-plan.svg", import.meta.url), "utf8");

    expect(lesson).toContain("explicitly identifies Nebuchadnezzar");
    expect(lesson).toContain("contextual inference");
    expect(lesson).not.toContain("named in the text itself");
    expect(babylon.floorPlan.image).toEndWith(".svg");
    expect(materialStudy).toContain("not an archaeological drawing, archival plate, or dated artifact");
    expect(materialStudy.toLowerCase()).not.toContain("18th century");
  });
});
