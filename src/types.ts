import type { ReactNode } from "react";

import type * as Events from "./events.tsx";
import type { Progress } from "./progress.ts";

export interface LogEntry {
  date: Date;
  title: string;
}

/** One day of the simulation. */
export interface GameState {
  custom: boolean;
  day: number;
  infectionProbability: number;
  quarantineBreakProbability: number;
  contactsPerDay: number;
  budget: number;
  economy: number;
  social: number;
  healthcare: number;
  people: number;
  politics: number;
  icus: number;
  policeAuthority: number;
  detectionRate: number;
  penalty: number;
  gameOver: boolean;
  message: string | undefined;
  deathrattle: number;
  underControl: boolean;
  medicine: number;
  secondWave: boolean;
  dead: number;
  recovered: number;
  reported: number;
  vaccine: number;
  daysToWin: number;
  propagandaImage: string | undefined;
  win: boolean;
  bordersClosed: boolean;
  /** Agent flags (INFECTED, SICK, ...) per simulated person. */
  agents: Uint8Array;
  agentCount: number;
  sickDelays: Uint8Array;
  agentsAge: Uint8Array;
  log: LogEntry[];
  events?: GameEvent[];
  /** The action chosen on this day, set when the next day is played. */
  action?: GameAction | undefined;
  initialRecovered?: number;
  initialDead?: number;
  initialReported?: number;
  hospitalized?: number;
  infected?: number;
  quarantined?: number;
  sick?: number;
}

/** What an action effect may change. */
export type ActionTarget = GameState;

export type EventKey = keyof typeof Events;

type ActionReference = GameAction | (() => GameAction);

export interface ActionOptions {
  message?: string;
  strip?: string;
  requires?: ActionReference;
  excludes?: ActionReference;
  customFilter?: (state: GameState) => boolean;
  special?: boolean;
  event?: EventKey;
}

export interface GameAction extends ActionOptions {
  title: string;
  logEntry: string;
  effect: (state: ActionTarget) => void;
  secondWave?: boolean;
}

export interface EventOptions {
  image?: string;
  video?: string;
  imageWidth?: number;
  imageHeight?: number;
  content?: ReactNode;
  postAction?: (state: GameState) => void | Promise<void>;
}

export interface GameEvent extends EventOptions {
  title: string;
  logEntry: string;
  effect: (state: GameState) => void;
  secondWave?: boolean;
}

export type { Progress } from "./progress.ts";

export type UpdateProgress = (update: (progress: Progress) => Progress) => void;

/** A day of the chart: the game state plus the label on the X axis. */
export type ChartDatum = GameState & { name: string };

export type {
  LeaderboardEntry,
  LeaderboardRanking,
  Leaderboards,
} from "./leaderboards.ts";
