import {createSlice} from "@reduxjs/toolkit"

const initialState: string = ''

export const searchContentReducer = createSlice({
    name:'searchContent',
    initialState,
    reducers:{
        getSearchInput: (state, action) => {
            return action.payload
        },
        cleanSearchInput: (state) => {
            return ""
        }
    }
})

export const {getSearchInput, cleanSearchInput} = searchContentReducer.actions
export default searchContentReducer.reducer