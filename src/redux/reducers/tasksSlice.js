import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  filters: {}
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    refresh(state, action) {
      const tasks = action.payload
      state.data = tasks
    },
    setStatusTaskFilter(state, action) {
      const status = action.payload
      state.filters = {...state.filters, status}
    }
  }
})

export const { refresh, setStatusTaskFilter } = tasksSlice.actions

export default tasksSlice.reducer

export const selectTasksToShow = (state) => {
  const {tasks: {data, filters: {status: statusFilter}}} = state
  return statusFilter ?
    data.filter(t => t.status === statusFilter) : data
}

export const selectAllTasks = (state) => state.tasks.data

export const selectStatusFilter = (state, id) =>
  state.tasks.filters.status

export const selectTaskById = (state, id) =>
  state.tasks.data.find((t) => t.id === id)
