import { Request, Response } from 'express';
import { db } from '../config/firebase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DocumentSnapshot } from 'firebase-admin/firestore';

interface AuthenticatedRequest extends Request {
    user?: DocumentSnapshot;
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
        res.status(400).json({
            success: false,
            message: 'Reuired fields are missing: username, email, or password' 
        });
        return;
    }

    try {
        const userExists = await db.collection('users').where('email', '==', email).get();

        // console.log('User exists:', userExists.empty);

        if (!userExists.empty) {
            res.status(400).json({
                success: false,
                message: 'User already exists'
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.collection('users').add({
            username,
            email,
            password: hashedPassword,
            uc: 5
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'super_secrer_key');

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: { username },
            token
        });
    } catch (err: any) {
        console.error('Error registering user:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to register user' 
        });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
        return;
    }

    try {
        const user = await db.collection('users').where('email', '==', email).get();

        if (user.empty) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.docs[0].data().password);

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
            return;
        }

        // console.log('User data:', user.docs[0].id);

        const token = jwt.sign({ id: user.docs[0].id }, process.env.JWT_SECRET || 'super_secrer_key');
        
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: { username: user.docs[0].data().username },
            token
        });
    } catch (err: any) {
        console.error('Error logging in user:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to log in user' 
        });
    }
};

export const unknownCredit = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
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
        res.status(200).json({
            success: true,
            user: { username: userData?.username },
            uc: userData?.uc,
        });
    } catch (error: any) {
        console.error('Error in unknownCredit:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
        
    }
};