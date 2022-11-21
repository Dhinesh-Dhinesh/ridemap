import React, { useState } from 'react'

//firebase
import { signUp } from '../../firebase/firebase';

//raw data
import { routeData } from './data';

export default function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [route, setRoute] = useState('Select your route');

    const [isRouteDropDownOpen, setIsRouteDropDownOpen] = useState(false);
    const [isStopDropDownOpen, setIsStopDropDownOpen] = useState(false);

    const [stopname, setStopName] = useState('Select your stop');
    const [stop, setStop] = useState('');

    //ui
    const [worngPassword, setWrongPassword] = useState(false);
    const [allFields, setAllFields] = useState(false);
    const [emailExist,setEmailExist] = useState(false);

    function toggleRouteDropDown() {
        setIsRouteDropDownOpen((prevState) => !prevState);
    }

    function toggleStopDropDown() {
        setIsStopDropDownOpen((prevState) => !prevState);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setWrongPassword(false);
        setAllFields(false)
        setEmailExist(false)

        if ((email === '') || (password === '') || (name === '') || (route === 'Select your route') || (stopname === 'Select your stop')) {
            setAllFields(true)
        } else {
            if (password.length <= 8) {
                setWrongPassword(true);
                return;
            }

            await signUp(name,email,password,route,stopname);
            
        }
    }

    return (
        <div className='h-screen w-screen text-white flex flex-col justify-center items-center'>
            <div className='mb-5 text-2xl font-bold text-themeprimary border-b-2 p-2'>Sign Up</div>
            <form onSubmit={handleSubmit} className="w-[90vw] items-center flex justify-center flex-col">
                <div>
                    <label className='flex felx-col py-2 text-xl font-bold'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} type='text' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
                </div>
                <div>
                    <label className='flex felx-col py-2 text-xl font-bold'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
                </div>
                <div>
                    <label className='flex felx-col py-2 text-xl font-bold'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
                </div>
                <div className='flex flex-col'>
                    <div className='py-2 text-xl font-bold'>Route</div>
                    <div className='w-72'>
                        <button onClick={() => {
                            toggleRouteDropDown()
                            setIsStopDropDownOpen(false)
                        }}
                            className="text-white w-72 bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{route}<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
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
                                                setStopName('Select your stop')
                                            }} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.route}</p>
                                            <hr className='w-auto border-gray-700' />
                                        </li>

                                    )
                                })
                            }
                        </ul>
                    </div>
                    {/* stops */}
                    {
                        stop && (
                            <>
                                <div className='py-2 text-xl font-bold'>Stop</div>
                                <div className='w-24 mt-1'>
                                    <button onClick={() => {
                                        toggleStopDropDown()
                                        setIsRouteDropDownOpen(false)
                                    }}
                                        className="text-white w-72 bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{stopname}<svg className="ml-2 w-[11px] h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                                </div>
                                {/* Dropdown */}
                                <div id='scroll' className={`${isStopDropDownOpen ? "" : "hidden"} ml-12 mt-36 z-10 w-64 bg-white rounded divide-y divide-gray-100 shadow dark:bg-overlayprimary absolute`}>
                                    <ul className="overflow-y-auto h-32 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                        {
                                            stop && stop.map((item) => {
                                                return (
                                                    <li key={item}>
                                                        <p onClick={() => {
                                                            toggleStopDropDown()
                                                            setStopName(item)
                                                        }} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item}</p>
                                                        <hr className='w-auto border-gray-700' />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </>
                        )
                    }
                </div>
                {
                    worngPassword && (<div className='text-xs mt-2 text-red-500'>Password must be atleast 8 characters long</div>)
                }
                {
                    allFields && (<div className='text-xs mt-2 text-yellow-400'>* All fields required</div>)
                }
                {
                    emailExist && (<div className='text-xs mt-2 text-yellow-400'>Email already exist</div>)
                }
                <button className='rounded-full border border-themeprimary bg-overlayprimary hover:bg-gray-700 w-56 mt-10 p-3 text-themeprimary'>Create account</button>
            </form>
        </div>
    )
}
