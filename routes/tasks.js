import express from "express"
import userAuth from "../middleware/userAuth.js"
import { addTask, checkTask, deleteTask, getTasks } from "../controllers/tasks.js"

const router = express.Router()

router.get('/getTasks/:id', userAuth, getTasks)

router.patch('/addTask/:id', userAuth, addTask)

router.patch('/checkTask/:todoid/:taskid', userAuth, checkTask)

router.patch('/deleteTask/:todoid/:taskid', userAuth, deleteTask)

export default router