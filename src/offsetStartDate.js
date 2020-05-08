import startDate from "./startDate";

const addDays = (days) => (date) => {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
};

const offsetStartDate = (offset) => addDays(offset)(startDate);

export default offsetStartDate;
