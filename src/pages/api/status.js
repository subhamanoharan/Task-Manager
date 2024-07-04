import nc from 'next-connect';

import StatusRepo from '@/repositories/statusRepo'

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something went wrong!");
  },
  onNoMatch: (req, res) => res.status(404).json({ message: "Not found" }),
})
  .get((req, res) =>
    StatusRepo.all().then((status) => res.json(status))
  )

export default handler;
