import { parseProgress } from "./progress.ts";

test("missing progress gives the defaults", () => {
  expect(parseProgress(null)).toEqual({});
});

test("broken JSON gives the defaults", () => {
  expect(parseProgress("{not json")).toEqual({});
});

test("a value that is not an object gives the defaults", () => {
  expect(parseProgress("42")).toEqual({});
  expect(parseProgress("null")).toEqual({});
});

test("valid progress is kept", () => {
  const progress = {
    won: 2,
    lost: 1,
    games: 3,
    unlockedActions: ["a1"],
    unlockedEvents: ["e0"],
    unlockedStripes: ["r5"],
  };

  expect(parseProgress(JSON.stringify(progress))).toEqual(progress);
});

test("an invalid field is dropped and the rest is kept", () => {
  const result = parseProgress(
    JSON.stringify({ won: "many", lost: 1, unlockedActions: [1, 2] })
  );

  expect(result.won).toBeUndefined();
  expect(result.unlockedActions).toBeUndefined();
  expect(result.lost).toBe(1);
});
