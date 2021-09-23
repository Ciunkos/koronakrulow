import React, { memo, useState } from "react";

import useWindowSize from "./useWindowSize";
import analytics from "./analytics";
import Legal from "./Legal";
import Logo from "./Logo";
import MapView from "./MapView";
import MenuOptions from "./MenuOptions";
import Progress from "./Progress";
import LeaderboardsController from "./LeaderboardsController";
import * as randomPropaganda from "./random";
import * as allActions from "./actions";
import * as allEvents from "./events";
import { SHOW_LEADERBOARD } from "./leaderboards";
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

const Menu = ({ active, setActive, resetState, custom, progress }) => {
  const [width, height] = useWindowSize();
  const [details, showDetails] = useState(false);

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
