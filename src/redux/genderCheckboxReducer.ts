import { createSlice } from '@reduxjs/toolkit'

type GenderCheckboxType = {
    name: string
    checked: boolean
}

const initialState: GenderCheckboxType[] = [
    { name: 'Male', checked: false },
    { name: 'Female', checked: false },
]
export const genderCheckboxReducer = createSlice({
    name: 'genderCheckbox',
    initialState,
    reducers: {
        toggleGenderCheckbox: (state, action) => {
            const genderName = action.payload
            const genderIndex = state.findIndex(
                (gender) => gender.name === genderName
            )
            if (genderIndex !== -1) {
                state[genderIndex].checked = !state[genderIndex].checked
            }
        },
        clearAllGendersCheckboxes: (state) => {
            state.forEach((country) => {
                country.checked = false
            })
        },
    },
})

export const { toggleGenderCheckbox, clearAllGendersCheckboxes } =
    genderCheckboxReducer.actions
export default genderCheckboxReducer.reducer
