// @flow

export default class GoogleMapsService {
  autocompleteService: any;
  // We don't have the exact type
  constructor(google?: ?any) {
    if (google == null) {
      // I don't know if this is the better way,
      // but for the sake of this exercise, I'll throw an error
      throw new Error('Google Maps JS API instance must not be null');
    }
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }
}
