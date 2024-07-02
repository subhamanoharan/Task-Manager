import Modal from './modal';

const ViewTask = ({ task: {title, status, description}, closeModal }) => {
  return (
    <Modal closeModal={closeModal} customStyles = {{wrapper: 'w-full left-0', modal: 'w-1/2'}}>
      <div className="flex flex-col justify-around w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Title
        </label>
        <p className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{title}</p>
      </div>
      <div className="flex flex-col justify-around w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Description
        </label>
        <textarea
          type="text"
          value={description}
          readOnly
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          </textarea>
      </div>
      <div className="flex flex-col justify-around w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Status
        </label>
        <p className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{status}</p>
      </div>
    </Modal>
  )
}

export default ViewTask;
