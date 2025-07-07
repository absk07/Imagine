import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db.ts';

const app = express();

app.use(cors());
app.use(express.json());

connectDB().then(() => 
    console.log('MongoDB connected successfully')
).catch((err: any) => 
    console.error('MongoDB connection error:', err)
);

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Connected successfully on http://localhost:${port}`);
});