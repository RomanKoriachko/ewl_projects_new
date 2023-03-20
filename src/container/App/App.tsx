import { ThemeProvider, createTheme } from '@mui/material/styles'
import Footer from 'container/Footer/Footer'
import Header from 'container/Header/Header'
import Main from 'container/Main/Main'
import { useAppSelector } from 'redux/hooks'
import './App.scss'

function App() {
    const darkThemeState = useAppSelector((state) => state.darkThemeState)

    const darkTheme = createTheme({
        palette: {
            mode: darkThemeState.muiTheme ? 'dark' : 'light',
        },
    })

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Header />
                <Main />
                <Footer />
            </ThemeProvider>
        </>
    )
}

export default App
