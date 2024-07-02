import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Task from '@/components/Task'
import AddTask from '@/components/AddTask'

import TasksServive from '@/services/tasksService'
import { refresh, selectAllTasks } from '@/redux/reducers/tasksSlice'

const TasksList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectAllTasks)

  useEffect(() => {
    refreshTasks()
  }, [])

  const refreshTasks = () => {
    TasksServive.list()
      .then((tasks) => dispatch(refresh(tasks)))
  }
  return (
    <>
      {tasks.map(t => (<Task key={t.id} task={t} />))}
      <AddTask onSuccess={refreshTasks}/>
    </>
  )
}

export default TasksList;
