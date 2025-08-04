import express from 'express'
import cors from 'cors'
import { connectDb } from './db/index.js';
import { configDotenv } from 'dotenv';

const app = express();

app.use(cors())
app.use(express.json())

configDotenv({
    path : '.env'
})

app.listen(process.env.PORT, (req,res) => {
    console.log(`Server started on PORT : ${process.env.PORT}`)
    connectDb();
})

