import React, { useState } from 'react'
//Geolocation
import useGeoLocation from './hooks/useGeolocation.js'
//leaflet
import L from 'leaflet';
import {
  MapContainer, TileLayer,
  Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [29, 46],
  iconAnchor: [17, 46]
});

L.Marker.prototype.options.icon = DefaultIcon;



//App function ------------------------------
export default function App() {

  const [center] = useState({ lat: 51.505, lng: -0.09 })
  const ZOOM_LVL = 13;
  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && location.coordinates) {
      //
    }
    // else {
    //   alert("location-error")
    // }
  }


  return (
    <>
      <MapContainer center={center} zoom={ZOOM_LVL} scrollWheelZoom={true} style={{ widht: '100vw', height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          location.loaded && location.coordinates && (
            <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
              <Popup>
                You are here
              </Popup>
            </Marker>
          )
        }
        <button onClick={showMyLocation()}>Show my location</button>
      </MapContainer>
    </>
  )
}
