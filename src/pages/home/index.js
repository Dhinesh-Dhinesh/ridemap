import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';

//Firebase
import { db } from "../../firebase/firebase"
import { ref, onValue, set } from "firebase/database";
import { logOut } from '../../firebase/firebase';
import { changeRoutesFromDb } from '../../data/routes';

//leaflet
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ToggleBusScroll from '../../components/toggleBusScroll';

//Marker Icons
import markerPng from './assets/fullpng.png';
import clgIcon from './assets/college.png';
import circleIcon from './assets/circle.png';

//Components
import RoutingMachine from "../../components/RoutingMachine";
import ScrollBar from '../../components/ScrollBar.js';

//icons
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LogoutIcon from '@mui/icons-material/Logout';

//bottom-sheet
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";


//full png image for the router markers to hide
let defaultPngIcon = L.icon({
    iconUrl: markerPng,
    iconSize: [29, 46],
    iconAnchor: [17, 46]
});
L.Marker.prototype.options.icon = defaultPngIcon;


let locationIcon = L.icon({
    iconUrl: circleIcon,
    iconSize: [46, 46],
    iconAnchor: [22, 26]
});

let collegeIcon = L.icon({
    iconUrl: clgIcon,
    iconSize: [35, 46],
    iconAnchor: [17, 46]
});

export default function Home() {

    // Logout 

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            let user = sessionStorage.getItem('uid');
            set(ref(db, "users/" + user + "/"), {
                signin: 0
            })
            await logOut();
            sessionStorage.removeItem('uid');
            return <Navigate to="/" />
        } catch (e) {
            console.log(e.message)
        }
    };

    //leaflet
    const [center] = useState({ lat: 11.922635790851622, lng: 79.62689991349808 })     //college location
    const [locationMarker, setLocationMarker] = useState(null);
    const ZOOM_LVL = 12;

    //routing
    const [wayPoints, setwayPoints] = useState([]);
    const [routes, setRoutes] = useState([]);

    //Bus data ui
    const [isBusNavShown, setIsBusNavShown] = useState(true);
    const [busData, setBusData] = useState([]);
    const scrollBarColors = ["border-[#AEF359]", "border-[#eb142ab9]",
        "border-[#08BCFF]", "border-[#C332EA]", "border-[#C35F4E]"]

    //drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [driverName, setDriverName] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [busNo, setBusNo] = useState(null);
    const [trackNo, setTrackNo] = useState(null);
    const [seats, setSeats] = useState(null);

    const toggleDrawer = (driver, phone, busno, trackno, seats) => {
        setIsDrawerOpen((prevState) => !prevState);
        setIsBusNavShown((prevState) => !prevState);
        setBusNo(busno)
        setDriverName(driver);
        setPhoneNumber(phone);
        setTrackNo(trackno);
        setSeats(seats);

        //sets routes with index of the showmap bars 
        setwayPoints(busno - 1);
    }
    const toggleDrawerDefault = () => {
        setIsDrawerOpen((prevState) => !prevState);
        setIsBusNavShown(false);
    }

    //style
    const mountedStyle = { animation: "inAnimation 250ms ease-in" };
    const unmountedStyle = {
        animation: "outAnimation 270ms ease-out",
        animationFillMode: "forwards"
    };

    //Reference to MapContainer
    const mapRef = useRef();

    //Get current location when page loads )and( update location for every 1 seconds
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
                })
            }, 1000);

        }, 2000);
    }

    //firebase data and geolocation
    useEffect(() => {
        getLocation();

        (async function getRoutes() {
            setRoutes(await changeRoutesFromDb());
        })();

        const dataRef = ref(db, 'busses');
        onValue(dataRef, (snapshot) => {
            let val = [];
            snapshot.forEach((childSnapshot) => {
                let key = childSnapshot.key;
                let childData = childSnapshot.val();
                val.push({ "key": key, "data": childData });
            });
            setBusData(val);
        });

    }, []);

    return (
        <>
            <BottomSheet
                open={isDrawerOpen}
                onDismiss={() => toggleDrawerDefault()}
                snapPoints={({ maxHeight }) => [
                    maxHeight / 2,
                    maxHeight * 0.9,
                ]}
                defaultSnap={({ maxHeight }) => maxHeight / 2}>
                <div className="h-full text-white">
                    <div className='p-6 '>
                        <p className='text-lg font-bold'>Bus NO {busNo}</p>
                        <p className='text-gray-400 font-bold text-sm'>Arriving at next stop in 20 mins</p>
                        {/* first div */}
                        <div className='bg-gray-700 p-2.5 mt-3 rounded-2xl h-15 flex'>
                            <div className='rounded-full border-2 w-10 h-10 flex justify-center items-center'>
                                <PersonIcon />
                            </div>
                            <div className='font-bold ml-4'>
                                {driverName}<br></br>
                                <p className='text-xs text-gray-400'>Driver</p>
                            </div>
                            <div className='absolute mt-1 right-14'>
                                <a href={`tel:${phoneNumber}`}><LocalPhoneIcon style={{ color: '#AEF359' }} /></a>
                            </div>
                        </div>
                    </div>
                    {/* second div */}
                    <div className='bg-gray-700 p-2.5 rounded-2xl h-15 mx-6 grid grid-cols-3 gap-4'>
                        <div className='flex justify-center items-center flex-col'>
                            <p className='text-xs text-gray-400'>Track No.</p>
                            <p className='text-sm font-bold'>{trackNo}</p>
                        </div>
                        <div className='flex justify-center items-center flex-col border-l-2 border-r-2'>
                            <p className='text-xs text-gray-400'>Journey time</p>
                            <p className='text-sm font-bold'>45 Mins</p>
                        </div>
                        <div className='flex justify-center items-center flex-col'>
                            <p className='text-xs text-gray-400'>Total Seats</p>
                            <p className='text-sm font-bold'>{seats}</p>
                        </div>
                    </div>
                </div>
            </BottomSheet>
            <MapContainer center={center} zoom={ZOOM_LVL} scrollWheelZoom={true}
                style={{ widht: '100vw', height: '100vh', zIndex: 0 }}
                ref={mapRef} zoomControl={false}>
                <TileLayer
                    url="https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    className="map-tiles"
                />
                {/* Routing Machine */}
                {wayPoints === 0 ? <RoutingMachine coords={routes[0]} /> : null}
                {wayPoints === 1 ? <RoutingMachine coords={routes[1]} /> : null}

                {/* Location Marker */}
                {
                    locationMarker && (
                        <div>
                            <Marker position={locationMarker} icon={locationIcon}>
                                <Popup>
                                    you are here
                                </Popup>
                            </Marker>
                        </div>
                    )
                }
                {
                    busData.map((bus, index) => {

                        if (index !== 0) {
                            return null;
                        }

                        return (
                            <Marker key={index} position={[bus.data.l[0], bus.data.l[1]]} icon={locationIcon}>
                                <Popup>
                                    Sample Bus Data
                                </Popup>
                            </Marker>
                        )
                    })
                }

                <ToggleBusScroll callback={setIsBusNavShown} />
            </MapContainer>
            <div className="fixed z-[10000] flex overflow-x-auto bottom-16 w-screen"
                style={isBusNavShown ? mountedStyle : unmountedStyle}>
                {
                    busData.map((item) => {
                        return (
                            <div key={item.key}>
                                <ScrollBar
                                    click={() => {
                                        toggleDrawer(item.data.driverdetail.name, item.data.driverdetail.phone,
                                            parseInt(item.key) + 1, item.data.busdetails.busno, item.data.busdetails.seats);
                                    }}
                                    busno={parseInt(item.key) + 1}
                                    status={item.data.busdetails.status}
                                    color={scrollBarColors[parseInt(item.key)]}
                                />
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
            <div className='overlay top-14 left-2 bg-slate-200 w-8 h-8 drop-shadow-2xl
                flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-300'
                onClick={handleLogOut}>
                <LogoutIcon />
            </div>
        </>
    )
}   