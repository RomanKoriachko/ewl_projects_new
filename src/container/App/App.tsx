import { ThemeProvider, createTheme } from '@mui/material/styles'
import Footer from 'container/Footer/Footer'
import Header from 'container/Header/Header'
import Main from 'container/Main/Main'
import './App.scss'

function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
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
