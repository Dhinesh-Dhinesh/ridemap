import React from 'react'

import ReactLoading from "react-loading";

export default function Loading() {
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-backgroundprimary">
            <ReactLoading type="spinningBubbles" color="#AEF359" />
        </div>
    )
}

export function SpinLoading(){
    return (
        <div className="flex justify-center items-center">
            <ReactLoading type="spinningBubbles" color="#9333EA" width={40}/>
        </div>
    )
}