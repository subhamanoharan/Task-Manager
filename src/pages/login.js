import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'

import usersService from '@/services/usersService'
import { loginUser, logoutUser } from '@/redux/reducers/userSlice'

export default function Login() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    usersService.getUser()
      .then(() => {
        router.push('/')
        dispatch(loginUser())
      })
      .catch(() => {
        dispatch(logoutUser())
      })
  }, [])

  const login = async (e) => {
    event.stopPropagation();
    setError()
    usersService.login(name, password)
      .then(() => router.push('/'))
      .catch(response => {
        const {errors} = response.response?.data || {}
        setError(errors.join(','))
      })
  }

  return (
    <main
      className={`flex min-h-screen md:flex-col items-center justify-between md:p-24 bg-blue-200 text-white`}
    >
        <div className="flex flex-col md:w-1/2 w-full border border-blue-600 p-4 rounded bg-blue-400">
          <label className="self-center block uppercase tracking-wide font-bold mb-2">
              Task Manager
          </label>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
          </label>
          <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                 placeholder=""
                 name="name"
                 onChange={(e) => setName(e.target.value)}
                 value={name}
          />
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
          </label>
          <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className='text-red-600'>{error}</div>}
          <div className="self-center	">
              <button className="cta cta-light uppercase" onClick={(e) => login(e)} type="submit">Login</button>
          </div>
        </div>
    </main>
  );
}
