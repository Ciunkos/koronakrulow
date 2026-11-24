import { classNames } from "@sandstreamdev/std/web/index.js";
import React, { memo } from "react";

import LeaderboardEntries from "./LeaderboardEntries.tsx";
import type { MouseEvent } from "react";
import type { LeaderboardEntry as LeaderboardEntryData } from "./types.ts";

interface LeaderboardProps {
  daily: boolean;
  hasMoreLost: boolean;
  hasMoreWon: boolean;
  leaderboardsLostSource: (LeaderboardEntryData | undefined)[];
  leaderboardsWonSource: (LeaderboardEntryData | undefined)[];
  onDailyClick: (event: MouseEvent) => void;
  onFirstWaveClick: (event: MouseEvent) => void;
  onSecondWaveClick: (event: MouseEvent) => void;
  onTotalClick: (event: MouseEvent) => void;
  secondWave: boolean;
  secondWaveEnabled: boolean;
  showMoreLost: (event: MouseEvent) => void;
  showMoreWon: (event: MouseEvent) => void;
}

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
}: LeaderboardProps) => (
  <section>
    <h3>Ranking</h3>
    {secondWaveEnabled && (
      <div className="tabs">
        <button
          type="button"
          className={classNames("link tab", { active: secondWave })}
          onClick={onSecondWaveClick}
        >
          DRUGA FALA
        </button>
        <button
          type="button"
          className={classNames("link tab", { active: !secondWave })}
          onClick={onFirstWaveClick}
        >
          PIERWSZA FALA
        </button>
      </div>
    )}
    <div className="tabs">
      <button
        type="button"
        className={classNames("link tab", { active: daily })}
        onClick={onDailyClick}
      >
        Dzisiaj
      </button>
      <button
        type="button"
        className={classNames("link tab", { active: !daily })}
        onClick={onTotalClick}
      >
        Łączny
      </button>
    </div>
    <div className="leaderboards">
      <div>
        <h4>Najszybciej opanowana epidemia</h4>
        <LeaderboardEntries>{leaderboardsWonSource}</LeaderboardEntries>
        {hasMoreWon && (
          <button type="button" className="link" onClick={showMoreWon}>
            Pokaż więcej
          </button>
        )}
      </div>
      <div>
        <h4>Najszybciej rozwiązany rząd</h4>
        <LeaderboardEntries>{leaderboardsLostSource}</LeaderboardEntries>
        {hasMoreLost && (
          <button type="button" className="link" onClick={showMoreLost}>
            Pokaż więcej
          </button>
        )}
      </div>
    </div>
  </section>
);

export default memo(Leaderboard);
