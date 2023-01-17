import {createSlice} from "@reduxjs/toolkit"

const initialState: boolean = false

export const editFormReducer = createSlice({
    name:'ageSearch',
    initialState,
    reducers:{
        setFormState: (state, action) => {
            return action.payload
        }
    }
})

export const {setFormState} = editFormReducer.actions
export default editFormReducer.reducer