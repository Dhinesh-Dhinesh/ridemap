import React, { useEffect, useState } from 'react';

import { ref, getDownloadURL, listAll, getMetadata } from "firebase/storage";
import { storage } from "../../firebase/firebase";

import ReactLoading from "react-loading";

export default function Routes() {

    const [urls, setUrls] = useState([]);
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        let metaConst = 1;

        listAll(ref(storage, 'routes'))
            .then((res) => {
                res.items.forEach((itemRef) => {
                    //Getting metadata of first image in list
                    if (metaConst === 1) {
                        getMetadata(itemRef)
                            .then((metadata) => {
                                setMetadata(new Date(metadata.updated).toLocaleString("en-IN", { timeZone: 'IST' }).toUpperCase());
                            })
                            .catch((error) => {
                                console.log(`Meta error : ${error}`);
                            });
                        metaConst = 0;
                    }

                    getDownloadURL(itemRef).then((url) => {
                        setUrls((prevState) => [...prevState, url]);
                    })
                });
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    if (urls.length === 0) {
        return (
            <div className="flex justify-center items-center w-screen h-screen bg-backgroundprimary">
                <ReactLoading type="spinningBubbles" color="#AEF359" />
            </div>
        )
    }

    return (
        <div className='flex flex-col w-screen h-screen items-center bg-backgroundprimary text-white'>
            {
                metadata ? (
                    <div className='font-bold p-3 border-2 border-gray-600 m-2 rounded-lg text-md text-themeprimary'>
                        Updated On : {metadata}
                    </div>
                ) : null
            }
            {
                urls.map((url, i) => {
                    return (
                        <div key={i} className="mb-1 p-2">
                            <img src={url} alt='route' />
                        </div>
                    )
                })
            }
            <div className='mt-7'>&nbsp;</div>
        </div>
    )
}