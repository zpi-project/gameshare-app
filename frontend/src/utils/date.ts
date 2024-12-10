const locale = "en-US";

export function getFirstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getFirstDayOfLastMonth(date: Date) {
  const firstDayOfCurrentMonth = getFirstDayOfMonth(date);
  firstDayOfCurrentMonth.setDate(firstDayOfCurrentMonth.getDate() - 1);
  firstDayOfCurrentMonth.setDate(1);
  return firstDayOfCurrentMonth;
}

export function getFirstDayOfNextMonth(date: Date) {
  const lastDayOfCurrentMonth = getLastDayOfMonth(date);
  lastDayOfCurrentMonth.setDate(lastDayOfCurrentMonth.getDate() + 1);
  lastDayOfCurrentMonth.setDate(1);
  return lastDayOfCurrentMonth;
}

export function getDaysInMonth(date: Date) {
  return getLastDayOfMonth(date).getDate();
}

export const formatDate = (date: Date, year = true): string => {
  const formatter = Intl.DateTimeFormat(locale, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  if (year) {
    const [month, day, year] = formatter.format(date).split("/");
    return `${day}.${month}.${year}`;
  } else {
    const [month, day] = formatter.format(date).split("/");
    return `${day}.${month}`;
  }
};
