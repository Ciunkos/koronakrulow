import formatLongDisplayDate from "./formatLongDisplayDate";
import offsetStartDate from "./offsetStartDate";

const formatLongDisplayDateWithOffsetWithOffset = (offset) =>
  formatLongDisplayDate(offsetStartDate(offset));

export default formatLongDisplayDateWithOffsetWithOffset;
