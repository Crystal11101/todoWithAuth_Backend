import { auth } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

function userAuth(req, res, next) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            req.user=user
            return next()
        } else {
            return res.send('User is signed out')
        }
    })
}

export default userAuth