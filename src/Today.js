import React, { memo } from "react";

import formatLongDisplayDate from "./formatLongDisplayDate";

const Today = ({ today }) => <div>{formatLongDisplayDate(today)}</div>;

export default memo(Today);
