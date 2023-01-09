import './Main.scss'
import Projects from 'components/mainComponents/Projects/Projects'
import AddNewProject from 'components/mainComponents/AddNewProject/AddNewProject'
import SearchAndFilter from 'components/mainComponents/SearchAndFilter/SearchAndFilter'
import Registration from 'components/mainComponents/RegistrationAndLogin/Registration'
import Login from 'components/mainComponents/RegistrationAndLogin/Login'
import { useAppSelector } from 'redux/hooks'

type Props = {}

type UserType = {
    email: string
    password: string
    isLogged: boolean
    isAdmin: boolean
}

const Main = (props: Props) => {
    const loginDataState = useAppSelector((state) => state.loginDataState)

    let raw = localStorage.getItem('loginData')
    let localLoginData
    if (raw) {
        localLoginData = JSON.parse(raw)
    }

    let currentData: UserType
    if (localLoginData === undefined) {
        currentData = loginDataState
    } else {
        currentData = localLoginData
    }

    if (loginDataState.isLogged) {
        currentData.isLogged = true
        localStorage.setItem('loginData', JSON.stringify(loginDataState))
    }
    if (loginDataState.isAdmin) {
        currentData.isAdmin = true
        localStorage.setItem('loginData', JSON.stringify(loginDataState))
    }

    // localStorage.clear()

    return (
        <main className="main">
            <div className="container">
                {currentData.isLogged ? (
                    currentData.isAdmin ? (
                        <>
                            <div className="admin-panel">
                                <AddNewProject />
                                <Registration />
                            </div>
                            <div className="wrapper">
                                <SearchAndFilter />
                                <Projects />
                            </div>
                        </>
                    ) : (
                        <div className="wrapper">
                            <SearchAndFilter />
                            <Projects />
                        </div>
                    )
                ) : (
                    <Login />
                )}
            </div>
        </main>
    )
}

export default Main
