import React, { memo, useState } from "react";
import type { MouseEvent } from "react";

import useWindowSize from "./useWindowSize.ts";
import analytics from "./analytics.ts";
import Legal from "./Legal.tsx";
import Logo from "./Logo.tsx";
import MapView from "./MapView.tsx";
import MenuOptions from "./MenuOptions.tsx";
import Progress from "./Progress.tsx";
import LeaderboardsController from "./LeaderboardsController.tsx";
import * as randomPropaganda from "./random/index.ts";
import * as allActions from "./actions.ts";
import * as allEvents from "./events.tsx";
import { SHOW_LEADERBOARD } from "./leaderboards.ts";
import { enabled as secondWaveEnabled } from "./secondWave.ts";

import "./Menu.scss";
import type { Progress as ProgressData } from "./types.ts";

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

interface MenuProps {
  active: boolean;
  setActive: (active: boolean) => void;
  resetState: (custom?: boolean, secondWave?: boolean) => Promise<void>;
  custom: boolean;
  progress: ProgressData;
}

const Menu = ({
  active,
  setActive,
  resetState,
  custom,
  progress,
}: MenuProps) => {
  const [width, height] = useWindowSize();
  const [details, showDetails] = useState(false);

  const toggleDetails = (event: MouseEvent) => {
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

  const {
    won = 0,
    lost = 0,
    games = 0,
    unlockedActions = [],
    unlockedEvents = [],
    unlockedStripes = [],
  } = progress;

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
        {SHOW_LEADERBOARD && <LeaderboardsController active={active} />}
        <Legal details={details} toggleDetails={toggleDetails} />
      </div>
    </div>
  );
};

export default memo(Menu);
