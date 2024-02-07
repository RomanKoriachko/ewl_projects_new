import { createSlice } from '@reduxjs/toolkit'
import { NewProjectType } from 'components/mainComponents/Projects/NewProjectType'

const initialState: NewProjectType[] = []

export const dataArrReducer = createSlice({
    name: 'dataArr',
    initialState,
    reducers: {
        setNewDataArr: (state, action) => {
            return action.payload
        },
    },
})

export const { setNewDataArr } = dataArrReducer.actions
export default dataArrReducer.reducer
