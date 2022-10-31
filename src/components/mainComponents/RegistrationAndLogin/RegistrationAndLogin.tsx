import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'

type Props = {
    loginData: UserType
    registrationData: UserType
    setLoginData: (prevState: UserType) => void
    setRegistrationData: (prevState: UserType) => void
}

type UserType = {
    email: string
    password: string
    hasAccount: boolean
    isAdmin: boolean
}

const RegistrationAndLogin = ({
    loginData,
    registrationData,
    setLoginData,
    setRegistrationData,
}: Props) => {
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setLoginData((prevState: UserType) => ({
            ...prevState,
            email: e.target.value,
        }))
    }
    const handleChangeRegistrationLogin = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setRegistrationData((prevState: UserType) => ({
            ...prevState,
            email: e.target.value,
        }))
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setLoginData((prevState: UserType) => ({
            ...prevState,
            password: e.target.value,
        }))
    }
    const handleChangeRegistrationPassword = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setRegistrationData((prevState: UserType) => ({
            ...prevState,
            password: e.target.value,
        }))
    }

    const createAccount = () => {
        const auth = getAuth()
        createUserWithEmailAndPassword(
            auth,
            registrationData.email,
            registrationData.password
        )
            .then(() => {
                alert('Реєстрація успішна!')
            })
            .catch(() => {
                alert('Помилка створення аккаунту')
            })
        /* @ts-ignore */
        setRegistrationData(() => ({
            email: '',
            password: '',
            hasAccount: false,
            isAdmin: false,
        }))
    }

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then(() => {
                if (loginData.email === 'mazaxaka.tyt@gmail.com') {
                    /* @ts-ignore */
                    setLoginData((prevState: UserType) => ({
                        ...prevState,
                        hasAccount: true,
                        isAdmin: true,
                    }))
                } else {
                    /* @ts-ignore */
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

    return (
        <div>
            <div className="registration">
                <div>Registration</div>
                <div>
                    <div>
                        <input
                            type="text"
                            onChange={handleChangeRegistrationLogin}
                            value={registrationData.email}
                        />
                        <input
                            type="password"
                            id="password"
                            onChange={handleChangeRegistrationPassword}
                            value={registrationData.password}
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
                            value={loginData.email}
                        />
                        <input
                            type="password"
                            id="login-password"
                            onChange={handleChangePassword}
                            value={loginData.password}
                        />
                        <input type="submit" onClick={login} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationAndLogin
