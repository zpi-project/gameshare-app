export function getFirstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getFirstDayOfLastMonth(date: Date) {
  let firstDayOfCurrentMonth = getFirstDayOfMonth(date);
  firstDayOfCurrentMonth.setDate(firstDayOfCurrentMonth.getDate() - 1);
  firstDayOfCurrentMonth.setDate(1);
  return firstDayOfCurrentMonth;
}

export function getFirstDayOfNextMonth(date: Date) {
  let lastDayOfCurrentMonth = getLastDayOfMonth(date);
  lastDayOfCurrentMonth.setDate(lastDayOfCurrentMonth.getDate() + 1);
  lastDayOfCurrentMonth.setDate(1);
  return lastDayOfCurrentMonth;
}

export function getDaysInMonth(date: Date) {
  return getLastDayOfMonth(date).getDate();
}
