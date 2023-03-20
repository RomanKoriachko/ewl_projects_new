import './Footer.scss'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="footer footer-dark">
            <div className="container">
                <div className="row footer-wrapper">
                    <div className="logo"></div>
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
