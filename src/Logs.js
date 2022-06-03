import { reverse } from "@sandstreamdev/std/array/index.js";
import { classNames } from "@sandstreamdev/std/web/index.js";
import React, { memo } from "react";

import CloseIcon from "./CloseIcon.js";
import Log from "./Log.js";

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
