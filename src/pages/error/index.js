import React from 'react'

//svg
import ErrorSVG from './assets/error-404.svg'

export default function Error() {
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <img src={ErrorSVG} alt='Error 404' className='w-1/2 h-1/2' />
            <p
                className='text-3xl font-bold font text-gray-700'
                style={{ fontFamily: "'Righteous', cursive" }}>
                Page Not Found
            </p>
            <p className='mt-4 text-primary border-2 border-primary bg-gray-700 p-2 px-6 rounded-full hover:text-slate-200'>
                Go back to the home page...
            </p>
        </div>
    )
}
