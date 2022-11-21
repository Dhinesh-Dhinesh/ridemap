import React, { useState } from 'react'

import { useAuth, logOut } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { sendEmailVerification } from 'firebase/auth';


export default function VerifyEmail() {

  const user = useAuth();
  const navigate = useNavigate();

  const isShowEmailVerifiedStatus = sessionStorage.getItem('isShowEmailVerifiedStatus');
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isShowCheckMail, setIsShowCheckMail] = useState(true);

  function verify() {

    if (user) {
      if (user.emailVerified) {
        return navigate('/home');
      } else {
        sessionStorage.setItem('isShowEmailVerifiedStatus', true);
        window.location.reload();
      }
    }
  }

  function sendVerificationEmail() {
    if (user) {
      sessionStorage.removeItem('isShowEmailVerifiedStatus', false);
      sendEmailVerification(user).then(() => {
        setIsShowCheckMail(false);
        setIsEmailSend(true);
      })
    }
  }

  function backToLogin() {
    logOut();
    navigate('/');
  }

  return (
    <div className='w-screen h-screen text-2xl text-themeprimary flex flex-col justify-center items-center'>
      <p>Verify your email!</p>
      <p onClick={backToLogin} className='text-sm mt-1 text-gray-400 underline underline-offset-2 cursor-pointer'>Back to Login</p>
      {
        isShowCheckMail && (
          <p className='text-sm mt-5 text-gray-400'>Check your mail and verify..</p>
        )
      }
      {
        isShowEmailVerifiedStatus && (
          <p className='text-sm mt-5 text-gray-400'>Email not verified yet, Please verify | <span className='underline underline-offset-2 cursor-pointer' onClick={sendVerificationEmail}>Resend Mail</span></p>
        )
      }{
        isEmailSend && (
          <p className='text-sm mt-5 text-gray-400'>Email sent, Please check your Mail</p>
        )
      }
      <p onClick={verify} className="py-2 border-2 border-themeprimary px-10 mt-4 rounded-full hover:bg-gray-700">Verify</p>
    </div>
  )
}
