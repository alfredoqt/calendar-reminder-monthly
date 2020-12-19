// @flow

import * as React from 'react';

import dayjs from 'dayjs';
import {generateDatesInIntervals} from 'utils/dates';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

type Props = $ReadOnly<{
  value: dayjs.Dayjs,
  selectedDate: dayjs.Dayjs,
  onChange: (date: dayjs.Dayjs) => void,
}>;

export default function ReminderTimeSelect({value, selectedDate, onChange}: Props) {
  const dates = generateDatesInIntervals(selectedDate, 30, 48, 'minute');
  return (
    <TextField
      id="select-reminder-time"
      select
      label="Time"
      variant="outlined"
      value={value.toISOString()}
      onChange={(e) => onChange(dayjs(e.target.value))}
      margin="dense"
      fullWidth
    >
      {dates.map((option) => (
        <MenuItem key={option.format('hh:mm A')} value={option.toISOString()}>
          {option.format('hh:mm A')}
        </MenuItem>
      ))}
    </TextField>
  );
}
