import { groupBy } from "@sandstreamdev/std/object";
import React, { memo } from "react";

import formatLongDisplayDate from "./formatLongDisplayDate";

import "./Log.scss";

const byDate = (x) => x.date;

const Log = ({ children: log }) => {
  const grouped = groupBy(byDate)(log);

  return (
    <div className="log">
      {Object.entries(grouped).map(([key, group]) => (
        <div className="log-group" key={key}>
          <div className="log-group-title">
            • {formatLongDisplayDate(group[0].date)}
          </div>
          <div className="log-group-body">
            {group.map((logEntry, index) => (
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
