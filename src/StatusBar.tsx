import React, { memo } from "react";

import TransitiveNumber from "./TransitiveNumber.tsx";
import formatNumber from "./formatNumber.ts";
import Infected from "./Infected.tsx";
import Dead from "./Dead.tsx";
import Recovered from "./Recovered.tsx";

interface StatusBarProps {
  reported: number;
  dead: number;
  recovered: number;
}

const StatusBar = ({ reported, dead, recovered }: StatusBarProps) => (
  <div className="status-bar">
    <div className="status-row infected">
      <div className="status-row-label">Currently infected</div>
      <div className="status-row-icon">
        <Infected />
      </div>
      <div>
        <TransitiveNumber>{formatNumber(reported)}</TransitiveNumber>
      </div>
    </div>
    <div className="status-row dead">
      <div className="status-row-label">Total deaths</div>
      <div className="status-row-icon">
        <Dead />
      </div>
      <div>
        <TransitiveNumber>{formatNumber(dead)}</TransitiveNumber>
      </div>
    </div>
    <div className="status-row recovered">
      <div className="status-row-label">Total recovered</div>
      <div className="status-row-icon">
        <Recovered />
      </div>
      <div>
        <TransitiveNumber>{formatNumber(recovered)}</TransitiveNumber>
      </div>
    </div>
  </div>
);

export default memo(StatusBar);
