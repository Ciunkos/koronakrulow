const formatter = new Intl.DateTimeFormat("pl-PL", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const formatLongDisplayDate = (date) => formatter.format(date);

export default formatLongDisplayDate;
