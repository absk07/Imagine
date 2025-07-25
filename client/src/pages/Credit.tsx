import React from 'react';
import { motion } from 'motion/react';
import { useAppSelector } from '../app/hooks';
import { setShowLogin } from '../features/user/userSlice';
import { useLoadUnknownCredit } from '../hooks/useGetUC';
import { useRpzPaymentMutation, useRpzPaymentVerifyMutation } from '../api/paymentApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

export interface Plan {
  id: string;
  price: number;
  credits: number;
  desc: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}


export const plans: Plan[] = [
  {
    id: 'Starter',
    price: 50,
    credits: 100,
    desc: 'Best for personal use and exploration beyond the free tier.',
  },
  {
    id: 'Creator',
    price: 100,
    credits: 500,
    desc: 'For creators making premium content for global audiences.',
  },
  {
    id: 'Pro',
    price: 500,
    credits: 5000,
    desc: 'For larger creators and fast-growing businesses.',
  },
];

const Credit: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const { loadUnknownCredit } = useLoadUnknownCredit();

  const [ rpzPayment ] = useRpzPaymentMutation();
  const [ rpzPaymentVerify ] = useRpzPaymentVerifyMutation();

  const navigate = useNavigate();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initRpzPayment = async (order: any) => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      toast.error('Failed to load Razorpay SDK. Please try again.');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Imagine',
      description: 'Unknown Credit Transaction',
      image: assets.imagine_logo,
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: any) => {
        // console.log(response);
        const res = await rpzPaymentVerify(response);
        if ('data' in res) {
          await loadUnknownCredit();
          navigate('/');
          toast.success(res?.data?.message || 'Unknown Credit added successfully');
        } else if ('error' in res) {
          const err = response.error as any;
          // console.error('Payment failed:', err);
          toast.error(err?.data?.message || 'Payment failed');
        }
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };

  const razorpayPayment = async (planId: string): Promise<void> => {
    if (!user) {
      setShowLogin(true);
    }

    const response = await rpzPayment({ planId });

    if ('data' in response) {
      await initRpzPayment(response?.data?.order);
    } else if ('error' in response) {
      const err = response.error as any;
      // console.error('Payment error:', err);
      toast.error(err?.data?.message || 'Payment error');
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 120 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[70vh] text-center pt-14 mb-10'
    >
      <h1 className='text-center text-4xl font-medium mb-6 sm:mb-10 text-white'>
        Pricing plans for creators
      </h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans?.map((plan) => (
          <div
            key={plan.id}
            className='w-80 bg-white/30 drop-shadow-sm border rounded-lg py-12 px-8 text-gray-300 hover:scale-105 hover:border-orange-600 transition-all duration-500'
          >
            <p className='text-2xl mt-3 mb-1 font-semibold text-white'>
              {plan.id}
            </p>
            <p className='text-sm break-words'>{plan.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${plan.price}</span> /{' '}
              {plan.credits} credits
            </p>
            <button onClick={() => razorpayPayment(plan.id)} className='w-full bg-black text-orange-600 mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer'>
              Buy Plan
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Credit;
