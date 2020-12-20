// @flow

import * as React from 'react';
import {useCallback, useState} from 'react';
import DaysOfWeek from 'components/calendar/DaysOfWeek.react';
import DaysInMonth from 'components/calendar/DaysInMonth.react';
import MonthNavigator from 'components/calendar/MonthNavigator.react';
import {getFirstDayOfMonth} from 'utils/dates';
import dayjs from 'dayjs';
import {useDispatch} from 'stores/hooks/CalendarStoreHooks';
import {removeRemindersInDay} from 'actions/CalendarRemindersActions';

type Props = $ReadOnly<{
  onSelectActiveDate: (date: dayjs.Dayjs) => void,
}>;

/**
 * Holds the whole calendar component
 */
export default function Calendar({onSelectActiveDate}: Props): React.Node {
  // Controls where we are looking at the calendar
  const [navigationDate, setNavigationDate] = useState(getFirstDayOfMonth(dayjs()));
  const dispatch = useDispatch();
  const onDeleteReminders = useCallback(
    (date) => {
      dispatch(removeRemindersInDay(date));
    },
    [dispatch],
  );

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
        onDeleteReminders={onDeleteReminders}
      />
    </div>
  );
}
