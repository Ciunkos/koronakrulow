import { classNames } from "@sandstreamdev/std/web/index.js";
import React, { memo } from "react";

import CloseIcon from "./CloseIcon.js";
import StatsRow from "./StatsRow.js";

const Statistics = ({
  budget,
  budgetDiff,
  closeStats,
  day,
  economy,
  economyDiff,
  healthcare,
  healthcareDiff,
  people,
  peopleDiff,
  politics,
  politicsDiff,
  showStats,
  social,
  socialDiff,
}) => (
  <div className={classNames("container statistics", { active: showStats })}>
    <div className="container-header">
      <CloseIcon onClick={closeStats} />
      <h3>Status</h3>
    </div>
    <div className="stats">
      <StatsRow title="Budżet" diff={budgetDiff} day={day}>
        {budget}
      </StatsRow>
      <StatsRow title="Gospodarka" diff={economyDiff} day={day}>
        {economy}
      </StatsRow>
      <StatsRow title="Socjal" diff={socialDiff} day={day}>
        {social}
      </StatsRow>
      <StatsRow title="Służba zdrowia" diff={healthcareDiff} day={day}>
        {healthcare}
      </StatsRow>
      <StatsRow title="Społeczeństwo" diff={peopleDiff} day={day}>
        {people}
      </StatsRow>
      <StatsRow title="Poparcie partii" diff={politicsDiff} day={day}>
        {politics}
      </StatsRow>
    </div>
  </div>
);

export default memo(Statistics);
