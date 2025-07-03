import React from 'react';
import { assets } from '../assets/assets';

const Jumbotron: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center my-20 group'>
            {/* <div className='text-gray-300 inline-flex text-center gap-2 px-6 py-1 rounded-full border border-orange-300 shadow-[0_0_16px_4px_rgba(255,140,0,0.7)]'>
                <p className=''>Text to Image Generator</p>
                <img src={assets.star_icon} alt='' />
            </div> */}
            <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center text-gray-300'>
                AI Powered <br /> 
                <span className='text-orange-500 leading-[0.70em] outline-none animate-dimlight box-reflect'>Image</span> Generation.
            </h1>
            <p className='text-center max-w-xl mx-auto mt-5 text-gray-300'>
                Bring your imagination to life - just type a prompt and watch AI instantly turn your words into breathtaking visuals.
            </p>
            <button className='sm:text-lg text-gray-300 bg-black w-auto mt-8 mx-12 px-12 py-2.5 flex items-center gap-2 rounded-full border border-orange-600 shadow-[0_0_16px_4px_rgba(255,140,0,0.7)] hover:scale-105 transition-all duration-700'>
                Generate Images
                <img className='h-6' src={assets.star_group} alt='' />
            </button>
            <div className='flex flex-wrap justify-center mt-16 gap-3'>
                {
                    Array(5).fill('').map((_, idx) => {
                        return (
                            <img key={idx} src={idx % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2} alt='' className='w-50 rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Jumbotron;
