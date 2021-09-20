import { classNames } from "@sandstreamdev/std/web";
import React, { memo } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
} from "recharts";

import CloseIcon from "./CloseIcon";

const isAnimationActive = false;

const Charts = ({
  closeChart,
  daily,
  onDailyClick,
  onTotalClick,
  paddedData,
  showChart,
  width,
}) => (
  <div className={classNames("container chart", { active: showChart })}>
    <div className="container-header">
      <CloseIcon onClick={closeChart} />
      <h3>Statystyki</h3>
    </div>
    <div className="tabs">
      <a
        href="#"
        className={classNames("tab", { active: daily })}
        onClick={onDailyClick}
      >
        {" "}
        Dziennie
      </a>
      <a
        href="#"
        className={classNames("tab", { active: !daily })}
        onClick={onTotalClick}
      >
        Łącznie
      </a>
    </div>
    <LineChart
      width={width < 720 ? width - 64 : 360}
      height={240}
      data={paddedData}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line
        dataKey="reported"
        dot={false}
        isAnimationActive={isAnimationActive}
        name="Zakażeni"
        stroke="#ffa000"
        type="monotone"
      />
      <Line
        dataKey="dead"
        dot={false}
        isAnimationActive={isAnimationActive}
        name="Zgony"
        stroke="#e64a19"
        type="monotone"
      />
      <Line
        dataKey="recovered"
        dot={false}
        isAnimationActive={isAnimationActive}
        name="Wyleczenia"
        stroke="#388e3c"
        type="monotone"
      />
      <Tooltip />
      <Legend />
    </LineChart>
  </div>
);

export default memo(Charts);
