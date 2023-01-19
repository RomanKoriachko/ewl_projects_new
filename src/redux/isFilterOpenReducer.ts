import {createSlice} from "@reduxjs/toolkit"

const initialState: string = 'close'

export const isFilterOpenReducer = createSlice({
    name:'isFilterOpen',
    initialState,
    reducers:{
        changeFilterState: (state, action) => {
            return action.payload
        }
    }
})

export const {changeFilterState} = isFilterOpenReducer.actions
export default isFilterOpenReducer.reducer