import React, {useRef} from "react";
import {useCallback, useState, useEffect} from "react";
import {GoogleMap, Autocomplete, InfoWindow, Marker, useLoadScript, useJsApiLoader} from "@react-google-maps/api";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import {withRouter} from "react-router-dom";
require('dotenv').config();

const containerStyle = {
  width: '50%',
  height: '800px'
};

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function GoogleMapRegistration() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);
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



  return isLoaded ? (
    <GoogleMap
      center={center}
      mapContainerStyle={containerStyle}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
    </GoogleMap>
  ) : <></>
}

export default withRouter(GoogleMapRegistration)
