import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import { DocumentSnapshot } from 'firebase-admin/firestore';
import { db } from '../config/firebase';

interface AuthenticatedRequest extends Request {
    user?: DocumentSnapshot;
}

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const payment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(400).json({
                success: false,
                message: 'Login to continue'
            });
            return;
        }

        const { id } = req.user;

        const { planId } = req.body;

        if (!planId) {
            res.status(400).json({
                success: false,
                message: 'Missing details'
            });
            return;
        }

        const user = await db.collection('users').doc(id).get();

        if (user.exists === false) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return;
        }

        const userData = user?.data();

        let uc, plan, amount;

        switch (planId) {
            case 'Starter':
                plan = 'Starter';
                uc = 100;
                amount = 50;
                break;
            case 'Creator':
                plan = 'Creator';
                uc = 500;
                amount = 100;
                break;
            case 'Pro':
                plan = 'Pro';
                uc = 5000;
                amount = 500;
                break;
            default:
                res.status(404).json({
                    success: false,
                    message: 'Pricing Plan Not Found!'
                });
                return;
        }

        const tnxData = { userId: id, plan, uc, amount, date: Date.now() };

        const newTnx = await db.collection('transactions').add({
            ...tnxData,
            payment: false
        });

        const order = await instance.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: newTnx.id
        });

        res.status(200).json({
            success: true,
            message: 'Payment done.',
            order
        });
    } catch (error: any) {
        console.error('Payment error', error);
        res.status(500).json({
            success: false,
            message: 'Payment error.'
        });
    }
};