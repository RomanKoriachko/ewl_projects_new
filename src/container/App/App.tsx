import { ThemeProvider, createTheme } from '@mui/material/styles'
import Footer from 'container/Footer/Footer'
import Header from 'container/Header/Header'
import Main from 'container/Main/Main'
import { useAppSelector } from 'redux/hooks'
import { Route, Routes } from 'react-router-dom'
import ProjectPage from 'pages/ProjectPage'
import ScrollToTop from 'components/mainComponents/ScrollToTop/ScrollToTop'

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
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/:id" element={<ProjectPage />} />
                </Routes>
                <Footer />
                <ScrollToTop />
            </ThemeProvider>
        </>
    )
}

export default App
