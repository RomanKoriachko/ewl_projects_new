import {createSlice} from "@reduxjs/toolkit"

type showMoreType = {
    [name: string]: boolean
}

const initialState: showMoreType = {}

export const showMoreReducer = createSlice({
    name:'showMoreState',
    initialState,
    reducers:{
        showMoreData: (state, action) => ({
            ...state,
            [action.payload]: true
        }),
        showLessData: (state, action) => ({
            ...state,
            [action.payload]: false
        }),
    }
})

export const {showMoreData, showLessData} = showMoreReducer.actions
export default showMoreReducer.reducer