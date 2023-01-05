import './Main.scss'
import { useState } from 'react'
import Projects from 'components/mainComponents/Projects/Projects'
import AddNewProject from 'components/mainComponents/AddNewProject/AddNewProject'
import SearchAndFilter from 'components/mainComponents/SearchAndFilter/SearchAndFilter'
import Header from 'container/Header/Header'
import Registration from 'components/mainComponents/RegistrationAndLogin/Registration'
import Login from 'components/mainComponents/RegistrationAndLogin/Login'

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
    checkboxCzech: string
    checkboxRomania: string
    checkboxSlovakia: string
    checkboxLithuania: string
    checkboxHolland: string
    checkboxGermany: string
    checkboxGreece: string
    checkboxSpain: string
    checkboxCyprus: string
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

    // ------------------------ filter data ------------------------

    const [searchContent, setSearchContent] = useState<string>('')
    const [countryCheckboxState, setCountryCheckboxState] =
        useState<CountryCheckboxType>({
            checkboxPoland: '',
            checkboxCzech: '',
            checkboxRomania: '',
            checkboxSlovakia: '',
            checkboxLithuania: '',
            checkboxHolland: '',
            checkboxGermany: '',
            checkboxGreece: '',
            checkboxSpain: '',
            checkboxCyprus: '',
        })
    const [sexCheckboxState, setSexCheckboxState] = useState<SexCheckboxType>({
        male: '',
        female: '',
        couples: '',
    })
    const [isMinorState, setIsMinorState] = useState<boolean>(false)
    const [ageToState, setAgeToState] = useState<number>(NaN)

    return (
        <div className="main">
            <Header loginData={loginData} />
            <div className="container">
                {loginData.isAdmin ? (
                    <>
                        <div className="admin-panel">
                            <AddNewProject />
                            <Registration
                                registrationData={registrationData}
                                setRegistrationData={setRegistrationData}
                            />
                        </div>
                        <div className="wrapper">
                            <SearchAndFilter
                                setSearchContent={setSearchContent}
                                setCountryCheckboxState={
                                    setCountryCheckboxState
                                }
                                setSexCheckboxState={setSexCheckboxState}
                                setIsMinorState={setIsMinorState}
                                setAgeToState={setAgeToState}
                                countryCheckboxState={countryCheckboxState}
                                sexCheckboxState={sexCheckboxState}
                                isMinorState={isMinorState}
                                ageToState={ageToState}
                            />
                            <Projects
                                loginData={loginData}
                                searchContent={searchContent}
                                countryCheckboxState={countryCheckboxState}
                                sexCheckboxState={sexCheckboxState}
                                isMinorState={isMinorState}
                                ageToState={ageToState}
                            />
                        </div>
                    </>
                ) : loginData.hasAccount ? (
                    <div className="wrapper">
                        <SearchAndFilter
                            setSearchContent={setSearchContent}
                            setCountryCheckboxState={setCountryCheckboxState}
                            setSexCheckboxState={setSexCheckboxState}
                            setIsMinorState={setIsMinorState}
                            setAgeToState={setAgeToState}
                            countryCheckboxState={countryCheckboxState}
                            sexCheckboxState={sexCheckboxState}
                            isMinorState={isMinorState}
                            ageToState={ageToState}
                        />
                        <Projects
                            loginData={loginData}
                            searchContent={searchContent}
                            countryCheckboxState={countryCheckboxState}
                            sexCheckboxState={sexCheckboxState}
                            isMinorState={isMinorState}
                            ageToState={ageToState}
                        />
                    </div>
                ) : (
                    <Login loginData={loginData} setLoginData={setLoginData} />
                )}
            </div>
        </div>
    )
}

export default Main
