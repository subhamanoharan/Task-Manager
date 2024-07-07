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
    <div className="grid grid-cols-10 gap-3">
      <div className="col-span-9 grid grid-cols-4	gap-4">
        {tasks.map(t => (<Task key={t.id} task={t} refreshTasks={refreshTasks}/>))}
      </div>
      <div className="self-start">
        <AddTask onSuccess={refreshTasks}/>
        <FilterTasks />
      </div>
    </div>
  )
}

export default TasksList;
