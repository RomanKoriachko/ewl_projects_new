import { createSlice } from '@reduxjs/toolkit'

type CountryCheckboxType = {
    checkboxPoland: string
    checkboxCzech: string
    checkboxRomania: string
    checkboxSlovakia: string
    checkboxLithuania: string
    checkboxHolland: string
    checkboxGermany: string
    checkboxGreece: string
    checkboxSpain: string
    checkboxCyprus: string
    checkboxFrance: string
}

const initialState: CountryCheckboxType = {
    checkboxPoland: '',
    checkboxCzech: '',
    checkboxRomania: '',
    checkboxSlovakia: '',
    checkboxLithuania: '',
    checkboxHolland: '',
    checkboxGermany: '',
    checkboxGreece: '',
    checkboxSpain: '',
    checkboxCyprus: '',
    checkboxFrance: '',
}

export const countryCheckboxReducer = createSlice({
    name: 'countryCheckbox',
    initialState,
    reducers: {
        polandChecked: (state, action) => ({
            ...state,
            checkboxPoland: action.payload,
        }),
        czechChecked: (state, action) => ({
            ...state,
            checkboxCzech: action.payload,
        }),
        romaniaChecked: (state, action) => ({
            ...state,
            checkboxRomania: action.payload,
        }),
        slovakiaChecked: (state, action) => ({
            ...state,
            checkboxSlovakia: action.payload,
        }),
        lithuaniaChecked: (state, action) => ({
            ...state,
            checkboxLithuania: action.payload,
        }),
        hollandChecked: (state, action) => ({
            ...state,
            checkboxHolland: action.payload,
        }),
        germanyChecked: (state, action) => ({
            ...state,
            checkboxGermany: action.payload,
        }),
        greeceChecked: (state, action) => ({
            ...state,
            checkboxGreece: action.payload,
        }),
        spainChecked: (state, action) => ({
            ...state,
            checkboxSpain: action.payload,
        }),
        cyprusChecked: (state, action) => ({
            ...state,
            checkboxCyprus: action.payload,
        }),
        FranceChecked: (state, action) => ({
            ...state,
            checkboxFrance: action.payload,
        }),
        clearAllCountrysCheckboxes: (state) => ({
            checkboxPoland: '',
            checkboxCzech: '',
            checkboxRomania: '',
            checkboxSlovakia: '',
            checkboxLithuania: '',
            checkboxHolland: '',
            checkboxGermany: '',
            checkboxGreece: '',
            checkboxSpain: '',
            checkboxCyprus: '',
            checkboxFrance: '',
        }),
    },
})

export const {
    polandChecked,
    czechChecked,
    romaniaChecked,
    slovakiaChecked,
    lithuaniaChecked,
    hollandChecked,
    germanyChecked,
    greeceChecked,
    spainChecked,
    cyprusChecked,
    FranceChecked,
    clearAllCountrysCheckboxes,
} = countryCheckboxReducer.actions
export default countryCheckboxReducer.reducer
