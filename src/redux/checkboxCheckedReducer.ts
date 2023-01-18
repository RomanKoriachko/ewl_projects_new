import {createSlice} from "@reduxjs/toolkit"

type CheckedType = {
    [name: string]: boolean
}

const initialState: CheckedType = {
    "Чоловіки": false,
    "Жінки": false,
    "Пари": false,
}

export const checkboxCheckedReducer = createSlice({
    name:'checkboxCheched',
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
            "Чоловіки": true,
        }),
        femaleChecked: (state) => ({
            ...state,
            "Жінки": true,
        }),
        couplesChecked: (state) => ({
            ...state,
            "Пари": true,
        }),
    }
})

export const {addCheckedCheckbox, removeAllCheckboxes, maleChecked, femaleChecked, couplesChecked} = checkboxCheckedReducer.actions
export default checkboxCheckedReducer.reducer