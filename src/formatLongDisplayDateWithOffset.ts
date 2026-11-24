import formatLongDisplayDate from "./formatLongDisplayDate.ts";
import offsetStartDate from "./offsetStartDate.ts";

const formatLongDisplayDateWithOffsetWithOffset = (offset: number) =>
  formatLongDisplayDate(offsetStartDate(offset));

export default formatLongDisplayDateWithOffsetWithOffset;
