import React from 'react';

function ScrollBar({click}) {
    return (
        // container
        <div className="bg-gray-800 w-52 m-4 rounded-2xl h-32">
            {/* sub-container */}
            <div className="border-lime-400 border-l-4 m-2 p-1 flex relative top-2 justify-around rounded-sm">
                {/* <!-- left box --> */}
                <div className="text-white font-bold">
                    Bus NO2<br />
                    <p className="text-xs text-gray-400">ETA</p>
                    7:40 AM
                </div>
                {/* <!-- Right box --> */}
                <div className=" text-white mt-6 font-bold">
                    <p className="text-xs text-gray-400">Status</p>
                    On Route
                </div>
            </div>
            {/* <!-- sub-container 2--> */}
            <div className="border flex justify-center items-center m-3 text-white rounded-lg 
            text-sm font-bold h-8 mt-4 hover:bg-slate-100 hover:text-slate-600" onClick={click}>
                Show Map
            </div>
        </div>
    )
}

export default ScrollBar;