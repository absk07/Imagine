import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { initializeFirebaseApp } from './config/firebase';
import routes from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Firebase before using it
initializeFirebaseApp();

const port = process.env.PORT || 3000;

app.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({ message: 'pong' });
});

app.use('/api/v1', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('404 Page Not Found!');
    res.status(404);
    next(error);
});

app.use((err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Internal Server Error!'
    console.log("==========================ERROR START==============================");
    console.log(err);
    console.log("==========================ERROR END==============================");
    res.status(statusCode).json({ success: false, error: true, message: err.message });
});

app.listen(port, () => {
    console.log(`Connected successfully on http://localhost:${port}`);
});