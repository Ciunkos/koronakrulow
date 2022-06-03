import { exact } from "@sandstreamdev/std/array/index.js";
import { clamp } from "@sandstreamdev/std/math/index.js";
import React, { useEffect, useMemo, useState } from "react";

import useApi from "./useApi.js";
import { LEADERBOARDS_ENDPOINT } from "./leaderboards.js";
import Leaderboard from "./Leaderboard.js";
import { enabled as secondWaveEnabled } from "./secondWave.js";

const LEADERBOARD_RANGE = 5;

const padded = [undefined, undefined, undefined, undefined, undefined];

const LeaderboardsController = ({ active }) => {
  const [wonTake, setWonTake] = useState(LEADERBOARD_RANGE);
  const [lostTake, setLostTake] = useState(LEADERBOARD_RANGE);
  const [daily, setDaily] = useState(true);

  const [secondWave, setSecondWave] = useState(secondWaveEnabled);

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

  const [leaderboardsSource, { busy, refetch }] = useApi(LEADERBOARDS_ENDPOINT);

  useEffect(() => {
    console.log({ active, busy });

    if (active && !busy) {
      refetch();
    }
  }, [active]);

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

  return (
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
  );
};

export default LeaderboardsController;
