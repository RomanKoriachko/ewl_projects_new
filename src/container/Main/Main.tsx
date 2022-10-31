import './Main.scss'
import { getDatabase, ref, onValue } from 'firebase/database'
import AddNewProject from 'components/mainComponents/AddNewProject/AddNewProject'
import { useState } from 'react'
import RegistrationAndLogin from 'components/mainComponents/RegistrationAndLogin/RegistrationAndLogin'

type Props = {}

export type UserType = {
    email: string
    password: string
    hasAccount: boolean
    isAdmin: boolean
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

    // ----------------------------- read data -----------------------------

    const db = getDatabase()
    const starCountRef = ref(db, 'vacancy/')

    let newDataArr
    let newData = {}
    onValue(starCountRef, (snapshot) => {
        newData = snapshot.val()
        newDataArr = newData
    })

    /* @ts-ignore */
    let projectsArr
    newDataArr !== undefined
        ? (projectsArr = Object.entries(newDataArr))
        : (projectsArr = [])

    return (
        <div>
            {loginData.isAdmin ? (
                <div>
                    <AddNewProject />
                    <div className="show-projects">
                        <div>
                            {
                                /* @ts-ignore */
                                projectsArr.map((element, i) => (
                                    <div key={i}>
                                        <div>{element[0]}</div>
                                        <div>{element[1].country}</div>
                                        <div>{element[1].salary}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ) : loginData.hasAccount ? (
                <div className="show-projects">
                    <div>
                        {
                            /* @ts-ignore */
                            projectsArr.map((element, i) => (
                                <div key={i}>
                                    <div>{element[0]}</div>
                                    <div>{element[1].country}</div>
                                    <div>{element[1].salary}</div>
                                </div>
                            ))
                        }
                    </div>
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
    )
}

export default Main
