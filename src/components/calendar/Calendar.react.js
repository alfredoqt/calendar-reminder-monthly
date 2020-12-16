// @flow

import * as React from 'react';
import {useState} from 'react';
import DaysOfWeek from 'components/calendar/DaysOfWeek.react';
import DaysInMonth from 'components/calendar/DaysInMonth.react';
import MonthNavigator from 'components/calendar/MonthNavigator.react';
import {getFirstDayOfMonth} from 'utils/dates';
import dayjs from 'dayjs';

/**
 * Holds the whole calendar component
 */
export default function Calendar(): React.Node {
  // Controls where we are looking at the calendar
  const [navigationDate, setNavigationDate] = useState(getFirstDayOfMonth(dayjs()));
  return (
    <div>
      <MonthNavigator
        navigationDate={navigationDate}
        setNavigationDate={setNavigationDate}
      />
      <DaysOfWeek />
      <DaysInMonth navigationDate={navigationDate} />
    </div>
  );
}
