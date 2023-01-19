import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
    loginAdmin,
    loginUser,
    setLogin,
    setPassword,
} from 'redux/loginDataReducer'
import './Login.scss'
import './Registration.scss'

type Props = {}

const Login = (props: Props) => {
    const loginState = useAppSelector((state) => state.loginDataState)
    const dispatch = useAppDispatch()

    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLogin(e.target.value))
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(e.target.value))
    }
    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginState.email, loginState.password)
            .then(() => {
                if (
                    loginState.email === 'mazaxaka.tyt@gmail.com' ||
                    loginState.email === 'juliiaderevianko@gmail.com' ||
                    loginState.email === 'admin@gmail.com'
                ) {
                    dispatch(loginAdmin())
                    localStorage.setItem(
                        'loginData',
                        JSON.stringify(loginState)
                    )
                } else {
                    dispatch(loginUser())
                    localStorage.setItem(
                        'loginData',
                        JSON.stringify(loginState)
                    )
                }
            })
            .catch(() => {
                alert(
                    'Такого користувача не існує або неправильно введені дані'
                )
            })
    }

    return (
        <div className="login">
            <div className="login-header">Введіть логін та пароль</div>
            <form id="login-form" onSubmit={login}>
                <div>
                    <div className="grid-wrapper">
                        <input
                            className="login-input login-form-input"
                            type="text"
                            id="login-email"
                            onChange={handleChangeLogin}
                            value={loginState.email}
                        />
                        <input
                            className="password-input login-form-input"
                            type="password"
                            id="login-password"
                            onChange={handleChangePassword}
                            value={loginState.password}
                        />
                        <button type="submit" className="submit-button">
                            Увійти
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
