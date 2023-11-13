import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    switchLogin: (state) => {
      state.value = 0
    },
    switchRegister: (state) => {
        state.value = 1
      },
  },
})
export const {switchLogin,switchRegister } = landingSlice.actions

export default landingSlice.reducer