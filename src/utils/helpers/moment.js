import moment from "moment";

export const fromNow = ({ date, unit = "days" }) =>
  moment().diff(moment(date), unit);

export const now = moment;

export const startOf = ({
  date,
  unit = "day",
  format = "YYYY-MM-DD HH:mm",
}) => {
  return moment(date)
    .startOf(unit)
    .format(format);
};

export const endOf = ({
  date,
  unit = "day",
  format = "YYYY-MM-DD HH:mm",
}) => {
  return moment(date)
    .endOf(unit)
    .format(format);
};

export const timestampToDate = (date) => {
  return typeof date === 'object' ?  date : moment(parseInt(date, 10));
}

export const datesEqual = (d1, d2) => {
  d1 = dateToString(d1);
  d2 = dateToString(d2);

  return d1 === d2;
}

export const dateToString = (date, format = "DD-MM-YYYY") => {
  return date ? moment( isNaN(date) ? date : parseInt(date, 10)).format(format) : '';
}

export const formatDate = ({ date, format }) => moment(date).format(format);
