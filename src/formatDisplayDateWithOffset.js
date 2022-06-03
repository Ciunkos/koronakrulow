import formatDisplayDate from "./formatDisplayDate.js";
import offsetStartDate from "./offsetStartDate.js";

const formatDisplayDateWithOffset = (offset) =>
  formatDisplayDate(offsetStartDate(offset));

export default formatDisplayDateWithOffset;
