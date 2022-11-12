import React, { useState } from 'react';

//raw data
import { routeData } from './data';

export default function Profile() {

    const [route, setRoute] = useState('Select your route');
    const [isRouteDropDownOpen, setIsRouteDropDownOpen] = useState(false);
    const [stopname,setStopname] = useState('Select your stop');
    const [stop, setStop] = useState([]);
    const [isStopDropDownOpen, setIsStopDropDownOpen] = useState(false);

    function toggleRouteDropDown() {
        setIsRouteDropDownOpen((prevState) => !prevState);
    }

    function toggleStopDropDown() {
        setIsStopDropDownOpen((prevState) => !prevState);
    }

    return (
        <div className='flex flex-col w-screen h-screen items-center bg-backgroundprimary py-5'>
            <h1 className='text-4xl font-bold text-gray-300 tracking-wider'>Profile</h1>
            <img src={require('./assets/profile.png')} alt="profile" width={210} height={210} />
            <h1 className='text-xl font-bold text-themeprimary -mt-5'>Dhinesh</h1>
            <hr className='w-11/12 mt-2 border-gray-500' />
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex flex-row justify-start'>
                    <h1 className='text-md font-bold text-gray-400'>Name : &nbsp;</h1>
                    <h1 className='text-md font-bold text-gray-400'>Dhinesh</h1>
                </div>
                <div className='flex flex-row justify-start mt-5'>
                    <h1 className='text-md font-bold text-gray-400'>Email &nbsp;: &nbsp;</h1>
                    <h1 className='text-md font-bold text-gray-400'>dhinesh@gmail.com</h1>
                </div>
            </div>
            <hr className='w-11/12 mt-2 border-gray-500' />
            <div className='flex flex-col w-11/12 mt-5 '>
                <div className='flex flex-row justify-start'>
                    <h1 className='text-md font-bold text-gray-400'>Route : &nbsp;</h1>
                    <button onClick={() => toggleRouteDropDown()}
                        className="text-white w-52 bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{route}<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
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
                                        }} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.route}</p>
                                        <hr className='w-auto border-gray-500' />
                                    </li>

                                )
                            })
                        }
                    </ul>
                </div>
                {
                    route !== 'Select your route' && (
                        <div className='flex flex-row justify-start mt-5'>
                            <h1 className='text-md font-bold text-gray-400'>Stop <span className='pl-2.5'>:</span> &nbsp;</h1>
                            <button onClick={() => toggleStopDropDown()}
                                className="text-white w-52 bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{stopname}<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
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
                                        <hr className='w-auto border-gray-500' />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}