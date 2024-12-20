import React, { useEffect, useState, useRef, useLayoutEffect, useContext, useCallback } from 'react';
import { useNavigate, createSearchParams } from "react-router-dom"
//Firebase
import { db } from "../../firebase/firebase"
import { ref, onValue, off } from "firebase/database";
// import { changeRoutesFromDb } from '../../data/routes';

//leaflet
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ToggleBusScroll from '../../components/toggleBusScroll';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker'

//Marker Icons
import markerPng from './assets/fullpng.webp';
import clgIcon from './assets/college.webp';
import circleIcon from './assets/circle.webp';
import busIcon from './assets/bus.webp';
import busMovIcon from './assets/busmov.webp';

//Components
// import RoutingMachine from "../../components/RoutingMachine";
import ScrollBar from '../../components/ScrollBar.js';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import OfflineScroll from '../../components/OfflineScroll';
import 'react-indiana-drag-scroll/dist/style.css'

//icons
import NearMeIcon from '@mui/icons-material/NearMe';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import WestIcon from '@mui/icons-material/West';

import IconButton from '@mui/material/IconButton';
import { Tooltip as MTooltip } from '@mui/material';

//bottom-sheet
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

//context
import { BottomContext } from '../../context/BottomContext';

//hooks
import useGeolocation from '../../hooks/useGeolocation'

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

let BusIcon = L.icon({
    iconUrl: busIcon,
    iconSize: [30, 30],
    iconAnchor: [22, 22]
});

let BusMovIcon = L.icon({
    iconUrl: busMovIcon,
    iconSize: [30, 30],
    iconAnchor: [22, 22]
});

let collegeIcon = L.icon({
    iconUrl: clgIcon,
    iconSize: [35, 46],
    iconAnchor: [17, 46]
});

export default function Home() {

    //context
    const bottomCont = useContext(BottomContext);

    //theme
    const [theme, setTheme] = useState('lite');

    //leaflet
    const [center] = useState({ lat: 11.922635790851622, lng: 79.62689991349808 })     //college location
    const position = useGeolocation();
    const [locationMarkerPosition, setLocationMarkerPosition] = useState(null);
    const ZOOM_LVL = 12;

    const navigate = useNavigate();

    //routing
    // const [wayPoints, setwayPoints] = useState([]);
    // const [routes, setRoutes] = useState([]);

    //Bus data ui
    const [isBusNavShown, setIsBusNavShown] = useState(true);
    const [busData, setBusData] = useState([]);

    //show busses
    const [showAllBus, setShowAllBus] = useState(true);
    const [isTrack, setIsTrack] = useState(true);

    //drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [driverName, setDriverName] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [busNo, setBusNo] = useState(null);
    const [trackNo, setTrackNo] = useState(null);
    const [seats, setSeats] = useState(null);

    const toggleDrawer = (driver, phone, busno, trackno, seats, waypoint) => {
        setIsDrawerOpen((prevState) => !prevState);
        setIsBusNavShown((prevState) => !prevState);
        setBusNo(busno)
        setDriverName(driver);
        setPhoneNumber(phone);
        setTrackNo(trackno);
        setSeats(seats);

        //sets routes with index of the showmap bars 
        // setwayPoints(waypoint);
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
    const scrollRef = useRef(null);

    useEffect(() => {
        if (position.latitude && position.longitude) {
            setLocationMarkerPosition([position.latitude, position.longitude]);
        }
    }, [position.latitude, position.longitude]);

    //Get current location when page loads )and( updates location of every 20 sec 
    // useEffect(() => {
    //     setTimeout(() => {
    //         const { current = {} } = mapRef;
    //         L.marker([11.922635790851622, 79.62689991349808], { icon: collegeIcon }).addTo(mapRef.current).bindPopup("College");
    //         current.flyTo(locationMarkerPosition, 16);
    //     }, 3000)

    // }, [locationMarkerPosition])

    //firebase data and geolocation
    useEffect(() => {


        const handleData = (snapshot) => {
            let val = [];
            snapshot.forEach((childSnapshot) => {
                let childData = childSnapshot.val();
                val.push({ "data": childData });
            });
            //sort the data
            val.sort((a, b) => a.data.busdetails.no - b.data.busdetails.no)
            for (let i = 0; i < val.length; i++) {
                val[i].key = i;
            }
            setBusData(val);
        }

        const dataRef = ref(db, 'busses');
        onValue(dataRef, handleData);

        return () => {
            off(dataRef, handleData)
        }

    }, []);


    // Scroll Left when scroll bar is loaded
    useEffect(() => {
        setTimeout(() => {
            // adding college marker
            L.marker([11.922635790851622, 79.62689991349808], { icon: collegeIcon }).addTo(mapRef.current).bindPopup("College");

            // scroll to last visit bus
            let busNo = parseInt(localStorage.getItem('busNoKey'));
            if (!busNo || busNo === 1) {
                return;
            }
            scrollRef.current.classList.add('scroll-smooth')
            scrollRef.current.scrollLeft += (240 * busNo - 1);
            scrollRef.current.classList.remove('scroll-smooth')
        }, 2000)
    }, [scrollRef]);

    useLayoutEffect(() => {
        //theme
        localStorage.getItem('isLite') === 'false' ? setTheme('dark') : setTheme('lite');
        localStorage.getItem('isTrack') === 'false' ? setIsTrack(false) : setIsTrack(true);;
    }, [])

    //useeffect for fly to bus location when click show map
    useEffect(() => {
        for (let i = 0; i < busData.length; i++) {
            if (busData[i].data.busdetails.no === busNo) {
                mapRef.current.flyTo([busData[i].data.data.lat, busData[i].data.data.lng], 16);
            }
        }
        //eslint-disable-next-line
    }, [busNo])

    // callbacks
    const showAllBusMap = useCallback(() => {
        return busData.map((bus) => {
            if (bus.data.data.datastatus === 4) {
                return null;
            } else {
                return (
                    <LeafletTrackingMarker key={bus.key} position={[bus.data.data.lat, bus.data.data.lng]} duration={1}
                        icon={bus.data.data.accstatus === 1 || bus.data.data.speed > 0 ? BusMovIcon : BusIcon}
                        rotationAngle={bus.data.data.course} rotationOrigin="center">
                        <Tooltip permanent direction="bottom" offset={[0, 10]} opacity={1} key={bus.key} >
                            Bus {bus.data.busdetails.no}
                        </Tooltip>
                    </LeafletTrackingMarker>
                )
            }
        });
    }, [busData])

    const showSpecificBus = useCallback(() => {
        return busData.map((bus) => {
            if (bus.data.busdetails.no === busNo) {

                if (isTrack) {
                    mapRef.current.setView([bus.data.data.lat, bus.data.data.lng]);
                }

                return (
                    <LeafletTrackingMarker key={bus.key} position={[bus.data.data.lat, bus.data.data.lng]}
                    icon={bus.data.data.accstatus === 1 || bus.data.data.speed > 0 ? BusMovIcon : BusIcon}
                    duration={5000} rotationAngle={bus.data.data.course} rotationOrigin="center">
                        <Tooltip permanent direction="bottom" offset={[0, 10]} opacity={1} key={bus.key}>
                            Bus {bus.data.busdetails.no}
                        </Tooltip>
                    </LeafletTrackingMarker>
                )
            }

            return null;
        });
    }, [busData, busNo, isTrack])

    const showScrollBar = useCallback(() => {
        const scrollBarColors = ["border-[#AEF359]", "border-[#eb142ab9]",
            "border-[#08BCFF]", "border-[#C332EA]", "border-[#C35F4E]", "border-[#9e0059]", "border-clr1", "border-clr2",
            "border-clr3", "border-clr4", "border-clr5", "border-clr6", "border-clr7", "border-clr8",
            "border-clr9", "border-[#AEF359]", "border-[#eb142ab9]", "border-[#08BCFF]", "border-[#C332EA]", "border-[#C35F4E]",
            "border-[#9e0059]", "border-clr1", "border-clr2", "border-[#C332EA]", "border-[#08BCFF]"
        ]

        return busData.map((item) => {
            if (item.data.data.datastatus === 4) {
                return (
                    <div key={item.key}>
                        <OfflineScroll busno={item.data.busdetails.no} />
                    </div>
                )
            } else {
                return (
                    <div key={item.key}>
                        <ScrollBar
                            click={() => {
                                toggleDrawer(item.data.driverdetail.name, item.data.driverdetail.phone,
                                    item.data.busdetails.no, item.data.busdetails.busno, item.data.busdetails.seats, parseInt(item.key));
                                bottomCont.setIsDrawerOpen(true);
                                setShowAllBus(false);
                                localStorage.setItem('busNoKey', item.key);
                            }}
                            busno={item.data.busdetails.no}
                            status={item.data.data.accstatus}
                            color={scrollBarColors[parseInt(item.key)]}
                            speed={item.data.data.speed}
                            eta={item.data.data.eta}
                        />
                    </div>
                )
            }
        })
    }, [busData, bottomCont])

    return (
        <>
            <BottomSheet
                open={isDrawerOpen}
                onDismiss={() => {
                    toggleDrawerDefault();
                    bottomCont.setIsDrawerOpen(false);
                }}
                snapPoints={({ maxHeight }) => [
                    maxHeight / 2,
                    maxHeight * 0.9,
                ]}
                defaultSnap={({ maxHeight }) => maxHeight / 2}
                expandOnContentDrag={true}
                footer={
                    <>
                        <hr className='w-full border-gray-700 p-1' />
                        <div className='bg-themeprimary rounded-2xl font-bold text-black text-center py-4 cursor-pointer hover:bg-[#6f983ee4]'
                            onClick={() => {
                                toggleDrawerDefault();
                                navigate({
                                    pathname: "/issue",
                                    search: createSearchParams({
                                        busNo: busNo
                                    }).toString()
                                });
                            }}
                        >
                            Report an issue
                        </div>
                    </>
                }
            >
                <div className="h-full text-white">
                    <div className='p-6 '>
                        <p className='text-lg font-bold'>Bus NO {busNo}</p>
                        {/* <p className='text-gray-400 font-bold text-sm'>Arriving at next stop in 20 mins</p> */}
                        {/* first div */}
                        <div className='bg-gray-700 p-2.5 mt-3 rounded-2xl h-15 flex'>
                            <div className='rounded-full border-2 w-10 h-10 flex justify-center items-center'>
                                <PersonIcon />
                            </div>
                            <div className='font-bold ml-4'>
                                {driverName}<br></br>
                                <p className='text-xs text-gray-400'>Staff Incharge</p>
                            </div>
                            <div className='absolute mt-1 right-14'>
                                <a className='tel-class' href={`tel:${phoneNumber}`}><LocalPhoneIcon style={{ color: '#AEF359' }} /></a>
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
                            <p className='text-sm font-bold'>1 Hour</p>
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
                    className={theme === 'dark' ? 'map-tiles-theme--dark' : 'map-tiles-theme--lite'}
                />
                {/* Location Marker */}
                {
                    locationMarkerPosition && <Marker position={locationMarkerPosition} icon={locationIcon}>
                        <Popup>
                            You are here
                        </Popup>
                    </Marker>
                }
                {
                    showAllBus && showAllBusMap()
                }
                {
                    !showAllBus && showSpecificBus()
                }
                <ToggleBusScroll callback={setIsBusNavShown} />
            </MapContainer>
            {/* scroll container */}
            <ScrollContainer className="fixed z-[1000] flex bottom-16 w-screen" ref={scrollRef}
                style={isBusNavShown ? mountedStyle : unmountedStyle}>
                {showScrollBar()}
            </ScrollContainer>

            {/* Layer icons */}
            <div className='overlay top-4 left-2 bg-gray-900 w-8 h-8 drop-shadow-2xl
                    flex justify-center items-center rounded-full cursor-pointer p-6 hover:bg-gray-800'
                onClick={() => mapRef.current.flyTo(locationMarkerPosition, ZOOM_LVL)}>
                <MTooltip title="Location" placement="right-start" arrow>
                    <IconButton>
                        <NearMeIcon sx={{
                            color: "#AEF359",
                        }} />
                    </IconButton>
                </MTooltip>
            </div>
            {
                !showAllBus && (
                    <div className='overlay top-[4.5rem] left-2 bg-gray-900 w-8 h-8 drop-shadow-2xl
                flex justify-center items-center rounded-full cursor-pointer p-6 hover:bg-gray-600'
                        onClick={() => setIsTrack(pre => !pre)}>
                        <MTooltip title="Track" placement="right-start" arrow>
                            <IconButton>
                                <ShareLocationIcon sx={{
                                    color: `${isTrack ? '#AEF359' : '#ffff'}`,
                                }} />
                            </IconButton>
                        </MTooltip>
                    </div>
                )
            }
            {
                !showAllBus && (
                    <div className='overlay top-[8rem] left-2 bg-gray-900 w-8 h-8 drop-shadow-2xl
                flex justify-center items-center rounded-full cursor-pointer p-6 hover:bg-gray-600'
                        onClick={() => setShowAllBus(true)}>
                        <MTooltip title="Exit" placement="right-start" arrow>
                            <IconButton>
                                <WestIcon sx={{
                                    color: "#AEF359",
                                }} />
                            </IconButton>
                        </MTooltip>
                    </div>
                )
            }
        </>
    )
}   