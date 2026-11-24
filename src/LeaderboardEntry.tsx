import React, { memo } from "react";

import StatusBar from "./StatusBar.tsx";
import formatLongDisplayDateWithOffset from "./formatLongDisplayDateWithOffset.ts";

interface LeaderboardEntryProps {
  index: number;
  name: string;
  day: number;
  reported: number;
  dead: number;
  recovered: number;
}

const LeaderboardEntry = ({
  index,
  name,
  day,
  reported,
  dead,
  recovered,
}: LeaderboardEntryProps) => (
  <div className="leaderboard-entry">
    <div>
      {index + 1}. <span className="entry-name">{name}</span>,{" "}
      <span>{formatLongDisplayDateWithOffset(day)}</span>
    </div>
    <StatusBar reported={reported} dead={dead} recovered={recovered} />
  </div>
);

export default memo(LeaderboardEntry);
