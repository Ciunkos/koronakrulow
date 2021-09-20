import React, { memo } from "react";

const AppBar = ({
  logEnabled,
  onShowChartClick,
  onShowLogsClick,
  onShowStatsClick,
}) => (
  <div className="app-bar">
    <div disabled={logEnabled} onClick={onShowLogsClick}>
      Dziennik
    </div>
    <div onClick={onShowStatsClick}>Status</div>
    <div onClick={onShowChartClick}>Statystyki</div>
  </div>
);

export default memo(AppBar);
