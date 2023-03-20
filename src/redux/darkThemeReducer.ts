import { createSlice } from '@reduxjs/toolkit'

type ThemeType = {
    header: string
    main: string
    footer: string
    muiTheme: boolean
}

const initialState: ThemeType = {
    header: '',
    main: '',
    footer: '',
    muiTheme: false,
}

export const darkThemeReducer = createSlice({
    name: 'checkboxCheched',
    initialState,
    reducers: {
        darkModeOn: (state) => {
            state.header = 'header-dark'
            state.main = 'main-dark'
            state.footer = 'footer-dark'
            state.muiTheme = true
            localStorage.setItem('darkThemeState', 'on')
        },
        darkModeOff: (state) => {
            state.header = ''
            state.main = ''
            state.footer = ''
            state.muiTheme = false
            localStorage.setItem('darkThemeState', 'off')
        },
    },
})

export const { darkModeOn, darkModeOff } = darkThemeReducer.actions
export default darkThemeReducer.reducer
