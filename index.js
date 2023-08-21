import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'


const app=express()
dotenv.config()
app.use(bodyParser.json({limit:'30mb',extendex:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extendex:true}))
app.use(cors());

app.use('/posts',postRoutes)

const CONNECTION_URL =process.env.CONNECTION_URL;
const PORT=process.env.PORT || 80

// db connectin

mongoose.connect(CONNECTION_URL ,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`server is running on port: ${PORT}`)))
    .catch((err)=> console.log(`Error is #{err} `))
    
// mongoose.set('useFindAndModify',false);