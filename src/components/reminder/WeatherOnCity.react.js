// @flow

import type {PlacePrediction} from 'constants/GoogleAPITypes';
import type {OpenWeatherForecastDay} from 'constants/OpenWeatherTypes';

import * as React from 'react';
import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {fetchForecastForDate, getIconSrc} from 'utils/forecast';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FlexLayout from 'components/shared/FlexLayout.react';

const useStyles = makeStyles((theme) => ({
  weatherTitle: {
    fontWeight: 700,
  },
  weatherIcon: {
    width: 36,
    height: 36,
    marginRight: theme.spacing(0.5),
  },
  weatherMain: {
    marginRight: theme.spacing(0.5),
  },
}));

type Props = $ReadOnly<{
  city: ?PlacePrediction,
  onChange: (forecast: ?OpenWeatherForecastDay) => void,
  selectedDate: ?dayjs.Dayjs,
}>;

export default function WeatherOnCity({
  city,
  onChange,
  selectedDate,
}: Props): React.Node {
  const classes = useStyles();
  const [forecast, setForecast] = useState<?OpenWeatherForecastDay>(null);
  const [error, setError] = useState<?string>(null);

  useEffect(() => {
    async function fetchForecast() {
      if (city != null && selectedDate != null) {
        try {
          const result = await fetchForecastForDate(
            city.structured_formatting.main_text,
            selectedDate,
          );
          setForecast(result);
          onChange(result);
        } catch {
          setError('Error fetching weather');
        }
      }
    }
    fetchForecast();
  }, [city, selectedDate]);
  return (
    <div>
      <Typography className={classes.weatherTitle} gutterBottom>
        Weather
      </Typography>
      {selectedDate == null ? (
        <Typography>Select a date</Typography>
      ) : city == null ? (
        <Typography>Select a city</Typography>
      ) : error != null || forecast == null ? (
        <Typography>{error != null ? error : 'No forecast available'}</Typography>
      ) : (
        <FlexLayout align="center">
          <img
            alt={forecast.weather[0].main}
            src={getIconSrc(forecast.weather[0].icon)}
            className={classes.weatherIcon}
          />
          <Typography className={classes.weatherMain}>
            {forecast.weather[0].main}
          </Typography>
          <Typography>{`${forecast.temp.day.toFixed(2)}°C`}</Typography>
        </FlexLayout>
      )}
    </div>
  );
}
