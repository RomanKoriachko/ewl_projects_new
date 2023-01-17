import {createSlice} from "@reduxjs/toolkit"

type CheckedType = {
    [name: string]: boolean
}

const initialState: CheckedType = {
    "Мужчины": false,
    "Женщины": false,
    "Пары": false,
}

export const checkboxCheckedReducer = createSlice({
    name:'ageSearch',
    initialState,
    reducers:{
        addCheckedCheckbox: (state, action) => ({
            ...state, 
            [action.payload.value]: action.payload.checked,
        }),
        removeAllCheckboxes: (state) => {
            return {}
        },
        maleChecked: (state) => ({
            ...state,
            "Мужчины": true,
        }),
        femaleChecked: (state) => ({
            ...state,
            "Женщины": true,
        }),
        couplesChecked: (state) => ({
            ...state,
            "Пары": true,
        }),
    }
})

export const {addCheckedCheckbox, removeAllCheckboxes, maleChecked, femaleChecked, couplesChecked} = checkboxCheckedReducer.actions
export default checkboxCheckedReducer.reducer