import { useState, useEffect } from 'react'

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

  const [wrongPassword, setWrongPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notFound,setNotFound] = useState(false);

  const user = useAuth();
  let navigate = useNavigate();

  const defaultOptionsLottie = {
    loop: true,
    autoplay: true,
    animationData: busAnimation,
    renderer: 'svg'
  }

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      setIsLoggedIn(true);
    }
  }, [])


  const checkUserLoggedIn = (id) => {
    get(child(ref(db), `users/${id}/signin`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val() === 1) {
          (async function logOutIfLoggedIn() {
            await logOut();
            sessionStorage.setItem('isLoggedIn', id);
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
    return <Navigate to='/permissions' />
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === '' || password === '') return;

    setWrongPassword(false);
    setIsLoggedIn(false);
    setNotFound(false);
    sessionStorage.setItem('isLoggedIn',false)

    setLoading(true);
    signIn(email, password).then((data) => {
      checkUserLoggedIn(data.user.uid)
      setLoading(false);
    }).catch((error) => {

      if (error.code === 'auth/wrong-password') {
        setWrongPassword(true);
      }

      if(error.code === 'auth/user-not-found') {
        setNotFound(true);
      }

      setLoading(false);
      console.log(error);
    })
  }

  return (

    <div className='w-screen h-screen flex flex-col justify-center items-center bg-backgroundprimary text-white'>
      <div className='-mt-32 relative'>
        <Lottie options={defaultOptionsLottie} height={300} width={300} isClickToPauseDisabled={true}/>
        <p className='absolute right-[7rem] bottom-12 text-gray-400'>Ridemap.in</p>
      </div>
      <form onSubmit={handleSubmit} className="w-[90vw] items-center flex justify-center flex-col">
        <div>
          <label className='flex felx-col py-2 text-xl font-bold'>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
        </div>
        <div className='mt-6'>
          <label className='flex felx-col py-2 text-xl font-bold'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type='password' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
          <label className={`${wrongPassword ? "flex" : "hidden"} py-2 text-sm text-red-500 w-72 relative`}>The password that you've entered is incorrect.<u className='absolute top-8 right-20 text-blue-500'>Forgotten password?</u></label>
          <label className={`${isLoggedIn ? "flex" : "hidden"} mt-3 py-2 text-sm text-red-500 w-72 relative left-9`}>User logged in on another device ..</label>
          <label className={`${notFound ? "flex" : "hidden"} mt-3 py-2 text-sm text-red-500 w-72 relative left-24`}>User not found !..</label>
        </div>
        <button className='rounded-full border border-themeprimary bg-overlayprimary hover:bg-gray-700 w-56 mt-10 p-3 text-themeprimary'>Sign In</button>
      </form>
    </div>
  )
}
