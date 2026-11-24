import formatLongDisplayDate from "./formatLongDisplayDate.ts";
import offsetStartDate from "./offsetStartDate.ts";

const formatLongDisplayDateWithOffsetWithOffset = (offset) =>
  formatLongDisplayDate(offsetStartDate(offset));

export default formatLongDisplayDateWithOffsetWithOffset;
