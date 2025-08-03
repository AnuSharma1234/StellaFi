import express from 'express'
import cors from 'cors'
import { connectDb } from './db';

const app = express();

app.use(cors())


app.listen(process.env.PORT, (req,res) => {
    console.log(`Server started on PORT : ${process.env.PORT}`)
    connectDb();
})

