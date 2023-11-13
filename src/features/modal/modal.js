import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    data:false,
    isOpen: true
}

const modal = createSlice({
    name: 'modal',
    initialState,
    reducers:{
        openModal: (state,action)=>{
            state.open = action.payload.name
            state.data = action.payload.data || false
        },
        closeModal: (state)=>{
            state.open = false
            state.data = false
        },
        isOpenTrue: (state) => {
            state.isOpen= true
        },
        isOpenFalse: (state) => {
            state.isOpen= false
        }
    }
})

export const { openModal, closeModal, isOpenTrue, isOpenFalse } = modal.actions
export default modal.reducer