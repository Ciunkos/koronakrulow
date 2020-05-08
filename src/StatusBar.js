import React from "react";

import TransitiveNumber from "./TransitiveNumber";
import formatNumber from "./formatNumber";
import Infected from "./Infected";
import Dead from "./Dead";
import Recovered from "./Recovered";

const StatusBar = ({ reported, dead, recovered }) => (
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

export default StatusBar;
