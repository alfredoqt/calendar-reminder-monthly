// @flow

import * as React from 'react';
import dayjs from 'dayjs';

type Props = $ReadOnly<{
  date: dayjs.Dayjs,
}>;

export default function Day({date}: Props): React.Node {
  return <span>{date.date()}</span>;
}
