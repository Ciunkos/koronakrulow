import { classNames } from "@sandstreamdev/std/web/index.js";
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

import CloseIcon from "./CloseIcon.tsx";
import type { MouseEvent } from "react";
import type { ChartDatum } from "./types.ts";

const isAnimationActive = false;

// Recharts 3 sorts legend and tooltip items alphabetically by default;
// keep the order of the lines below, as Recharts 2 did.
const seriesOrder = ["reported", "dead", "recovered"];
const bySeriesOrder = ({ dataKey }: { dataKey?: unknown }) =>
  typeof dataKey === "string" ? seriesOrder.indexOf(dataKey) : -1;

interface ChartsProps {
  closeChart: () => void;
  daily: boolean;
  onDailyClick: (event: MouseEvent) => void;
  onTotalClick: (event: MouseEvent) => void;
  paddedData: ChartDatum[];
  showChart: boolean;
  width: number;
}

const Charts = ({
  closeChart,
  daily,
  onDailyClick,
  onTotalClick,
  paddedData,
  showChart,
  width,
}: ChartsProps) => (
  <div className={classNames("container chart", { active: showChart })}>
    <div className="container-header">
      <CloseIcon onClick={closeChart} />
      <h3>Statystyki</h3>
    </div>
    <div className="tabs">
      <button
        type="button"
        className={classNames("link tab", { active: daily })}
        onClick={onDailyClick}
      >
        {" "}
        Dziennie
      </button>
      <button
        type="button"
        className={classNames("link tab", { active: !daily })}
        onClick={onTotalClick}
      >
        Łącznie
      </button>
    </div>
    <LineChart
      accessibilityLayer={false}
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
      <Tooltip itemSorter={bySeriesOrder} />
      <Legend itemSorter={bySeriesOrder} />
    </LineChart>
  </div>
);

export default memo(Charts);
