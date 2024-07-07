import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './reducers/tasksSlice'
import statusReducer from './reducers/statusSlice'
import userReducer from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    status: statusReducer,
    user: userReducer,
  },
})
