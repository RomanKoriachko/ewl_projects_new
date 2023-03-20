import './Main.scss'
import Projects from 'components/mainComponents/Projects/Projects'
import AddNewProject from 'components/mainComponents/AddNewProject/AddNewProject'
import SearchAndFilter from 'components/mainComponents/SearchAndFilter/SearchAndFilter'
import Registration from 'components/mainComponents/RegistrationAndLogin/Registration'
import Login from 'components/mainComponents/RegistrationAndLogin/Login'
import { useAppSelector } from 'redux/hooks'
import SliderComponent from 'components/mainComponents/SliderComponent/SliderComponent'
import StickyBox from 'react-sticky-box'
import TabletFilter from 'components/mainComponents/TabletFilter/TabletFilter'

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

    return (
        <main className="main main-dark">
            {currentData.isLogged ? (
                currentData.isAdmin ? (
                    <>
                        <SliderComponent />
                        <div className="container">
                            <div className="admin-panel row">
                                <AddNewProject />
                                <Registration />
                            </div>
                            <div className="main-content">
                                <StickyBox
                                    className="sidebar"
                                    offsetTop={20}
                                    offsetBottom={20}
                                >
                                    <SearchAndFilter />
                                </StickyBox>
                                <TabletFilter />
                                <Projects />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <SliderComponent />
                        <div className="container">
                            <div className="main-content">
                                <StickyBox
                                    className="sidebar"
                                    offsetTop={20}
                                    offsetBottom={20}
                                >
                                    <SearchAndFilter />
                                </StickyBox>
                                <TabletFilter />
                                <Projects />
                            </div>
                        </div>
                    </>
                )
            ) : (
                <div className="login-wrapper">
                    <Login />
                </div>
            )}
        </main>
    )
}

export default Main
