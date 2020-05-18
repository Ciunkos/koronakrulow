export const LEADERBOARDS_ENDPOINT = "https://koronakrulow.pl/leaderboards/";

const KEY = "8955de21141f62d71ec533f864f23262192fb277bdf21e1d928bd519d79f5b05";

const SIGNATURE_ALGORITHM = "SHA-256";
const NONCE_BYTES = 16;

const hexString = (xs) =>
  xs.map((x) => ("00" + x.toString(16)).slice(-2)).join("");

const signatureHex = async (text) => {
  const bytes = new TextEncoder("utf-8").encode(text);
  const digest = await crypto.subtle.digest(SIGNATURE_ALGORITHM, bytes);

  const hexDigest = hexString(new Uint8Array(digest));

  return hexDigest;
};

const randomBytesHex = async (n) => {
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
}) => {
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
