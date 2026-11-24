import { playQuietly } from "./playQuietly.ts";

test("a blocked autoplay is swallowed instead of becoming an unhandled rejection", async () => {
  const player = {
    play: () =>
      Promise.reject(new DOMException("no user gesture", "NotAllowedError")),
  };
  await expect(playQuietly(player)).resolves.toBe(false);
});

test("a successful play resolves true and a missing player is ignored", async () => {
  await expect(playQuietly({ play: () => Promise.resolve() })).resolves.toBe(
    true
  );
  await expect(playQuietly(null)).resolves.toBe(false);
});
