import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

//loading
import Loading from '../../components/Loading';


export default function Permissions() {

    const [isGeolocation, setIsGeoLocation] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

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
        return <Loading />
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
