// @flow

import * as React from 'react';
import DaysOfWeek from 'components/calendar/DaysOfWeek.react';
import DaysInMonth from 'components/calendar/DaysInMonth.react';
import {getFirstDayOfMonth} from 'utils/dates';
import dayjs from 'dayjs';

/**
 * Holds the whole calendar component
 */
export default function Calendar(): React.Node {
  const startDate = getFirstDayOfMonth(dayjs());
  return (
    <div>
      <DaysOfWeek />
      <DaysInMonth navigationDate={startDate} />
    </div>
  );
}
