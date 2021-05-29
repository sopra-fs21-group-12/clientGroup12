import React, {useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {TextField} from "@material-ui/core";

function LocationSearchInput() {

  const [address, setAddress] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  function handleChange (val) {
    setAddress(val);
  }
//TODO: setLat, setLng is not set right, needs to be send back to backend and be fetched in MyMatches page to display markers
  function handleSelect(val) {
    setAddress(val);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setLng(latLng.lng))
      .catch(error => console.error('Error', error));
  }
  return (
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              id="outlined-basic"
              margin="normal"
              label="City/Street"
              variant="outlined"
              fullWidth
              required
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
}

export default LocationSearchInput;
