import React, { useEffect, useState } from 'react';
import { firestoreDB } from '../../firebase/firebase';
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';

// skeleton loading
import NotificationSkeleton from '../../components/skeleton/notification';

export default function Notification() {

    const [isNotifications, setIsNotifications] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getNotificationsData = async () => {

            let uid = sessionStorage.getItem('uid');

            const notify_ref = collection(firestoreDB, `users/${uid}/notifications`)
            const notify_status = doc(firestoreDB, "users", `${uid}`)

            try {
                await updateDoc(notify_status, {
                    notf_unread: false
                });

                var data = [];
                const querySnapshot = await getDocs(query(notify_ref, orderBy('time', 'desc')));
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                });

                if (data.length > 0) {
                    setIsNotifications(data);
                } else {
                    setIsNotifications(false);
                }
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                setIsLoading(false);
            }
        }

        getNotificationsData();
    }, []);

    if (isLoading) {
        return <NotificationSkeleton />
    }

    if (!isNotifications) {
        return (
            <div className="flex flex-col w-screen h-screen items-center bg-backgroundprimary text-white justify-center">
                <div className=' w-72 bg-overlayprimary rounded-full p-8 shadow-2xl -mt-4'>
                    <img src={require('./assets/nonotify.webp')} alt='nonotification' className="pointer-events-none" unselectable="on" />
                </div>
                <p className='text-xl mt-3 text-gray-500'>No notification yet !..</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-screen h-screen items-center bg-backgroundprimary text-white ">
            {
                isNotifications && isNotifications.map((item, index) => {

                    let date = item.time.toDate().toLocaleString("en-In", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Asia/Kolkata'
                    });

                    return (
                        <NotificationComponent key={index} title={item.title} body={item.body} time={date} />
                    )
                })
            }
        </div>
    )
}

const NotificationComponent = ({ title, body, time }) => {
    return (
        <>
            <div className='bg-overlayprimary min-h-[5.5rem] max-h-52 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>{title}</p>
                <p className='text-sm mt-3'>{body}</p>
                <p className='text-[.7rem] mt-2 text-gray-500'>{time}</p>
            </div>
        </>
    )
}