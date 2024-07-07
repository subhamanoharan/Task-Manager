import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as _ from 'lodash'
import Task from '@/components/Task'
import AddTask from '@/components/AddTask'
import FilterTasks from '@/components/FilterTasks'

import TasksServive from '@/services/tasksService'
import StatusService from '@/services/statusService'
import { refresh, selectTasksToShow } from '@/redux/reducers/tasksSlice'
import { refresh as refreshStatus } from '@/redux/reducers/statusSlice'

const TasksList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasksToShow)

  useEffect(() => {
    refreshTasks()
    StatusService.list()
      .then((status) => dispatch(refreshStatus(status.map(({title}) => title))))
      .catch(() => {})
  }, [])

  const refreshTasks = () => {
    TasksServive.list()
      .then(tasks => _.sortBy(tasks, [({title}) => title.toUpperCase()]))
      .then((tasks) => dispatch(refresh(tasks)))
      .catch(() => {})
  }
  return (
    <div className="w-full grid md:grid-cols-10 grid-cols-4 gap-3">
      <div className="justify-self-end col-span-4 md:col-span-10">
        <FilterTasks />
        <AddTask onSuccess={refreshTasks}/>
      </div>
      <div className="md:col-span-9 col-span-4 grid md:grid-cols-3 grid-cols-1	gap-4">
        {tasks.map(t => (<Task key={t.id} task={t} refreshTasks={refreshTasks}/>))}
      </div>
    </div>
  )
}

export default TasksList;
