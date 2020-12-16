// @flow

import dayjs from 'dayjs';

export function getFirstDayOfMonth(date: dayjs.Dayjs): dayjs.Dayjs {
  return date.date(1);
}

export function getLastDayOfMonth(date: dayjs.Dayjs): dayjs.Dayjs {
  return date.date(date.daysInMonth());
}
