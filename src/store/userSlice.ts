import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../components/User/UserInterface'
export const GET_USER = 'GET_USER'
export const ADD_USER = 'ADD_USER'
export const EDIT_USER = 'EDIT_USER'
export const DELETE_USER = 'DELETE_USER'
export const CURRENT_USER = 'CURRENT_USER'

export interface UserState {
    users: IUser[],
}

export const initialState: UserState = {
    users: [],
}
//UserSlice

export const userSLice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action: PayloadAction<IUser[]>) => {
            if (state.users.length == 1) {
                const newUserArr = [...state.users, ...action.payload]
                state.users = newUserArr
                return state
            }
            state.users = action.payload
        },
        addUser: (state, action: PayloadAction<IUser>) => {
            const index = state.users.findIndex(el => el.id == action.payload.id);
            if (index == -1) {
                state.users = [action.payload, ...state.users]
                return state
            } else {
                const newPayload = { ...action.payload, id: action.payload.id && action.payload.id + 1 }
                state.users = [newPayload, ...state.users]
                return state
            }
        },
        editUser: (state, action: PayloadAction<IUser>) => {
            const index = state.users.findIndex(el => el.id == action.payload.id);
            const newUserArr = [...state.users]
            newUserArr[index] = action.payload
            state.users = newUserArr
        },
        deleteUser: (state, action: PayloadAction<IUser>) => {
            const clonedArr = [...state.users]
            const newUserArr = clonedArr.filter(item => item.id !== action.payload.id)
            state.users = newUserArr
        }
    }
})


export const { getUsers, editUser, addUser, deleteUser } = userSLice.actions
export default userSLice.reducer