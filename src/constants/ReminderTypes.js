// @flow

import type {PlacePrediction} from 'constants/GoogleAPITypes';
import type {OpenWeatherForecastDay} from 'constants/OpenWeatherTypes';

import dayjs from 'dayjs';
import keyMirror from 'utils/keyMirror';

export const REMINDER_COLORS = Object.freeze(
  keyMirror({
    blue: null,
    green: null,
    purple: null,
    yellow: null,
    red: null,
  }),
);

// Support colors
export type ReminderColor = $Values<typeof REMINDER_COLORS>;

export const reminderColorToCSSColor: {[ReminderColor]: string} = {
  [REMINDER_COLORS.blue]: '#3f51b5',
  [REMINDER_COLORS.green]: '#0b8043',
  [REMINDER_COLORS.purple]: '#8e24aa',
  [REMINDER_COLORS.yellow]: '#f6bf26',
  [REMINDER_COLORS.red]: '#d50000',
};

export type Reminder = {
  id: string,
  name: string,
  date: dayjs.Dayjs,
  color: ReminderColor,
  city: PlacePrediction,
  // We might not have a weather for the reminder
  forecast: ?OpenWeatherForecastDay,
};
