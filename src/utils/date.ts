import { format, parseISO } from "date-fns";

export const dateFormat = (date: any, fm = "dd MMMM yyyy HH:mm:ss") => {
  const result = format(parseISO(date), fm);
  return result;
};

export const formatDateString = (dateNum: number) => {
  switch (dateNum) {
    case 1:
      return "Sun";
    case 2:
      return "Mon";
    case 3:
      return "Tue";
    case 4:
      return "Wed";
    case 5:
      return "Thu";
    case 6:
      return "Fri";
    case 7:
      return "Sat";
    case 8:
      return "PH";
    default:
  }
};
