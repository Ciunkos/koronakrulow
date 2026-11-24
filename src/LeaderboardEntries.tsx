import React, { memo } from "react";

import LeaderboardEntry from "./LeaderboardEntry.tsx";
import type { LeaderboardEntry as LeaderboardEntryData } from "./types.ts";

interface LeaderboardEntriesProps {
  children: (LeaderboardEntryData | undefined)[];
}

const LeaderboardEntries = ({ children }: LeaderboardEntriesProps) => (
  <div className="leaderboard-entries layer">
    {children.map((entry, index) => {
      if (entry) {
        const { name, reported, recovered, dead, day } = entry;

        return (
          <LeaderboardEntry
            day={day}
            dead={dead}
            index={index}
            key={index}
            name={name}
            recovered={recovered}
            reported={reported}
          />
        );
      } else {
        return (
          <div className="leaderboard-entry empty" key={index}>
            <div>-</div>
          </div>
        );
      }
    })}
  </div>
);

export default memo(LeaderboardEntries);
