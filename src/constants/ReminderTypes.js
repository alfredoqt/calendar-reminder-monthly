// @flow

import dayjs from 'dayjs';

// Support colors
export type ReminderColor = 'blue' | 'green' | 'purple';

export type ReminderWeather = {
  averageTemperature: number,
  icon: string,
  weather: string,
};

export type Reminder = {
  id: string,
  name: string,
  date: dayjs.Dayjs,
  color: ReminderColor,
  cityName: string,
  // We might not have a weather for the reminder
  weather: ?ReminderWeather,
};