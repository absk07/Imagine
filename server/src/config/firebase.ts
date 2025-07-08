import { initializeApp, cert, ServiceAccount, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import Firebase_SA from '../../imagine-f921c-firebase-adminsdk-fbsvc-01736a76ed.json';

let app: App;
let auth: Auth;
let db: Firestore;

const initializeFirebaseApp = (): void => {
    try {
        if (!Firebase_SA) {
            console.error('FIREBASE_SA environment variable is not set');
            throw new Error('FIREBASE_SA environment variable is not set');
        }
        app = initializeApp({
            credential: cert(Firebase_SA as ServiceAccount),
        });
        auth = getAuth(app);
        db = getFirestore(app);
        console.log('Firebase app initialized successfully');
    } catch (err: any) {
        console.error('Error initializing Firebase app:', err);
        throw new Error('Failed to initialize Firebase app');
    }
}

export { initializeFirebaseApp, app, auth, db };