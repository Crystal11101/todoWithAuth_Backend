import express from 'express'
import usersRoute from './routes/users.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userAuth from './userAuth.js'
import todoRoute from './routes/todo.js'
import tasksRoute from './routes/tasks.js'

const app=express()

// app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(usersRoute)
app.use(cookieParser())
dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/tododb');

app.use('/',usersRoute)
app.use('/',todoRoute)
app.use('/',tasksRoute)

app.listen(3000) 