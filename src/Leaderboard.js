import { classNames } from "@sandstreamdev/std/web";
import React, { memo } from "react";

import LeaderboardEntries from "./LeaderboardEntries";

const Leaderboard = ({
  daily,
  hasMoreLost,
  hasMoreWon,
  leaderboardsLostSource,
  leaderboardsWonSource,
  onDailyClick,
  onFirstWaveClick,
  onSecondWaveClick,
  onTotalClick,
  secondWave,
  secondWaveEnabled,
  showMoreLost,
  showMoreWon,
}) => (
  <section>
    <h3>Ranking</h3>
    {secondWaveEnabled && (
      <div className="tabs">
        <a
          href="#"
          className={classNames("tab", { active: secondWave })}
          onClick={onSecondWaveClick}
        >
          DRUGA FALA
        </a>
        <a
          href="#"
          className={classNames("tab", { active: !secondWave })}
          onClick={onFirstWaveClick}
        >
          PIERWSZA FALA
        </a>
      </div>
    )}
    <div className="tabs">
      <a
        href="#"
        className={classNames("tab", { active: daily })}
        onClick={onDailyClick}
      >
        Dzisiaj
      </a>
      <a
        href="#"
        className={classNames("tab", { active: !daily })}
        onClick={onTotalClick}
      >
        Łączny
      </a>
    </div>
    <div className="leaderboards">
      <div>
        <h4>Najszybciej opanowana epidemia</h4>
        <LeaderboardEntries>{leaderboardsWonSource}</LeaderboardEntries>
        {hasMoreWon && (
          <a href="#" onClick={showMoreWon}>
            Pokaż więcej
          </a>
        )}
      </div>
      <div>
        <h4>Najszybciej rozwiązany rząd</h4>
        <LeaderboardEntries>{leaderboardsLostSource}</LeaderboardEntries>
        {hasMoreLost && (
          <a href="#" onClick={showMoreLost}>
            Pokaż więcej
          </a>
        )}
      </div>
    </div>
  </section>
);

export default memo(Leaderboard);
