import { useState, } from 'react'

import { useNavigate, Navigate } from 'react-router-dom';
import { signIn, useAuth, db, logOut } from '../../firebase/firebase';
import { ref, get, child, set } from 'firebase/database'

import ReactLoading from "react-loading";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useAuth();
  let navigate = useNavigate();


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
    return <div className="flex justify-center items-center w-screen h-screen bg-gray-700">
      <ReactLoading type="spinningBubbles" color="#AEF359"/>
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
