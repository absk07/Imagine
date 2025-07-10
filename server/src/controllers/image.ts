import { Request, Response } from 'express';
import { DocumentSnapshot } from 'firebase-admin/firestore';
import { db } from '../config/firebase';
import FormData from 'form-data';
import { apiData } from '../utils/clipdrop';

interface AuthenticatedRequest extends Request {
    user?: DocumentSnapshot;
}

export const generateImage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
            return;
        }

        if (!req.user) {
            res.status(400).json({
                success: false,
                message: 'Login to continue'
            });
            return;
        }

        const { id } = req.user;

        const user = await db.collection('users').doc(id).get();

        if (user.exists === false) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return;
        }

        const userData = user?.data();
        if (userData?.uc === 0) {
            res.status(403).json({
                success: false,
                message: 'Insufficient UC',
                uc: userData?.uc
            });
            return;
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const response = await apiData(formData);

        await db.collection('users').doc(id).update({
            uc: userData?.uc - 1
        });

        res.status(200).json({
            success: true,
            message: 'Image generated successfully',
            imageUrl: response,
            uc: userData?.uc - 1
        });
    } catch (error: any) {
        console.error('Error generating image:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate image'
        });
    }
}