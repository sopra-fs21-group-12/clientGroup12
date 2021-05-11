import React from 'react';
import {GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch";
import "../../leaflet.css";

const SearchBar = () => {
  new GeoSearchControl({
    provider: new OpenStreetMapProvider(),
  });
};
