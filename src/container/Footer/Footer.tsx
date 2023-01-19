import './Footer.scss'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row footer-wrapper">
                    <div className="logo"></div>
                    <div className="contacts">Contacts</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
