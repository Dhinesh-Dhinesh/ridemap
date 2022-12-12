import React, { useState } from 'react'
import MailGif from './mail.json'
import Lottie from 'react-lottie';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase'

const defaultOptionsLottie = {
    loop: true,
    autoplay: true,
    animationData: MailGif,
    renderer: 'svg'
}

export default function Index() {

    const [email, setEmail] = useState('');
    const [showMailSend, setShowMailSend] = useState(false);

    const sendResetMail = () => {
        if (email !== '') {
            sendPasswordResetEmail(auth,email).then(() => {
                alert('mail send');
                setShowMailSend(true);
            }).catch((e) => {
                console.log(e);
            });
        }
    }


    return (
        <div className='h-screen w-screen text-white flex flex-col justify-center items-center'>
            {
                !showMailSend ? (
                    <>
                        <div className='mb-5 text-2xl font-bold text-themeprimary border-b-2 p-2'>Reset Password</div>
                        <div className="w-[90vw] items-center flex justify-center flex-col">
                            <div>
                                <label className='flex felx-col py-2 text-xl font-bold'>Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type='email' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
                            </div>
                            <button onClick={() => sendResetMail()} className='rounded-full border border-themeprimary bg-overlayprimary hover:bg-gray-700 w-56 mt-10 p-3 text-themeprimary'>Reset password</button>
                        </div>
                    </>
                ) : (
                    <div className='flex justify-center items-center flex-col'>
                        <Lottie options={defaultOptionsLottie} height={300} width={300} isClickToPauseDisabled={true} />
                        <p>Reset mail has been sent.</p>
                    </div>
                )
            }
        </div>
    )
}
