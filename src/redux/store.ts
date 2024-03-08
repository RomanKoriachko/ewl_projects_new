import { configureStore } from '@reduxjs/toolkit'
import checkboxCheckedReducer from './checkboxCheckedReducer'
import darkThemeReducer from './darkThemeReducer'
import editProjectReduser from './editProjectReduser'
import filterApplyReducer from './filterApplyReducer'
import isFilterOpenReducer from './isFilterOpenReducer'
import searchContentReducer from './searchContentReducer'
import ShowMoreReducer from './showMoreReducer'
import filtredArrReducer from './filtredArrReducer'
import dataArrReducer from './dataArrReducer'
import errorReducer from './errorReducer'
import actualProjectsReducer from './actualProjectsReducer'
import filterStateReducer from './filterStateReducer'

export const store = configureStore({
    reducer: {
        editProjectState: editProjectReduser,
        searchState: searchContentReducer,
        filterApplyState: filterApplyReducer,
        showMoreState: ShowMoreReducer,
        checkboxCheckedState: checkboxCheckedReducer,
        isFilterOpenState: isFilterOpenReducer,
        darkThemeState: darkThemeReducer,
        filtredArrState: filtredArrReducer,
        dataArrState: dataArrReducer,
        errorState: errorReducer,
        actualProjectsState: actualProjectsReducer,
        filterState: filterStateReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
