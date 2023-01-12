import {createSlice} from "@reduxjs/toolkit"

const initialState: boolean = false

export const filterReducer = createSlice({
    name:'filter',
    initialState,
    reducers:{
        addFilters: (state) => {
            return true
        },
        clearFilters: (state) => {
            return false
        }
    }
})

export const {addFilters, clearFilters} = filterReducer.actions
export default filterReducer.reducer