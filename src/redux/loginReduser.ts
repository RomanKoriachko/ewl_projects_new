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

export const likeSlice = createSlice({
    name:"loginData",
    initialState,
    reducers:{
        setLoginDataEmail: (state,action) => ({
            ...state,
            [state.email]: action.payload.e.target.value, 
        }),
        setLoginDataPassword: (state,action) => ({
            ...state,
            [state.password]: action.payload.e.target.value, 
        }),
        setLoginDataAdmin: (state) => {
            return(
                void(state.isAdmin = true),
                void(state.hasAccount = true)
            )
        },
        setLoginDataNotAdmin: (state) => {
            return(
                void(state.isAdmin = false),
                void(state.hasAccount = true)
            )
        },
    }
})

export const {setLoginDataEmail, setLoginDataPassword, setLoginDataAdmin, setLoginDataNotAdmin} = likeSlice.actions

export default likeSlice.reducer