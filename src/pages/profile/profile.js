import React from 'react';

export default function Profile() {
    return (
        <div className='flex flex-col text-white w-screen h-screen items-center bg-backgroundprimary py-5'>
            <div className='bg-overlayprimary w-11/12 p-5 h-40 rounded-3xl shadow-2xl'>
                <div className='flex'>
                    <img src={require('./assets/user.png')} alt="profile" width={32} height={32}/>
                    <p className='font-bold text-xl text-themeprimary ml-3 '>Profile</p>
                </div>
                <p className="mt-3">Name : test</p>
                <p className="mt-3">Email : test@gmail.com</p>
            </div>
            <div className='bg-overlayprimary w-11/12 p-5 h-40 rounded-3xl mt-5 shadow-2xl'>
                <div className='flex'>
                    <img src={require('./assets/route.png')} alt="profile" width={32} height={32}/>
                    <p className='font-bold text-xl text-themeprimary ml-3 '>Route</p>
                </div>
                <p className="mt-3">Select Your Route : Ariyur</p>
            </div>
        </div>
    )
}