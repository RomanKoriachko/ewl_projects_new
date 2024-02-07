import { createSlice } from '@reduxjs/toolkit'

export type CountryCheckboxType = {
    name: string
    checked: boolean
}

const initialState: CountryCheckboxType[] = []

export const countryCheckboxReducer = createSlice({
    name: 'countryCheckbox',
    initialState,
    reducers: {
        setInitialCountries: (state, action) => {
            return action.payload
        },
        toggleCountryCheckbox: (state, action) => {
            const countryName = action.payload
            const countryIndex = state.findIndex(
                (country) => country.name === countryName
            )
            if (countryIndex !== -1) {
                state[countryIndex].checked = !state[countryIndex].checked
            }
        },
        clearAllCountrysCheckboxes: (state) => {
            state.forEach((country) => {
                country.checked = false
            })
        },
    },
})

export const {
    setInitialCountries,
    toggleCountryCheckbox,
    clearAllCountrysCheckboxes,
} = countryCheckboxReducer.actions
export default countryCheckboxReducer.reducer
