import { useAppSelector } from 'redux/hooks'
import './Footer.scss'

type Props = {}

const Footer = (props: Props) => {
    const darkThemeState = useAppSelector((state) => state.darkThemeState)

    return (
        <footer className={`footer ${darkThemeState.footer}`}>
            <div className="container">
                <div className="row footer-wrapper">
                    <div className="row logo-and-copyright">
                        <div className="logo"></div>
                        <p>© 2023 EWL-Projects, v 2.0.1</p>
                    </div>
                    <div className="contacts row">
                        <p>Слідкуйте за новинами нашої команди</p>
                        <a href="https://invite.viber.com/?g2=AQBYkd4QZLlev0%2BhzHYhB52KZuzInspK%2FYV%2FaoSlWyQGBouQDuPuGfatMoDufL7b">
                            <button className="viber-btn"></button>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
