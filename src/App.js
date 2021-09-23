import { range, reverse, take, shuffle } from "@sandstreamdev/std/array";
import isFunction from "@sandstreamdev/std/is/function";
import { delay } from "@sandstreamdev/std/async";
import { clamp } from "@sandstreamdev/std/math";
import React, { useRef, useState, useEffect, useMemo } from "react";
import * as allActions from "./actions";
import * as events from "./events";
import * as stripes from "./stripes";
import * as randomStripes from "./random";
import actionLogo from "./actionLogo.png";
import Menu from "./Menu";
import Logo from "./Logo";
import randomPropaganda from "./randomPropaganda";
import useWindowSize from "./useWindowSize";
import { get, set } from "./localStorage";
import music from "./the-descent-by-kevin-macleod-from-filmmusic-io.mp3";
import formatDisplayDateWithOffset from "./formatDisplayDateWithOffset";
import analytics from "./analytics";
import StatusBar from "./StatusBar";
import MapView from "./MapView";
import Event from "./Event";
import Action from "./Action";
import Media from "./Media";
import Statistics from "./Statistics";
import Logs from "./Logs";
import Charts from "./Charts";
import Controls from "./Controls";
import AppBar from "./AppBar";
import Today from "./Today";
import GameControls from "./GameControls";
import GameOverControls from "./GameOverControls";
import offsetStartDate from "./offsetStartDate";
import { SHOW_LEADERBOARD } from "./leaderboards";
import {
  SECOND_WAVE_DAILY_DEATHS,
  SECOND_WAVE_DAILY_RECOVERED,
  SECOND_WAVE_DAILY_REPORTED,
} from "./secondWave";

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

    for (let i = 0; i < 12; i++) {
      if (stopGameplayTimeTracking) {
        stopGameplayTimeTracking = false;

        return;
      }

      await delay(5000);
    }

    analytics(`gameplay-${i}`);
  }
};

const AGENT_LIMIT = 37734000;

const debug = false;

const daysToSickFunction = () => Math.round(5 + Math.random() * 8);

const clampStat = clamp(0, 10);

const INFECTED = 1;
const SICK = 1 << 1;
const REPORTED = 1 << 2;
const QUARANTINED = 1 << 3;
const HOSPITALIZED = 1 << 4;
const RECOVERED = 1 << 5;
const VACCINATED = 1 << 6;
const DEAD = 1 << 7;

const DIFFICULTY = 0.9;

const getInitialState = (custom = false, secondWave = false) => {
  const initialAgentCount = Math.round(20 + Math.random() * 50 * DIFFICULTY);

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

  const secondWaveMultiplierContactsPerDay = secondWave ? 0.71 : 1;
  const secondWaveMultiplierInfectionRate = secondWave ? 0.8 : 1;

  const initialState = {
    custom,
    day: 0,
    infectionProbability: 0.02 * DIFFICULTY * secondWaveMultiplierInfectionRate,
    quarantineBreakProbability: 0.01 * DIFFICULTY,
    contactsPerDay: 11 * DIFFICULTY * secondWaveMultiplierContactsPerDay,
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
    secondWave,
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

// const STEP_CHUNK = 1000000;
// const STEP_DELAY = 0;

const PENALTY_THRESHOLD = 20000;

const VACCINATIONS_PER_DAY = 50000;

// const ANARCHY_SCALE = 2;
// const ANARCHY_PENALTY = 10;
const ANARCHY_SCALE = 1.5;
const ANARCHY_PENALTY = 7;

const TURN_DELAY = 0;

const weekendRatio = 0.55;

const QUARANTINE_DETECTION_RATIO = 0.1;

const transition = async (state) => {
  // let steps = 0;

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
    initialRecovered = 0,
    initialDead = 0,
    initialReported = 0,
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

  const dayWithOffset = day - 2;

  const weekendRate =
    dayWithOffset % 7 === 0 || dayWithOffset % 7 === 1
      ? weekendRatio + Math.random() * (1 - weekendRatio)
      : 1;

  const realDetectionRate =
    (0.25 + (state.detectionRate / 5) * 0.24) *
    weekendRate *
    (0.9 + Math.random() * 0.1);
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
      if (randomPool[r++ % rp] < QUARANTINE_DETECTION_RATIO) {
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

  const luckyDay = Math.random() < 0.05 ? 0.5 : 1;

  const scaledContactsPerDay = Math.max(
    1,
    Math.ceil(realContactsPerDay * infectionRatio * luckyDay)
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

      const quarantined = agent & QUARANTINED;

      if (
        anarchy ||
        !quarantined ||
        (quarantined && randomPool[r++ % rp] < quarantineBreakProbability)
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
  let recovered = initialRecovered;
  let dead = initialDead;
  let quarantined = 0;
  let hospitalized = 0;
  let reported = initialReported;
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

const DEATHRATTLE_LIMIT = 15;

const playState = (action) => async (state, updateProgress, userIntent) => {
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

  const date = offsetStartDate(day);

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

    // penalty = 0;

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
      nextState.events = [...(nextState.events || []), events.e18];

      if (SHOW_LEADERBOARD) {
        nextState.events = [...(nextState.events || []), events.e19];
      }

      nextState.gameOver = true;
      nextState.win = false;
      stopGameplayTimeTracking = true;

      analytics("lost");
      analytics(`lost_day_${day}`);
      analytics(`lost_reported_${reported}`);
      analytics(`lost_dead_${dead}`);
      analytics(`lost_recovered_${recovered}`);

      updateProgress(({ lost = 0, games = 0, ...rest }) => ({
        ...rest,
        lost: lost + 1,
        games: games + 1,
      }));
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
          nextState.events = [...(nextState.events || []), events.e18];

          if (SHOW_LEADERBOARD) {
            nextState.events = [...(nextState.events || []), events.e19];
          }

          nextState.gameOver = true;
          nextState.win = true;
          stopGameplayTimeTracking = true;

          set("finished")("true");

          analytics("won");
          analytics(`won_day_${day}`);
          analytics(`won_reported_${reported}`);
          analytics(`won_dead_${dead}`);
          analytics(`won_recovered_${recovered}`);

          updateProgress(({ won = 0, games = 0, ...rest }) => ({
            ...rest,
            won: won + 1,
            games: games + 1,
          }));
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

    const actions = latestState.secondWave
      ? allActions
      : Object.fromEntries(
          Object.entries(allActions).filter(([, value]) => !value.secondWave)
        );
    const maybeActionKeyValue = Object.entries(actions).find(
      ([, value]) => value === action
    );

    const desiredStripe =
      maybeActionKeyValue && stripes[maybeActionKeyValue[0]];

    const randomStripeIndex = Math.floor(
      Math.random() * Object.keys(randomStripes).length
    );

    const propagandaImage = desiredStripe
      ? desiredStripe
      : Object.values(randomStripes)[randomStripeIndex];

    const stripeKey = desiredStripe
      ? maybeActionKeyValue[0]
      : Object.keys(randomStripes)[randomStripeIndex];

    if (userIntent) {
      if (action) {
        const actionKey = maybeActionKeyValue[0];

        updateProgress(({ unlockedActions = [], ...rest }) => {
          const nextUnlockedActions = [
            ...new Set([...unlockedActions, actionKey]),
          ];

          return {
            ...rest,
            unlockedActions: nextUnlockedActions,
          };
        });
      }

      updateProgress(({ unlockedStripes = [], ...rest }) => ({
        ...rest,
        unlockedStripes: [...new Set([...unlockedStripes, stripeKey])],
      }));
    }

    nextState.propagandaImage = propagandaImage;

    nextState.message =
      "▪ " +
      take(10)(shuffle(randomPropaganda))
        .map((x) => x.toUpperCase())
        .join(" ▪ ");
  }

  nextState.log = log;

  return [...state, nextState];
};

let mediaTimeout;

const getStartState = () => [getInitialState(false)];

let stopFlag = false;

const reset = async (updateProgress, custom = false, secondWave = false) => {
  stopFlag = false;
  stopGameplayTimeTracking = false;

  trackGameplayTime();

  let startState = [getInitialState(custom, secondWave)];

  if (secondWave) {
    let steps = 70;

    while (steps-- > 0) {
      startState = await playState()(startState, updateProgress, false);
    }

    const { agents, agentCount, agentsAge, sickDelays } =
      startState[startState.length - 1];

    let {
      recovered: initialRecovered,
      dead: initialDead,
      reported: initialReported,
    } = startState[startState.length - 1];

    steps = 256 - 39;

    startState = [getInitialState(custom, secondWave)];

    let state = startState;

    let i = 0;

    while (steps-- > 0) {
      const reported = SECOND_WAVE_DAILY_REPORTED[i] || 0;
      const recovered = SECOND_WAVE_DAILY_RECOVERED[i] || 0;
      const dead = SECOND_WAVE_DAILY_DEATHS[i] || 0;

      const latestState = state[state.length - 1];

      const nextState = {
        ...latestState,
        agents,
        agentCount,
        agentsAge,
        sickDelays,
        initialRecovered: 70401 - initialRecovered,
        initialDead: 2543 - initialDead,
        initialReported: 93483 - initialReported,
        day: latestState.day + 1,
        reported: latestState.reported + reported,
        recovered: latestState.recovered + recovered,
        dead: latestState.dead + dead,
      };

      state = [...state, nextState];

      i++;
    }

    {
      const latestState = state[state.length - 1];

      latestState.agentCount = agentCount;
      latestState.agents = agents;
      latestState.sickDelays = sickDelays;
      latestState.agentsAge = agentsAge;

      latestState.events = [events.e20];
    }

    startState = state;
  } else {
    let steps = 6;

    while (steps-- > 0) {
      startState = await playState()(startState, updateProgress, false);
    }
  }

  return startState;
};

export default function App() {
  const [finished, setFinished] = useState(() => get("finished") === "true");
  const [tvpis, internalSetTvpis] = useState(() => get("tvpis") !== "off");
  const [menuActive, setMenuActive] = useState(true);
  const [busy, setBusy] = useState(false);
  const [action, setAction] = useState(false);
  const [media, setMedia] = useState(false);
  const [mediaCover, setMediaCover] = useState(false);
  const [state, setState] = useState(getStartState);
  const musicPlayer = useRef();
  const videoPlayer = useRef();
  const [event, changeEvent] = useState(undefined);
  const [actions, setActions] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [queuedState, queueState] = useState(undefined);
  const [audio, internalSetAudio] = useState(() => get("music") !== "off");
  const [daily, setDaily] = useState(true);
  const [stop, setStop] = useState(false);
  const [width, height] = useWindowSize();
  const [progress, setProgress] = useState(() => {
    const loaded = get("progress");
    return loaded ? JSON.parse(loaded) : {};
  });

  const onMenuSetActive = (value) => {
    setMenuActive(value);

    if (audio) {
      try {
        musicPlayer.current.play();
      } catch {}
    }
  };

  const onBackClick = () => {
    setFinished(get("finished") === "true");

    setMenuActive(true);
  };

  const onDailyClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDaily(true);
  };

  const onTotalClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDaily(false);
  };

  const onShowLogsClick = () => setShowLogs(true);

  const setAudio = (value) => {
    internalSetAudio(value);

    set("music")(value ? "on" : "off");
  };

  const setTvpis = (value) => {
    internalSetTvpis(value);

    set("tvpis")(value ? "on" : "off");
  };

  let progressCache = progress;

  const updateProgress = (f) => {
    const next = f(progressCache);

    progressCache = next;

    setProgress(next);

    set("progress")(JSON.stringify(next));
  };

  const setEvent = (event) => {
    if (event) {
      const maybeKeyValue = Object.entries(events).find(
        ([, value]) => value === event
      );

      if (maybeKeyValue) {
        const eventKey = maybeKeyValue[0];

        analytics(`event-${eventKey}`);

        updateProgress(({ unlockedEvents = [], ...rest }) => ({
          ...rest,
          unlockedEvents: [...new Set([...unlockedEvents, eventKey])],
        }));
      }
    }

    changeEvent(event);
  };

  const resetState = async (custom = false, secondWave = false) => {
    const nextState = await reset(updateProgress, custom, secondWave);

    setState(nextState);
  };

  const closeChart = () => setShowChart(false);
  const closeStats = () => setShowStats(false);
  const closeLogs = () => setShowLogs(false);
  const onShowStatsClick = () => setShowStats(true);
  const onShowChartClick = () => setShowChart(true);

  const togglePlay = () => {
    if (busy && !stopFlag) {
      analytics(`fast-forward-stop`);
      stopFlag = true;
      setStop(stopFlag);
    } else if (!busy) {
      playWeek();
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
        const actionKey = maybeActionKeyValue[0];

        analytics(`action-${actionKey}`);
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

  const onShowActionClick = () => showAction();

  const playDelayed = async (action) => {
    setBusy(true);
    await delay(100);
    const nextState = await playState(action)(state, updateProgress, true);
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
      const nextState = await playState()(currentState, updateProgress, false);
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

  const data = useMemo(
    () =>
      state.map((_, index) => ({
        ..._,
        day: index,
        name: formatDisplayDateWithOffset(index),
      })),
    [state]
  );

  const latestData = data[data.length - 1];
  const secondToLatestData = data[data.length - 2] ?? latestData;
  const thirdToLatestData =
    data[data.length - 3] ?? secondToLatestData ?? latestData;

  const {
    reported,
    dead,
    recovered,
    gameOver,
    day,
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

  const latestState = state[state.length - 1];

  const skipEvent = async () => {
    if (event && event.postAction) {
      event.postAction(latestState);
    }

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

  const { custom } = latestState;

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

  const dailyData = useMemo(
    () =>
      state.map((_, index) => ({
        ..._,
        day: index,
        name: formatDisplayDateWithOffset(index),
        reported:
          state[index].reported - state[Math.max(0, index - 1)].reported,
        recovered:
          state[index].recovered - state[Math.max(0, index - 1)].recovered,
        dead: state[index].dead - state[Math.max(0, index - 1)].dead,
      })),
    [state]
  );

  const dataSource = daily ? dailyData : data;
  const paddedData = useMemo(
    () => reverse(take(dataSource.length)(reverse(dataSource))),
    [dataSource]
  );

  const toggleMusic = (event) => {
    event.preventDefault();
    event.stopPropagation();

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
    event.stopPropagation();

    const nextState = !tvpis;

    setTvpis(nextState);

    analytics(nextState ? "video-enable" : "video-disable");
  };

  useEffect(() => {
    const possibleActions = latestState.secondWave
      ? Object.values(allActions)
      : Object.values(allActions).filter((value) => !value.secondWave);
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

  const today = offsetStartDate(latestState.day);
  const logEnabled = log && log.length > 0;
  const deathrattleLeft = DEATHRATTLE_LIMIT - deathrattle;

  const popup = Boolean(event || action || media);
  const volume = popup ? 0.5 : 1.0;

  useEffect(() => {
    if (musicPlayer && musicPlayer.current) {
      musicPlayer.current.volume = audio ? volume : 0;
    }
  }, [volume, audio]);

  return (
    <div className="App">
      <MapView height={height} width={width} />
      <div className="status-header">
        <StatusBar reported={reported} dead={dead} recovered={recovered} />
        <Today today={today} />
        {!gameOver ? (
          <GameControls
            busy={busy}
            daysToWin={daysToWin}
            deathrattleLeft={deathrattleLeft}
            onShowActionClick={onShowActionClick}
            politics={politics}
            stop={stop}
            togglePlay={togglePlay}
            underControl={underControl}
          />
        ) : (
          <GameOverControls onBackClick={onBackClick} win={win} />
        )}
      </div>
      {logEnabled && (
        <Logs closeLogs={closeLogs} log={log} showLogs={showLogs} />
      )}
      <Charts
        closeChart={closeChart}
        daily={daily}
        onDailyClick={onDailyClick}
        onTotalClick={onTotalClick}
        paddedData={paddedData}
        showChart={showChart}
        width={width}
      />
      <Statistics
        budget={budget}
        budgetDiff={budgetDiff}
        closeStats={closeStats}
        day={day}
        economy={economy}
        economyDiff={economyDiff}
        healthcare={healthcare}
        healthcareDiff={healthcareDiff}
        people={people}
        peopleDiff={peopleDiff}
        politics={politics}
        politicsDiff={politicsDiff}
        showStats={showStats}
        social={social}
        socialDiff={socialDiff}
      />
      <div className="logo-box gameplay">
        <Logo />
      </div>
      <Controls
        audio={audio}
        toggleMusic={toggleMusic}
        toggleTvpis={toggleTvpis}
        tvpis={tvpis}
      />
      <AppBar
        logEnabled={logEnabled}
        onShowChartClick={onShowChartClick}
        onShowLogsClick={onShowLogsClick}
        onShowStatsClick={onShowStatsClick}
      />
      {!media && event && !busy && (
        <Event event={event} skipEvent={skipEvent} />
      )}
      {action && (
        <Action
          actionLogo={actionLogo}
          actions={actions}
          performAction={performAction}
          skipAction={skipAction}
        />
      )}
      {media && (
        <Media
          latestQueuedState={latestQueuedState}
          mediaCover={mediaCover}
          newCases={newCases}
          newDeaths={newDeaths}
          newRecovered={newRecovered}
          skipMedia={skipMedia}
          skipVideo={skipVideo}
          tvpis={tvpis}
          videoPlayer={videoPlayer}
        />
      )}
      <audio
        autoPlay={audio}
        loop
        ref={musicPlayer}
        src={music}
        volume={volume}
      />
      <Menu
        active={menuActive}
        resetState={resetState}
        setActive={onMenuSetActive}
        custom={finished}
        progress={progress}
      />
    </div>
  );
}
