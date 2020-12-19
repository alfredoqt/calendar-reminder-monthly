// @flow

import type {ReminderColor} from 'constants/ReminderTypes';

import * as React from 'react';
import {REMINDER_COLORS, reminderColorToCSSColor} from 'constants/ReminderTypes';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const colorsInSelect: Array<ReminderColor> = [
  REMINDER_COLORS.blue,
  REMINDER_COLORS.green,
  REMINDER_COLORS.purple,
  REMINDER_COLORS.yellow,
  REMINDER_COLORS.red,
];

type Props = $ReadOnly<{
  value: ReminderColor,
  onChange: (color: ReminderColor) => void,
}>;

export default function ReminderColorSelect({value, onChange}: Props): React.Node {
  return (
    <TextField
      id="select-reminder-color"
      select
      label="Color"
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      margin="dense"
    >
      {colorsInSelect.map((option) => (
        <MenuItem key={option} value={option}>
          <span
            style={{
              width: 18,
              height: 18,
              backgroundColor: reminderColorToCSSColor[option],
              borderRadius: '50%',
            }}
          >
            &nbsp;&nbsp;&nbsp;
          </span>
        </MenuItem>
      ))}
    </TextField>
  );
}
