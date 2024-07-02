import Task from '@/components/Task'

const TasksList = ({tasks}) => (
  tasks.map(t => (<Task key={t.name} task={t} />))
)

export default TasksList;
