import { createSlice } from '@reduxjs/toolkit'

type FilterState = {
    country: Countytype[]
    gender: GenderType[]
    nationality: NationalityType[]
    actuality: { isActual: string }
    sorting: { typeOfSorting: string }
    age: { age: number }
}

type Countytype = {
    name: string
    checked: boolean
}

type GenderType = {
    genderName: string
    genderChecked: boolean
}

type NationalityType = {
    name: string
    checked: boolean
}

const initialState: FilterState = {
    country: [],
    gender: [
        { genderName: 'Male', genderChecked: false },
        { genderName: 'Female', genderChecked: false },
        { genderName: 'Couples', genderChecked: false },
    ],
    nationality: [],
    actuality: { isActual: 'actual' },
    sorting: { typeOfSorting: 'name' },
    age: { age: NaN },
}

export const filterStateReducer = createSlice({
    name: 'filterStateReducer',
    initialState,
    reducers: {
        setInitialCountries: (state, action) => ({
            ...state,
            country: action.payload,
        }),
        toggleCountryCheckbox: (state, action) => {
            const countryName = action.payload
            const countryIndex = state.country.findIndex(
                (country) => country.name === countryName
            )
            if (countryIndex !== -1) {
                state.country[countryIndex].checked =
                    !state.country[countryIndex].checked
            }
        },
        toggleGenderCheckbox: (state, action) => {
            const genderName = action.payload
            const genderIndex = state.gender.findIndex(
                (gender) => gender.genderName === genderName
            )
            if (genderIndex !== -1) {
                state.gender[genderIndex].genderChecked =
                    !state.gender[genderIndex].genderChecked
            }
        },
        setInitialNationalities: (state, action) => ({
            ...state,
            nationality: action.payload,
        }),
        toggleNationalityCheckbox: (state, action) => {
            const nationalityName = action.payload
            const nationalityIndex = state.nationality.findIndex(
                (nationality) => nationality.name === nationalityName
            )
            if (nationalityIndex !== -1) {
                state.nationality[nationalityIndex].checked =
                    !state.nationality[nationalityIndex].checked
            }
        },
        setIsActualState: (state, action) => ({
            ...state,
            actuality: { isActual: action.payload },
        }),
        resetActualState: (state) => ({
            ...state,
            actuality: { isActual: 'actual' },
        }),
        setTypeOfSortingState: (state, action) => ({
            ...state,
            sorting: { typeOfSorting: action.payload },
        }),
        resetTypeOfSortingState: (state) => ({
            ...state,
            sorting: { typeOfSorting: 'name' },
        }),
        getAgeFromInput: (state, action) => ({
            ...state,
            age: { age: parseInt(action.payload) },
        }),
        clearAgeState: (state) => ({
            ...state,
            age: { age: NaN },
        }),
        clearAllFilterFields: (state) => {
            state.country.forEach((country) => {
                country.checked = false
            })
            state.gender.forEach((gender) => {
                gender.genderChecked = false
            })
            state.nationality.forEach((country) => {
                country.checked = false
            })
        },
    },
})

export const {
    setInitialCountries,
    toggleCountryCheckbox,
    toggleGenderCheckbox,
    setInitialNationalities,
    toggleNationalityCheckbox,
    setIsActualState,
    resetActualState,
    setTypeOfSortingState,
    resetTypeOfSortingState,
    getAgeFromInput,
    clearAgeState,
    clearAllFilterFields,
} = filterStateReducer.actions
export default filterStateReducer.reducer
