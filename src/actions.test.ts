import * as allActions from "./actions.ts";
import type { GameAction, GameState } from "./types.ts";

/* Every action effect must write only real GameState fields: a misspelt field
   (state.policits, state.bugdet) silently does nothing in the game. */
const stateKeys: (keyof GameState)[] = [
  "custom",
  "day",
  "infectionProbability",
  "quarantineBreakProbability",
  "contactsPerDay",
  "budget",
  "economy",
  "social",
  "healthcare",
  "people",
  "politics",
  "icus",
  "policeAuthority",
  "detectionRate",
  "penalty",
  "gameOver",
  "message",
  "deathrattle",
  "underControl",
  "medicine",
  "secondWave",
  "dead",
  "recovered",
  "reported",
  "vaccine",
  "daysToWin",
  "propagandaImage",
  "win",
  "bordersClosed",
  "agentCount",
  "events",
];

const guardedState = (): GameState => {
  const target = Object.fromEntries(
    stateKeys.map((k) => [k, 5])
  ) as unknown as GameState;
  return new Proxy(target, {
    set(obj, key, value) {
      if (!(key in obj)) {
        throw new Error(`writes unknown state field "${String(key)}"`);
      }
      return Reflect.set(obj, key, value);
    },
  });
};

const actions = Object.entries(allActions).filter(
  (entry): entry is [string, GameAction] =>
    typeof entry[1] === "object" && entry[1] !== null && "effect" in entry[1]
);

test("there are actions to check", () => {
  expect(actions.length).toBeGreaterThan(400);
});

test.each(actions)("%s writes only GameState fields", (_name, action) => {
  expect(() => action.effect(guardedState())).not.toThrow();
});
