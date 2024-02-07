import { configureStore } from '@reduxjs/toolkit'
import ageSearchReducer from './ageSearchReducer'
import checkboxCheckedReducer from './checkboxCheckedReducer'
import countryCheckboxReducer from './countryCheckboxReducer'
import darkThemeReducer from './darkThemeReducer'
import editFormReducer from './editFormReducer'
import editProjectReduser from './editProjectReduser'
import filterReducer from './filterReducer'
import isActualReducer from './isActualReducer'
import isFilterOpenReducer from './isFilterOpenReducer'
import isMinorReducer from './isMinorReducer'
import loginDataReducer from './loginDataReducer'
import nationalityCheckboxReducer from './nationalityCheckboxReducer'
import newProjectReduser from './newProjectReduser'
import registrationDataReducer from './registrationDataReducer'
import searchContentReducer from './searchContentReducer'
import ShowMoreReducer from './showMoreReducer'
import typeOfSortingReducer from './typeOfSortingReducer'
import filtredArrReducer from './filtredArrReducer'
import dataArrReducer from './dataArrReducer'
import genderCheckboxReducer from './genderCheckboxReducer'
import errorReducer from './errorReducer'

export const store = configureStore({
    reducer: {
        newProjectState: newProjectReduser,
        editProjectState: editProjectReduser,
        loginDataState: loginDataReducer,
        registrationDataState: registrationDataReducer,
        searchState: searchContentReducer,
        countryCheckboxState: countryCheckboxReducer,
        genderCheckboxState: genderCheckboxReducer,
        isMinorState: isMinorReducer,
        ageSearchState: ageSearchReducer,
        filterState: filterReducer,
        showMoreState: ShowMoreReducer,
        checkboxCheckedState: checkboxCheckedReducer,
        editFormState: editFormReducer,
        isFilterOpenState: isFilterOpenReducer,
        isActualState: isActualReducer,
        nationalityCheckboxState: nationalityCheckboxReducer,
        darkThemeState: darkThemeReducer,
        sortingState: typeOfSortingReducer,
        filtredArrState: filtredArrReducer,
        dataArrState: dataArrReducer,
        errorState: errorReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
