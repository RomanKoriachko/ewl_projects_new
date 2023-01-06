import { configureStore } from "@reduxjs/toolkit";
import countryCheckboxReducer from "./countryCheckboxReducer";
import editProjectReduser from "./editProjectReduser";
import loginDataReducer from "./loginDataReducer";
import newProjectReduser from "./newProjectReduser";
import registrationDataReducer from "./registrationDataReducer";
import searchContentReducer from "./searchContentReducer";


export const store = configureStore({
    reducer: {
        newProjectState: newProjectReduser,
        editProjectState: editProjectReduser,
        loginDataState: loginDataReducer,
        registrationDataState: registrationDataReducer,
        searchState: searchContentReducer,
        countryCheckboxState: countryCheckboxReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
