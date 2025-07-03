import React from 'react'
import { assets } from '../assets/assets';

const Button: React.FC = () => {
    return (
        <div className='pb-16 text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-950 py-6 md:py-14'>
                You are the wizard. Try now
            </h1>
            <button className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto border border-orange-600 shadow-[0_0_16px_4px_rgba(0,0,0,0.7)] hover:scale-105 transition-all duration-700'>
                Generate Images
                <img className='h-6' src={assets.star_group} alt='' />
            </button>
        </div>
    )
}

export default Button;
