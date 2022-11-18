import './Header.scss'
import { getAuth } from 'firebase/auth'

type Props = {}

const Header = (props: Props) => {
    const auth = getAuth()
    const user = auth.currentUser
    let userEmail: string | null = ''
    let headerClass = 'hide'

    if (user !== null) {
        userEmail = user.email
        headerClass = 'show'
    }

    return (
        <div className={`header ${headerClass}`}>
            <div className={`user ${headerClass}`}>User: {userEmail}</div>
        </div>
    )
}

export default Header
