import React, { useEffect, useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';

import ReactLoading from "react-loading";

//context
import { BottomContext } from '../../contexts/bottomNavContext';

export default function Permissions() {

    const [isGeolocation, setIsGeoLocation] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    //context
    const botCont = useContext(BottomContext);
    botCont.setIsBottomNavShown(true);

    useEffect(() => {
        navigator.permissions.query({ name: 'geolocation' }).then((state) => {
            if (state.state === "granted") {
                setIsGeoLocation(true);
            }
        })

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            setIsNotification(true)
        }
        setIsLoading(false);
    }, [])

    function askPermissions() {
        if (navigator.geolocation) {
            function successCallback(position) {
                setIsGeoLocation(true);
                console.log("asking permissionS")
            }
            navigator.geolocation.getCurrentPosition(successCallback);
        }

        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                setIsNotification(true);
            }
        })
    }

    if (isLoading) {
        return <div className="flex justify-center items-center w-screen h-screen bg-backgroundprimary">
            <ReactLoading type="spinningBubbles" color="#AEF359" />
        </div>
    }

    if (isGeolocation && isNotification) {
        return <Navigate to="/home" />
    }

    return (
        <div className='flex flex-col w-screen h-screen justify-center items-center text-white fixed'>
            <p>Permissions</p>
            <button className='mt-3 bg-overlayprimary p-5 rounded-lg hover:bg-gray-600'
                onClick={() => askPermissions()}
            >
                Allow Location & Notification
            </button>
        </div>
    )
}
