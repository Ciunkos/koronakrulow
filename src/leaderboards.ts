import { z } from "zod/mini";

export const SHOW_LEADERBOARD = false;

export const LEADERBOARDS_ENDPOINT = "https://koronakrulow.pl/leaderboards/";

const KEY = "8955de21141f62d71ec533f864f23262192fb277bdf21e1d928bd519d79f5b05";

const SIGNATURE_ALGORITHM = "SHA-256";
const NONCE_BYTES = 16;

// The leaderboard server response (leaderboards/index.js GET /).
const LeaderboardEntrySchema = z.object({
  name: z.string(),
  day: z.number(),
  dead: z.number(),
  recovered: z.number(),
  reported: z.number(),
});

const LeaderboardRankingSchema = z.object({
  won: z.array(LeaderboardEntrySchema),
  lost: z.array(LeaderboardEntrySchema),
});

export const LeaderboardsSchema = z.object({
  daily: LeaderboardRankingSchema,
  allTime: LeaderboardRankingSchema,
});

export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

/** A ranking padded with empty slots (undefined) for display. */
export interface LeaderboardRanking {
  won: (LeaderboardEntry | undefined)[];
  lost: (LeaderboardEntry | undefined)[];
}

export interface Leaderboards {
  daily: LeaderboardRanking;
  allTime: LeaderboardRanking;
}

export interface LeaderboardSubmission {
  custom: boolean;
  day: number;
  dead: number;
  name: string;
  recovered: number;
  reported: number;
  won: boolean;
}

const hexString = (xs: Uint8Array) =>
  Array.from(xs, (x) => ("00" + x.toString(16)).slice(-2)).join("");

const signatureHex = async (text: string) => {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest(SIGNATURE_ALGORITHM, bytes);

  const hexDigest = hexString(new Uint8Array(digest));

  return hexDigest;
};

const randomBytesHex = async (n: number) => {
  const buffer = new Uint8Array(n);

  crypto.getRandomValues(buffer);

  return hexString(buffer);
};

export const submitLeaderboards = async ({
  custom,
  day,
  dead,
  name,
  recovered,
  reported,
  won,
}: LeaderboardSubmission) => {
  try {
    const nonce = await randomBytesHex(NONCE_BYTES);

    const entry = {
      custom,
      day,
      dead,
      key: KEY,
      name,
      nonce,
      recovered,
      reported,
      won,
    };

    const body = JSON.stringify(entry);
    const signature = await signatureHex(body);
    const signedBody = JSON.stringify({ ...entry, signature });

    await fetch(LEADERBOARDS_ENDPOINT, {
      method: "POST",
      body: signedBody,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
