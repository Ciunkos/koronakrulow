import React, { memo } from "react";

import StatusBar from "./StatusBar.js";
import formatLongDisplayDateWithOffset from "./formatLongDisplayDateWithOffset.js";

const LeaderboardEntry = ({ index, name, day, reported, dead, recovered }) => (
  <div className="leaderboard-entry">
    <div>
      {index + 1}. <span className="entry-name">{name}</span>,{" "}
      <span>{formatLongDisplayDateWithOffset(day)}</span>
    </div>
    <StatusBar reported={reported} dead={dead} recovered={recovered} />
  </div>
);

export default memo(LeaderboardEntry);
