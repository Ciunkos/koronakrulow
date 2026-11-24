import formatDisplayDate from "./formatDisplayDate.ts";
import offsetStartDate from "./offsetStartDate.ts";

const formatDisplayDateWithOffset = (offset) =>
  formatDisplayDate(offsetStartDate(offset));

export default formatDisplayDateWithOffset;
