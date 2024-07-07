import usersRepo from '@/repositories/usersRepo'

export default async function (req, res) {
  const userId = req.headers['x-user-id']
  const user = await usersRepo.getById(userId)
  res.json(user)
}
