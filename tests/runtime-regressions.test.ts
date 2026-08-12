import { describe, expect, test } from "bun:test";
import { buildSearchIndex, EXHIBITS } from "../src/data";
import { noah } from "../src/data/empires/noah";
import { ViewerEngine } from "../src/three/engine";
import { shouldPresentSelection } from "../src/components/viewer-selection";

describe("runtime regressions", () => {
  test("a failed model request is removed from the cache so it can retry", async () => {
    const engine = new ViewerEngine({} as HTMLCanvasElement);
    let requests = 0;

    Reflect.set(engine, "loader", {
      load(
        _path: string,
        _onLoad: unknown,
        _onProgress: unknown,
        onError: (error: Error) => void,
      ) {
        requests += 1;
        onError(new Error("model unavailable"));
      },
    });

    await expect(engine.load(noah)).rejects.toThrow("model unavailable");
    await expect(engine.load(noah)).rejects.toThrow("model unavailable");
    expect(requests).toBe(2);
  });

  test("search lists each exhibit once while preserving both aliases", () => {
    const exhibitEntries = buildSearchIndex().filter((entry) => entry.kind === "exhibit");

    expect(exhibitEntries).toHaveLength(EXHIBITS.length);
    for (const exhibit of EXHIBITS) {
      const entry = exhibitEntries.find((candidate) => candidate.empireId === exhibit.id);
      expect(`${entry?.title} ${entry?.subtitle}`).toContain(exhibit.name);
      expect(`${entry?.title} ${entry?.subtitle}`).toContain(exhibit.dwelling);
    }
  });

  test("a repeated selection retries only when its model is not mounted", () => {
    expect(shouldPresentSelection("covenant", "noah")).toBe(true);
    expect(shouldPresentSelection("covenant", undefined)).toBe(true);
    expect(shouldPresentSelection("covenant", "covenant")).toBe(false);
  });
});
