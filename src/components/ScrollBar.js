import React,{useEffect, useState} from 'react';

import SpeedIcon from '@mui/icons-material/Speed';

function ScrollBar({ click, busno, status, color, speed, eta }) {
    
    const [speedColor,setSpeedColor] = useState(0)
    
    const colors = ["","text-green-500","text-yellow-500","text-red-600"]

    useEffect(()=>{
        if((speed > 1) && (speed <= 60)){
            setSpeedColor(1)
        } else if((speed > 60) && (speed <= 80)){
            setSpeedColor(2)
        } else if (speed > 80) {
            setSpeedColor(3)
        } else {
            setSpeedColor(0)
        }
    },[speed])

    return (
        // container
        <div className="bg-backgroundprimary w-52 m-4 rounded-2xl h-32">
            {/* sub-container */}
            <div className={`${color} border-l-4 m-2 p-1 flex relative top-2 justify-around rounded-sm`}>
                {/* <!-- left box --> */}
                <div className="text-white font-bold">
                    Bus NO {busno}<br />
                    <p className="text-xs text-gray-400">ETA</p>
                    {status === 1 ? eta : '-- : --'}
                </div>
                {/* <!-- Right box --> */}
                <div className=" text-white mt-6 font-bold">
                    {/* Speed */}
                    <div className='absolute -top-[.01rem] left-[6.4rem] flex'>
                        <div className='relative top-[.1rem] left-[.1rem] text-gray-400'>
                            <SpeedIcon fontSize='5px' />
                        </div>
                        <p className={`text-xs relative top-[.47rem] left-2 ${colors[speedColor]}`}>{speed} km/h</p>
                    </div>
                    <p className="text-xs text-gray-400">Status</p>
                    {status ? "On Route" : "Stopped"}
                </div>
            </div>
            {/* <!-- sub-container 2--> */}
            <div className="border flex justify-center items-center m-3 text-white rounded-lg 
            text-sm font-bold h-8 mt-4 hover:bg-slate-100 hover:text-slate-600" onClick={() => click()}>
                Show Map
            </div>
        </div>
    )
}

export default ScrollBar;