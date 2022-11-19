import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './Login.scss'

type Props = {
    loginData: UserType
    setLoginData: (prevState: UserType) => void
}

type UserType = {
    email: string
    password: string
    hasAccount: boolean
    isAdmin: boolean
}

const Login = ({ loginData, setLoginData }: Props) => {
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setLoginData((prevState: UserType) => ({
            ...prevState,
            email: e.target.value,
        }))
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setLoginData((prevState: UserType) => ({
            ...prevState,
            password: e.target.value,
        }))
    }
    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then(() => {
                if (
                    loginData.email === 'mazaxaka.tyt@gmail.com' &&
                    'juliiaderevianko@gmail.com'
                ) {
                    /* @ts-ignore */
                    setLoginData((prevState: UserType) => ({
                        ...prevState,
                        hasAccount: true,
                        isAdmin: true,
                    }))
                } else {
                    /* @ts-ignore */
                    setLoginData((prevState: UserType) => ({
                        ...prevState,
                        hasAccount: true,
                        isAdmin: false,
                    }))
                }
            })
            .catch(() => {
                alert(
                    'Такого користувача не існує, або неправильно вписані дані'
                )
            })
    }

    return (
        <div className="login">
            <div className="login-header">Войти</div>
            <form id="login-form" onSubmit={login}>
                <div>
                    <div className="grid-wrapper">
                        <input
                            className="login-input"
                            type="text"
                            id="login-email"
                            onChange={handleChangeLogin}
                            value={loginData.email}
                        />
                        <input
                            className="password-input"
                            type="password"
                            id="login-password"
                            onChange={handleChangePassword}
                            value={loginData.password}
                        />
                        <button type="submit" className="submit-button">
                            Войти
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
