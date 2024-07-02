import TasksList from '@/components/TasksList'
import AddTask from '@/components/AddTask'

export default function Home() {
  const tasks = [
    { title: 'task1', description: 'random description', status: 'Pending' },
    { title: 'task2', description: 'random description', status: 'Pending' },
    { title: 'task3', description: 'random description', status: 'Pending' },
  ]
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <TasksList tasks={tasks} />
      </div>
      <AddTask />
      
    </main>
  );
}
