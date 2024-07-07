import * as lodash from 'lodash'

import credentialsExtractor from '@/services/server/credentialsExtractor'
import usersRepo from '@/repositories/usersRepo'
import UnauthorisedUserException from '@/exceptions/unauthorisedUserException'
import { encrypt } from "@/lib/auth"

export default async function (req, res) {
  const creds = credentialsExtractor(req.headers);
  if (lodash.isEmpty(creds)) {
   return res.status(400).json({ errors: ['Missing authentication'] });
  }
  return usersRepo.getUser(creds.name, creds.password)
   .then(async(user) => {
     console.log('user', user)
     if(!user)
      throw new UnauthorisedUserException()
     const expires = new Date(Date.now() + 86400000);
     const session = await encrypt({ user, expires });
     res.setHeader('Set-Cookie', `session=${session}; path = /;`);
     res.send();
   })
   .catch((error) => {
     console.log(error)
     res.status(400).json({errors: [error.message]})
   });
}
