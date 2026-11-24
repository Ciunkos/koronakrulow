import React, { memo } from "react";

import formatLongDisplayDate from "./formatLongDisplayDate.ts";

interface TodayProps {
  today: Date;
}

const Today = ({ today }: TodayProps) => (
  <div>{formatLongDisplayDate(today)}</div>
);

export default memo(Today);
