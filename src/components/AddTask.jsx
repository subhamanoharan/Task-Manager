import { useState, useEffect } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as yup from 'yup';
import { useSelector } from 'react-redux'

import Modal from './modal';
import TaskService from '@/services/tasksService';
import { selectAllStatus } from '@/redux/reducers/statusSlice'

const AddTask = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const status_options = useSelector(selectAllStatus)
  const [status, setStatus] = useState(status_options[0]);
  const [isOpen, setIsOpen] = useState("");
  const [error, setError] = useState();
  const openModal = () => setIsOpen(true)
  const closeModal = () => clearForm()

  useEffect(() => setStatus(status_options[0]), [status_options])

  const clearForm = () => {
    setIsOpen(false)
    setTitle()
    setDescription()
    setStatus()
  }

  const addTask = async (e) => {
    event.preventDefault();

    let schema = yup.object().shape({
      title: yup.string().trim().required("You must enter a title."),
      description: yup.string().trim().required("You must enter a description."),
      status: yup.string().oneOf(status_options).required("You must enter a status."),
    });
    const isValid = await schema.validate({ title, description, status }).catch(function (err) {
      setError(err.errors.join("<br>"));
    });

    if (!isValid) {
      return
    }

    setError()
    TaskService.create({title, description, status})
      .then(clearForm)
      .then(onSuccess)
      .catch(() => setError('Failed to add new task'))
  }

  return (<>
    <button onClick={openModal} className="bg-green-500 text-white p-3 rounded-full">
      Add Task
    </button>
    { isOpen &&
    <Modal closeModal={closeModal} customStyles = {{wrapper: 'w-full left-0', modal: 'w-1/2'}}>
      <div className="flex flex-col justify-around w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Title
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               placeholder=""
               name="title"
               onChange={(e) => setTitle(e.target.value)}
               value={title}
        />
      </div>
      <div className="flex flex-col justify-around w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Description
        </label>
        <textarea
          type="text"
          style={{ height: 100 }}
          maxLength={500}
          value={description}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className="flex flex-col justify-around w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Status
        </label>
        <div className="relative">
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="grade"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                {status_options.map(i => <option key={"grade" + i}>{i}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
      </div>
      {error && <div className="important-red">
          <p>{error}</p>
      </div>}
      <div className="flex justify-center md:justify-end">
        <div className="modal-submit-button">
            <button className="cta cta-dark" onClick={(e) => addTask(e)} type="submit">Add</button>
        </div>
      </div>
    </Modal>
  }
  </>)
}

export default AddTask;
