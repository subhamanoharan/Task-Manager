const Task = ({ task : {title, description, status} }) =>{
  return (
    <div className="">
      <div className="grid grid-cols-2">
        <div className="underline decoration-solid">{title}</div>
        <span className="bg-green-200 rounded p-1 text-center">{status}</span>
      </div>
      <p className="line-clamp-2">{description}</p>
    </div>
  )
}

export default Task;
