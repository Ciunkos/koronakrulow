import formatDisplayDate from "./formatDisplayDate.ts";
import offsetStartDate from "./offsetStartDate.ts";

const formatDisplayDateWithOffset = (offset: number) =>
  formatDisplayDate(offsetStartDate(offset));

export default formatDisplayDateWithOffset;
