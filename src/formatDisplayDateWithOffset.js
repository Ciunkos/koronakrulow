import formatDisplayDate from "./formatDisplayDate";
import offsetStartDate from "./offsetStartDate";

const formatDisplayDateWithOffset = (offset) =>
  formatDisplayDate(offsetStartDate(offset));

export default formatDisplayDateWithOffset;
