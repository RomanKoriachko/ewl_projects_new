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
    location: string
    sex: string
    ageFrom: string
    ageTo: string
    nationalaty: string
    additionalInfo: string
    housing: string
    projectInfo: string
}

export type CountryCheckboxType = {
    checkboxPoland: string
    checkboxGermany: string
    checkboxSlovakia: string
}
export type SexCheckboxType = {
    male: string
    female: string
    couples: string
}

const Main = (props: Props) => {
    //------------------------ Login Data ------------------------

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

    // ------------------------ Project ------------------------

    const [project, setNewProject] = useState<ProjectType>({
        country: '',
        salary: '',
        projectName: '',
        location: '',
        sex: '',
        ageFrom: '',
        ageTo: '',
        nationalaty: '',
        additionalInfo: '',
        housing: '',
        projectInfo: '',
    })
    const [editProject, setEditProject] = useState<ProjectType>({
        country: '',
        salary: '',
        projectName: '',
        location: '',
        sex: '',
        ageFrom: '',
        ageTo: '',
        nationalaty: '',
        additionalInfo: '',
        housing: '',
        projectInfo: '',
    })
    const [searchContent, setSearchContent] = useState<string>('')
    const [countryCheckboxState, setCountryCheckboxState] =
        useState<CountryCheckboxType>({
            checkboxPoland: '',
            checkboxGermany: '',
            checkboxSlovakia: '',
        })
    const [sexCheckboxState, setSexCheckboxState] = useState<SexCheckboxType>({
        male: '',
        female: '',
        couples: '',
    })

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
                            setSearchContent={setSearchContent}
                            setCountryCheckboxState={setCountryCheckboxState}
                            setSexCheckboxState={setSexCheckboxState}
                        />
                        <Projects
                            loginData={loginData}
                            setEditProject={setEditProject}
                            editProject={editProject}
                            searchContent={searchContent}
                            countryCheckboxState={countryCheckboxState}
                            sexCheckboxState={sexCheckboxState}
                        />
                    </div>
                ) : loginData.hasAccount ? (
                    <div>
                        <SearchAndFilter
                            setSearchContent={setSearchContent}
                            setCountryCheckboxState={setCountryCheckboxState}
                            setSexCheckboxState={setSexCheckboxState}
                        />
                        <Projects
                            loginData={loginData}
                            setEditProject={setEditProject}
                            editProject={editProject}
                            searchContent={searchContent}
                            countryCheckboxState={countryCheckboxState}
                            sexCheckboxState={sexCheckboxState}
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
