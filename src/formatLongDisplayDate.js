const formatLongDisplayDate = (date) =>
  new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

export default formatLongDisplayDate;
