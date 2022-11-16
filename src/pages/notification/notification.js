import React from 'react';

export default function Notification() {
    return (
        <div className='flex flex-col w-screen h-screen items-center bg-backgroundprimary text-white'>
            <div className='bg-overlayprimary min-h-24 max-h-52 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>Bus Reached to your nearest Stop!</p>
                <p className='text-sm mt-3'>Bus no.25 reached to tindivanam be ready at your stop</p>
            </div>
            <div className='bg-overlayprimary max-h-24 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>Bus Reached to your nearest Stop!</p>
                <p className='text-sm mt-3'>Bus no.25 reached to tindivanam be ready at your stop</p>
            </div>
            <hr className='w-11/12 mt-4 border-gray-700' />
            <div className='max-h-24 w-11/12 mt-1 pt-1 ml-2 text-gray-400 text-sm'>
                yesterday 10:00PM
            </div>
            <div className='bg-overlayprimary max-h-24 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>Bus Reached to your nearest Stop!</p>
                <p className='text-sm mt-3'>Bus no.25 reached to tindivanam be ready at your stop</p>
            </div>
            <div className='bg-overlayprimary max-h-24 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>Bus Reached to your nearest Stop!</p>
                <p className='text-sm mt-3'>Bus no.25 reached to tindivanam be ready at your stop</p>
            </div>
            <div className='bg-overlayprimary max-h-24 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>Bus Reached to your nearest Stop!</p>
                <p className='text-sm mt-3'>Bus no.25 reached to tindivanam be ready at your stop</p>
            </div>
            <div className='bg-overlayprimary max-h-24 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>Bus Reached to your nearest Stop!</p>
                <p className='text-sm mt-3'>Bus no.25 reached to tindivanam be ready at your stop</p>
            </div>
            <div className='bg-overlayprimary max-h-24 w-11/12 mt-5 p-2 rounded-xl shadow-2xl'>
                <p className='text-themeprimary text-l font-bold'>Bus Reached to your nearest Stop!</p>
                <p className='text-sm mt-3'>Bus no.25 reached to tindivanam be ready at your stop</p>
            </div>
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