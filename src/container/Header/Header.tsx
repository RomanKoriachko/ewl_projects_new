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

    if (currentData === undefined) {
        currentData = loginDataState
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

    const reloadPage = () => {
        document.location.reload()
    }

    return (
        <header className="header">
            <div className="upper-line"></div>
            <div className="container">
                {currentData.isLogged ? (
                    <div className="header-content row">
                        <div className="header-logo"></div>
                        <div className="row user-name-and-btn">
                            <div className="header-user">
                                Пользователь: {localLoginData.email}
                            </div>
                            <div>
                                <div onClick={reloadPage}>
                                    <button
                                        className="logout-btn"
                                        onClick={() => logout()}
                                    >
                                        Выйти
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="header-content logout-header-content row">
                        <div className="header-logo"></div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
