import './Header.scss'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Switch } from '@mui/material'
import { darkModeOff, darkModeOn } from 'redux/darkThemeReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

type UserType = {
    email: string
    password: string
    isLogged: boolean
    isAdmin: boolean
}

const Header = (props: Props) => {
    const loginDataState = useAppSelector((state) => state.loginDataState)
    const darkThemeState = useAppSelector((state) => state.darkThemeState)
    const dispatch = useAppDispatch()

    let raw = localStorage.getItem('loginData')
    let localLoginData
    if (raw) {
        localLoginData = JSON.parse(raw)
    }

    let currentData: UserType = localLoginData

    if (loginDataState.isLogged) {
        currentData.isLogged = true
    }
    if (loginDataState.isAdmin) {
        currentData.isAdmin = true
    }

    if (currentData === undefined) {
        currentData = loginDataState
    }

    const logout = () => {
        let logoutData = {
            email: '',
            password: '',
            isLogged: false,
            isAdmin: false,
        }
        localStorage.setItem('loginData', JSON.stringify(logoutData))
    }

    let localThemeData = localStorage.getItem('darkThemeState')

    const reloadPage = () => {
        document.location.reload()
    }

    const isDarkThemeOn = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? dispatch(darkModeOn()) : dispatch(darkModeOff())
    }

    useEffect(() => {
        let localThemeData = localStorage.getItem('darkThemeState')
        if (localThemeData === 'on') {
            dispatch(darkModeOn())
        } else {
            dispatch(darkModeOff())
        }
    }, [dispatch])

    return (
        <header className={`header ${darkThemeState.header}`}>
            <div className="upper-line">
                <div className="container">
                    <div className="dark-theme-switcher">
                        <div className="switcher-wrapper">
                            <div className="switcher-item row">
                                <div className="white-theme-img"></div>
                                <Switch
                                    color="warning"
                                    onChange={isDarkThemeOn}
                                    checked={
                                        localThemeData === 'on' ? true : false
                                    }
                                />
                                <div className="dark-theme-img"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                {currentData.isLogged ? (
                    <div className="header-content row">
                        <Link to={'/'}>
                            <div className="header-logo"></div>
                        </Link>
                        <div className="row">
                            <div>
                                <div className="row user-name-and-btn">
                                    <div className="header-user">
                                        Користувач: {localLoginData.email}
                                    </div>
                                    <div>
                                        <div onClick={reloadPage}>
                                            <button
                                                className="logout-btn"
                                                onClick={() => logout()}
                                            >
                                                Вийти
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="header-content logout-header-content row">
                        <div className="header-logo"></div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
