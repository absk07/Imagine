import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Result: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [image, setImage] = useState<string>(assets.sample_img_1);
    const [isImageloaded, setIsImageLoaded] = useState<boolean>(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [prompt]);
    
    return (
        // <form className='flex flex-col min-h-[90vh] justify-center items-center'>
            // <div>
            //     <div className='relative'>
            //         <img src={assets.sample_img_1} alt='' className='max-w-sm rounded' />
            //         <span className='absolute bottom-0 left-0 h-1 bg-blue-500  w-full transition-all duration-[10s]' />
            //     </div>
            //     <p>Loading.....</p>
        //     </div>
        //     <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
        //         <input type='text' placeholder='thy prompt...' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20' />
        //         <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
        //     </div>
        // </form>
        <motion.form
            initial={{ opacity: 0.2, y: 120 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col min-h-[90vh] justify-center items-center'
        >
            <div>
                <div className='relative'>
                    <img src={image} alt='' className='max-w-sm rounded' />
                    <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${isLoading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
                </div>
                {
                  isLoading && (
                    <div className='flex gap-4 max-w-3xl w-full py-3'>
                      <div className='relative pacman'>
                        <div className='pacman-top'></div>
                        <div className='pacman-bottom'></div>
                        <div className='dot delay-0'></div>
                        <div className='dot delay-1'></div>
                        <div className='dot delay-2'></div>
                      </div>
                    </div> 
                  )
                }
            </div>
            {
                !isImageloaded && (
                    <div className='flex w-full max-w-xl bg-neutral-500 text-white p-4 rounded-3xl mt-10 transition-all'>
                        <textarea
                            ref={textareaRef}
                            // onKeyDown={handleKeyDown}
                            className='outline-none w-full resize-none overflow-y-auto break-words bg-transparent px-2 py-1 text-white rounded-md min-h-[48px] max-h-[120px] h-auto'
                            rows={2} 
                            placeholder='Imagine Anything . . .' 
                            required 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <div className='flex items-center justify-between text-sm'>
                            <button className='bg-black rounded-full p-4 m-2 cursor-pointer'>
                                Generate
                            </button>
                        </div>
                    </div>
                )
            }
            {
                isImageloaded && (
                    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                        <p onClick={() => setIsImageLoaded(false)} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto border border-orange-600 shadow-[0_0_16px_4px_rgba(0,0,0,0.7)] hover:scale-105 transition-all duration-700'>
                            Generate Another
                            <img className='h-6' src={assets.star_group} alt='' />
                        </p>
                        <a href={image} download className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto border border-orange-600 shadow-[0_0_16px_4px_rgba(0,0,0,0.7)] hover:scale-105 transition-all duration-700'>
                            Download
                            <img className='h-6' src={assets.download_icon} alt='' />
                        </a>
                    </div>
                )
            }
        </motion.form>
    )
}

export default Result;
