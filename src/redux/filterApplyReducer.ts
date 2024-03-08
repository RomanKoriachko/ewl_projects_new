import { createSlice } from '@reduxjs/toolkit'

const initialState: boolean = false

export const filterApplyReducer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilters: (state) => {
            return true
        },
        clearFilters: (state) => {
            return false
        },
    },
})

export const { addFilters, clearFilters } = filterApplyReducer.actions
export default filterApplyReducer.reducer
