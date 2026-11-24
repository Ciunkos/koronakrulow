import startDate from "./startDate.ts";

const addDays = (days: number) => (date: Date) => {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
};

const cache = new Map<number, Date>();

const offsetStartDate = (offset: number): Date => {
  const cached = cache.get(offset);

  if (cached) {
    return cached;
  }

  const result = addDays(offset)(startDate);

  cache.set(offset, result);

  return result;
};

export default offsetStartDate;
