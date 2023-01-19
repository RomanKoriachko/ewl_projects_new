import { configureStore } from "@reduxjs/toolkit";
import ageSearchReducer from "./ageSearchReducer";
import checkboxCheckedReducer from "./checkboxCheckedReducer";
import countryCheckboxReducer from "./countryCheckboxReducer";
import editFormReducer from "./editFormReducer";
import editProjectReduser from "./editProjectReduser";
import filterReducer from "./filterReducer";
import isFilterOpenReducer from "./isFilterOpenReducer";
import isMinorReducer from "./isMinorReducer";
import loginDataReducer from "./loginDataReducer";
import newProjectReduser from "./newProjectReduser";
import registrationDataReducer from "./registrationDataReducer";
import searchContentReducer from "./searchContentReducer";
import sexCheckboxReducer from "./sexCheckboxReducer";
import ShowMoreReducer from "./ShowMoreReducer";


export const store = configureStore({
    reducer: {
        newProjectState: newProjectReduser,
        editProjectState: editProjectReduser,
        loginDataState: loginDataReducer,
        registrationDataState: registrationDataReducer,
        searchState: searchContentReducer,
        countryCheckboxState: countryCheckboxReducer,
        sexCheckboxState: sexCheckboxReducer,
        isMinorState: isMinorReducer,
        ageSearchState: ageSearchReducer,
        filterState: filterReducer,
        showMoreState: ShowMoreReducer,
        checkboxCheckedState: checkboxCheckedReducer,
        editFormState: editFormReducer,
        isFilterOpenState: isFilterOpenReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
