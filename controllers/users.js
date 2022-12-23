import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (await User.findOne({ email })) {
            return res.send('Email is already in use')
        }
        const hashPass = await bcrypt.hash(password, 10)
        await User.create({ name: name, email: email, password: hashPass })
        res.sendStatus(200)
    } catch (err) {
        console.log(err.message)
        res.send(err.message)
    }
}

export const loginUser = async (req, res) => {
    const user = await User.findOne({ "email": req.body.email });
    if (user == null) {
        res.send('Incorrect email')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = await jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: '10m' })
            res.status(200).cookie("token", token, {
                expiresIn: '10m',
                httpOnly: true,
                // secure:true
            }).send('Login successful')
        }
        else
            res.send('Wrong password')
    } catch (err) {
        console.log(err.message)
        res.send('Error has occurred')
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie("token")
    res.send('logged out')
}
