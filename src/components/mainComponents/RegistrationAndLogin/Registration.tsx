import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
    cleanRegistrationInput,
    setRegistrationLogin,
    setRegistrationPassword,
} from 'redux/registrationDataReducer'

type Props = {}

const Registration = (props: Props) => {
    const RedistrationState = useAppSelector(
        (state) => state.registrationDataState
    )
    const dispatch = useAppDispatch()

    const handleChangeRegistrationLogin = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(setRegistrationLogin(e.target.value))
    }
    const handleChangeRegistrationPassword = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(setRegistrationPassword(e.target.value))
    }

    const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const auth = getAuth()
        createUserWithEmailAndPassword(
            auth,
            RedistrationState.email,
            RedistrationState.password
        )
            .then(() => {
                alert('Користувач зареєстрований')
            })
            .catch(() => {
                alert('Помилка створення аккаунту')
            })
        dispatch(cleanRegistrationInput())
    }

    const [showPassword, setShowPassword] = useState<string>('password')

    const onShowPasswordClick = () => {
        showPassword === 'password'
            ? setShowPassword('text')
            : setShowPassword('password')
    }

    return (
        <div className="registration">
            <div className="registration-header">
                Зареєструвати нового користувача
            </div>
            <form id="registration-form" onSubmit={createAccount}>
                <div className="grid-wrapper registration-wrapper">
                    <input
                        required
                        className="login-input registration-input"
                        placeholder="Пошта"
                        type="text"
                        id="registration-login"
                        onChange={handleChangeRegistrationLogin}
                        value={RedistrationState.email}
                    />
                    <div className="password-wrapper">
                        <input
                            required
                            className="password-input registration-input"
                            placeholder="Пароль"
                            type={showPassword}
                            id="registration-password"
                            onChange={handleChangeRegistrationPassword}
                            value={RedistrationState.password}
                        />
                        <button
                            type="button"
                            className={`show-password-btn ${showPassword}`}
                            onClick={onShowPasswordClick}
                        ></button>
                    </div>
                    <button type="submit" className="submit-button">
                        Зареєструвати
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Registration
