import React from 'react'

import Lottie from 'react-lottie';
import OfflineAnimation from './lootiejson/offline.json'

const defaultOptionsLottie = {
    loop: true,
    autoplay: true,
    animationData: OfflineAnimation,
    renderer: 'svg'
}

export default function OfflineScroll({ busno }) {
    return (
        <div className="m-4 h-32 w-52 rounded-2xl bg-backgroundprimary">
            <div className="relative top-2 m-2 flex h- flex-col rounded-sm border-l-4 px-2 border-red-600">
                <div className="font-bold text-white ml-3 mt-0.5">Bus No {busno}</div>
                <div className="mt-4 font-bold text-white flex ml-3">
                    <p>Device Offline</p>
                    <Lottie options={defaultOptionsLottie} height={30} width={30} isClickToPauseDisabled={true} />
                </div>
            </div>
            <div className="border flex justify-center items-center m-3 rounded-lg cursor-pointer
            text-sm font-bold h-8 mt-4 text-slate-600">
                Show Map
            </div>
        </div>
    )
}
