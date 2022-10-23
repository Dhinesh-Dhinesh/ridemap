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

//custom icons
import Control from 'react-leaflet-custom-control'
// import MyLocationIcon from '@mui/icons-material/MyLocation';

//sets the default icon for the markers
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [29, 46],
  iconAnchor: [17, 46]
});
L.Marker.prototype.options.icon = DefaultIcon;


//Main function
function App() {

  const [center] = useState({ lat: 51.505, lng: -0.09 })
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
    <>
      <MapContainer center={center} zoom={ZOOM_LVL} scrollWheelZoom={true}
        style={{ widht: '100vw', height: '100vh' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Control prepend position='bottomleft'>
          <button onClick={() => mapRef.current.flyTo(locationMarker, ZOOM_LVL)}>
            Get Location
          </button>
        </Control>
        {
          locationMarker && (
            <Marker position={locationMarker}>
              <Popup>
                you are here
              </Popup>
            </Marker>
          )
        }
      </MapContainer>
    </>
  )
}

export default App;