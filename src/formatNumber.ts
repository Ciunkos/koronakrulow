const formatter = new Intl.NumberFormat("pl-PL");

const formatNumber = (number) => formatter.format(number);

export default formatNumber;
