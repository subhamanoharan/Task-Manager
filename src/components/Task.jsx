const Task = ({ task : {title, description, status} }) =>(
  <div className="bg-blue-200 p-2">
    <p>{title}</p>
    <p>{description}</p>
    <p>{status}</p>
  </div>
)

export default Task;
