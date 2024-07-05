import nc from 'next-connect';

import TasksRepo from '@/repositories/tasksRepo'
import TasksService from '@/services/server/tasksService'

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something went wrong!");
  },
  onNoMatch: (req, res) => res.status(404).json({ message: "Not found" }),
})
  .put(async (req, res) => {
    const {task_id} = req.query
    const {title, description, status} = req.body
    const task = {title, description, status}
    try {
      await TasksService.validate(task)
      return TasksRepo.update(task_id, task)
        .then((data) => res.json(data))
    }catch(e){
      const {errors = [], message} = e
      res.status(400).json({errors, message} )
    }
  })
  .delete((req, res) => {
    const {task_id} = req.query
    return TasksRepo.remove(task_id)
        .then((data) => res.json(data))
  })

export default handler;
