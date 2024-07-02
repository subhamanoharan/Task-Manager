import { useState } from 'react';

import ViewTask from './ViewTask';
import EditTask from '@/components/EditTask'

const Task = ({ task, refreshTasks }) =>{
  const [isOpen, setIsOpen] = useState(false);
  const {title, description, status} = task

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div className="bg-blue-400 p-2 rounded grid">
      {isOpen && <ViewTask task={task} closeModal={closeModal}/>}
      <div onClick={openModal}>
        <div className="grid grid-cols-2">
          <div className="underline decoration-solid">{title}</div>
          <span className="bg-green-200 rounded p-1 text-center">{status}</span>
        </div>
        <p className="line-clamp-2">{description}</p>
      </div>
      <div className="self-end">
        <EditTask task={task} onSuccess={refreshTasks}/>
      </div>
    </div>

  )
}

export default Task;
