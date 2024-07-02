import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    refresh(state, action) {
      const status = action.payload
      return status
    }
  }
})

export const { refresh } = statusSlice.actions

export default statusSlice.reducer

export const selectAllStatus = (state) => state.status
