import React, { memo } from "react";

import onActivate from "./onActivate.ts";

const AppBar = ({
  logEnabled,
  onShowChartClick,
  onShowLogsClick,
  onShowStatsClick,
}) => (
  <div className="app-bar">
    <div
      disabled={logEnabled}
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
