const formatter = new Intl.DateTimeFormat("pl-PL");

const formatDisplayDate = (date) => formatter.format(date);

export default formatDisplayDate;
