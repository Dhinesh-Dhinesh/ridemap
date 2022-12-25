import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import ReactLoading from "react-loading";
import Lottie from 'react-lottie';
import rocketAnimation from './assets/rocket.json'

//context
import { BottomContext } from '../../context/BottomContext';

//firebase
import { doc, Timestamp, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

export default function Issue() {

    const [searchParams] = useSearchParams();

    const [message, setMessage] = useState("");
    const [uid, setUid] = useState("");
    const [busNo, setBusNo] = useState("");

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();
    const bottomCont = useContext(BottomContext);


    const submitIssue = () => {
        if (message === null || message.trim() === '') {
            return;
        } else {
            setLoading(true);
            let docRef = doc(firestoreDB, "issues", uuidv4());
            setDoc(docRef, {
                uid: uid,
                busNo: busNo,
                message: message.trim(),
                date: Timestamp.now()
            }).then(() => {
                setLoading(false)
                setSubmitted(true);
            }).catch(err => {
                console.log(err)
            });
        }
    }

    const goToHome = () => {
        bottomCont.setIsDrawerOpen(false);
        navigate('/home')
    }

    useEffect(() => {
        setUid(sessionStorage.getItem('uid'));
        setBusNo(searchParams.get('busNo'));
        // eslint-disable-next-line
    }, []);

    return (
        <div className='flex justify-center items-center text-white h-screen flex-col'>
            {
                !loading && !submitted ? <>
                    <h1 className='font-bold'>Tell us about the problems you're having.</h1>
                    <hr className='w-11/12 m-4 border-gray-700' />
                    <div className='w-10/12'>
                        <label className="block mb-2 text-sm font-medium text-white">Your message</label>
                        <textarea onChange={e => setMessage(e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        <button onClick={() => goToHome()} className='bg-gray-500 p-2 rounded-lg text-black mt-3 hover:bg-gray-600'>Cancel</button>
                        <button onClick={() => submitIssue()} className='ml-3 bg-themeprimary p-2 rounded-lg text-black mt-3 hover:bg-[#6f983ee4]'>Submit</button>
                    </div>
                </> : <>
                    {loading ? <ReactLoading type="spin" color="#AEF359" /> : <div className='flex justify-center items-center flex-col'>
                        <Lottie options={{
                            loop: true,
                            autoplay: true,
                            animationData: rocketAnimation,
                            renderer: 'svg'
                        }} height={300} width={300} isClickToPauseDisabled={true} />
                        <p className='text-xs'>Your problem has been reported; it will be resolved soon.</p>
                        <button onClick={() => goToHome()} className="mt-6 bg-themeprimary p-2 rounded-lg text-black hover:bg-[#6f983ee4]">Go to home</button>
                    </div>
                    }
                </>
            }
        </div>
    )
}
