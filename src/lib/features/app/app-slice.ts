import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import exp from "constants"

interface InfoMessage {
    title: string
    content: string
    imgUrl?: string
    buttonText: string
    onClose: () => void
}

export interface AppState {
    isShowInfoDialog: boolean
    infoMessage: InfoMessage
}

const initialState: AppState = {
    isShowInfoDialog: false,
    infoMessage: {
        title: '',
        content: '',
        buttonText: '',
        onClose: () => {}
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showInfoDialog: (state, action: PayloadAction<InfoMessage>) => {
            state.isShowInfoDialog = true
            state.infoMessage = action.payload
        },
        hideInfoDialog: (state) => {
            state.isShowInfoDialog = false
            state.infoMessage = initialState.infoMessage
        }
    }
})

export const { showInfoDialog, hideInfoDialog } = appSlice.actions;

export default appSlice.reducer