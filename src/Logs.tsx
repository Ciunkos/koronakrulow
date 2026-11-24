import { reverse } from "@sandstreamdev/std/array/index.js";
import { classNames } from "@sandstreamdev/std/web/index.js";
import React, { memo } from "react";

import CloseIcon from "./CloseIcon.tsx";
import Log from "./Log.tsx";
import type { LogEntry } from "./types.ts";

interface LogsProps {
  closeLogs: () => void;
  log: LogEntry[];
  showLogs: boolean;
}

const Logs = ({ closeLogs, log, showLogs }: LogsProps) => (
  <div className={classNames("container logs", { active: showLogs })}>
    <div className="container-header">
      <CloseIcon onClick={closeLogs} />
      <h3>Dziennik</h3>
    </div>
    <Log>{reverse(log)}</Log>
  </div>
);

export default memo(Logs);
