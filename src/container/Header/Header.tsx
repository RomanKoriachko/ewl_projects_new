import './Header.scss'
import { useAppSelector } from 'redux/hooks'

type Props = {}

type UserType = {
    email: string
    password: string
    isLogged: boolean
    isAdmin: boolean
}

const Header = (props: Props) => {
    const loginDataState = useAppSelector((state) => state.loginDataState)

    let raw = localStorage.getItem('loginData')
    let localLoginData
    if (raw) {
        localLoginData = JSON.parse(raw)
    }

    let currentData: UserType = localLoginData

    if (loginDataState.isLogged) {
        currentData.isLogged = true
    }
    if (loginDataState.isAdmin) {
        currentData.isAdmin = true
    }

    const logout = () => {
        let logoutData = {
            email: '',
            password: '',
            isLogged: false,
            isAdmin: false,
        }
        localStorage.setItem('loginData', JSON.stringify(logoutData))
    }

    return (
        <header className="header">
            <div className="container">
                {currentData.isLogged ? (
                    <div className="header-content">
                        <div className="header-user">
                            Пользователь: {localLoginData.email}
                        </div>
                        <div>
                            <a href="">
                                <button onClick={() => logout()}>Выйти</button>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="header">
                        <div className="user">
                            Чтобы войти введите логин и пароль
                        </div>
                        <div>
                            <a href="">
                                <button onClick={() => logout()}>Выйти</button>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
