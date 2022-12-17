import { formatDistanceToNow } from "date-fns";
// import {es} from 'date-fns/locale'

export const getFormatDistanceToNow = (date) => {
  // per passar a castella podem posar
  // const fromNow = formatDistanceToNow(date, {locale: es});

  const fromNow = formatDistanceToNow(date);

  return `${fromNow} ago`;
};
