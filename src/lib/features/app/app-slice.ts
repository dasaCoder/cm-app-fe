import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import exp from "constants"
import { stat } from "fs"

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
    isMobileNavOpen: boolean
}

const initialState: AppState = {
    isShowInfoDialog: false,
    infoMessage: {
        title: '',
        content: '',
        buttonText: '',
        onClose: () => {}
    },
    isMobileNavOpen: false
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
        },
        toggleMobileNav: (state) => {
            state.isMobileNavOpen = !state.isMobileNavOpen
        }
    }
})

export const { showInfoDialog, hideInfoDialog, toggleMobileNav } = appSlice.actions;

export default appSlice.reducer