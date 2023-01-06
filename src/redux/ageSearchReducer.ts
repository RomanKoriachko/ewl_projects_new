import {createSlice} from "@reduxjs/toolkit"

const initialState: number = NaN

export const ageSearchReducer = createSlice({
    name:'ageSearch',
    initialState,
    reducers:{
        getAgeFromInput: (state, action) => {
            return(parseInt(action.payload))
        },
        clearAgeState: (state) => {
            return NaN
        }
    }
})

export const {getAgeFromInput, clearAgeState} = ageSearchReducer.actions
export default ageSearchReducer.reducer