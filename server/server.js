import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { connectDb } from './db/index.js';
import { configDotenv } from 'dotenv';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(cors())
app.use(express.json())

configDotenv({
    path : '.env'
})

app.use('/auth', authRouter)

// API endpoint to save feed data
app.post('/api/save-feed', async (req, res) => {
    try {
        const feedData = req.body;
        const feedPath = path.join(process.cwd(), '../client/public/feed.json');
        
        await fs.writeFile(feedPath, JSON.stringify(feedData, null, 2));
        
        res.json({ success: true, message: 'Feed data saved successfully' });
    } catch (error) {
        console.error('Error saving feed data:', error);
        res.status(500).json({ success: false, message: 'Failed to save feed data' });
    }
});

app.listen(process.env.PORT, (req,res) => {
    console.log(`Server started on PORT : ${process.env.PORT}`)
    connectDb();
})
