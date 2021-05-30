import React, { useEffect } from "react";
import {useCallback, useState} from "react";
import {GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api";
import {withRouter} from "react-router-dom";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {TextField} from "@material-ui/core";
require('dotenv').config();

const containerStyle = {
  width: '510px',
  height: '400px'
};

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function RegistrationMap(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);
  const [address, setAddress] = useState();
  const [center, setCenter] = useState({
    lat: 47.36667,
    lng: 8.55
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);

  function handleChange (val) {
    setAddress(val);
  }
  function handleSelect(val) {
    setAddress(val);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setCenter(latLng))
      .catch(error => console.error('Error', error));
  }

  useEffect(() =>{
    if(center){
      if(address){
        props.onChange(true);
      }
      localStorage.setItem("latLng", JSON.stringify(center))
    }

  },[center])

  return isLoaded ? (
    <div>
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
      <GoogleMap
        center={center}
        mapContainerStyle={containerStyle}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} title="Your address"/>
      </GoogleMap>
    </div>
  ) : <></>
}

export default withRouter(RegistrationMap)
