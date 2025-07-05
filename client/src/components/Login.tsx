import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { assets } from '../assets/assets';
import { useAppDispatch } from '../app/hooks';
import { setShowLogin } from '../features/user/user'

const Login: React.FC = () => {
    const [modalState, setModalState] = useState<string>('Sign In');

    const dispatch = useAppDispatch();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form className='w-96 sm:w-auto relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-900 font-medium'>{modalState}</h1>
                {
                    modalState === 'Sign In' ? (
                        <p className='text-sm text-center mt-2'>Welcome back! Please enter your details.</p>
                    ) : (
                        <p className='text-sm text-center mt-2'>Welcome! Create a new account to get started.</p>
                    )
                }
                {
                    modalState !== 'Sign In' && (
                        <div className='border border-gray-500 rounded-full p-2 flex items-center gap-2 mt-5'>
                            <img src={assets.profile_icon} alt='' width={25} />
                            <input type='text' placeholder='Full name' className='outline-none text-sm' required />
                        </div>
                    )
                }
                <div className='border border-gray-500 rounded-full p-2 flex items-center gap-2 mt-4'>
                    <img src={assets.email_icon} alt='' width={13} />
                    <input type='email' placeholder='Email' className='outline-none text-sm' required />
                </div>
                <div className='border border-gray-500 rounded-full p-2 flex items-center gap-2 mt-4'>
                    <img src={assets.lock_icon} alt='' width={10} />
                    <input type='password' placeholder='Password' className='outline-none text-sm' required />
                </div>
                <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-black w-full text-white hover:text-orange-600 py-2 rounded-full cursor-pointer'
                >
                    {modalState === 'Sign In' ? 'Sign In' : 'Sign Up'}
                </motion.button>
                {
                    modalState === 'Sign In' ? (
                        <p className='mt-5 text-center'>
                            Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setModalState('Sign Up')}>Sign Up</span>
                        </p>
                    ) : (
                        <p className='mt-5 text-center'>
                            Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setModalState('Sign In')}>Sign In</span>
                        </p>
                    )
                }
                <img onClick={() => dispatch(setShowLogin(false))} src={assets.cross_icon} alt='' className='absolute top-5 right-5 cursor-pointer' />
            </form>
        </div>
    )
}

export default Login;
