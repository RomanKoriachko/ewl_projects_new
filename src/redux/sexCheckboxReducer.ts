import {createSlice} from "@reduxjs/toolkit"

type SexCheckboxType = {
    male: string
    female: string
    couples: string
}

const initialState: SexCheckboxType = {
    male: '',
    female: '',
    couples: '',
}

export const sexCheckboxReducer = createSlice({
    name:'sexCheckbox',
    initialState,
    reducers:{
        setMaleCheckbox: (state, action) => ({
            ...state, 
            male: action.payload,
        }),
        setFemaleCheckbox: (state, action) => ({
            ...state, 
            female: action.payload,
        }),
        setCouplesCheckbox: (state, action) => ({
            ...state, 
            couples: action.payload,
        }),
        clearAllSexCheckboxes: (state) => ({
            male: '',
            female: '',
            couples: '',
        })  
    }
})

export const {setMaleCheckbox, setFemaleCheckbox, setCouplesCheckbox, clearAllSexCheckboxes} = sexCheckboxReducer.actions
export default sexCheckboxReducer.reducer