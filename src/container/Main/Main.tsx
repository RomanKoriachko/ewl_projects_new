import './Main.scss'
import { useState } from 'react'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'

type Props = {}

type UserType = {
    email: string
    password: string
    hasAccount: boolean
    isAdmin: boolean
}
type ProjectType = {
    country: string
    salary: string
    projectName: string
}

const Main = (props: Props) => {
    const [loginData, setLoginData] = useState<UserType>({
        email: '',
        password: '',
        hasAccount: false,
        isAdmin: false,
    })

    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prevState: UserType) => ({
            ...prevState,
            email: e.target.value,
        }))
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prevState: UserType) => ({
            ...prevState,
            password: e.target.value,
        }))
    }

    const createAccount = () => {
        const auth = getAuth()
        createUserWithEmailAndPassword(
            auth,
            loginData.email,
            loginData.password
        )
        createUserWithEmailAndPassword(
            auth,
            loginData.email,
            loginData.password
        )
            .then(() => {})
            .catch(() => {
                alert('помилка створення аккаунту')
            })
    }

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then(() => {
                if (loginData.email === 'mazaxaka.tyt@gmail.com') {
                    setLoginData((prevState: UserType) => ({
                        ...prevState,
                        hasAccount: true,
                        isAdmin: true,
                    }))
                } else {
                    setLoginData((prevState: UserType) => ({
                        ...prevState,
                        hasAccount: true,
                        isAdmin: false,
                    }))
                }
            })
            .catch(() => {
                alert(
                    'Такого користувача не існує, або неправильно вписані дані'
                )
            })
    }

    //------------------------------- write database -------------------------------

    const [project, setNewProject] = useState<ProjectType>({
        country: '',
        salary: '',
        projectName: '',
    })

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
    }
    const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            salary: e.target.value,
        }))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            projectName: e.target.value,
        }))
    }

    function writeProjectData(
        country: string,
        salary: string,
        projectName: string
    ) {
        const db = getDatabase()
        set(ref(db, `vacancy/${projectName}/`), {
            country: country,
            salary: salary,
        })
    }

    const onSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            project.country === '' ||
            project.salary === '' ||
            project.projectName === ''
        ) {
            alert("всі поля обов'язкові")
        } else {
            writeProjectData(
                project.country,
                project.salary,
                project.projectName
            )
            setNewProject(() => ({
                country: '',
                salary: '',
                projectName: '',
            }))
        }
    }

    // ------------------------------- read database -------------------------------

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
                    <div className="add-project">
                        <p>Додати проект</p>
                        <form onSubmit={onSendClick}>
                            <input
                                type="text"
                                id="country"
                                placeholder="Назва країни"
                                value={project.country}
                                onChange={handleChangeCountry}
                            />
                            <input
                                type="text"
                                id="salary"
                                placeholder="Ставка"
                                value={project.salary}
                                onChange={handleChangeSalary}
                            />
                            <input
                                type="text"
                                id="project"
                                placeholder="назва проекту"
                                value={project.projectName}
                                onChange={handleChangeProjectName}
                            />
                            <button type="submit">Додати проект</button>
                        </form>
                    </div>
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
                <div>
                    <div className="registration">
                        <div>Registration</div>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    onChange={handleChangeLogin}
                                />
                                <input
                                    type="password"
                                    id="password"
                                    onChange={handleChangePassword}
                                />
                                <input type="submit" onClick={createAccount} />
                            </div>
                        </div>
                    </div>
                    <div className="login">
                        <div>LogIn</div>
                        <div>
                            <div className="login">
                                <input
                                    type="text"
                                    id="login-email"
                                    onChange={handleChangeLogin}
                                />
                                <input
                                    type="password"
                                    id="login-password"
                                    onChange={handleChangePassword}
                                />
                                <input type="submit" onClick={login} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main
