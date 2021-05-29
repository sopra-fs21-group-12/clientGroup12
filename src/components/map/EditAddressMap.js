import React from "react";
import {useCallback, useState} from "react";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {withRouter} from "react-router-dom";
import LocationSearchInput from "./LocationSearchInput";
require('dotenv').config();

const containerStyle = {
  width: '510px',
  height: '400px'
};

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function EditAddressMap() {
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
    <div>
      <LocationSearchInput/>
      <GoogleMap
        center={center}
        mapContainerStyle={containerStyle}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </div>
  ) : <></>
}

export default withRouter(EditAddressMap)
