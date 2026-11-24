import { submitLeaderboards } from "./leaderboards.ts";

const sha256Hex = async (text: string) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))
    ),
    (x) => x.toString(16).padStart(2, "0")
  ).join("");

/* The leaderboard server (leaderboards/index.js) recomputes the signature as
   sha256 hex of JSON.stringify({custom, day, dead, key, name, nonce,
   recovered, reported, won}) and rejects any mismatch. */
test("a submission carries a hex nonce and the signature the server expects", async () => {
  const sent: string[] = [];
  vi.stubGlobal("fetch", async (_url: string, init: RequestInit) => {
    sent.push(String(init.body));
    return new Response("{}");
  });
  await submitLeaderboards({
    custom: false,
    day: 42,
    dead: 7,
    name: "Gracz",
    recovered: 3,
    reported: 99,
    won: true,
  });
  vi.unstubAllGlobals();

  expect(sent).toHaveLength(1);
  const { signature, ...rest } = JSON.parse(sent[0] ?? "{}");
  expect(rest.nonce).toMatch(/^[0-9a-f]{32}$/);
  const { custom, day, dead, key, name, nonce, recovered, reported, won } =
    rest;
  const sourceBody = JSON.stringify({
    custom,
    day,
    dead,
    key,
    name,
    nonce,
    recovered,
    reported,
    won,
  });
  expect(signature).toBe(await sha256Hex(sourceBody));
});
