import Navbar from '@/components/Navbar'
import TasksList from '@/components/TasksList'

const Home = () => {
  return (
    <>
    <Navbar/>
    <main
      className={`flex min-h-screen flex-col items-center justify-between md:px-24 px-6 bg-blue-200 pt-2 pb-2`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <TasksList />
      </div>
    </main>
    </>
  );
}

export default Home;
