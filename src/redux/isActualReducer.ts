import {createSlice} from "@reduxjs/toolkit"

const initialState: string = "both"

export const isActualReducer = createSlice({
    name:'isActual',
    initialState,
    reducers:{
        setIsActualState: (state, action) => {
            return action.payload
        },
    }
})

export const {setIsActualState} = isActualReducer.actions
export default isActualReducer.reducer