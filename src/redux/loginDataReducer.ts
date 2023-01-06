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

export const loginDataSlice = createSlice({
    name:'loginData',
    initialState,
    reducers:{
        setLogin: (state, action) => ({
            ...state,
            email: action.payload
        }),
        setPassword: (state, action) => ({
            ...state,
            password: action.payload
        }),
        loginAdmin: (state) => ({
            ...state,
            hasAccount: true,
            isAdmin: true,
        }),
        loginUser: (state) => ({
            ...state,
            hasAccount: true,
            isAdmin: false,
        })
    }
})

export const {setLogin, setPassword, loginAdmin, loginUser} = loginDataSlice.actions
export default loginDataSlice.reducer