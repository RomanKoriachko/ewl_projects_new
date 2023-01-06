import './Header.scss'
import { getAuth } from 'firebase/auth'
import { useAppSelector } from 'redux/hooks'

type Props = {}

const Header = (props: Props) => {
    const loginDataState = useAppSelector((state) => state.loginDataState)

    const auth = getAuth()
    const user = auth.currentUser
    let userEmail: string | null = ''
    let headerClass = 'hide'
    let isLogged: boolean = false

    if (loginDataState.hasAccount === true && user !== null) {
        userEmail = user.email
        headerClass = 'show'
        isLogged = true
    }

    const logout = () => {
        localStorage.clear()
    }

    return (
        <>
            {isLogged ? (
                <div className={`header ${headerClass}`}>
                    <div className={`user ${headerClass}`}>
                        User: {userEmail}
                    </div>
                    <a href="">
                        <button onClick={() => logout()}>Выйти</button>
                    </a>
                </div>
            ) : (
                <div className="header">
                    <div className="user">
                        Чтобы войти введите логин и пароль
                    </div>
                    <a href="">
                        <button onClick={() => logout()}>Выйти</button>
                    </a>
                </div>
            )}
        </>
    )
}

export default Header
