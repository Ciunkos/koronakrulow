import { range, reverse, take, shuffle } from "@sandstreamdev/std/array";
import { classNames } from "@sandstreamdev/std/web";
import isFunction from "@sandstreamdev/std/is/function";
import { delay } from "@sandstreamdev/std/async";
import { clamp } from "@sandstreamdev/std/math";
import React, { useRef, useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import Map from "pigeon-maps";
import TransitiveNumber from "./TransitiveNumber";
import Infected from "./Infected";
import Dead from "./Dead";
import Recovered from "./Recovered";
import Log from "./Log";
import * as allActions from "./actions";
import * as events from "./events";
import * as stripes from "./stripes";
import * as randomStripes from "./random";
import formatLongDisplayDate from "./formatLongDisplayDate";
import actionLogo from "./actionLogo.png";
import Menu from "./Menu";
import Logo from "./Logo";
import randomPropaganda from "./randomPropaganda";
import useWindowSize from "./useWindowSize";
import { get, set } from "./localStorage";
import headlineImage from "./headline.jpg";
import headlineVideo from "./headline.mp4";
import music from "./the-descent-by-kevin-macleod-from-filmmusic-io.mp3";
import StatsRow from "./StatsRow";
import formatNumber from "./formatNumber";
import analytics from "./analytics";

import "./index.css";
import "./App.scss";
import "./Event.scss";
import "./Action.scss";
import "./Media.scss";

const trackTime = async () => {
  let i = 0;

  while (true) {
    i++;
    await delay(60000);
    analytics(`time-${i}`);
  }
};

trackTime();

let stopGameplayTimeTracking = false;

const trackGameplayTime = async () => {
  let i = 0;

  while (true) {
    i++;

    for (let i = 0; i < 60; i++) {
      if (stopGameplayTimeTracking) {
        stopGameplayTimeTracking = false;

        return;
      }

      await delay(1000);
    }

    analytics(`gameplay-${i}`);
  }
};

const CloseIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AGENT_LIMIT = 37734000;

const debug = false;

const daysToSickFunction = () => Math.round(5 + Math.random() * 8);

const startDate = new Date("2020-02-27T00:00:00.000");

// var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 19
// });

function mapTilerProvider(x, y, z, dpr) {
  const s = String.fromCharCode(97 + ((x + y + z) % 3));
  return `https://${s}.basemaps.cartocdn.com/dark_nolabels/${z}/${x}/${y}${
    dpr >= 2 ? "@2x" : ""
  }.png`;
}

const clampStat = clamp(0, 10);

class Agent {
  day = 0;
  infected = true;
  sick = false;
  reported = false;
  quarantined = false;
  hospitalized = false;
  recovered = false;
  vaccinated = false;

  constructor() {
    this.daysToSick = daysToSickFunction();
  }

  update(state) {
    if (this.daysToSick > 0) {
      this.daysToSick--;

      if (this.daysToSick === 0) {
        this.sick = true;
      }

      this.day++;
      return;
    }

    if (this.infected && !this.reported) {
      if (
        Math.random() < 0.25 + (state.detectionRate / 5) * 0.24 ||
        this.patient0
      ) {
        this.reported = true;
      }
    }

    const healthcareFunctional = state.healthcare > 0;

    if (this.reported && !this.quarantined) {
      if (Math.random() < 0.5) {
        this.quarantined = true;

        this.day++;
        return;
      }
    }

    if (this.quarantined && !this.hospitalized) {
      if (Math.random() < 0.1) {
        this.hospitalized = true;

        this.day++;
        return;
      }
    }

    const healthcareRatio = Math.min(10, state.healthcare) / 10;

    if (this.hospitalized && !healthcareFunctional) {
      this.hospitalized = false;
    }

    if (
      this.sick &&
      Math.random() <
        (this.hospitalized && this.healthcareFunctional
          ? 0.0015
          : 0.003 * 1.5) *
          (1 +
            (1 - healthcareRatio ** 2) +
            this.day / 10 +
            Math.max(this.day - 45, 0) ** 2)
    ) {
      this.dead = this.reported;
      this.sick = false;
      this.hospitalized = false;
      this.quarantined = false;
      this.infected = false;
      return;
    }

    if (
      this.sick &&
      Math.random() <
        (this.hospitalized && this.healthcareFunctional ? 0.003 : 0.0015) *
          0.95 *
          4 *
          (1 * healthcareRatio +
            this.day / 10 +
            Math.max(this.day - 30, 0) ** 2) *
          (1 + state.medicine * 2)
    ) {
      this.recovered = this.reported;
      this.sick = false;
      this.hospitalized = false;
      this.quarantined = false;
      this.infected = false;
      return;
    }

    this.day++;
  }
}

const INFECTED = 1;
const SICK = 1 << 1;
const REPORTED = 1 << 2;
const QUARANTINED = 1 << 3;
const HOSPITALIZED = 1 << 4;
const RECOVERED = 1 << 5;
const VACCINATED = 1 << 6;
const DEAD = 1 << 7;

const DIFFICULTY = 0.9;

const getInitialState = () => {
  const initialAgentCount = Math.round(20 + Math.random() * 50 * DIFFICULTY);

  // const patient0 = new Agent();
  // patient0.patient0 = true;
  // patient0.daysToSick = 5;

  const agentCount = 1 + initialAgentCount;
  const agents = new Uint8Array(AGENT_LIMIT);
  const sickDelays = new Uint8Array(AGENT_LIMIT);
  const agentsAge = new Uint8Array(AGENT_LIMIT);

  for (let i = 0; i < agentCount; i++) {
    agents[i] = INFECTED;
  }

  for (let i = 0; i < agentCount; i++) {
    const daysToSick = daysToSickFunction();

    sickDelays[i] = daysToSick;
  }

  sickDelays[0] = 5;

  const initialState = {
    day: 0,
    infectionProbability: 0.02 * DIFFICULTY,
    quarantineBreakProbability: 0.01 * DIFFICULTY,
    contactsPerDay: 11 * DIFFICULTY,
    budget: 3,
    economy: 5,
    social: 9,
    healthcare: 1,
    people: 7,
    politics: 9,
    icus: 1,
    policeAuthority: 8,
    detectionRate: 0,
    penalty: 0,
    gameOver: false,
    message: undefined,
    deathrattle: 0,
    underControl: false,
    medicine: 0,
    dead: 0,
    recovered: 0,
    reported: 0,
    vaccine: 0,
    daysToWin: 30,
    propagandaImage: undefined,
    win: false,
    bordersClosed: false,
    agents,
    agentCount,
    sickDelays,
    agentsAge,
    log: [
      {
        date: new Date("2020-03-04T00:00:00.000"),
        title:
          "Koronawirus dotarł do Polski. Minister zdrowia: Jest pierwszy, potwierdzony przypadek.",
      },
    ],
  };

  return initialState;
};

const STEP_CHUNK = 1000000;
const STEP_DELAY = 0;

const PENALTY_THRESHOLD = 20000;

const VACCINATIONS_PER_DAY = 50000;

// const ANARCHY_SCALE = 2;
// const ANARCHY_PENALTY = 10;
const ANARCHY_SCALE = 1.5;
const ANARCHY_PENALTY = 7;

const TURN_DELAY = 0;

const transition = async (state) => {
  let steps = 0;

  let {
    agents,
    agentCount,
    sickDelays,
    agentsAge,
    contactsPerDay,
    infectionProbability,
    quarantineBreakProbability,
    people,
    day,
    politics,
  } = state;

  //console.log({ agents, agentCount, sickDelays, agentsAge });

  const anarchy = people === 0 || politics === 0;

  //console.time("RANDOM POOL");
  const rp = 10000;
  const randomPool = range(rp).map(() => Math.random());
  let r = 0;
  //console.timeEnd("RANDOM POOL");

  const realContactsPerDay = anarchy
    ? randomPool[r++ % rp] * ANARCHY_PENALTY + contactsPerDay * ANARCHY_SCALE
    : contactsPerDay;

  // console.time("AGENTS POOL");
  // const agentPool = range(1000).map(() => new Agent());
  // console.timeEnd("AGENTS POOL");

  //console.time("AGENTS UPDATE");
  let penalty = 0;

  const realDetectionRate = 0.25 + (state.detectionRate / 5) * 0.24;
  const healthcareFunctional = state.healthcare > 0;
  const healthcareRatio = Math.min(10, state.healthcare) / 10;

  const l1 = agentCount;

  for (let i = 0; i < l1; i++) {
    const agent = agents[i];

    if (!(agent & INFECTED) || agent & RECOVERED || agent & DEAD) {
      continue;
    }

    let newAgent = agent;

    const day = agentsAge[i];

    if (sickDelays[i] > 0) {
      sickDelays[i] -= 1;

      if (sickDelays[i] === 0) {
        newAgent |= SICK;
      }

      agents[i] = newAgent;
      continue;
    }

    if (newAgent & INFECTED && !(newAgent & REPORTED)) {
      if (randomPool[r++ % rp] < realDetectionRate || i === 0) {
        newAgent |= REPORTED;

        penalty++;
      }
    }

    if (newAgent & REPORTED && !(newAgent & QUARANTINED)) {
      if (randomPool[r++ % rp] < 0.5) {
        newAgent |= QUARANTINED;

        agents[i] = newAgent;
        continue;
      }
    }

    if (newAgent & QUARANTINED && !(newAgent & HOSPITALIZED)) {
      if (randomPool[r++ % rp] < 0.1) {
        newAgent |= HOSPITALIZED;

        agents[i] = newAgent;
        continue;
      }
    }

    if (!healthcareFunctional && newAgent & HOSPITALIZED) {
      newAgent &= ~HOSPITALIZED;
    }

    if (
      newAgent & SICK &&
      randomPool[r++ % rp] <
        (newAgent & HOSPITALIZED && healthcareFunctional
          ? 0.0015
          : 0.003 * 1.5) *
          (1 +
            (1 - healthcareRatio ** 2) +
            day / 10 +
            Math.max(day - 45, 0) ** 2)
    ) {
      penalty += 100;

      if (newAgent & REPORTED) {
        newAgent |= DEAD;
      }

      newAgent &= ~(
        HOSPITALIZED |
        SICK |
        HOSPITALIZED |
        QUARANTINED |
        INFECTED
      );

      agents[i] = newAgent;
      continue;
    }

    if (
      newAgent & SICK &&
      randomPool[r++ % rp] <
        (newAgent & HOSPITALIZED && healthcareFunctional ? 0.003 : 0.0015) *
          0.95 *
          4 *
          (1 * healthcareRatio + day / 10 + Math.max(day - 30, 0) ** 2) *
          (1 + state.medicine * 2)
    ) {
      if (newAgent & REPORTED) {
        newAgent |= RECOVERED;
      }

      newAgent &= ~(
        HOSPITALIZED |
        SICK |
        HOSPITALIZED |
        QUARANTINED |
        INFECTED
      );

      agents[i] = newAgent;
      continue;
    }

    agents[i] = newAgent;

    // steps++;

    // if (steps >= STEP_CHUNK) {
    //   //console.log("STEP DELAY");

    //   await delay(STEP_DELAY);

    //   steps = 0;
    // }
  }
  //console.timeEnd("AGENTS UPDATE");

  await delay(TURN_DELAY);

  //console.time("AGENTS AGE UPDATE");
  const l2 = agentCount;
  for (let i = 0; i < l2; i++) {
    const agent = agents[i];

    if (!(agent & INFECTED) || agent & RECOVERED || agent & DEAD) {
      continue;
    }

    agentsAge[i] += 1;

    // steps++;

    // if (steps >= STEP_CHUNK) {
    //   //console.log("STEP DELAY");

    //   await delay(STEP_DELAY);

    //   steps = 0;
    // }
  }
  //console.timeEnd("AGENTS AGE UPDATE");

  await delay(TURN_DELAY);

  let newAgents = 0;

  //console.time("AGENTS INFECT");

  const vaccinationScale = state.vaccine > 0 ? 1 / (state.vaccine + 1) : 1;
  const realInfectionProbability = infectionProbability * vaccinationScale;
  const infectionRatio = 1 - agentCount / AGENT_LIMIT;
  const scaledContactsPerDay = Math.max(
    1,
    Math.ceil(realContactsPerDay * infectionRatio)
  );

  //console.log({ infectionRatio: infectionRatio * 100 });

  if (agentCount < AGENT_LIMIT) {
    const l = agentCount;

    for (let i = 0; i < l; i++) {
      const agent = agents[i];

      //for (const agent of agents) {
      if (!(agent & INFECTED) || agent & RECOVERED || agent & DEAD) {
        continue;
      }

      if (
        anarchy ||
        !agent.quarantined ||
        (agent.quarantined && randomPool[r++ % rp] < quarantineBreakProbability)
      ) {
        for (let j = 0; j < scaledContactsPerDay; j++) {
          if (randomPool[r++ % rp] < realInfectionProbability) {
            newAgents++;
          }

          // steps++;

          // if (steps >= STEP_CHUNK) {
          //   ////console.log("STEP DELAY");

          //   await delay(STEP_DELAY);

          //   steps = 0;
          // }
        }

        // steps += scaledContactsPerDay;

        // if (steps >= STEP_CHUNK) {
        //   ////console.log("STEP DELAY");

        //   await delay(STEP_DELAY);

        //   steps = 0;
        // }
      }
    }
  }
  //console.timeEnd("AGENTS INFECT");

  await delay(TURN_DELAY);

  //console.log({
  //   newAgents,
  // });

  //console.time("AGENTS VACCINATE");
  let vaccinatedAgents = state.vaccine * VACCINATIONS_PER_DAY;

  while (vaccinatedAgents-- > 0) {
    if (agentCount >= AGENT_LIMIT) {
      break;
    }

    agents[agentCount] &= ~INFECTED;
    agents[agentCount] |= VACCINATED;

    agentCount++;
  }
  //console.timeEnd("AGENTS VACCINATE");

  //console.time("AGENTS NEW");
  //console.log({ newAgents });

  let agentsToSpawn = Math.min(newAgents, AGENT_LIMIT - agentCount);

  // while (agentsToSpawn-- > 0) {
  //   agents.push(new Agent());

  //   // steps++;

  //   // if (steps >= STEP_CHUNK) {
  //   //   ////console.log("STEP DELAY");

  //   //   await delay(STEP_DELAY);

  //   //   steps = 0;
  //   // }
  // }

  await delay(TURN_DELAY);

  while (agentsToSpawn-- > 0) {
    agents[agentCount] = INFECTED;

    const daysToSick = daysToSickFunction();

    sickDelays[agentCount] = daysToSick;

    agentCount++;

    // steps++;

    // if (steps >= STEP_CHUNK) {
    //   ////console.log("STEP DELAY");

    //   await delay(STEP_DELAY);

    //   steps = 0;
    // }
  }

  await delay(TURN_DELAY);

  //console.log("TOTAL AGENTS " + agents.length);
  //console.timeEnd("AGENTS NEW");

  //console.time("AGENTS STATS");
  let sick = 0;
  let recovered = 0;
  let dead = 0;
  let quarantined = 0;
  let hospitalized = 0;
  let reported = 0;
  let infected = 0;

  const l = agentCount;
  for (let i = 0; i < l; i++) {
    const agent = agents[i];

    //for (const agent of agents) {
    if (agent & SICK) {
      sick++;
    }
    if (agent & RECOVERED) {
      recovered++;
    }
    if (agent & DEAD) {
      dead++;
    }
    if (agent & QUARANTINED) {
      quarantined++;
    }
    if (agent & HOSPITALIZED) {
      hospitalized++;
    }
    if (agent & REPORTED) {
      reported++;
    }
    if (agent & INFECTED) {
      infected++;
    }
  }
  //console.timeEnd("AGENTS STATS");

  await delay(TURN_DELAY);

  //console.time("NEXT STATE");
  const nextState = {
    ...state,
    day: day + 1,
    agents,
    agentCount,
    sickDelays,
    agentsAge,
    contactsPerDay,
    dead,
    events: [],
    hospitalized,
    penalty: state.penalty + penalty,
    infected,
    quarantined,
    recovered,
    reported,
    sick,
  };
  //console.timeEnd("NEXT STATE");

  return nextState;
};

const addDays = (days) => (date) => {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
};

const DEATHRATTLE_LIMIT = 15;

const formatDisplayDate = (date) =>
  new Intl.DateTimeFormat("pl-PL").format(date);

////console.log({ startState, initialAgentCount });

// const log = [
//   {
//     date: new Date("2020-03-10T00:00:00.000"),
//     effectiveDate: new Date("2020-03-10T00:00:00.000"),
//     title: "Zabezpieczenie sanitarne granic",
//   },
//   {
//     date: new Date("2020-03-10T00:00:00.000"),
//     effectiveDate: new Date("2020-03-10T00:00:00.000"),
//     title: "Odwołanie wszystkich imprez masowych",
//   },
//   {
//     date: new Date("2020-03-11T00:00:00.000"),
//     effectiveDate: new Date("2020-03-11T00:00:00.000"),
//     title: "Zamknięcie wszystkich placówek oświatowych i szkół wyższych",
//   },
//   {
//     date: new Date("2020-04-01T00:00:00.000"),
//     effectiveDate: new Date("2020-04-01T00:00:00.000"),
//     title: "Wprowadzenie godzin dla seniorów",
//   },
//   {
//     date: new Date("2020-04-01T00:00:00.000"),
//     effectiveDate: new Date("2020-04-01T00:00:00.000"),
//     title: "Zakaz poruszania się nieletnich",
//   },
//   {
//     date: new Date("2020-04-09T00:00:00.000"),
//     effectiveDate: new Date("2020-04-16T00:00:00.000"),
//     title: "Wprowadzenie obowiązku zakrywania twarzy",
//   },
// ];

const playState = (action) => async (state) => {
  await delay(TURN_DELAY);

  const latestState = state[state.length - 1];
  const secondToLatestState = state[state.length - 2];
  const thirdToLatestState = state[state.length - 3];

  const nextState = await transition(latestState);

  //console.log("latestState.reported: " + latestState.reported);
  //console.log("nextState.reported: " + nextState.reported);

  if (nextState.reported > 0 && latestState.reported === 0) {
    //console.log("PATIENT-0");

    //console.log({ eventsUpdated: "e0" });
    nextState.events = [
      ...(nextState.events || []),
      events.e0,
      ...(debug
        ? [events.e1, events.e2, events.e3, events.e4, events.e5, events.e6]
        : []),
    ];
  }

  if (nextState.dead > 0 && latestState.dead === 0) {
    nextState.events = [...(nextState.events || []), events.e7];
  }

  let { day, log: sourceLog } = nextState;

  const { reported, dead, recovered } = nextState;

  const date = addDays(day)(startDate);

  const log = [...sourceLog];

  if (action) {
    ////console.log({ action });

    action.effect(nextState);

    log.push({
      date,
      title: action.logEntry,
    });

    if (action.event) {
      nextState.events = [...(nextState.events || []), events[action.event]];
    }
  }

  {
    let {
      budget,
      economy,
      social,
      healthcare,
      people,
      politics,
      deathrattle,
      penalty,
      policeAuthority,
    } = nextState;

    // max of 5 per turn
    penalty = Math.min(penalty, PENALTY_THRESHOLD * 5);

    while (penalty >= PENALTY_THRESHOLD) {
      //console.error({ penalty });

      const mode = Math.floor(Math.random() * 4);

      if (mode === 0) {
        people--;
        nextState.people = people;
        //console.error({ people });
      } else if (mode === 1) {
        politics--;
        nextState.politics = politics;
        //console.error({ politics });
      } else if (mode === 2) {
        healthcare--;
        nextState.healthcare = healthcare;
        //console.error({ healthcare });
      } else {
        economy--;
        nextState.economy = economy;
        //console.error({ economy });
      }

      penalty -= PENALTY_THRESHOLD;
    }

    if (economy <= 0) {
      //console.log("ECONOMY DOWN");
      //console.log("SOCIAL BEFORE " + social);
      social -= 1;
      nextState.social = social;
      //console.log("SOCIAL AFTER " + social);
      //console.log("NEXT SOCIAL STATE " + nextState.social);
    }

    if (social <= 0) {
      //console.log("SOCIAL DOWN");
      //console.log("BUDGET BEFORE " + budget);
      budget -= 1;
      nextState.budget = budget;
      //console.log("BUDGET AFTER " + budget);
      //console.log("NEXT BUDGET STATE " + nextState.budget);
    }

    if (social >= 10) {
      //console.log("SOCIAL PROSPERITY");
      //console.log("economy BEFORE " + economy);
      economy -= 1;
      nextState.economy = economy;
      politics += 1;
      nextState.politics = politics;
      //console.log("economy AFTER " + economy);
      //console.log("NEXT economy STATE " + nextState.economy);
    }

    if (economy >= 10) {
      //console.log("ECONOMY PROSPERITY");
      //console.log("budget BEFORE " + budget);
      budget += 1;
      nextState.budget = budget;
      //console.log("budget AFTER " + budget);
      //console.log("NEXT budget STATE " + nextState.budget);
    }

    if (people >= 10) {
      //console.log("PEOPLE PROSPERITY");
      //console.log("politics BEFORE " + politics);
      politics += 1;
      nextState.politics = politics;
      //console.log("politics AFTER " + politics);
      //console.log("NEXT politics STATE " + nextState.politics);
    }

    if (budget <= 0) {
      //console.log("BUDGET DOWN");
      //console.log("POLITICS BEFORE " + politics);
      politics -= 1;
      nextState.politics = politics;
      //console.log("POLITICS AFTER " + politics);
      //console.log("NEXT POLITICS STATE " + nextState.politics);
    }

    if (people <= 0) {
      //console.log("PEOPLE DOWN");
      //console.log("POLITICS BEFORE " + politics);
      politics -= 1;
      nextState.politics = politics;
      //console.log("POLITICS AFTER " + politics);
      //console.log("NEXT POLITICS STATE " + nextState.politics);
    }

    if (politics <= 0) {
      //console.log("POLITICS DOWN");
      //console.log("deathrattle BEFORE " + deathrattle);
      deathrattle += 1;
      nextState.deathrattle = deathrattle;
      //console.log("deathrattle AFTER " + deathrattle);
      //console.log("NEXT deathrattle STATE " + nextState.deathrattle);
    }

    // ENDGAME!!!!
    if (!nextState.gameOver && deathrattle >= DEATHRATTLE_LIMIT) {
      nextState.events = [...(nextState.events || []), events.e8];
      nextState.events = [...(nextState.events || []), events.e14];
      nextState.gameOver = true;
      nextState.win = false;
      stopGameplayTimeTracking = true;

      analytics("lost");
      analytics(`lost_day_${day}`);
      analytics(`lost_reported_${reported}`);
      analytics(`lost_dead_${dead}`);
      analytics(`lost_recovered_${recovered}`);
    }

    const underControl =
      latestState.reported === nextState.reported &&
      secondToLatestState &&
      latestState.reported === secondToLatestState.reported &&
      thirdToLatestState &&
      secondToLatestState.reported === thirdToLatestState.reported;
    nextState.underControl = underControl;

    if (!nextState.gameOver) {
      if (underControl) {
        nextState.daysToWin -= 1;

        if (nextState.daysToWin <= 0) {
          nextState.events = [...(nextState.events || []), events.e9];
          nextState.events = [...(nextState.events || []), events.e14];
          nextState.gameOver = true;
          nextState.win = true;
          stopGameplayTimeTracking = true;

          set("finished")("true");

          analytics("won");
          analytics(`won_day_${day}`);
          analytics(`won_reported_${reported}`);
          analytics(`won_dead_${dead}`);
          analytics(`won_recovered_${recovered}`);
        }
      } else {
        nextState.daysToWin = 30;
      }

      if (budget <= 0) {
        nextState.budget = 0;

        if (latestState.budget > 0 && nextState.budget <= 0) {
          log.push({
            date,
            title: "Dziura w budżecie nie pozwala na dalszą walkę z COVID-19!",
          });

          nextState.events = [...(nextState.events || []), events.e1];
        }
      }

      if (economy <= 0) {
        nextState.economy = 0;

        if (latestState.economy > 0 && nextState.economy <= 0) {
          log.push({
            date,
            title: "Gospodarka w stanie agonii!",
          });

          nextState.events = [...(nextState.events || []), events.e2];
        }
      }

      if (social <= 0) {
        nextState.social = 0;

        if (latestState.social > 0 && nextState.social <= 0) {
          log.push({
            date,
            title: "Ludzie przywiązani do pomocy państwa nie wiedzą co robić.",
          });

          nextState.events = [...(nextState.events || []), events.e3];
        }
      }

      if (healthcare <= 0) {
        nextState.healthcare = 0;

        if (latestState.healthcare > 0 && nextState.healthcare <= 0) {
          log.push({
            date,
            title: "Służba zdrowia umarła. Nie ma kto i jak leczyć chorych!",
          });

          nextState.events = [...(nextState.events || []), events.e4];
        }
      }

      if (people <= 0) {
        nextState.people = 0;

        if (latestState.people > 0 && nextState.people <= 0) {
          log.push({
            date,
            title:
              "Rozwścieczeni ludzie wyszli na ulice. Zamieszki w całej Polsce!",
          });

          nextState.events = [...(nextState.events || []), events.e5];
        }
      }

      if (politics <= 0) {
        nextState.politics = 0;

        if (latestState.politics > 0 && nextState.politics <= 0) {
          log.push({
            date,
            title: "PiS utracił poparcie najtwardszego elektoratu.",
          });

          nextState.events = [...(nextState.events || []), events.e6];
        }
      }

      if (policeAuthority <= 0) {
        nextState.policeAuthority = 0;

        if (latestState.policeAuthority > 0 && nextState.policeAuthority <= 0) {
          log.push({
            date,
            title: "Od dziś milicja oficjalną formacją mundurową!",
          });

          nextState.events = [...(nextState.events || []), events.e13];
        }
      }
    }

    nextState.budget = clampStat(nextState.budget);
    nextState.economy = clampStat(nextState.economy);
    nextState.social = clampStat(nextState.social);
    nextState.healthcare = clampStat(nextState.healthcare);
    nextState.people = clampStat(nextState.people);
    nextState.politics = clampStat(nextState.politics);
    nextState.deathrattle = clamp(0, DEATHRATTLE_LIMIT)(nextState.deathrattle);
    nextState.policeAuthority = clampStat(nextState.policeAuthority);
    nextState.penalty = penalty;

    latestState.action = action;

    const maybeActionKeyValue = Object.entries(allActions).find(
      ([, value]) => value === action
    );

    const propagandaImage =
      maybeActionKeyValue && stripes[maybeActionKeyValue[0]]
        ? stripes[maybeActionKeyValue[0]]
        : Object.values(randomStripes)[
            Math.floor(Math.random() * Object.keys(randomStripes).length)
          ];

    nextState.propagandaImage = propagandaImage;
  }

  nextState.message =
    "▪ " +
    take(10)(shuffle(randomPropaganda))
      .map((x) => x.toUpperCase())
      .join(" ▪ ");

  nextState.log = log;

  return [...state, nextState];
};

let mediaTimeout;

const getStartState = () => [getInitialState()];

let stopFlag = false;

const reset = async () => {
  stopFlag = false;
  stopGameplayTimeTracking = false;

  trackGameplayTime();

  let startState = [getInitialState()];

  let steps = 6; //60 - 13;

  while (steps-- > 0) {
    startState = await playState()(startState);
  }

  return startState;
};

export default function App() {
  const [finished, setFinished] = useState(() => get("finished") === "true");
  const [custom, setCustom] = useState(false);
  const [tvpis, setTvpis] = useState(true);
  const [menuActive, setMenuActive] = useState(true);
  const [busy, setBusy] = useState(false);
  const [action, setAction] = useState(false);
  const [media, setMedia] = useState(false);
  const [mediaCover, setMediaCover] = useState(false);
  const [state, setState] = useState(getStartState);
  const musicPlayer = useRef();
  const videoPlayer = useRef();
  const latestState = state[state.length - 1];
  const [event, changeEvent] = useState(undefined);
  const [actions, setActions] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [queuedState, queueState] = useState(undefined);
  const [audio, setAudio] = useState(true);
  const [daily, setDaily] = useState(false);
  const [stop, setStop] = useState(false);

  const setEvent = (event) => {
    if (event) {
      const maybeKeyValue = Object.entries(events).find(
        ([, value]) => value === event
      );

      if (maybeKeyValue) {
        analytics(`event-${maybeKeyValue[0]}`);
      }
    }

    changeEvent(event);
  };

  window.getState = () => {
    return state;
  };

  window.setState = (state) => {
    return setState(state);
  };

  window.setState = () => {};

  const resetState = async () => {
    const nextState = await reset();

    setState(nextState);
  };

  const closeChart = () => setShowChart(false);
  const closeStats = () => setShowStats(false);
  const closeLogs = () => setShowLogs(false);

  const togglePlay = () => {
    if (busy && !stopFlag) {
      analytics(`fast-forward-stop`);
      stopFlag = true;
      setStop(stopFlag);
    } else if (!busy) {
      playWeek();
    }
  };
  //console.log({ latestState });

  const skipEvent = async () => {
    const eventsSource = latestState.events || [];
    const index = eventsSource.findIndex((x) => x === event);

    let nextEvent = undefined;

    if (index !== -1) {
      nextEvent = eventsSource[index + 1];
    }

    setEvent(nextEvent);

    if (!nextEvent && queuedState) {
      await delay(0);

      setState(queuedState);
      queueState(undefined);
    }
  };

  const skipMedia = async () => {
    setMediaCover(false);
    setMedia(false);

    musicPlayer.current.volume = 1;

    if (!event && queuedState) {
      await delay(0);

      setState(queuedState);
      queueState(undefined);
    }
  };

  const showMedia = () => {
    musicPlayer.current.volume = 0.5;

    setMediaCover(!tvpis);
    setMedia(true);

    mediaTimeout = setTimeout(
      () => {
        mediaTimeout = undefined;
        setMediaCover(true);
      },
      tvpis ? 12000 : 0
    );
  };

  const skipVideo = () => {
    analytics("video-skip");

    videoPlayer.current.pause();

    if (mediaTimeout) {
      clearTimeout(mediaTimeout);
      mediaTimeout = undefined;
    }

    setMediaCover(true);
  };

  const skipAction = async () => {
    analytics("action-skip");

    setAction(false);

    const nextState = await playDelayed();

    queueState(nextState);

    await delay(16);

    showMedia();
  };

  const performAction = async (action) => {
    if (action) {
      const maybeActionKeyValue = Object.entries(allActions).find(
        ([, value]) => value === action
      );

      if (maybeActionKeyValue) {
        analytics(`action-${maybeActionKeyValue[0]}`);
      }
    }

    setAction(false);

    const nextState = await playDelayed(action);

    queueState(nextState);

    await delay(16);

    showMedia();
  };

  const showAction = () => {
    setAction(true);
  };

  const today = addDays(state.length - 1)(startDate);

  const playDelayed = async (action) => {
    setBusy(true);
    await delay(100);
    const nextState = await playState(action)(state);
    await delay(100);
    setBusy(false);

    return nextState;
  };

  const playWeek = async () => {
    analytics(`fast-forward-start`);

    setBusy(true);
    await delay(100);
    let currentState = state;

    //let days = 7;
    let days = 365;

    while (days-- > 0) {
      await delay(100);
      const nextState = await playState()(currentState);
      currentState = nextState;
      await delay(100);
      setState(currentState);

      const latestState = currentState[currentState.length - 1];
      ////console.error(latestState);
      ////console.error(latestState.events);

      if (latestState.events && latestState.events.length > 0) {
        stopFlag = false;
        setStop(stopFlag);
        break;
      }

      if (stopFlag) {
        stopFlag = false;
        setStop(stopFlag);
        break;
      }

      await delay(500);
    }

    await delay(100);
    setBusy(false);
  };

  const data = state.map((_, index) => ({
    ..._,
    day: index,
    name: formatDisplayDate(addDays(index)(startDate)),
  }));

  const latestData = data[data.length - 1];
  const secondToLatestData = data[data.length - 2] ?? latestData;
  const thirdToLatestData =
    data[data.length - 3] ?? secondToLatestData ?? latestData;

  const {
    agents,
    reported,
    dead,
    recovered,
    quarantined,
    gameOver,
    hospitalized,
    contactsPerDay,
    budget,
    economy,
    social,
    deathrattle,
    underControl,
    daysToWin,
    win,
    healthcare,
    people,
    politics,
    log,
  } = event ? secondToLatestData : latestData;

  const {
    budget: previousBudget,
    economy: previousEconomy,
    social: previousSocial,
    healthcare: previousHealthcare,
    people: previousPeople,
    politics: previousPolitics,
  } = event ? thirdToLatestData : secondToLatestData;

  const budgetDiff = budget - previousBudget;
  const economyDiff = economy - previousEconomy;
  const socialDiff = social - previousSocial;
  const healthcareDiff = healthcare - previousHealthcare;
  const peopleDiff = people - previousPeople;
  const politicsDiff = politics - previousPolitics;

  const queuedStateSource = queuedState ?? state;
  //console.log({ queuedStateSource, queuedState, state });
  const latestQueuedState = queuedStateSource[queuedStateSource.length - 1];
  const newCases = latestQueuedState.reported - latestState.reported;
  const newRecovered = latestQueuedState.recovered - latestState.recovered;
  const newDeaths = latestQueuedState.dead - latestState.dead;

  useEffect(() => {
    const eventsSource = latestState.events || [];
    const firstEvent = eventsSource[0];
    //console.log({ firstEvent, eventsSource, latestState });
    setEvent(firstEvent);
  }, [latestState.events]);

  //console.log({
  //   queuedState,
  //   latestQueuedState,
  //   newCases,
  //   newRecovered,
  //   newDeaths,
  // });

  //console.log({ latestData, data });

  const { agents: _agents, ...latestDataWithoutAgents } = latestData;

  const dailyData = state.map((_, index) => ({
    ..._,
    day: index,
    name: formatDisplayDate(addDays(index)(startDate)),
    reported: state[index].reported - state[Math.max(0, index - 1)].reported,
    recovered: state[index].recovered - state[Math.max(0, index - 1)].recovered,
    dead: state[index].dead - state[Math.max(0, index - 1)].dead,
  }));

  const dataSource = daily ? dailyData : data;
  const paddedData = reverse(take(dataSource.length)(reverse(dataSource)));

  const [width, height] = useWindowSize();

  const toggleMusic = (event) => {
    event.preventDefault();

    if (musicPlayer.current.paused) {
      setAudio(true);
      musicPlayer.current.play();

      analytics("music-enable");
    } else {
      setAudio(false);
      musicPlayer.current.pause();

      analytics("music-disable");
    }
  };

  const toggleTvpis = (event) => {
    event.preventDefault();

    const nextState = !tvpis;

    setTvpis(nextState);

    analytics(nextState ? "video-enable" : "video-disable");
  };

  useEffect(() => {
    const possibleActions = Object.values(allActions);
    const appliedActions = data.filter((x) => x.action).map((x) => x.action);

    const filteredActions = possibleActions
      .filter((x) => !appliedActions.some((y) => y === x))
      .filter((action) => {
        const { requires } = action;

        if (!requires) {
          return true;
        }

        const requiresTarget = isFunction(requires) ? requires() : requires;

        return appliedActions.some((y) => y === requiresTarget);
      })
      .filter((action) => {
        const { excludes } = action;

        if (!excludes) {
          return true;
        }

        const excludesTarget = isFunction(excludes) ? excludes() : excludes;

        return !appliedActions.some((y) => y === excludesTarget);
      })
      .filter((action) => {
        const { customFilter } = action;

        if (!customFilter) {
          return true;
        }

        return customFilter(latestState);
      });

    const shuffledActions = shuffle(filteredActions).sort(
      (a, b) => (a.special ? 0 : 1) - (b.special ? 0 : 1)
    );

    let actions = debug
      ? [allActions.a1, ...take(3)(shuffledActions)]
      : take(3)(shuffledActions);

    if (custom) {
      actions = shuffledActions.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (shuffledActions.filter((x) => x.special).length >= 4) {
      actions = shuffledActions.filter((x) => x.special);
    }

    setActions(actions);
  }, [latestState]);

  //console.log({ event });

  return (
    <div className="App">
      <div className="map">
        <Map
          provider={mapTilerProvider}
          dprs={[1, 2]}
          center={[52.06, 19.25]}
          zoom={6.5}
          width={width}
          height={height}
        />
      </div>
      <div className="status-header">
        <div className="status-bar">
          <div className="status-row infected">
            <div className="status-row-label">Currently infected</div>
            <div className="status-row-icon">
              <Infected />
            </div>
            <div>
              <TransitiveNumber>{formatNumber(reported)}</TransitiveNumber>
            </div>
          </div>
          <div className="status-row dead">
            <div className="status-row-label">Total deaths</div>
            <div className="status-row-icon">
              <Dead />
            </div>
            <div>
              <TransitiveNumber>{formatNumber(dead)}</TransitiveNumber>
            </div>
          </div>
          <div className="status-row recovered">
            <div className="status-row-label">Total recovered</div>
            <div className="status-row-icon">
              <Recovered />
            </div>
            <div>
              <TransitiveNumber>{formatNumber(recovered)}</TransitiveNumber>
            </div>
          </div>
        </div>
        <div>{formatLongDisplayDate(today)}</div>
        {!gameOver ? (
          <>
            <div className="action-buttons">
              <button disabled={busy} onClick={() => showAction()}>
                Następny dzień
              </button>
              <button
                disabled={busy && stop}
                className="fast-forward-button"
                onClick={togglePlay}
                title={busy ? "Zatrzymaj" : "Rozpocznij"}
              >
                {busy ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 19 22 12 13 5 13 19"></polygon>
                    <polygon points="2 19 11 12 2 5 2 19"></polygon>
                  </svg>
                )}
              </button>
            </div>
            {busy && <div className="busy-status">Postęp pandemii...</div>}
            {underControl && (
              <div className="alert positive">
                <svg
                  className="icon icon-tabler icon-tabler-alert-triangle"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M12 9v2m0 4v.01" />
                  <path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" />
                </svg>{" "}
                <span>
                  Dni do opanowania epidemii:{" "}
                  <TransitiveNumber>{formatNumber(daysToWin)}</TransitiveNumber>
                </span>
              </div>
            )}
            {politics === 0 && (
              <div className="alert">
                <svg
                  className="icon icon-tabler icon-tabler-alert-triangle"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M12 9v2m0 4v.01" />
                  <path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" />
                </svg>{" "}
                <span>
                  Dni do rozwiązania rządu:{" "}
                  <TransitiveNumber>
                    {formatNumber(DEATHRATTLE_LIMIT - deathrattle)}
                  </TransitiveNumber>
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setFinished(get("finished") === "true");

                setMenuActive(true);
              }}
            >
              Wróć do menu głównego
            </button>
            {win ? (
              <div className="alert positive">
                <svg
                  className="icon icon-tabler icon-tabler-alert-triangle"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M12 9v2m0 4v.01" />
                  <path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" />
                </svg>{" "}
                <span>Epidemia opanowana</span>
              </div>
            ) : (
              <div className="alert">
                <svg
                  className="icon icon-tabler icon-tabler-alert-triangle"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M12 9v2m0 4v.01" />
                  <path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" />
                </svg>{" "}
                <span>Rząd rozwiązany</span>
              </div>
            )}
          </>
        )}
      </div>
      {!debug && log && log.length > 0 && (
        <div className={classNames("container logs", { active: showLogs })}>
          <div className="container-header">
            <CloseIcon onClick={closeLogs} />
            <h3>Dziennik</h3>
          </div>
          <Log>{reverse(log)}</Log>
        </div>
      )}
      {debug && (
        <div className="container logs">
          <pre>{JSON.stringify(latestDataWithoutAgents, null, 2)}</pre>
        </div>
      )}
      <div className={classNames("container chart", { active: showChart })}>
        <div className="container-header">
          <CloseIcon onClick={closeChart} />
          <h3>Statystyki</h3>
        </div>
        <div className="tabs">
          <a
            href="#"
            className={classNames("tab", { active: !daily })}
            onClick={() => setDaily(false)}
          >
            Łącznie
          </a>{" "}
          <a
            href="#"
            className={classNames("tab", { active: daily })}
            onClick={() => setDaily(true)}
          >
            Dziennie
          </a>
        </div>
        <LineChart
          width={width < 720 ? width - 64 : 360}
          height={240}
          data={paddedData}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line
            name="Zakażeni"
            type="monotone"
            dataKey="reported"
            stroke="#ffa000"
            dot={false}
          />
          <Line
            name="Zgony"
            type="monotone"
            dataKey="dead"
            stroke="#e64a19"
            dot={false}
          />
          <Line
            name="Wyleczenia"
            type="monotone"
            dataKey="recovered"
            stroke="#388e3c"
            dot={false}
          />
          {/* <Line hide={!debug} type="monotone" dataKey="sick" stroke="red" />
          <Line
            hide={!debug}
            type="monotone"
            dataKey="infected"
            stroke="violet"
          />
          <Line
            hide={!debug}
            type="monotone"
            dataKey="quarantined"
            stroke="pink"
          />
          <Line
            hide={!debug}
            type="monotone"
            dataKey="hospitalized"
            stroke="orange"
          />
          <Line
            hide={!debug}
            type="monotone"
            dataKey="newCases"
            stroke="rgb(150, 29, 29)"
          /> */}
          <Tooltip />
          <Legend />
        </LineChart>
        {debug && (
          <>
            {agents.length} - Reported:
            {reported} - Dead:
            {dead} - Recovered:
            {recovered} - Quarantined:
            {quarantined} - hospitalized:
            {hospitalized} - contactsPerDay:
            {contactsPerDay} - newCases:
            {newCases}
          </>
        )}
      </div>
      <div
        className={classNames("container statistics", { active: showStats })}
      >
        <div className="container-header">
          <CloseIcon onClick={closeStats} />
          <h3>Status</h3>
        </div>
        <div className="stats">
          <StatsRow title="Budżet" diff={budgetDiff}>
            {budget}
          </StatsRow>
          <StatsRow title="Gospodarka" diff={economyDiff}>
            {economy}
          </StatsRow>
          <StatsRow title="Socjal" diff={socialDiff}>
            {social}
          </StatsRow>
          <StatsRow title="Służba zdrowia" diff={healthcareDiff}>
            {healthcare}
          </StatsRow>
          <StatsRow title="Społeczeństwo" diff={peopleDiff}>
            {people}
          </StatsRow>
          <StatsRow title="Poparcie partii" diff={politicsDiff}>
            {politics}
          </StatsRow>
        </div>
      </div>
      <div className="logo-box gameplay">
        <Logo />
      </div>
      <div className="attribution">
        <span
          className="music-toggle"
          onClick={toggleMusic}
          title="Włącz/wyłącz muzykę"
        >
          🎶
        </span>{" "}
        <a
          href="https://incompetech.filmmusic.io/song/4490-the-descent"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Descent by Kevin MacLeod
        </a>{" "}
        Licencja:{" "}
        <a
          href="http://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 4.0
        </a>
      </div>
      <div className="controls">
        <a href="#" onClick={toggleTvpis}>
          {tvpis ? "Wyłącz" : "Włącz"} TVPIS
        </a>{" "}
        •{" "}
        <a href="#" onClick={toggleMusic}>
          {audio ? "Wyłącz" : "Włącz"} muzykę
        </a>
      </div>
      <div className="app-bar">
        <div
          disabled={!(log && log.length > 0)}
          onClick={() => setShowLogs(true)}
        >
          Dziennik
        </div>
        <div onClick={() => setShowStats(true)}>Status</div>
        <div onClick={() => setShowChart(true)}>Statystyki</div>
      </div>
      {!media && event && !busy && (
        <div className="modal-container" key={event.title}>
          <div className="event">
            <div className="event-title">{event.title}</div>
            {event.image && <img src={event.image} width={1280} height={720} />}
            <p>{event.logEntry}</p>
            <button onClick={skipEvent}>Dalej</button>
          </div>
        </div>
      )}
      {action && (
        <div className="modal-container">
          <div className="action">
            <img src={actionLogo} width={1280} height={360} />
            <div className="action-title">Podejmij decyzję</div>
            <div className="actions">
              {actions.map((action, index) => (
                <button
                  key={action.title + index}
                  onClick={() => performAction(action)}
                >
                  {action.title}
                </button>
              ))}
              <button onClick={skipAction}>Nie rób nic</button>
            </div>
          </div>
        </div>
      )}
      {media && (
        <div className="modal-container">
          <div className="media">
            <div className="media-cover">
              <img
                className={classNames("video-background", {
                  active: !mediaCover,
                })}
                height={720}
                src={tvpis ? headlineImage : latestQueuedState.propagandaImage}
                width={1280}
              />
              {tvpis && (
                <video
                  autoPlay={tvpis}
                  className={classNames("video-player", {
                    active: !mediaCover,
                  })}
                  height={720}
                  poster={
                    tvpis ? headlineImage : latestQueuedState.propagandaImage
                  }
                  preload="auto"
                  ref={videoPlayer}
                  src={headlineVideo}
                  width={1280}
                ></video>
              )}
              {tvpis && (
                <div className="strip">
                  <div className="strip-content">
                    PANDEMIA KORONAWIRUSA • Nowe przypadki{" "}
                    {formatNumber(newCases)} • Zgony dziś{" "}
                    {formatNumber(newDeaths)} • Wyzdrowiali dziś{" "}
                    {formatNumber(newRecovered)}
                  </div>
                </div>
              )}
              {tvpis && (
                <div className="strip-primary">
                  <div className="strip-animated">
                    {latestQueuedState?.message}
                  </div>
                </div>
              )}
              <img
                className={classNames("cover-image", { active: mediaCover })}
                height={573}
                onClick={skipVideo}
                src={latestQueuedState.propagandaImage}
                title="Pomiń"
                width={1020}
              />
              {mediaCover && (
                <div className="actions">
                  <button onClick={skipMedia}>Dalej</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <audio
        autoPlay
        loop
        ref={musicPlayer}
        src={music}
        volume={event || action || media ? 0.1 : 1.0}
      />
      <Menu
        active={menuActive}
        resetState={resetState}
        setActive={(value) => {
          setMenuActive(value);

          try {
            musicPlayer.current.play();
          } catch {}
        }}
        setCustom={setCustom}
        custom={finished}
      />
    </div>
  );
}
