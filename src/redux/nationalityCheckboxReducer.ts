import { createSlice } from '@reduxjs/toolkit'

export type NationalityCheckboxType = {
    name: string
    checked: boolean
}

const initialState: NationalityCheckboxType[] = []

export const nationalityCheckboxReducer = createSlice({
    name: 'nationalityCheckbox',
    initialState,
    reducers: {
        setInitialNationalities: (state, action) => {
            return action.payload
        },
        toggleNationalityCheckbox: (state, action) => {
            const countryName = action.payload
            const countryIndex = state.findIndex(
                (country) => country.name === countryName
            )
            if (countryIndex !== -1) {
                state[countryIndex].checked = !state[countryIndex].checked
            }
        },
        clearAllNationalitiesCheckboxes: (state) => {
            state.forEach((country) => {
                country.checked = false
            })
        },
    },
})

export const {
    setInitialNationalities,
    toggleNationalityCheckbox,
    clearAllNationalitiesCheckboxes,
} = nationalityCheckboxReducer.actions
export default nationalityCheckboxReducer.reducer
