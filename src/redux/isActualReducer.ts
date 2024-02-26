import { createSlice } from '@reduxjs/toolkit'

const initialState: string = 'actual'

export const isActualReducer = createSlice({
    name: 'isActual',
    initialState,
    reducers: {
        setIsActualState: (state, action) => {
            return action.payload
        },
        resetActualState: (state) => {
            return 'actual'
        },
    },
})

export const { setIsActualState, resetActualState } = isActualReducer.actions
export default isActualReducer.reducer
