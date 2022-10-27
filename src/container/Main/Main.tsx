import './Main.scss'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { useState } from 'react'
import { getDatabase } from 'firebase/database'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'

type Props = {}

type UserType = {
    email: string
    password: string
    hasAccount: boolean
}

const Main = (props: Props) => {
    const firebaseConfig = {
        apiKey: 'AIzaSyC-vIsDGiJlEFKOIyPpUt2SG6HqfoPNW-8',
        authDomain: 'test-server-f1713.firebaseapp.com',
        databaseURL:
            'https://test-server-f1713-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'test-server-f1713',
        storageBucket: 'test-server-f1713.appspot.com',
        messagingSenderId: '380347029454',
        appId: '1:380347029454:web:6d08fd0318a57431563d9f',
    }

    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const database = getDatabase(app)

    console.log(database)

    const [loginData, setLoginData] = useState<UserType>({
        email: '',
        password: '',
        hasAccount: false,
    })

    const handleChangeLogin = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLoginData((prevState: UserType) => ({
            ...prevState,
            email: e.target.value,
        }))
    }
    const handleChangePassword = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setLoginData((prevState: UserType) => ({
            ...prevState,
            password: e.target.value,
        }))
    }

    const createAccount = () => {
        const auth = getAuth()
        createUserWithEmailAndPassword(
            auth,
            loginData.email,
            loginData.password
        )
            .then((userCredential) => {
                const user = userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
            })
    }

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((userCredential) => {
                const user = userCredential.user
                setLoginData((prevState: UserType) => ({
                    ...prevState,
                    hasAccount: true,
                }))
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                alert('нет такого пользователя')
            })
    }

    // console.log(loginData)

    return (
        <div>
            {loginData.hasAccount ? (
                <div>Hello!</div>
            ) : (
                <div>
                    <div className="registration">
                        <div>Registration</div>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    /* @ts-ignore */
                                    onChange={handleChangeLogin}
                                />
                                <input
                                    type="password"
                                    id="password"
                                    /* @ts-ignore */
                                    onChange={handleChangePassword}
                                />
                                <input type="submit" onClick={createAccount} />
                            </div>
                        </div>
                    </div>
                    <div className="login">
                        <div>LogIn</div>
                        <div>
                            <div className="login">
                                <input
                                    type="text"
                                    id="login-email"
                                    /* @ts-ignore */
                                    onChange={handleChangeLogin}
                                />
                                <input
                                    type="password"
                                    id="login-password"
                                    /* @ts-ignore */
                                    onChange={handleChangePassword}
                                />
                                <input type="submit" onClick={login} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main
