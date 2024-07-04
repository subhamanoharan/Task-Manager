import nc from 'next-connect';

import TasksRepo from '@/repositories/tasksRepo'

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something went wrong!");
  },
  onNoMatch: (req, res) => res.status(404).json({ message: "Not found" }),
})
  .put((req, res) => {
    const {task_id} = req.query
    const {title, description, status} = req.body
    return TasksRepo.update(task_id, {title, description, status})
      .then((data) => res.json(data))
  })
  .delete((req, res) => {
    const {task_id} = req.query
    return TasksRepo.remove(task_id)
        .then((data) => res.json(data))
  })

export default handler;
