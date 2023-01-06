import {createSlice} from "@reduxjs/toolkit"

const initialState: string = ''

export const searchContentReducer = createSlice({
    name:'searchContent',
    initialState,
    reducers:{
        getSearchInput: (state, action) => {
            return action.payload
        }
    }
})

export const {getSearchInput} = searchContentReducer.actions
export default searchContentReducer.reducer