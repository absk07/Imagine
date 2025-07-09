import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../config/firebase';
import { DocumentSnapshot } from 'firebase-admin/firestore';

// Extend Request type to support custom `user` field
interface AuthenticatedRequest extends Request {
    user?: DocumentSnapshot;
}

// Define expected token structure (you can extend as needed)
interface DecodedToken extends JwtPayload {
    id: string;
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
    
        if (!token) {
            res.status(401).json({ success: false, authRequired: true, message: 'Invalid authorization' });
            return;
        }
    
        let decodedToken: DecodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'super_secrer_key') as DecodedToken;
        } catch (err) {
            res.json({ success: false, authRequired: true, message: 'Please Login to continue.' });
            return;
        }
    
        const user = await db.collection('users').doc(decodedToken.id).get();

        if (!user) {
            res.json({ success: false, authRequired: true, message: 'Please Login to continue.' });
            return;
        }
    
        req.user = user;
        next();
    } catch (error: any) {
        console.error('Authentication error:', error);
        res.json({ success: false, authRequired: true, message: 'Please Login to continue.' });
    }
};