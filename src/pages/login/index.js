import { useState, } from 'react'

import { useNavigate, Navigate } from 'react-router-dom';
import { signIn, useAuth, db, logOut } from '../../firebase/firebase';
import { ref, get, child, set } from 'firebase/database'

import ReactLoading from "react-loading";
import Lottie from 'react-lottie';
import busAnimation from './bus.json'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useAuth();
  let navigate = useNavigate();

  const defaultOptionsLottie = {
    loop: true,
    autoplay: true,
    animationData: busAnimation,
    renderer: 'svg'
  }

  const checkUserLoggedIn = (id) => {
    get(child(ref(db), `users/${id}/signin`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val() === 1) {
          (async function logOutIfLoggedIn() {
            await logOut();
            navigate('/');
          })();
          console.log('user already signed in')
          return;
        }
      } else {
        set(ref(db, "users/" + id + "/"), {
          signin: 1
        })
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  if (user === undefined || loading) {
    return <div className="flex justify-center items-center w-screen h-screen bg-backgroundprimary">
      <ReactLoading type="spinningBubbles" color="#AEF359" />
    </div>
  }

  if (user) {
    checkUserLoggedIn(user.uid);
    return <Navigate to='/home' />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      signIn(email, password).then((data) => {
        checkUserLoggedIn(data.user.uid)
        setLoading(false);
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (

    <div className='w-screen h-screen flex flex-col justify-center items-center bg-backgroundprimary text-white'>
      <div className='-mt-32 relative'>
        <Lottie options={defaultOptionsLottie} height={300} width={300} />
        <p className='absolute right-[7rem] bottom-12 text-gray-400'>Ridemap.in</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='flex felx-col py-2 text-xl font-bold'>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
        </div>
        <div className='mt-6'>
          <label className='flex felx-col py-2 text-xl font-bold'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type='password' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
        </div>
        <div className='flex justify-center items-center'>
          <button className='rounded-full border border-themeprimary bg-overlayprimary hover:bg-gray-700 w-8/12 mt-10 p-3 text-themeprimary'>Sign Up</button>
        </div>
      </form>
      <div className='text-gray-400 bottom-2 absolute text-center text-md'>
        COPYRIGHT © 2022 IGNITE SKYLABS
        ALL RIGHTS RESERVED
      </div>
    </div>
  )
}
