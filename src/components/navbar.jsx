import { useState } from 'react';
import { useRouter } from 'next/router';

import usersService from '@/services/usersService'

const Navbar = () => {
  const router = useRouter();
  const [error, setError] = useState();

  const logout = async (e) => {
    event.stopPropagation();
    usersService.logout()
      .then(() => router.push('/login'))
      .catch(error => setError('Unable to logout! Please try again'))
  }

  return (
    <div className="w-full grid grid-cols-4 px-12 bg-blue-500">
      <p className="justify-self-center font-extrabold	tracking-widest	col-span-3	text-white text-lg self-center">Task Manager</p>
      <button
        className="justify-self-end	bg-green-500 text-white p-3 my-1"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar;
