export const LEADERBOARDS_ENDPOINT = "https://koronakrulow.pl/leaderboards/";

export const submitLeaderboards = async ({
  custom,
  day,
  dead,
  name,
  recovered,
  reported,
  won,
}) => {
  const entry = { custom, day, dead, name, recovered, reported, won };
  const body = JSON.stringify(entry);

  try {
    await fetch(LEADERBOARDS_ENDPOINT, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
