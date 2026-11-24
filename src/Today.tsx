import React, { memo } from "react";

import formatLongDisplayDate from "./formatLongDisplayDate.ts";

const Today = ({ today }) => <div>{formatLongDisplayDate(today)}</div>;

export default memo(Today);
