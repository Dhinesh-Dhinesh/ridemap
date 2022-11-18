import React, { useEffect, useState } from 'react';
import { firestoreDB } from '../../firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Notification() {

    const [isNotifications, setIsNotifications] = useState([]);

    useEffect(() => {
        const getNotificationsData = async () => {

            console.log(sessionStorage.getItem('uid'))

            const notify_ref = collection(firestoreDB, "users/H7OwHU379hdXB1JDf2tlSbfpVWo2/notifications")

            var data = [];
            const querySnapshot = await getDocs(query(notify_ref, orderBy('time', 'desc')));
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });

            setIsNotifications(data);
        }

        getNotificationsData();
    }, []);

    return (
        <div className='flex flex-col w-screen h-screen items-center bg-backgroundprimary text-white'>
            {
                isNotifications.map((item, index) => {
                    return (
                        <NotificationComponent key={index} title={item.title} body={item.body} time={"23"} />
                    )
                })
            }
            {/* <hr className='w-11/12 mt-4 border-gray-700' /> */}
            {/* clear all button */}
            <div className='bg-overlayprimary p-2 px-5 mt-5 rounded-2xl font-bold text-gray-400 hover:text-gray-100'>
                Clear all
            </div>
            <div className='mt-16'>
                &nbsp;
            </div>
        </div>
    )
}

const NotificationComponent = ({ title, body, time }) => {
    return (
        <>
            <div className='bg-overlayprimary min-h-[5.5rem] max-h-52 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>{title}</p>
                <p className='text-sm mt-3'>{body}</p>
            </div>
            <div>{time}</div>
        </>
    )
}