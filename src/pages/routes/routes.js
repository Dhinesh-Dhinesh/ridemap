import React, { useEffect, useState } from 'react';

import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";

export default function Routes() {

    const [urls, setUrls] = useState([]);

    useEffect(() => {
        listAll(ref(storage, 'routes'))
            .then((res) => {
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then((url) => {
                        setUrls((prevState) => [...prevState, url]);
                    })
                });
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className='flex flex-col w-screen h-screen items-center bg-backgroundprimary text-white'>
            {
                urls.map((url, i) => {
                    return (
                        <div key={i} className="mb-8">
                            <img src={url} alt='route' />
                        </div>
                    )
                })
            }
        </div>
    )
}