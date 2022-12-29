import express from "express"
import userAuth from "../middleware/userAuth.js"
import { addTask, checkTask, deleteTask } from "../controllers/tasks.js"

const router = express.Router()

router.patch('/addTask/:id', userAuth, addTask)

router.patch('/checkTask/:todoid/:taskid', userAuth, checkTask)

router.patch('/deleteTask/:todoid/:taskid', userAuth, deleteTask)

export default router