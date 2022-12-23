import express from 'express'
import {registerUser,loginUser,logoutUser} from '../controllers/users.js'

const router = express.Router()

router.post('/user/register', registerUser)

router.post('/user/login', loginUser)

router.delete('/user/logout',logoutUser)

export default router