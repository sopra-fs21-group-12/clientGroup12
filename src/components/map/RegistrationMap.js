import React, {useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {Icon} from 'leaflet';


const RegistrationMap = () => {
  const [lat, setLat] = useState(0);
  const[lng, setLng] = useState(0);
  async function getISS() {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await response.json();
    setLat(data.latitude);
    setLng(data.longitude);
  }
  return(
    <div>
      <MapContainer
        style={{height:'40px', width:'50px'}}
        center={[lat, lng]}
        zoom={12}
        >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'>
        </TileLayer>
        <Marker position={[lat, lng]} Icon={Icon}>
          <Popup>
            This is an imported marker from leaflet-lib.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
};
export default RegistrationMap;
