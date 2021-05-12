import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../../leaflet.css";
import {GeoSearchControl, OpenStreetMapProvider, SearchControl} from "leaflet-geosearch";

const center = [47.3700, 8.5500]
const zoom = 13

const searchControl = () => {
  new SearchControl({
    provider: new OpenStreetMapProvider(),
    position: 'topleft',
  });
};

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter())

  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}

function RegistrationMap() {
  const [map, setMap] = useState(null)
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        >
        </TileLayer>
      </MapContainer>
    ),
      [],
  )
 // map.addControl(searchControl);
  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  )
}

export default RegistrationMap;
