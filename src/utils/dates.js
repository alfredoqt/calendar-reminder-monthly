// @flow

import type {UnitType} from 'dayjs';

import dayjs from 'dayjs';

export function getFirstDayOfMonth(date: dayjs.Dayjs): dayjs.Dayjs {
  return date.date(1);
}

export function getLastDayOfMonth(date: dayjs.Dayjs): dayjs.Dayjs {
  return date.date(date.daysInMonth());
}

export function isWeekend(date: dayjs.Dayjs): boolean {
  return date.day() === 0 || date.day() === 6;
}

export function generateDatesInIntervals(
  date: dayjs.Dayjs,
  interval: number,
  limit: number,
  unit: UnitType,
): Array<dayjs.Dayjs> {
  const dates = new Array(limit);

  for (let i = 0; i < limit; ++i) {
    dates[i] = date.add(interval * i, unit);
  }

  return dates;
}
