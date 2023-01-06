import {createSlice} from "@reduxjs/toolkit"

type UserType = {
    email: string
    password: string
    hasAccount: boolean
    isAdmin: boolean
}

const initialState: UserType = {
    email: '',
    password: '',
    hasAccount: false,
    isAdmin: false,
}

export const registrationDataSlice = createSlice({
    name:'registrationData',
    initialState,
    reducers:{
        setRegistrationLogin: (state, action) => ({
            ...state,
            email: action.payload
        }),
        setRegistrationPassword: (state, action) => ({
            ...state,
            password: action.payload
        }),
        cleanRegistrationInput: (state) => ({
            email: '',
            password: '',
            hasAccount: false,
            isAdmin: false,
        })
    }
})

export const {setRegistrationLogin, setRegistrationPassword, cleanRegistrationInput } = registrationDataSlice.actions
export default registrationDataSlice.reducer