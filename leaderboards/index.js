import express from "express";
import { promises } from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import partition from "@sandstreamdev/std/array/partition.js";
import take from "@sandstreamdev/std/array/take.js";

const { readFile, writeFile } = promises;

const PORT = 8080;
const SNAPSHOT_FILE_PATH = "snapshot.json";
const LIMIT = 100;

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json());

const allowedOrigins = [
  "https://koronakrulow.pl",
  "https://ciunkos.github.io",
  "http://localhost:3000",
];

const crossOriginMessage = (origin) =>
  `The CORS policy for this site does not allow access from the specified origin (${origin}).`;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (!allowedOrigins.includes(origin)) {
        return callback(new Error(crossOriginMessage(origin)), false);
      }

      return callback(null, true);
    },
  })
);

let store = [];

const byWon = ({ won }) => won;
const partitionByWon = partition(byWon);

const filterName = ({ name, ...rest }) => ({
  name: name
    .replace(/(j)(eba)([cćlł])/gi, "$1***$3")
    .replace(/(k)(urw)([eęyo])/gi, "$1***$3"),
  ...rest,
});

app.get("/", (_, res) => {
  const now = new Date();
  now.setHours(now.getHours() - now.getTimezoneOffset() / 60);
  const [date] = now.toISOString().split("T");

  const rangeLow = new Date(`${date}T00:00:00.000`);
  const rangeHigh = new Date(`${date}T24:00:00.000`);

  const allTime = [...store].sort((a, b) => a.day - b.day);

  const daily = allTime.filter((x) => {
    const date = new Date(x.date);

    return date >= rangeLow && date < rangeHigh;
  });

  const [allTimeLost, allTimeWon] = partitionByWon(allTime);
  const [dailyLost, dailyWon] = partitionByWon(daily);

  const takeLimit = take(LIMIT);

  const result = {
    allTime: {
      lost: takeLimit(allTimeLost).map(filterName),
      won: takeLimit(allTimeWon).map(filterName),
    },
    daily: {
      lost: takeLimit(dailyLost).map(filterName),
      won: takeLimit(dailyWon).map(filterName),
    },
  };

  res.status(200).send(result);
});

app.post("/", async (req, res) => {
  try {
    const {
      body: { custom = false, day, dead, name, recovered, reported, won },
    } = req;

    if (
      typeof custom !== "boolean" ||
      typeof won !== "boolean" ||
      typeof reported !== "number" ||
      typeof dead !== "number" ||
      typeof recovered !== "number" ||
      typeof day !== "number" ||
      typeof name !== "string"
    ) {
      console.error({ day, dead, name, recovered, reported, won });
      throw new TypeError("Some field is of a wrong type.");
    }

    if (
      reported < 0 ||
      !Number.isInteger(reported) ||
      dead < 0 ||
      !Number.isInteger(dead) ||
      recovered < 0 ||
      !Number.isInteger(recovered) ||
      day < 0 ||
      !Number.isInteger(day)
    ) {
      throw new TypeError("Some number field is negative or not an integer.");
    }

    if (name.length === 0 || name.length > 18) {
      throw new TypeError("Name is empty or too long.");
    }

    const entry = {
      custom,
      date: new Date(),
      day,
      dead,
      name,
      recovered,
      reported,
      won,
    };

    store.push(entry);

    const serializedSnapshot = JSON.stringify(store);
    console.log("Trying to save snapshot file...");
    await writeFile(SNAPSHOT_FILE_PATH, serializedSnapshot, {
      encoding: "utf8",
    });
    console.log("Snapshot file saved.");

    res.status(200).send(entry);
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request");
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error instanceof SyntaxError) {
    res.status(400).send("Bad request");
  } else {
    res.status(500).send("Internal server error");
  }
});

const main = async () => {
  try {
    console.log("Trying to load snapshot file...");
    const serializedSnapshot = await readFile(SNAPSHOT_FILE_PATH, {
      encoding: "utf8",
    });
    console.log("Snapshot file loaded.");
    const snapshot = JSON.parse(serializedSnapshot);

    store = snapshot;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Snapshot file does not exist.");
    } else {
      console.error(error);
      throw error;
    }
  }

  app.listen(PORT, () =>
    console.log(`Leaderboards server started on port ${PORT}`)
  );
};

main();
