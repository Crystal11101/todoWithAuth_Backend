import express from 'express'
import usersRoute from './routes/users.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import todoRoute from './routes/todo.js'
import tasksRoute from './routes/tasks.js'
import './firebase.js'

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/tododb');

app.use('/',usersRoute)
app.use('/',todoRoute)
app.use('/',tasksRoute)

app.listen(3000) 