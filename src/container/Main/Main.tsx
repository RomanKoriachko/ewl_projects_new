import './Main.scss'
import { initializeApp } from 'firebase/app'
import { useState } from 'react'
import { getDatabase, ref, set, onValue, child, get } from 'firebase/database'
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
}
type ProjectType = {
    country: string
    salary: number
    projectName: string
}

const Main = (props: Props) => {
    const firebaseConfig = {
        apiKey: 'AIzaSyC-vIsDGiJlEFKOIyPpUt2SG6HqfoPNW-8',
        authDomain: 'test-server-f1713.firebaseapp.com',
        databaseURL:
            'https://test-server-f1713-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'test-server-f1713',
        storageBucket: 'test-server-f1713.appspot.com',
        messagingSenderId: '380347029454',
        appId: '1:380347029454:web:6d08fd0318a57431563d9f',
    }

    const app = initializeApp(firebaseConfig)

    const [loginData, setLoginData] = useState<UserType>({
        email: '',
        password: '',
        hasAccount: false,
    })

    const handleChangeLogin = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLoginData((prevState: UserType) => ({
            ...prevState,
            email: e.target.value,
        }))
    }
    const handleChangePassword = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
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
            .then((userCredential) => {
                const user = userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
            })
    }

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((userCredential) => {
                const user = userCredential.user
                setLoginData((prevState: UserType) => ({
                    ...prevState,
                    hasAccount: true,
                }))
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                alert('нет такого пользователя')
            })
    }

    // write database

    const [project, setNewProject] = useState<ProjectType>({
        country: '',
        salary: 0,
        projectName: '',
    })

    const handleChangeCountry = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
    }
    const handleChangeSalary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            salary: Number(e.target.value),
        }))
    }
    const handleChangeProject = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            projectName: e.target.value,
        }))
    }

    function writeProjectData(
        country: string,
        salary: number,
        projectName: string
    ) {
        const db = getDatabase()
        set(ref(db, `${projectName}/`), {
            country: country,
            salary: salary + ' ' + 'zl',
        })
    }

    // read database

    // const db = getDatabase()
    // const starCountRef = ref(db, 'vacancy/')
    // let data: [] = []
    // onValue(starCountRef, (snapshot) => {
    //     data = snapshot.val()
    // })

    // const dbRef = ref(getDatabase())
    // let data: [] = []
    // let newData: [] = []
    // get(child(dbRef, `vacancy/`))
    //     .then((snapshot) => {
    //         if (snapshot.exists()) {
    //             console.log(snapshot.val())
    //             // let test: {} = snapshot.val()
    //             // data.splice(0, 0, test)
    //         } else {
    //             console.log('No data available')
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })

    // console.log(data)

    return (
        <div>
            {loginData.hasAccount ? (
                <div>Hello!</div>
            ) : (
                <div>
                    <div className="registration">
                        <div>Registration</div>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    /* @ts-ignore */
                                    onChange={handleChangeLogin}
                                />
                                <input
                                    type="password"
                                    id="password"
                                    /* @ts-ignore */
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
                                    /* @ts-ignore */
                                    onChange={handleChangeLogin}
                                />
                                <input
                                    type="password"
                                    id="login-password"
                                    /* @ts-ignore */
                                    onChange={handleChangePassword}
                                />
                                <input type="submit" onClick={login} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="add-project">
                <p>Додати проект</p>
                <input
                    type="text"
                    id="country"
                    placeholder="Назва країни"
                    /* @ts-ignore */
                    onChange={handleChangeCountry}
                />
                <input
                    type="text"
                    id="salary"
                    placeholder="Ставка"
                    /* @ts-ignore */
                    onChange={handleChangeSalary}
                />
                <input
                    type="text"
                    id="project"
                    placeholder="назва проекту"
                    /* @ts-ignore */
                    onChange={handleChangeProject}
                />
                <button
                    onClick={() =>
                        writeProjectData(
                            project.country,
                            project.salary,
                            project.projectName
                        )
                    }
                >
                    test
                </button>
            </div>
            <div className="show-projects">
                {/* {data.map((project: ProjectType, i: number) => (
                    <div key={i}>
                        <div>{project.country}</div>
                        <div>{project.salary}</div>
                        <div>{project.project}</div>
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default Main
