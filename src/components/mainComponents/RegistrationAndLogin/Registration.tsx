import { UserType } from 'container/Main/Main'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

type Props = {
    registrationData: UserType
    setRegistrationData: (prevState: UserType) => void
}

const Registration = ({ registrationData, setRegistrationData }: Props) => {
    const handleChangeRegistrationLogin = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setRegistrationData((prevState: UserType) => ({
            ...prevState,
            email: e.target.value,
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

    const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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

    return (
        <div className="registration">
            <div className="registration-header">Зарегистрироваться</div>
            <form id="registration-form" onSubmit={createAccount}>
                <div className="grid-wrapper">
                    <input
                        className="login"
                        type="text"
                        onChange={handleChangeRegistrationLogin}
                        value={registrationData.email}
                    />
                    <input
                        className="password"
                        type="password"
                        id="password"
                        onChange={handleChangeRegistrationPassword}
                        value={registrationData.password}
                    />
                    <button type="submit" className="submit">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Registration
