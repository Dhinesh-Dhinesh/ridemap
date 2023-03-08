import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { logOut } from '../../firebase/firebase';

import { SpinLoading } from '../../components/Loading';
import Loading from '../../components/Loading';

import { routeData } from './data.js';

//firebase
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../firebase/firebase';
import { useLayoutEffect } from 'react';

export default function Profile() {

    const [isThemeChecked, setThemeChecked] = useState(false);
    const [isTrack, setIsTrack] = useState(false);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUid] = useState(null);

    //Routes data
    const [route, setRoute] = useState("Select your route");
    const [stop, setStop] = useState("Select your stop");
    const [busNo, setBusNo] = useState("Select your bus number");
    // backend
    const [stopArray, setStopArray] = useState([]);
    const [isHaveRoutes, setIsHaveRoutes] = useState(false);
    const [routeAndStop, setRouteAndStop] = useState({});
    // ui
    const [isRouteDropShown, setIsRouteDropShown] = useState(false);
    const [isStopDropShown, setIsStopDropShown] = useState(false);
    const [isBusNoDropShown, setIsBusNoDropShown] = useState(false);
    const [routeLoading, setRouteLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const uid = sessionStorage.getItem('uid');
        const userRef = doc(firestoreDB, "users", uid)

        getDoc(userRef).then((doc) => {
            if (doc.exists()) {
                setName(doc.data().name);
                setEmail(doc.data().email);
                if (doc.data().route && doc.data().stop && doc.data().isNotificationEnabled) {
                    setIsNotificationEnabled(doc.data().isNotificationEnabled);
                    setRoute(doc.data().route);
                    setStop(doc.data().stop);
                    setBusNo(doc.data().busNo)
                    setRouteAndStop({ route: doc.data().route, stop: doc.data().stop, busNo: doc.data().busNo });
                    setIsHaveRoutes(true);
                }
            }
        })
    }, [])

    // save routes
    function saveRoute() {
        if ((route === routeAndStop.route && stop === routeAndStop.stop) && busNo === routeAndStop.busNo ) {
            setIsEdit(false);
            return;
        }
        if ((route === "Select your route" || stop === "Select your stop") || busNo === "Select your bus number") {
            return;
        }

        setRouteLoading(true);
        const userRef = doc(firestoreDB, "users", uid)
        updateDoc(userRef, {
            route: route,
            stop: stop,
            busNo: busNo,
            isNotificationEnabled: true
        }).then(() => {
            console.log("Updated");
        })

        if (isHaveRoutes) {
            // !unsub
            let unsubTopic = routeAndStop.route.split(/-+/)[0].replace(/[^a-zA-Z]/g, '') + '-' + routeAndStop.stop.replace(/[^a-zA-Z]/g, '') + '-' + routeAndStop.busNo;
            console.log("Unsubscribing", unsubTopic);
            fetch("https://us-central1-ridemap-11f0c.cloudfunctions.net/api/unsubscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'access-key': process.env.REACT_APP_CF_API_KEY
                },
                body: JSON.stringify({
                    topicName: unsubTopic,
                    uid
                })
            })
        }

        let subTopic = route.split(/-+/)[0].replace(/[^a-zA-Z]/g, '') + '-' + stop.replace(/[^a-zA-Z]/g, '') + '-' + busNo;
        fetch("https://us-central1-ridemap-11f0c.cloudfunctions.net/api/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'access-key': process.env.REACT_APP_CF_API_KEY
            },
            body: JSON.stringify({
                topicName: subTopic,
                uid
            })
        }).then(() => {
            setIsEdit(false);
            setRouteLoading(false);
            setRouteAndStop({ route, stop });
            setIsHaveRoutes(true);
        })
    }

    function toggleTrack() {
        setIsTrack((prevState) => !prevState);
    }

    // Logout 
    const handleLogOut = async () => {
        try {
            await logOut().then(() => {
                sessionStorage.removeItem('uid');
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.setItem('hideCreateAccount', true);
                navigate('/')
            });
        } catch (e) {
            console.log(e.message)
        }
    };

    //reset password
    const resetPassword = () => {
        navigate('/reset-password');
    }

    //navigate to docs
    const navigateToDocs = () => {
        navigate('/docs');
    }

    useLayoutEffect(() => {
        localStorage.getItem('isLite') === 'false' ? setThemeChecked(false) : setThemeChecked(true);
        localStorage.getItem('isTrack') === 'false' ? setIsTrack(false) : setIsTrack(true);;
        setUid(sessionStorage.getItem('uid'));
    }, []);

    if (!email) {
        return <Loading />
    }

    return (
        <div className='flex flex-col w-screen h-screen items-center bg-backgroundprimary py-5'>
            <h1 className='text-4xl font-bold text-gray-300 tracking-wider'>Profile</h1>
            <img src={require('./assets/profile.webp')} alt="profile" width={160} height={160} className="pointer-events-none" unselectable="on" />
            <h1 className='text-xl font-bold text-themeprimary -mt-5'>{name}</h1>
            <hr className='w-11/12 mt-2 border-gray-700' />
            {/* Info*/}
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex felx-row justify-start -mt-2 -ml-2 py-2'>
                    <img alt="ico" src={require('./assets/info.webp')} width={32} height={32} />
                    <p className='font-bold text-2xl text-gray-300'>Info</p>
                </div>
                <div className='grid grid-cols-3 justify-item-start w-40'>
                    <h1 className='text-md font-bold text-gray-400'>Name</h1>
                    <span className='text-gray-400'>:</span>
                    <h1 className='text-md font-bold text-gray-400 -ml-10 w-60'>{name}</h1>
                </div>
                <div className='grid grid-cols-3 justify-item-start mt-5 w-40'>
                    <h1 className='text-md font-bold text-gray-400'>Email</h1>
                    <span className='text-gray-400'>:</span>
                    <h1 className='text-md font-bold text-gray-400 -ml-10'>{email}</h1>
                </div>
            </div>
            <hr className='w-11/12 mt-4 border-gray-700' />

            {/* Routes */}
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex felx-row justify-start -mt-2 -ml-2 py-2'>
                    <img alt="ico" src={require('./assets/route.webp')} width={32} height={32} />
                    <p className='font-bold text-2xl text-gray-300'>Notification</p>
                </div>
                {
                    isHaveRoutes && !isEdit ? (
                        <>
                            <div className='grid grid-cols-3 justify-items-start w-80 mt-2'>
                                <h1 className='text-md font-bold text-gray-400'>Notification</h1>
                                <span className='text-gray-400'>:</span>
                                {/* Toggle bar */}
                                <label className="inline-flex relative items-center cursor-pointer -ml-20">
                                    <input type="checkbox" value="" id="purple-toggle" className="sr-only peer" checked={isNotificationEnabled} onChange={() => {
                                        console.log("notification toggled");
                                    }} />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-400">{isNotificationEnabled ? "On" : "Off"}</span>
                                </label>
                            </div>
                            <div className='grid grid-cols-3 justify-items-start w-24 mt-5'>
                                <h1 className='text-md font-bold text-gray-400'>Busno</h1>
                                <span className='text-gray-400 ml-5'>:</span>
                                <p className='text-gray-400 font-bold w-56'>{busNo}</p>
                            </div>
                            <div className='grid grid-cols-3 justify-items-start w-24 mt-5'>
                                <h1 className='text-md font-bold text-gray-400'>Route</h1>
                                <span className='text-gray-400 ml-5'>:</span>
                                <p className='text-gray-400 font-bold w-56'>{route}</p>
                            </div>
                            <div className='grid grid-cols-3 justify-items-start w-24 mt-5'>
                                <h1 className='text-md font-bold text-gray-400'>Stop</h1>
                                <span className='text-gray-400 ml-5'>:</span>
                                <p className='text-gray-400 font-bold w-56'>{stop}</p>
                            </div>
                            <div className='relative mt-3 w-20' onClick={() => setIsEdit(true)}>
                                <p className='text-gray-400 bg-overlayprimary w-20 text-center rounded-xl py-2 font-bold hover:bg-gray-700 cursor-pointer'>Edit</p>
                            </div>
                        </>
                    ) : (
                        <div>
                            {
                                routeLoading ? <SpinLoading /> :
                                    // {/* route */}
                                    <div>
                                        <div className='grid grid-cols-3 justify-items-start w-80 mt-2'>
                                            <h1 className='text-md font-bold text-gray-400'>Notification</h1>
                                            <span className='text-gray-400'>:</span>
                                            {/* Toggle bar */}
                                            <label className="inline-flex relative items-center cursor-pointer -ml-20">
                                                <input type="checkbox" value="" id="purple-toggle" className="sr-only peer" checked={isNotificationEnabled} onChange={() => {
                                                    setIsNotificationEnabled(prev => !prev)
                                                }} />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-400">{isNotificationEnabled ? "On" : "Off"}</span>
                                            </label>
                                        </div>
                                        {
                                            (stop === "Select your stop" && isNotificationEnabled) && <p className='text-xs mt-3 text-yellow-300'>Choose a stop where you want to be notified when the bus arrives.</p>
                                        }

                                        {
                                            isNotificationEnabled === true && (
                                                <div>
                                                    {/* busno */}
                                                    <div className='grid grid-cols-3 justify-item-start mt-5 w-40'>
                                                        <h1 className='text-md font-bold text-gray-400'>Bus no</h1>
                                                        <span className='text-gray-400'>:</span>
                                                        <div className='w-72 -ml-10'>
                                                            <button onClick={() => {
                                                                setIsBusNoDropShown((prevState) => !prevState)
                                                            }}
                                                                className={`text-white ${busNo === "Select your bus number" ? "w-64" : "w-20"} bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none
                                                            focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 
                                                            dark:hover:bg-blue-700 dark:focus:ring-blue-800`} type="button">{busNo}<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none"
                                                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M19 9l-7 7-7-7"></path></svg></button>
                                                        </div>
                                                    </div>
                                                    {/* busNo dropdown */}
                                                    {
                                                        isBusNoDropShown && (
                                                            <div id='scroll' className={`ml-16 z-10 w-24  rounded divide-y divide-gray-100 shadow bg-overlayprimary absolute`}>
                                                                <ul className="overflow-y-auto h-48 py-1 text-sm text-gray-200" aria-labelledby="dropdownDefault">
                                                                    {
                                                                        Array.from({ length: 27 }, (_, index) => index + 1).map((item) => {
                                                                            return (
                                                                                <li key={item.id} className="text-center">
                                                                                    <p onClick={() => {
                                                                                        setBusNo(item)
                                                                                        setIsBusNoDropShown((prevState) => !prevState);
                                                                                    }} className="block py-2 px-4 hover:bg-gray-600 text-white">{item}</p>
                                                                                    <hr className='w-auto border-gray-700' />
                                                                                </li>

                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                    {/* route */}
                                                    <div className='grid grid-cols-3 justify-item-start mt-5 w-40'>
                                                        <h1 className='text-md font-bold text-gray-400'>Route</h1>
                                                        <span className='text-gray-400'>:</span>
                                                        <div className='w-72 -ml-10'>
                                                            <button onClick={() => {
                                                                setIsRouteDropShown((prevState) => !prevState);
                                                                setStop("Select your stop");
                                                                setIsStopDropShown(false);
                                                            }}
                                                                className="text-white w-64 bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none
                                                            focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 
                                                            dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{route}<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none"
                                                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M19 9l-7 7-7-7"></path></svg></button>
                                                        </div>
                                                    </div>
                                                    {/* route dropdown */}
                                                    {
                                                        isRouteDropShown && (
                                                            <div id='scroll' className={`ml-10 z-10 w-64  rounded divide-y divide-gray-100 shadow bg-overlayprimary absolute`}>
                                                                <ul className="overflow-y-auto h-48 py-1 text-sm text-gray-200" aria-labelledby="dropdownDefault">
                                                                    {
                                                                        routeData.map((item) => {
                                                                            return (
                                                                                <li key={item.id}>
                                                                                    <p onClick={() => {
                                                                                        setIsRouteDropShown((prevState) => !prevState);
                                                                                        setRoute(item.route)
                                                                                        setStopArray(item.stops)
                                                                                    }} className="block py-2 px-4 hover:bg-gray-600 text-white">{item.route}</p>
                                                                                    <hr className='w-auto border-gray-700' />
                                                                                </li>

                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                    {/* stop */}
                                                    {
                                                        route !== "Select your route" && (
                                                            <div className='grid grid-cols-3 justify-item-start mt-5 w-40'>
                                                                <h1 className='text-md font-bold text-gray-400'>Stop</h1>
                                                                <span className='text-gray-400'>:</span>
                                                                <div className='w-72 -ml-10'>
                                                                    <button onClick={() => {
                                                                        if (route === routeAndStop.route && stop === routeAndStop.stop) {
                                                                            return;
                                                                        }
                                                                        setIsStopDropShown((prevState) => !prevState);
                                                                        setIsRouteDropShown(false);
                                                                    }}
                                                                        className="text-white w-64 bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none
                                                                focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 
                                                                dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{stop}<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none"
                                                                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                d="M19 9l-7 7-7-7"></path></svg></button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    {/*Stop Dropdown */}
                                                    {
                                                        isStopDropShown && (
                                                            <div id='scroll' className={`ml-10 z-10 w-64  rounded divide-y divide-gray-100 shadow bg-overlayprimary absolute`}>
                                                                <ul className="overflow-y-auto h-48 py-1 text-sm text-gray-200" aria-labelledby="dropdownDefault">
                                                                    {
                                                                        stopArray.map((item) => {
                                                                            return (
                                                                                <li key={item}>
                                                                                    <p onClick={() => {
                                                                                        setIsStopDropShown((prevState) => !prevState);
                                                                                        setStop(item)
                                                                                    }} className="block py-2 px-4 hover:bg-gray-600 text-white">{item}</p>
                                                                                    <hr className='w-auto border-gray-700' />
                                                                                </li>

                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        stop !== "Select your stop" ? <button onClick={() => saveRoute()} className='text-green-400 border-2 w-14 text-center border-green-700 hover:bg-green-900 rounded-xl mt-4'>Save</button> : null
                                                    }
                                                </div>
                                            )

                                        }
                                    </div>
                            }
                        </div>
                    )
                }
            </div>
            <hr className='w-11/12 mt-4 border-gray-700' />
            {/*settings*/}
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex felx-row justify-start -mt-2 -ml-2 py-2'>
                    <img alt="ico" src={require('./assets/settings.webp')} width={32} height={32} />
                    <p className='font-bold text-2xl text-gray-300'>Settings</p>
                </div>
                <div className='grid grid-cols-3 justify-items-start w-80 mt-2'>
                    <h1 className='text-md font-bold text-gray-400'>Track Marker</h1>
                    <span className='text-gray-400'>:</span>
                    {/* Toggle bar */}
                    <label className="inline-flex relative items-center cursor-pointer -ml-20">
                        <input type="checkbox" value="" id="purple-toggle" className="sr-only peer" checked={isTrack ? true : false} onChange={() => {
                            toggleTrack();
                            localStorage.setItem('isTrack', !isTrack);
                        }} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-400">{isTrack ? "On" : "Off"}</span>
                    </label>
                </div>
                <div className='grid grid-cols-3 justify-items-start w-80 mt-5'>
                    <h1 className='text-md font-bold text-gray-400'>Map theme</h1>
                    <span className='text-gray-400'>:</span>
                    {/* Toggle bar */}
                    <label className="inline-flex relative items-center cursor-pointer -ml-20">
                        <input type="checkbox" value="" id="purple-toggle" className="sr-only peer" checked={isThemeChecked ? true : false} onChange={() => {
                            localStorage.setItem('isLite', !isThemeChecked);
                            setThemeChecked(prevState => !prevState);
                        }} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-400">{isThemeChecked ? "Light" : "Dark"}</span>
                    </label>
                </div>
            </div>
            <hr className='w-11/12 mt-4 border-gray-700' />
            {/* Auth */}
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex felx-row justify-start -mt-2 -ml-2 py-2'>
                    <img alt="ico" src={require('./assets/auth.webp')} width={32} height={32} />
                    <p className='font-bold text-2xl text-gray-300'>Account</p>
                </div>
                <div onClick={() => resetPassword()} className='text-gray-400 bg-overlayprimary w-40 text-center rounded-xl py-2 font-bold hover:bg-gray-700 cursor-pointer'>
                    <p>Reset Password</p>
                </div>
                <div onClick={() => handleLogOut()} className='text-gray-400 bg-overlayprimary w-40 text-center rounded-xl py-2 font-bold hover:bg-gray-700 mt-3 cursor-pointer'>
                    <p>Logout</p>
                </div>
            </div>
            <hr className='w-11/12 mt-4 border-gray-700' />
            {/* docs */}
            <div className='w-11/12'>
                <button onClick={navigateToDocs} className='mt-3 text-gray-400 bg-overlayprimary w-40 text-center rounded-xl py-2 font-bold hover:bg-gray-700 cursor-pointer'>
                    How to use
                </button>
            </div>
            <hr className='w-11/12 mt-4 border-gray-700' />
            {/* this div fixes bottom nav bar */}
            <div className='mt-8'>
                &nbsp;
            </div>
        </div>
    )
}