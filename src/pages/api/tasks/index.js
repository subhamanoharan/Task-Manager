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
  .get((req, res) =>
    TasksRepo.all().then((tasks) => res.json(tasks))
  )
  .post(async(req, res) => {
    const {title, description, status} = req.body
    const task = {title, description, status}
    try {
      await TasksService.validate(task)
      return TasksRepo.create(task)
        .then((id) => res.json({id}))
    }catch(e){
      const {errors = [], message} = e
      res.status(400).json({errors, message} )
    }
  })

export default handler;
