// @flow

type GoogleAPILocation = {
  lat: number,
  lng: number,
};

type Geometry = {
  location: GoogleAPILocation,
};

type StructuredFormatting = {
  main_text: string,
  secondary_text: string,
};

export type PlacePrediction = {
  description: string,
  place_id: string,
  structured_formatting?: StructuredFormatting,
};

export type PlaceDetailed = {
  place_id: string,
  formatted_address: string,
  geometry: Geometry,
};
