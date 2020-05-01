import { range } from "@sandstreamdev/std/array";
import { classNames } from "@sandstreamdev/std/web";
import React from "react";

import TransitiveNumber from "./TransitiveNumber";
import formatNumber from "./formatNumber";

const StatsRow = ({ title, children: value }) => (
  <div className={classNames("stats-row", { empty: value === 0 })}>
    <div className="stats-row-header">
      <div className="stats-row-label">{title}</div>
      <div>
        <TransitiveNumber enableInitialAnimation={false}>
          {formatNumber(value)}
        </TransitiveNumber>{" "}
        / 10
      </div>
    </div>
    <div className="progress-bar">
      {range(10).map((index) => (
        <div className={index < value ? "cell" : "cell empty"} key={index} />
      ))}
    </div>
  </div>
);

export default StatsRow;
