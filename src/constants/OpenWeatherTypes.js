// @flow

export type OpenWeatherCity = {
  id: number,
  name: string,
};

export type OpenWeatherTemperature = {
  day: number,
};

export type OpenWeatherWeather = {
  id: number,
  main: string,
  description: string,
  icon: string,
};

export type OpenWeatherForecastDay = {
  temp: OpenWeatherTemperature,
  weather: Array<OpenWeatherWeather>,
};

export type OpenWeatherForecast = {
  city: OpenWeatherCity,
  list: Array<OpenWeatherForecastDay>,
};
