// @flow

import type {PlacePrediction} from 'constants/GoogleAPITypes';

import * as React from 'react';
import {useCallback, useContext, useMemo, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GoogleMapsJSAPIContext from 'components/shared/GoogleMapsJSAPIContext.react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import debounce from 'utils/debounce';

type Props = $ReadOnly<{
  onChange: (value: PlacePrediction) => void,
  helperText: ?React.Node,
  error: boolean,
  value: ?PlacePrediction,
}>;

export default function CitySearchAutocomplete({
  onChange,
  helperText,
  error,
  value,
}: Props): React.Node {
  const google = useContext(GoogleMapsJSAPIContext);
  const [, setInputValue] = useState('');
  const [options, setOptions] = useState<Array<PlacePrediction>>([]);

  const handleSearch = useCallback(
    (q: string) => {
      if (q === '') {
        setOptions([]);
        return;
      }
      // Search only for cities
      google.autocompleteService.getPlacePredictions(
        {input: q, types: ['(cities)']},
        (results: Array<PlacePrediction>) => {
          setOptions(results);
        },
      );
    },
    [google, setOptions],
  );

  // Debounce for 300 ms each user type
  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [handleSearch]);

  return (
    <Autocomplete
      id="google-map-city-autocomplete"
      style={{width: '100%'}}
      getOptionLabel={(option: PlacePrediction | string) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x: PlacePrediction) => x}
      options={options}
      autoComplete
      noOptionsText="No cities"
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(_, newValue: PlacePrediction) => {
        onChange(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
        debouncedSearch(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city"
          variant="outlined"
          fullWidth
          margin="dense"
          helperText={helperText}
          error={error}
        />
      )}
      renderOption={(option: PlacePrediction) => {
        return (
          <div>
            <span style={{fontWeight: 700}}>
              {option.structured_formatting.main_text}
            </span>
            <Typography variant="body2" color="textSecondary">
              {option.structured_formatting.secondary_text}
            </Typography>
          </div>
        );
      }}
    />
  );
}
