import assert from "node:assert";
import test from "node:test";
import { getLongestStreak } from "./common.mjs";

test("returns longest streak of 3", () => {
  const events = [
    { song_id: "a" },
    { song_id: "a" },
    { song_id: "b" },
    { song_id: "b" },
    { song_id: "b" }
  ];

  assert.deepStrictEqual(
    getLongestStreak(events),
    {
      songID: "b",
      length: 3
    }
  );
});

test("returns longest streak of 2", () => {
  const events = [
    { song_id: "x" },
    { song_id: "x" },
    { song_id: "y" }
  ];

  assert.deepStrictEqual(
    getLongestStreak(events),
    {
      songID: "x",
      length: 2
    }
  );
});