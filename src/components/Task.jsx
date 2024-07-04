import { useState } from 'react';

import ViewTask from './ViewTask';
import EditTask from '@/components/EditTask'
import DeleteTask from '@/components/DeleteTask'

const Task = ({ task, refreshTasks }) =>{
  const [isOpen, setIsOpen] = useState(false);
  const {title, description, status} = task

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div className="grid-rows-4	bg-blue-800 p-2 rounded grid h-40">
      {isOpen && <ViewTask task={task} closeModal={closeModal}/>}
      <div onClick={openModal} className="row-span-3 text-white">
        <div className="grid grid-cols-2">
          <div className="underline decoration-solid">{title}</div>
          <span className="bg-green-600 rounded p-1 text-center">{status}</span>
        </div>
        <div className="line-clamp-2 my-1">{description}</div>
      </div>
      <div className="justify-self-end	grid grid-cols-2 gap-2 h-2">
        <DeleteTask task={task} onSuccess={refreshTasks}/>
        <EditTask task={task} onSuccess={refreshTasks}/>
      </div>
    </div>

  )
}

export default Task;
