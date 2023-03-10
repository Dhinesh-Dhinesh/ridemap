import React, { useState, useEffect } from 'react'

import { NavLink, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
//firebase
import { signUp } from '../../firebase/firebase';

export default function SignUp() {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //ui
    const [worngPassword, setWrongPassword] = useState(false);
    const [allFields, setAllFields] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [isEmailAllowed, setIsEmailAllowed] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSamePassword, setIsSamePassword] = useState(false);

    const [isLoading, setLoading] = useState(false);


    useEffect(() => {
        let new_email = sessionStorage.getItem("new_email");
        if (new_email !== "null") {
            setEmail(new_email.trim());
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        setWrongPassword(false);
        setAllFields(false);
        setEmailExist(false);
        setIsSamePassword(false);
        setIsValidEmail(true);
        setIsEmailAllowed(true);

        if ((email === '') || (password === '') || (name === '')) {
            setAllFields(true)
            setLoading(false);
        } else {
            if (password.length < 8) {
                setWrongPassword(true);
                setLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                setIsSamePassword(true);
                setLoading(false);
                return;
            }

            //Checks if the mail is in db or not and then checks if the email is allowed or not
            if (email) {
                async function checkEmail() {
                    await fetch(`https://us-central1-ridemap-11f0c.cloudfunctions.net/api/email?email=${email.trim()}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'access-key': process.env.REACT_APP_CF_API_KEY
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.isEmailAllowed === true) {
                                signUp(name, email, password).then(
                                    (data) => {
                                        if (data === false) {
                                            setEmailExist(true);
                                            setLoading(false);
                                            return;
                                        }
                                        setLoading(false);
                                        navigate('/verify-email');
                                        return;
                                    }
                                )
                            } else {
                                setIsEmailAllowed(false);
                                setLoading(false);
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                }
                // Regex for MVIT email
                const mvit = /\b[A-Za-z0-9._%+-]+@mvit\.edu\.in\b/;
                if (mvit.test(email)) {
                    await checkEmail();
                } else {
                    setIsValidEmail(false);
                    setLoading(false);
                }
            }
        }
    }

    function openWhatsApp() {
        const phoneNumber = '917092340198';
        const message = `Please add my email - ${email}`;

        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        window.open(url, '_blank');
    }

    if (isLoading) {
        return <Loading />
    }


    return (
        <div className='h-screen w-screen text-white flex flex-col justify-center items-center'>
            <div className='mb-5 text-2xl font-bold text-themeprimary border-b-2 p-2'>Sign Up</div>
            <form onSubmit={handleSubmit} className="w-[90vw] items-center flex justify-center flex-col">
                <div>
                    <label className='flex felx-col py-2 text-xl font-bold'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} type='text' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
                </div>
                <div>
                    <label className='flex felx-col py-2 text-xl font-bold'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
                </div>
                <div>
                    <label className='flex felx-col py-2 text-xl font-bold'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
                </div>
                <div>
                    <label className='flex felx-col py-2 text-xl font-bold'>Confirm Password</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type='password' className='bg-overlayprimary px-5 py-3 rounded-md p-2 focus:outline-none text-gray-400 w-72' />
                </div>
                {
                    worngPassword && (<div className='text-xs mt-2 text-red-500 text-center'>Password must be at least 8 characters long</div>)
                }
                {
                    !isEmailAllowed && (<div className='text-xs mt-2 text-red-500 text-center'>This email is not permitted, Request that your transportation department add your email address to ridemap.<p className='text-blue-500 underline' onClick={()=>openWhatsApp()}>Request email</p></div>)
                }
                {
                    !isValidEmail && (<div className='text-xs mt-2 text-red-500 text-center'>incorrect email, Only your organization's email is acceptable (Eg:@mvit.edu.in)</div>)
                }
                {
                    allFields && (<div className='text-xs mt-2 text-yellow-400 text-center'>* All fields required</div>)
                }
                {
                    emailExist && (<div className='text-xs mt-2 text-yellow-400 text-center'>Email already exists</div>)
                }
                {
                    isSamePassword && (<div className='text-xs mt-2 text-yellow-400 text-center'>Password mismatch</div>)
                }
                <button className='rounded-full border border-themeprimary bg-overlayprimary hover:bg-gray-700 w-56 mt-10 p-3 text-themeprimary'>Create account</button>
                <p className='mt-4 text-xs'>Already have an account <NavLink to='/' className='underline underline-offset-2 cursor-pointer'>Sign in</NavLink></p>
            </form>
        </div>
    )
}
