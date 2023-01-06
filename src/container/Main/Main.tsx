import './Main.scss'
import Projects from 'components/mainComponents/Projects/Projects'
import AddNewProject from 'components/mainComponents/AddNewProject/AddNewProject'
import SearchAndFilter from 'components/mainComponents/SearchAndFilter/SearchAndFilter'
import Header from 'container/Header/Header'
import Registration from 'components/mainComponents/RegistrationAndLogin/Registration'
import Login from 'components/mainComponents/RegistrationAndLogin/Login'
import { useAppSelector } from 'redux/hooks'

type Props = {}

export type ProjectType = {
    country: string
    salary: string
    projectName: string
    location: string
    sex: string
    ageFrom: string
    ageTo: string
    nationalaty: string
    additionalInfo: string
    housing: string
    projectInfo: string
}

const Main = (props: Props) => {
    const loginDataState = useAppSelector((state) => state.loginDataState)

    return (
        <div className="main">
            <Header />
            <div className="container">
                {loginDataState.isAdmin ? (
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
                ) : loginDataState.hasAccount ? (
                    <div className="wrapper">
                        <SearchAndFilter />
                        <Projects />
                    </div>
                ) : (
                    <Login />
                )}
            </div>
        </div>
    )
}

export default Main
