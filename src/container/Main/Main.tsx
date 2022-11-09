import './Main.scss'
import { useState } from 'react'
import RegistrationAndLogin from 'components/mainComponents/RegistrationAndLogin/RegistrationAndLogin'
import Projects from 'components/mainComponents/Projects/Projects'
import AddNewProject from 'components/mainComponents/AddNewProject/AddNewProject'
import SearchAndFilter from 'components/mainComponents/SearchAndFilter/SearchAndFilter'

type Props = {}

export type UserType = {
    email: string
    password: string
    hasAccount: boolean
    isAdmin: boolean
}

export type ProjectType = {
    country: string
    salary: string
    projectName: string
}

const Main = (props: Props) => {
    const [registrationData, setRegistrationData] = useState<UserType>({
        email: '',
        password: '',
        hasAccount: false,
        isAdmin: false,
    })
    const [loginData, setLoginData] = useState<UserType>({
        email: '',
        password: '',
        hasAccount: false,
        isAdmin: false,
    })
    const [project, setNewProject] = useState<ProjectType>({
        country: '',
        salary: '',
        projectName: '',
    })
    const [editProject, setEditProject] = useState<ProjectType>({
        country: '',
        salary: '',
        projectName: '',
    })
    const [searchContent, setSearchContent] = useState<string>('')

    return (
        <div>
            <div className="container">
                {loginData.isAdmin ? (
                    <div>
                        <div className="row admin-panel">
                            <AddNewProject
                                project={project}
                                setNewProject={setNewProject}
                            />
                        </div>
                        <SearchAndFilter
                            searchContent={searchContent}
                            setSearchContent={setSearchContent}
                        />
                        <Projects
                            loginData={loginData}
                            setEditProject={setEditProject}
                            editProject={editProject}
                            searchContent={searchContent}
                        />
                    </div>
                ) : loginData.hasAccount ? (
                    <div>
                        <SearchAndFilter
                            searchContent={searchContent}
                            setSearchContent={setSearchContent}
                        />
                        <Projects
                            loginData={loginData}
                            setEditProject={setEditProject}
                            editProject={editProject}
                            searchContent={searchContent}
                        />
                    </div>
                ) : (
                    <RegistrationAndLogin
                        loginData={loginData}
                        registrationData={registrationData}
                        setLoginData={setLoginData}
                        setRegistrationData={setRegistrationData}
                    />
                )}
            </div>
        </div>
    )
}

export default Main
