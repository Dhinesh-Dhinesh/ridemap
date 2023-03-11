import React, { useState } from 'react'

import { useAuth, logOut } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { sendEmailVerification } from 'firebase/auth';

// Lootie Animation
import Lottie from 'react-lottie';
import emailAnimation from './email.json'

const defaultOptionsLottie = {
  loop: true,
  autoplay: true,
  animationData: emailAnimation,
  renderer: 'svg'
}

export default function VerifyEmail() {

  const user = useAuth();
  const navigate = useNavigate();

  const [isEmailSend, setIsEmailSend] = useState(false);

  function sendVerificationEmail() {
    if (user) {
      sessionStorage.removeItem('isShowEmailVerifiedStatus', false);
      sendEmailVerification(user).then(() => {
        setIsEmailSend(true);
      })
    }
  }

  async function backToLogin() {
    await logOut();
    return navigate('/');
  }

  return (
    <div className='w-screen h-screen text-2xl text-themeprimary flex flex-col justify-center items-center'>
      <p>Verify your email!</p>
      <Lottie options={defaultOptionsLottie} height={300} width={300} isClickToPauseDisabled={true} />
      {
        isEmailSend === false && <p className='text-sm mt-5 text-gray-400'>If you didn't receive your mail. <span className='underline underline-offset-2 cursor-pointer text-blue-500' onClick={sendVerificationEmail}>Resend Mail</span></p>
      }
      {
        isEmailSend && <p className='text-sm mt-5 text-gray-400'>Email Send</p>
      }
      <p className='text-sm mt-5 text-gray-400'>If your mail has been verified, Go back to Login.</p>
      <p onClick={backToLogin} className='text-base mt-5 border-2 border-themeprimary px-4 py-3 rounded-full text-gray-400 cursor-pointer'>Back to Login</p>
    </div>
  )
}
