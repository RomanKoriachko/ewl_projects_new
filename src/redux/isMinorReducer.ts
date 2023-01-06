import {createSlice} from "@reduxjs/toolkit"

const initialState: boolean = false

export const isMinorReducer = createSlice({
    name:'isMinor',
    initialState,
    reducers:{
        setIsMinor: (state, action) => {
            return action.payload
        }
    }
})

export const {setIsMinor} = isMinorReducer.actions
export default isMinorReducer.reducer