import React, { useEffect, useState } from 'react';


import { useNavigate } from 'react-router-dom';
import { logOut } from '../../firebase/firebase';

import Loading from '../../components/Loading';

//firebase
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '../../firebase/firebase';

export default function Profile() {

    const [isThemeChecked, setThemeChecked] = useState(false);
    const [isNotificationOn, setNotificationOn] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [droutes, setdroutes] = useState('');
    const [dstop, setdStop] = useState('')

    const Navigate = useNavigate();

    useEffect(() => {
        const uid = sessionStorage.getItem('uid');
        const userRef = doc(firestoreDB, "users", `${uid}`)

        getDoc(userRef).then((doc) => {
            if (doc.exists()) {
                setName(doc.data().name);
                setEmail(doc.data().email);
                setdroutes(doc.data().route)
                setdStop(doc.data().stop)
            }
        })
    }, [])

    function toggleNotification() {
        setNotificationOn((prevState) => !prevState);
    }

    // Logout 
    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut();
            sessionStorage.removeItem('uid');
            sessionStorage.removeItem('isLoggedIn');
            Navigate('/')
        } catch (e) {
            console.log(e.message)
        }
    };

    useEffect(() => {
        localStorage.getItem('isLite') === 'true' ? setThemeChecked(false) : setThemeChecked(true);
    }, []);

    if(!dstop) {
        return <Loading />
    }

    return (
        <div className='flex flex-col w-screen h-screen items-center bg-backgroundprimary py-5'>
            <h1 className='text-4xl font-bold text-gray-300 tracking-wider'>Profile</h1>
            <img src={require('./assets/profile.png')} alt="profile" width={160} height={160} className="pointer-events-none" unselectable="on" />
            <h1 className='text-xl font-bold text-themeprimary -mt-5'>{name}</h1>
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
                    <h1 className='text-md font-bold text-gray-400 -ml-10'>{name}</h1>
                </div>
                <div className='grid grid-cols-3 justify-item-start mt-5 w-40'>
                    <h1 className='text-md font-bold text-gray-400'>Email</h1>
                    <span className='text-gray-400'>:</span>
                    <h1 className='text-md font-bold text-gray-400 -ml-10'>{email}</h1>
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
                    <p className='text-gray-400 font-bold w-56'>{droutes}</p>
                </div>
                <div className='grid grid-cols-3 justify-items-start w-24 mt-5'>
                    <h1 className='text-md font-bold text-gray-400'>Stop</h1>
                    <span className='text-gray-400 ml-5'>:</span>
                    <p className='text-gray-400 font-bold w-56'>{dstop}</p>
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
                        <span className="ml-3 text-sm font-medium text-gray-400">{isThemeChecked ? "Dark" : "Light"}</span>
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
                    <button onClick={handleLogOut}>Logout</button>
                </div>
            </div>
            {/* this div fixes bottom nav bar */}
            <div className='mt-8'>
                &nbsp;
            </div>
        </div>
    )
}