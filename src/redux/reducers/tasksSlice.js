import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    refresh(state, action) {
      const tasks = action.payload
      return tasks
    }
  }
})

export const { refresh } = tasksSlice.actions

export default tasksSlice.reducer

export const selectAllTasks = (state) => state.tasks

export const selectTaskById = (state, id) =>
  state.tasks.find((t) => t.id === id)
