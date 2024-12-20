import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom';
import { signIn, useAuth, } from '../../firebase/firebase';

import Loading from "../../components/Loading";
import Lottie from 'react-lottie';
import busAnimation from './bus.json'

export default function Login() {

  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [wrongPassword, setWrongPassword] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const user = useAuth();
  const navigate = useNavigate();

  const isHideCreateAccount = sessionStorage.getItem('hideCreateAccount');

  const defaultOptionsLottie = {
    loop: true,
    autoplay: true,
    animationData: busAnimation,
    renderer: 'svg'
  }

  useEffect(() => {
    sessionStorage.setItem("new_email", searchParams.get('email'));
  }, [searchParams]);

  if (user === undefined || loading) {
    return <Loading />
  }

  if (user) {
    if (user.emailVerified === false) {
      return <Navigate to='/verify-email' />;
    }
    return <Navigate to="/home" />
  }

  const toCreateAccount = () => {
    navigate('/signup');
  }

  const forgotPassword = () => {
    navigate('/reset-password');
  }

  const handleSubmit = (e) => {
    // e.preventDefault()

    if (email === '' || password === '') return;

    setWrongPassword(false);
    setNotFound(false);
    sessionStorage.setItem('isLoggedIn', false)

    setLoading(true);
    signIn(email, password).then((data) => {
      setLoading(false);
    }).catch((error) => {

      if (error.code === 'auth/wrong-password') {
        setWrongPassword(true);
      }

      if (error.code === 'auth/user-not-found') {
        setNotFound(true);
      }

      setLoading(false);
      console.log(error);
    })
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-backgroundprimary text-white'>
      <div className='-mt-32 relative'>
        <Lottie options={defaultOptionsLottie} height={300} width={300} isClickToPauseDisabled={true} />
        <p className='absolute right-[7rem] bottom-12 text-gray-400'>Ridemap.in</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='flex felx-col py-2 text-xl font-bold'>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
        </div>
        <div className='mt-5'>
          <label className='flex felx-col py-2 text-xl font-bold'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type='password' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
        </div>
        <div className='flex justify-center items-center'>
          <label className={`${wrongPassword ? "" : "hidden"} py-2 text-sm text-red-500 w-72 text-center`}>The password that you've entered is incorrect.<p onClick={() => forgotPassword()} className='text-blue-500 text-center cursor-pointer'>Forgotten password?</p></label>
          <label className={`${notFound ? "" : "hidden"} mt-3 py-2 text-sm text-red-500 w-72 text-center`}>User not found ⚠️,Please create an account</label>
        </div>
        <div className='flex justify-center items-center'>
          <button type='submit' className='rounded-full border border-themeprimary bg-overlayprimary hover:bg-gray-700 w-56 mt-10 p-3 text-themeprimary'>Sign In</button>
        </div>
      </form>
      {
        isHideCreateAccount === 'true' ? null : <div className='text-blue-400 relative -bottom-14 cursor-pointer hover:text-blue-200'><p onClick={() => toCreateAccount()}>Create an account</p></div>
      }
    </div>
  )
}
