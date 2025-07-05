import React from 'react'
import { motion } from 'motion/react';
import { assets } from '../assets/assets';

const Button: React.FC = () => {
    return (
        <div className='pb-16 text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-950 py-6 md:py-14'>
                You are the wizard. Try now
            </h1>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { duration: 1, delay: 0.8 } }}
                className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto border border-orange-600 shadow-[0_0_16px_4px_rgba(0,0,0,0.7)]'
            >
                Generate Images
                <img className='h-6' src={assets.star_group} alt='' />
            </motion.button>
        </div>
    )
}

export default Button;
