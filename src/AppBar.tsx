import React, { memo } from "react";

import onActivate from "./onActivate.ts";

interface AppBarProps {
  logEnabled: boolean;
  onShowChartClick: () => void;
  onShowLogsClick: () => void;
  onShowStatsClick: () => void;
}

const AppBar = ({
  logEnabled,
  onShowChartClick,
  onShowLogsClick,
  onShowStatsClick,
}: AppBarProps) => (
  <div className="app-bar">
    <div
      onClick={onShowLogsClick}
      onKeyDown={onActivate(onShowLogsClick)}
      role="button"
      tabIndex={0}
    >
      Dziennik
    </div>
    <div
      onClick={onShowStatsClick}
      onKeyDown={onActivate(onShowStatsClick)}
      role="button"
      tabIndex={0}
    >
      Status
    </div>
    <div
      onClick={onShowChartClick}
      onKeyDown={onActivate(onShowChartClick)}
      role="button"
      tabIndex={0}
    >
      Statystyki
    </div>
  </div>
);

export default memo(AppBar);
