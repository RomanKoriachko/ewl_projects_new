import { createSlice } from '@reduxjs/toolkit'

const initialState: boolean = false

export const errorReducer = createSlice({
    name: 'errorReducer',
    initialState,
    reducers: {
        setErrorState: (state, action) => {
            return action.payload
        },
    },
})

export const { setErrorState } = errorReducer.actions
export default errorReducer.reducer
