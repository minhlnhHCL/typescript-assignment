import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

import users from './userSlice'
import modal from './modalSlice'
import toast from './toastSlice'

const reducer = combineReducers({
    users,
    modal,
    toast
})
const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            })
    })
}

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default setupStore
