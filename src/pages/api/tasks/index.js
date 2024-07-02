import nc from 'next-connect';

import TasksRepo from '@/repositories/tasksRepo'

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
  .post((req, res) => {
    const {title, description, status} = req.body
    return TasksRepo.create({title, description, status})
      .then((id) => res.json({id}))
  })

export default handler;
