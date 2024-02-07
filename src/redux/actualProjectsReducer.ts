import { createSlice } from '@reduxjs/toolkit'

export type ActualProjectsType = {
    id: string
    isActual: boolean
}

const initialState: ActualProjectsType[] = []

export const actualProjectsReducer = createSlice({
    name: 'actualprojects',
    initialState,
    reducers: {
        addToActualProjectState: (state, action) => {
            return action.payload
        },
    },
})

export const { addToActualProjectState } = actualProjectsReducer.actions
export default actualProjectsReducer.reducer
