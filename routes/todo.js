import express from "express"
import userAuth from "../userAuth.js"
import { createTodo, deleteTodo, editTodo, getAllTodos } from '../controllers/todo.js'

const router = express.Router()

router.get('/getTodos', userAuth, getAllTodos)

router.post('/newTodo', userAuth, createTodo)

router.patch('/editTodo/:id', userAuth, editTodo)

router.delete('/delTodo/:id', userAuth, deleteTodo)

export default router