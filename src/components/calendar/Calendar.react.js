// @flow

import * as React from 'react';
import {useState} from 'react';
import DaysOfWeek from 'components/calendar/DaysOfWeek.react';
import DaysInMonth from 'components/calendar/DaysInMonth.react';
import MonthNavigator from 'components/calendar/MonthNavigator.react';
import {getFirstDayOfMonth} from 'utils/dates';
import dayjs from 'dayjs';

type Props = $ReadOnly<{
  onSelectActiveDate: (date: dayjs.Dayjs) => void,
}>;

/**
 * Holds the whole calendar component
 */
export default function Calendar({onSelectActiveDate}: Props): React.Node {
  // Controls where we are looking at the calendar
  const [navigationDate, setNavigationDate] = useState(getFirstDayOfMonth(dayjs()));

  return (
    <div>
      <MonthNavigator
        navigationDate={navigationDate}
        setNavigationDate={setNavigationDate}
      />
      <DaysOfWeek />
      <DaysInMonth
        navigationDate={navigationDate}
        onSelectActiveDate={onSelectActiveDate}
      />
    </div>
  );
}
