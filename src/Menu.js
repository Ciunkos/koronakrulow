import { exact } from "@sandstreamdev/std/array";
import { clamp } from "@sandstreamdev/std/math";
import React, { memo, useEffect, useMemo, useState } from "react";

import useWindowSize from "./useWindowSize";
import analytics from "./analytics";
import Leaderboard from "./Leaderboard";
import Legal from "./Legal";
import Logo from "./Logo";
import MapView from "./MapView";
import MenuOptions from "./MenuOptions";
import Progress from "./Progress";
import * as randomPropaganda from "./random";
import * as allActions from "./actions";
import * as allEvents from "./events";
import useApi from "./useApi";
import { LEADERBOARDS_ENDPOINT } from "./leaderboards";
import { enabled as secondWaveEnabled } from "./secondWave";

import "./Menu.scss";

const actions = secondWaveEnabled
  ? allActions
  : Object.fromEntries(
      Object.entries(allActions).filter(([, value]) => !value.secondWave)
    );

const events = secondWaveEnabled
  ? allEvents
  : Object.fromEntries(
      Object.entries(allEvents).filter(([, value]) => !value.secondWave)
    );

const SHOW_LEADERBOARD = true;

const LEADERBOARD_RANGE = 5;

const padded = [undefined, undefined, undefined, undefined, undefined];

const Menu = ({ active, setActive, resetState, custom, progress }) => {
  const [width, height] = useWindowSize();
  const [details, showDetails] = useState(false);
  const [daily, setDaily] = useState(true);
  const [secondWave, setSecondWave] = useState(secondWaveEnabled);
  const [wonTake, setWonTake] = useState(LEADERBOARD_RANGE);
  const [lostTake, setLostTake] = useState(LEADERBOARD_RANGE);

  const toggleDetails = (event) => {
    event.preventDefault();
    event.stopPropagation();

    showDetails(!details);
  };

  const onPlayClick = async () => {
    analytics("play");
    await resetState(false);
    setActive(false);
  };

  const onSecondWavePlayClick = async () => {
    analytics("play_second_wave");
    await resetState(false, true);
    setActive(false);
  };

  const onCustomPlayClick = async () => {
    analytics("play_custom");
    await resetState(true);
    setActive(false);
  };

  const [leaderboardsSource, { busy, refetch }] = useApi(LEADERBOARDS_ENDPOINT);

  useEffect(() => {
    if (active && !busy) {
      refetch();
    }
  }, [active, busy, refetch]);

  const leaderboards = leaderboardsSource ?? {
    daily: { won: padded, lost: padded },
    allTime: { won: padded, lost: padded },
  };

  const rankingSource = daily ? leaderboards.daily : leaderboards.allTime;

  const hasMoreWon = rankingSource.won.length > wonTake;
  const hasMoreLost = rankingSource.lost.length > lostTake;

  const showMoreLost = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLostTake(lostTake + 5 * LEADERBOARD_RANGE);
  };

  const showMoreWon = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setWonTake(wonTake + 5 * LEADERBOARD_RANGE);
  };

  const {
    won = 0,
    lost = 0,
    games = 0,
    unlockedActions = [],
    unlockedEvents = [],
    unlockedStripes = [],
  } = progress;

  const leaderboardsWonSource = useMemo(
    () =>
      exact(
        clamp(
          LEADERBOARD_RANGE,
          Math.max(LEADERBOARD_RANGE, rankingSource.won.length)
        )(wonTake)
      )(rankingSource.won),
    [rankingSource.won, wonTake]
  );

  const leaderboardsLostSource = useMemo(
    () =>
      exact(
        clamp(
          LEADERBOARD_RANGE,
          Math.max(LEADERBOARD_RANGE, rankingSource.lost.length)
        )(lostTake)
      )(rankingSource.lost),
    [rankingSource.lost, lostTake]
  );

  const onFirstWaveClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSecondWave(false);
  };

  const onSecondWaveClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSecondWave(true);
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

  return (
    <div className={active ? "backdrop active" : "backdrop"}>
      <MapView height={height} width={width} />
      <div className="menu">
        <Logo />
        <MenuOptions
          custom={custom}
          onCustomPlayClick={onCustomPlayClick}
          onPlayClick={onPlayClick}
          onSecondWavePlayClick={onSecondWavePlayClick}
          secondWaveEnabled={secondWaveEnabled}
        />
        <Progress
          actions={actions}
          events={events}
          games={games}
          lost={lost}
          randomPropaganda={randomPropaganda}
          unlockedActions={unlockedActions}
          unlockedEvents={unlockedEvents}
          unlockedStripes={unlockedStripes}
          won={won}
        />
        {SHOW_LEADERBOARD && (
          <Leaderboard
            daily={daily}
            hasMoreLost={hasMoreLost}
            hasMoreWon={hasMoreWon}
            leaderboardsLostSource={leaderboardsLostSource}
            leaderboardsWonSource={leaderboardsWonSource}
            onDailyClick={onDailyClick}
            onFirstWaveClick={onFirstWaveClick}
            onSecondWaveClick={onSecondWaveClick}
            onTotalClick={onTotalClick}
            secondWave={secondWave}
            secondWaveEnabled={secondWaveEnabled}
            showMoreLost={showMoreLost}
            showMoreWon={showMoreWon}
          />
        )}
        <Legal details={details} toggleDetails={toggleDetails} />
      </div>
    </div>
  );
};

export default memo(Menu);
