// @flow

import * as React from 'react';
import dayjs from 'dayjs';
import FlexLayout from 'components/shared/FlexLayout.react';

/**
 * Shows the list of weekdays in the dayjs locale: Sunday, Monday, ...
 */
export default function DaysOfWeek(): React.Node {
  const weekdays = dayjs.weekdays();
  return (
    <FlexLayout>
      {weekdays.map((weekday) => (
        <div key={weekday}>{weekday}</div>
      ))}
    </FlexLayout>
  );
}
