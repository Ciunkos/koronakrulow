const formatter = new Intl.DateTimeFormat("pl-PL");

const formatDisplayDate = (date: Date) => formatter.format(date);

export default formatDisplayDate;
