import { useState } from 'react';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as yup from 'yup';
import { useSelector } from 'react-redux'

import Modal from './modal';
import TaskService from '@/services/tasksService';
import { selectAllStatus } from '@/redux/reducers/statusSlice'


const DeleteTask = ({ task, onSuccess }) => {
  const [isOpen, setIsOpen] = useState("");
  const [error, setError] = useState();

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const deleteTask = async (e) => {
    event.preventDefault();

    setError()
    TaskService.delete(task.id)
      .then(closeModal)
      .then(onSuccess)
      .catch(() => setError('Failed to delete task'))
  }

  return (<>
    <button onClick={openModal} className="float-right bg-red-500 text-white p-2 rounded-full">
      <FontAwesomeIcon icon={faMinus}/>
    </button>
    { isOpen &&
    <Modal closeModal={closeModal} customStyles = {{wrapper: 'w-full left-0', modal: 'w-1/2'}}>
      <div className="flex flex-col justify-around w-full">
        {`Are you sure you want to delete ${task.title} ?`}
      </div>
      {error && <div className="important-red">
          <p>{error}</p>
      </div>}
      <div className="flex justify-center md:justify-end">
        <div className="modal-submit-button">
            <button className="cta cta-dark" onClick={(e) => deleteTask(e)} type="submit">OK</button>
        </div>
        <div className="modal-submit-button">
            <button className="cta cta-dark" onClick={closeModal}>CANCEL</button>
        </div>
      </div>
    </Modal>
  }
  </>)
}

export default DeleteTask;
