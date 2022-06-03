import formatLongDisplayDate from "./formatLongDisplayDate.js";
import offsetStartDate from "./offsetStartDate.js";

const formatLongDisplayDateWithOffsetWithOffset = (offset) =>
  formatLongDisplayDate(offsetStartDate(offset));

export default formatLongDisplayDateWithOffsetWithOffset;
