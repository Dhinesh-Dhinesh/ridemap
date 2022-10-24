import React, { useEffect, useState, useRef } from 'react';

//leaflet
import L from 'leaflet';
import {
  MapContainer, TileLayer,
  Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import markerPng from './icons/fullpng.png';
import clgIcon from './icons/college.png';
import "leaflet-easybutton"

//Routing
import RoutingMachine from "./hooks/RoutingMachine.js";

//icons for the markers
let defaultIconPng = L.icon({
  iconUrl: markerPng,
  iconSize: [29, 46],
  iconAnchor: [17, 46]
});
L.Marker.prototype.options.icon = defaultIconPng;


let locationIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [29, 46],
  iconAnchor: [17, 46]
});

let collegeIcon = L.icon({
  iconUrl: clgIcon,
  iconSize: [35, 46],
  iconAnchor: [17, 46]
});
//Main function
function App() {

  const [center] = useState({ lat: 11.922635790851622, lng: 79.62689991349808 })
  const [locationMarker, setLocationMarker] = useState(null);
  const ZOOM_LVL = 13;

  //Reference to MapContainer
  const mapRef = useRef();

  


  //Get current location when page loads && update location for every 5 seconds
  const getLocation = () => {
    setTimeout(() => {

      const { current = {} } = mapRef;

      const successCallback = (position) => {
        let latlng = [position.coords.latitude, position.coords.longitude];
        setLocationMarker(latlng);
        current.flyTo(latlng, ZOOM_LVL);

        //button for got to current location
        L.easyButton(`<i class="fa fa-map-marker" aria-hidden="true"></i>`, function (btn, map) {
          current.flyTo(latlng, ZOOM_LVL);
        }).setPosition('bottomleft').addTo(mapRef.current);
        
        //marker for college icon
        L.marker([11.922635790851622, 79.62689991349808], { icon: collegeIcon }).addTo(mapRef.current).bindPopup("College");
      };

      const errorCallback = (error) => {
        console.log(error);
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

      

      //udpate location for every 5 seconds
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(options => {
          let latlng = [options.coords.latitude, options.coords.longitude];
          setLocationMarker(latlng);
          console.log("called interval");
        })
      }, 5000);

    }, 2000);
  }

  //calls just one time when renders
  useEffect(() => {
    getLocation();
  }, []);

  return (
      <MapContainer center={center} zoom={ZOOM_LVL} scrollWheelZoom={true}
        style={{ widht: '100vw', height: '100vh',position:'relative' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          locationMarker && (
            <Marker position={locationMarker} icon={locationIcon}>
              <Popup>
                you are here
              </Popup>
            </Marker>
          )
        }
        <RoutingMachine/>
      </MapContainer>
  )
}

export default App;