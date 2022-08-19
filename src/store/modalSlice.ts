import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface IModal {
    open: boolean,
    title: string,
    children: JSX.Element | string | null
    successCb: () => void

}

const initialState: IModal = {
    open: false,
    title: '',
    children: null,
    successCb: () => { },
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<IModal>) => {
            state.children = action.payload.children
            state.open = action.payload.open
            state.title = action.payload.title
            state.successCb = action.payload.successCb
        }
    }
})

export const { setModal } = modalSlice.actions
export default modalSlice.reducer