import { auth } from '../config/firebase';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Email and password are required' 
        });
        return;
    }
    try {
        const user = await auth.createUser({ email, password });
        // Generate a custom token for the user's UID
        const token = await auth.createCustomToken(user.uid);
        res.status(201).json({
            success: true,
            message: 'User registered successfully', 
            token
        });
    } catch (err: any) {
        console.error('Error registering user:', err);
        res.status(500).json({ 
            error: 'Failed to register user' 
        });
    }
};