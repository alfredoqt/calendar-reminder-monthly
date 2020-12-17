// @flow

import type {OpenWeatherForecast} from 'constants/OpenWeatherTypes';

const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&appid=${
  process.env.REACT_APP_OPEN_WEATHER_API_KEY ?? ''
}`;

export function fetchForecast(q: string, cnt: number): Promise<OpenWeatherForecast> {
  const url = new URL(BASE_URL);
  url.searchParams.append('q', q);
  url.searchParams.append('cnt', cnt.toString());

  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      }
      return response.json();
    })
    .catch((response: Response) =>
      response
        .json()
        .then((json) => {
          throw new Error(json.message);
        })
        .catch(() => {
          throw new Error('Unknown error');
        }),
    );
}
