import { configureStore } from "@reduxjs/toolkit";
import editProjectReduser from "./editProjectReduser";
import loginDataReducer from "./loginDataReducer";
import newProjectReduser from "./newProjectReduser";
import registrationDataReducer from "./registrationDataReducer";


export const store = configureStore({
    reducer: {
        newProjectState: newProjectReduser,
        editProjectState: editProjectReduser,
        loginDataState: loginDataReducer,
        registrationDataState: registrationDataReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
