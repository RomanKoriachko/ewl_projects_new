import { createSlice } from '@reduxjs/toolkit'
import { NewProjectType } from 'components/mainComponents/Projects/NewProjectType'

const initialState: NewProjectType[] = []

export const filtredArrReducer = createSlice({
    name: 'filtredArr',
    initialState,
    reducers: {
        getFiltredArrData: (state, action) => {
            return action.payload
        },
    },
})

export const { getFiltredArrData } = filtredArrReducer.actions
export default filtredArrReducer.reducer
