import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDfdKmrtQK1_6HWpJ7teRb-bvaygenDoDE",
    authDomain: "todo-with-auth-c74fc.firebaseapp.com",
    projectId: "todo-with-auth-c74fc",
    storageBucket: "todo-with-auth-c74fc.appspot.com",
    messagingSenderId: "699166442580",
    appId: "1:699166442580:web:a6d1a2632f2a10043859c1"

};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export default app