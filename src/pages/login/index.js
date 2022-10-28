import { useState, } from 'react'

import { useNavigate } from 'react-router-dom';
import { signIn, useAuth } from '../../firebase/firebase';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useAuth();
  let navigate = useNavigate();

  if (user === undefined) {
    return <div>loading</div>
  }

  if (user) {
    navigate('/home');
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      navigate('/home')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (

    <div className='w-screen h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='flex felx-col py-2'>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' className='border-2 border-gray-700 rounded-md p-2' />
        </div>
        <div>
          <label className='flex felx-col py-2'>password</label>
          <input onChange={(e) => setPassword(e.target.value)} type='password' className='border-2 border-gray-700 rounded-md p-2' />
        </div>
        <button className='rounded-full bg-blue-600 hover:bg-blue-500 w-full mt-6 p-3 text-white'>Sign Up</button>
      </form>
    </div>
  )
}
