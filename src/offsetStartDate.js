import startDate from "./startDate";

const addDays = (days) => (date) => {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
};

let cache = {};

const offsetStartDate = (offset) => {
  const cached = cache[offset];

  if (cached) {
    return cached;
  }

  const result = addDays(offset)(startDate);

  cache[offset] = result;

  return result;
};

export default offsetStartDate;
