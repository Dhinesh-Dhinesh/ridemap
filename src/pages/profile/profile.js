import React, { useEffect, useState } from 'react';

//raw data
import { routeData } from './data';

export default function Profile() {

    const [route, setRoute] = useState('Select your route');
    const [isRouteDropDownOpen, setIsRouteDropDownOpen] = useState(false);
    const [stopname, setStopname] = useState('Select your stop');
    const [stop, setStop] = useState([]);
    const [isStopDropDownOpen, setIsStopDropDownOpen] = useState(false);
    const [isThemeChecked, setThemeChecked] = useState(false);
    const [isNotificationOn, setNotificationOn] = useState(true);

    function toggleRouteDropDown() {
        setIsRouteDropDownOpen((prevState) => !prevState);
    }

    function toggleStopDropDown() {
        setIsStopDropDownOpen((prevState) => !prevState);
    }

    function toggleNotification() {
        setNotificationOn((prevState) => !prevState);
    }

    useEffect(() => {
        localStorage.getItem('isLite') === 'true' ? setThemeChecked(false) : setThemeChecked(true);
    }, []);

    return (
        <div className='flex flex-col w-screen h-screen items-center bg-backgroundprimary py-5'>
            <h1 className='text-4xl font-bold text-gray-300 tracking-wider'>Profile</h1>
            <img src={require('./assets/profile.png')} alt="profile" width={160} height={160} className="pointer-events-none" unselectable="on" />
            <h1 className='text-xl font-bold text-themeprimary -mt-5'>Dhinesh</h1>
            <hr className='w-11/12 mt-2 border-gray-700' />
            {/* Info*/}
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex felx-row justify-start -mt-2 -ml-2 py-2'>
                    <img alt="ico" src={require('./assets/info.png')} width={32} height={32} />
                    <p className='font-bold text-2xl text-gray-300'>Info</p>
                </div>
                <div className='grid grid-cols-3 justify-item-start w-40'>
                    <h1 className='text-md font-bold text-gray-400'>Name</h1>
                    <span className='text-gray-400'>:</span>
                    <h1 className='text-md font-bold text-gray-400 -ml-10'>Dhinesh</h1>
                </div>
                <div className='grid grid-cols-3 justify-item-start mt-5 w-40'>
                    <h1 className='text-md font-bold text-gray-400'>Email</h1>
                    <span className='text-gray-400'>:</span>
                    <h1 className='text-md font-bold text-gray-400 -ml-10'>dhinesh@gmail.com</h1>
                </div>
            </div>
            <hr className='w-11/12 mt-2 border-gray-700' />
            {/* Routes */}
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex felx-row justify-start -mt-2 -ml-2 py-2'>
                    <img alt="ico" src={require('./assets/route.png')} width={32} height={32} />
                    <p className='font-bold text-2xl text-gray-300'>Routes</p>
                </div>
                <div className='grid grid-cols-3 justify-items-start w-24'>
                    <h1 className='text-md font-bold text-gray-400'>Route</h1>
                    <span className='text-gray-400 ml-5'>:</span>
                    <button onClick={() => {
                        toggleRouteDropDown()
                        setIsStopDropDownOpen(false)
                    }}
                        className="text-white w-60 bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{route}<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                </div>
                {/* Dropdown */}
                <div id='scroll' className={`${isRouteDropDownOpen ? "" : "hidden"} ml-12 mt-16 z-10 w-64 bg-white rounded divide-y divide-gray-100 shadow dark:bg-overlayprimary absolute`}>
                    <ul className="overflow-y-auto h-48 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                        {
                            routeData.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <p onClick={() => {
                                            setRoute(item.route)
                                            setStop(item.stops)
                                            toggleRouteDropDown()
                                            setStopname('Select your stop')
                                        }} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.route}</p>
                                        <hr className='w-auto border-gray-700' />
                                    </li>

                                )
                            })
                        }
                    </ul>
                </div>
                {
                    route !== 'Select your route' && (
                        <div className='grid grid-cols-3 justify-items-start w-24 mt-5'>
                            <h1 className='text-md font-bold text-gray-400'>Stop</h1>
                            <span className='text-gray-400 ml-5'>:</span>
                            <button onClick={() => {
                                toggleStopDropDown()
                                setIsRouteDropDownOpen(false)
                            }}
                                className="text-white w-60 bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{stopname}<svg className="ml-2 w-[11px] h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                        </div>
                    )
                }
                {/* Dropdown */}
                <div id='scroll' className={`${isStopDropDownOpen ? "" : "hidden"} ml-12 mt-36 z-10 w-64 bg-white rounded divide-y divide-gray-100 shadow dark:bg-overlayprimary absolute`}>
                    <ul className="overflow-y-auto h-32 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                        {
                            stop && stop.map((item) => {
                                return (
                                    <li key={item}>
                                        <p onClick={() => {
                                            toggleStopDropDown()
                                            setStopname(item)
                                        }} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item}</p>
                                        <hr className='w-auto border-gray-700' />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <hr className='w-11/12 mt-4 border-gray-700' />
            {/*settings*/}
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex felx-row justify-start -mt-2 -ml-2 py-2'>
                    <img alt="ico" src={require('./assets/settings.png')} width={32} height={32} />
                    <p className='font-bold text-2xl text-gray-300'>Settings</p>
                </div>
                <div className='grid grid-cols-3 justify-items-start w-80 mt-2'>
                    <h1 className='text-md font-bold text-gray-400'>Notification</h1>
                    <span className='text-gray-400'>:</span>
                    {/* Toggle bar */}
                    <label className="inline-flex relative items-center cursor-pointer -ml-20">
                        <input type="checkbox" value="" id="purple-toggle" className="sr-only peer" defaultChecked onChange={() => toggleNotification()} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-400">{isNotificationOn ? "On" : "Off"}</span>
                    </label>
                </div>
                <div className='grid grid-cols-3 justify-items-start w-80 mt-5'>
                    <h1 className='text-md font-bold text-gray-400'>Map theme</h1>
                    <span className='text-gray-400'>:</span>
                    {/* Toggle bar */}
                    <label className="inline-flex relative items-center cursor-pointer -ml-20">
                        <input type="checkbox" value="" id="purple-toggle" className="sr-only peer" checked={isThemeChecked ? true : false} onChange={() => {
                            localStorage.setItem('isLite', isThemeChecked);
                            setThemeChecked(prevState => !prevState);
                        }} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-400">{isThemeChecked ? "Dark" : "Lite"}</span>
                    </label>
                </div>
            </div>
            <hr className='w-11/12 mt-2 border-gray-700' />
            {/* Auth */}
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex felx-row justify-start -mt-2 -ml-2 py-2'>
                    <img alt="ico" src={require('./assets/auth.png')} width={32} height={32} />
                    <p className='font-bold text-2xl text-gray-300'>Auth</p>
                </div>
                <div className='text-gray-400 bg-overlayprimary w-40 text-center rounded-xl py-2 font-bold hover:bg-gray-700'>
                    <p>Reset Password</p>
                </div>
                <div className='text-gray-400 bg-overlayprimary w-40 text-center rounded-xl py-2 font-bold hover:bg-gray-700 mt-3'>
                    <p>Logout</p>
                </div>
            </div>
            {/* this div fixes bottom nav bar */}
            <div className='mt-8'>
                &nbsp;
            </div>
        </div>
    )
}