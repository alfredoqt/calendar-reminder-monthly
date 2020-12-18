// @flow

import type {OpenWeatherForecastDay} from 'constants/OpenWeatherTypes';

import dayjs from 'dayjs';
import {fetchForecast} from 'services/OpenWeatherAPI';

export async function fetchForecastForDate(
  q: string,
  date: dayjs.Dayjs,
): Promise<?OpenWeatherForecastDay> {
  const now = dayjs().hour(0).minute(0).second(0).millisecond(0);
  const dateBeginInDay = date.hour(0).minute(0).second(0).millisecond(0);

  const differenceInDays = dateBeginInDay.diff(now, 'day');

  // Open Weather allows for 1 to 16 days
  if (differenceInDays < 0 || differenceInDays > 15) {
    return Promise.resolve(null);
  }

  const forecast = await fetchForecast(q, differenceInDays + 1);
  // Extract the forecast for the requested date
  const forecastForDay = forecast.list[differenceInDays];
  // Check for null or undefined
  if (forecastForDay == null) {
    return null;
  }
  return forecastForDay;
}

export function getIconSrc(icon: string): string {
  return `https://openweathermap.org/img/w/${icon}.png`;
}
