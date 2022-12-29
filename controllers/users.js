import User from '../models/user.model.js'
import admin from '../server.js'
import bcrypt, { hash } from 'bcrypt'
import { auth } from '../firebase.js'
import { signInWithCustomToken, signOut } from 'firebase/auth'

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (await User.findOne({ email })) return res.send('Email already in use')
        const hashPass = await bcrypt.hash(password, 10)
        await User.create({ email: email, password: hashPass })
        res.send('User created')
    } catch (err) {
        res.sendStatus(400)
        console.log(err.message)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user == null) return res.send('Email not registered')
        if (await bcrypt.compare(password, user.password)) {
            const token = await admin.auth().createCustomToken(process.env.ACCESS_TOKEN)
            await signInWithCustomToken(auth, token)
            return res.send('Signed in')
        }
    } catch (err) {
        console.log(err.message)
        return res.sendStatus(400)
    }
}

export const logoutUser = async (req, res) => {
    signOut(auth)
    res.send('logged out')
}
