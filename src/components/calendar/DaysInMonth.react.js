// @flow

import * as React from 'react';
import dayjs from 'dayjs';
import {getLastDayOfMonth} from 'utils/dates';
import FlexLayout from 'components/shared/FlexLayout.react';
import Day from 'components/calendar/Day.react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  day: {
    // 7 days in a week
    flexBasis: 'calc(100% * (1 / 7))',
    maxWidth: 'calc(100% * (1 / 7))',
  },
});

type Props = $ReadOnly<{
  // Will always be the first day of the selected month
  navigationDate: dayjs.Dayjs,
  onSelectActiveDate: (date: dayjs.Dayjs) => void,
}>;

/**
 * Represents the grid of days in the calendar
 */
export default function DaysInMonth({
  navigationDate,
  onSelectActiveDate,
}: Props): React.Node {
  const classes = useStyles();
  // Start day of the grid. It can be negative or zero
  // if it has a neighboring month
  // If negative or zero, it will subtract one month from a date,
  // and use the last days. For example: new Date(2020, 11, 0) is
  // 2020 Nov 30th. Notice that a month is subtracted
  const startDayInGrid = -navigationDate.day() + 1;
  // End day of the grid
  // If greater than the last day of the month, it will add one month,
  // and it will start in the first days of the month
  // For example: new Date(2020,11,32) is 2021 Jan 1st.
  const daysInMonth = navigationDate.daysInMonth();
  const endDayInGrid = daysInMonth + (6 - getLastDayOfMonth(navigationDate).day());

  const days: Array<React.Node> = [];
  for (let i = startDayInGrid; i <= endDayInGrid; ++i) {
    const date = dayjs(new Date(navigationDate.year(), navigationDate.month(), i));
    days.push(
      <div key={date.valueOf()} className={classes.day}>
        <Day
          date={date}
          monthIndex={navigationDate.month()}
          onSelectActiveDate={onSelectActiveDate}
        />
      </div>,
    );
  }

  return <FlexLayout wrap="wrap">{days}</FlexLayout>;
}
