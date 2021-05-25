import React from "react";
import {useCallback, useState, useEffect} from "react";
import {GoogleMap, Autocomplete, InfoWindow, Marker, useLoadScript, useJsApiLoader} from "@react-google-maps/api";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const containerStyle = {
  width: '50%',
  height: '800px'
};

const center = {
  lat: 47.36667 ,
  lng: 8.55
};

function GoogleMapRegistration() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDf6iJ64oSDI8dUah5-bSMnpDqBGchaaa8"
  })

  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onSearchBoxMounted = useCallback(function callback(searchBox) {
    setSearchBox(searchBox)
  }, []);

  const onPlacesChanged: () => {
      const places = refs.searchBox.getPlaces();
      const bounds = new google.maps.LatLngBounds();

      places.forEach(place => {
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
      });
      const nextMarkers = places.map(place => ({
        position: place.geometry.location,
      }));
      const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

      this.setState({
        center: nextCenter,
        markers: nextMarkers,
      });
      // refs.map.fitBounds(bounds);
    },

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <SearchBox
        ref={onSearchBoxMounted}
        bounds={map.getBounds()}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapRegistration)
