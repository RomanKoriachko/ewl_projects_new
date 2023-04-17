import { createSlice } from '@reduxjs/toolkit'

type showMoreType = string

const initialState: showMoreType = 'name'

export const typeOfSortingReducer = createSlice({
    name: 'showMoreState',
    initialState,
    reducers: {
        setTypeOfSortingState: (state, action) => {
            return action.payload
        },
        resetTypeOfSortingState: (state) => {
            return 'name'
        },
    },
})

export const { setTypeOfSortingState, resetTypeOfSortingState } =
    typeOfSortingReducer.actions
export default typeOfSortingReducer.reducer
