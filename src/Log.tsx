import React, { memo } from "react";

import formatLongDisplayDate from "./formatLongDisplayDate.ts";
import type { LogEntry } from "./types.ts";

import "./Log.scss";

interface LogGroup {
  date: Date;
  entries: LogEntry[];
}

// Entries of the same day, in order of their first appearance (the key is
// the date as a string, as in the groupBy helper this replaces).
const groupByDate = (log: LogEntry[]): LogGroup[] => {
  const groups = new Map<string, LogGroup>();

  for (const entry of log) {
    const key = String(entry.date);
    const group = groups.get(key);

    if (group) {
      group.entries.push(entry);
    } else {
      groups.set(key, { date: entry.date, entries: [entry] });
    }
  }

  return [...groups.values()];
};

const Log = ({ children: log }: { children: LogEntry[] }) => {
  const grouped = groupByDate(log);

  return (
    <div className="log">
      {grouped.map(({ date, entries }) => (
        <div className="log-group" key={String(date)}>
          <div className="log-group-title">• {formatLongDisplayDate(date)}</div>
          <div className="log-group-body">
            {entries.map((logEntry, index) => (
              <div className="log-group-body-entry" key={index}>
                {logEntry.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Log);
