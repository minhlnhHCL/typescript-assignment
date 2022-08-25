import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IToastDetails {
    status: string,
    title: string,
    msg: string
}

export interface IToast {
    notification: IToastDetails | null
}

const initialState: IToast = {
    notification: {
        status: '',
        title: '',
        msg: ''
    }
}

const toastSLice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<IToastDetails>) => {
            state.notification = action.payload
        },
        hideToast: (state) => {
            state.notification = null
        }
    }
})