import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Task from '@/components/Task'
import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'

import TasksServive from '@/services/tasksService'
import StatusService from '@/services/statusService'
import { refresh, selectAllTasks } from '@/redux/reducers/tasksSlice'
import { refresh as refreshStatus } from '@/redux/reducers/statusSlice'

const TasksList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectAllTasks)

  useEffect(() => {
    refreshTasks()
    StatusService.list()
      .then((status) => dispatch(refreshStatus(status.map(({title}) => title))))
  }, [])

  const refreshTasks = () => {
    TasksServive.list()
      .then((tasks) => dispatch(refresh(tasks)))
  }
  return (
    <div className="grid grid-cols-10 gap-3">
      <div className="col-span-9 grid grid-cols-4	gap-3	">
        {tasks.map(t => (
          <div key={t.id} className="bg-blue-400 p-2 rounded grid">
            <Task key={t.id} task={t} />
            <div className="self-end">
              <EditTask task={t} onSuccess={refreshTasks}/>
            </div>
          </div>
        ))}
      </div>
      <div className="self-start">
        <AddTask onSuccess={refreshTasks}/>
      </div>
    </div>
  )
}

export default TasksList;
