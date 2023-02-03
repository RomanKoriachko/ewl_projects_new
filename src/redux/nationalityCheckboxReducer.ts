import {createSlice} from "@reduxjs/toolkit"

type SexCheckboxType = {
    ukraine: boolean
    moldova: boolean
    georgia: boolean
    armenia: boolean
    bilorus: boolean
}

const initialState: SexCheckboxType = {
    ukraine: false,
    moldova: false,
    georgia: false,
    armenia: false,
    bilorus: false,
}

export const nationalityCheckboxReducer = createSlice({
    name:'nationalityCheckbox',
    initialState,
    reducers:{
        setNationalityCheckbox: (state, action) => ({
            ...state,
            [action.payload.name]: action.payload.state
        }),
        resetNationality: (state) => ({
            ukraine: false,
            moldova: false,
            georgia: false,
            armenia: false,
            bilorus: false,
        })
    }
})

export const {setNationalityCheckbox, resetNationality} = nationalityCheckboxReducer.actions
export default nationalityCheckboxReducer.reducer