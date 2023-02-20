import React from 'react'

import Lottie from 'react-lottie';
import OfflineAnimation from './lootiejson/offline.json'

const defaultOptionsLottie = {
    loop: true,
    autoplay: true,
    animationData: OfflineAnimation,
    renderer: 'svg'
  }

export default function OfflineScroll({busno}) {
    return (
        <div className="m-4 h-32 w-52 rounded-2xl bg-backgroundprimary">
            <div className="relative top-2 m-2 flex h- flex-col rounded-sm border-l-4 p-2">
                <div className="font-bold text-white">Bus No {busno}</div>
                <div className="mt-4 font-bold text-white flex">
                    <p>Device Offline</p>
                    <Lottie options={defaultOptionsLottie} height={30} width={30} isClickToPauseDisabled={true} />
                </div>
            </div>
        </div>

    )
}
