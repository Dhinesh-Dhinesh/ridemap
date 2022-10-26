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

//Routing
import RoutingMachine from "./hooks/RoutingMachine.js";

//hooks
import ScrollBar from './hooks/ScrollBar.js';

//icons
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DirectionsBusFilledRoundedIcon from '@mui/icons-material/DirectionsBusFilledRounded';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

//drawer
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

//full png image for the router markers to hide
let defaultPngIcon = L.icon({
  iconUrl: markerPng,
  iconSize: [29, 46],
  iconAnchor: [17, 46]
});
L.Marker.prototype.options.icon = defaultPngIcon;


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

  const [center] = useState({ lat: 11.922635790851622, lng: 79.62689991349808 })     //college location
  const [locationMarker, setLocationMarker] = useState(null);
  const ZOOM_LVL = 12;
  const [isBusNavShown, setIsBusNavShown] = useState(false);

  //drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
    setIsBusNavShown((prevState) => !prevState);
  }

  //style
  const mountedStyle = { animation: "inAnimation 250ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards"
  };

  //Reference to MapContainer
  const mapRef = useRef();

  //Get current location when page loads )and( update location for every 5 seconds
  const getLocation = () => {

    setTimeout(() => {
      const { current = {} } = mapRef;

      const successCallback = (position) => {
        let latlng = [position.coords.latitude, position.coords.longitude];
        setLocationMarker(latlng);
        current.flyTo(latlng, ZOOM_LVL);

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
          console.log("called interval");      //!dev
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
      <div className='overlay bottom-0'>
        <Drawer
          open={isDrawerOpen}
          onClose={toggleDrawer}
          direction='bottom'
          overlayOpacity={0.1}
          // enableOverlay={false}
          className='rounded-t-3xl h-screen'>
          <div className="rounded-t-3xl bg-gray-800 h-full text-white">
            <div className='p-6 '>
              <p className='text-lg font-bold'>Bus NO2</p>
              <p className='text-gray-400 font-bold text-sm'>Arriving at next stop in 20 mins</p>
              {/* first div */}
              <div className='bg-gray-700 p-2.5 mt-3 rounded-2xl h-15 flex'>
                <div className='rounded-full border-2 w-10 h-10 flex justify-center items-center'>
                  <PersonIcon />
                </div>
                <div className='font-bold ml-4'>
                  Brandon Curtis<br></br>
                  <p className='text-xs text-gray-400'>Driver</p>
                </div>
                <div className='absolute mt-1 right-14'>
                  <LocalPhoneIcon style={{ color: '#AEF359' }} />
                </div>
              </div>
            </div>
            {/* second div */}
            <div className='bg-gray-700 p-2.5 rounded-2xl h-15 mx-6
            grid grid-cols-3 gap-4
            '>
              <div className='flex justify-center items-center flex-col'>
                <p className='text-xs text-gray-400'>Track No.</p>
                <p className='text-sm font-bold'>PY013689C</p>
              </div>
              <div className='flex justify-center items-center flex-col border-l-2 border-r-2'>
                <p className='text-xs text-gray-400'>Journey time</p>
                <p className='text-sm font-bold'>45 Mins</p>
              </div>
              <div className='flex justify-center items-center flex-col'>
                <p className='text-xs text-gray-400'>Total Seats</p>
                <p className='text-sm font-bold'>56</p>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
      <MapContainer center={center} zoom={ZOOM_LVL} scrollWheelZoom={true}
        style={{ widht: '100vw', height: '100vh', position: 'relative' }}
        ref={mapRef} zoomControl={false}
      >
        <TileLayer
          url="https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          className="map-tiles"
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
        <RoutingMachine waypoints={[
          L.latLng(16.506, 80.648),
          L.latLng(17.384, 78.4866),
          L.latLng(12.971, 77.5945)
        ]} />
      </MapContainer>
      <div className="overlay flex overflow-x-auto bottom-0 w-screen"
        style={isBusNavShown ? mountedStyle : unmountedStyle}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <div>
                <ScrollBar key={index} click={toggleDrawer} />
              </div>
            )
          })
        }
      </div>

      {/* Layer icons */}
      <div className='overlay top-4 left-2 bg-slate-200 w-8 h-8 drop-shadow-2xl
      flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-300'
        onClick={() => mapRef.current.flyTo(locationMarker, ZOOM_LVL)}>
        <MyLocationIcon />
      </div>
      {
        !isDrawerOpen && (
          <div className='overlay top-14 left-2 bg-slate-200 w-8 h-8 drop-shadow-2xl
      flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-300'
            onClick={() => setIsBusNavShown(!isBusNavShown)}>
            <DirectionsBusFilledRoundedIcon />
          </div>
        )
      }
    </>
  )
}

export default App;