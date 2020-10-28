import { reverse } from "@sandstreamdev/std/array";
import { classNames } from "@sandstreamdev/std/web";
import React, { memo } from "react";

import CloseIcon from "./CloseIcon";
import Log from "./Log";

const Logs = ({ closeLogs, log, showLogs }) => (
  <div className={classNames("container logs", { active: showLogs })}>
    <div className="container-header">
      <CloseIcon onClick={closeLogs} />
      <h3>Dziennik</h3>
    </div>
    <Log>{reverse(log)}</Log>
  </div>
);

export default memo(Logs);
