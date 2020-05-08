const formatDisplayDate = (date) =>
  new Intl.DateTimeFormat("pl-PL").format(date);

export default formatDisplayDate;
