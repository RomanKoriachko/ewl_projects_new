import './Header.scss'
import { getAuth } from 'firebase/auth'
import { UserType } from 'container/Main/Main'

type Props = {
    loginData: UserType
}

const Header = ({ loginData }: Props) => {
    const auth = getAuth()
    const user = auth.currentUser
    let userEmail: string | null = ''
    let headerClass = 'hide'
    let isLogged: boolean = false

    if (loginData.hasAccount === true && user !== null) {
        userEmail = user.email
        headerClass = 'show'
        isLogged = true
    }

    return (
        <>
            {isLogged ? (
                <div className={`header ${headerClass}`}>
                    <div className={`user ${headerClass}`}>
                        User: {userEmail}
                    </div>
                </div>
            ) : (
                <div className="header">
                    <div className="user">
                        Чтобы войти введите логин и пароль
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
