import { auth } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import admin from '../server.js'
import User from '../models/user.model.js'

function userAuth(req, res, next) {
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            const token=await user.getIdToken()
            const userInfo=await admin.auth().verifyIdToken(token)
            const email=userInfo.uid
            req.user=await User.findOne({email})
            return next()
        } else {
            return res.send('User is signed out')
        }
    })
}

export default userAuth