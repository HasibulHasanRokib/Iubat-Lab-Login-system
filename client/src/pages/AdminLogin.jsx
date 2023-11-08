import { useState } from 'react'
import { URL } from '../App'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ADMIN_REQUEST, ADMIN_REQUEST_FAILED, ADMIN_REQUEST_SUCCESS } from '../features/adminSlice'
import Spinner from '../components/spinner'

const AdminLogin = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.admin)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(ADMIN_REQUEST())
      const res = await fetch(`${URL}/api/admin/sign-in`, {
       
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      })
      const data = await res.json()
      console.log(data.rest)
      if (data.success === true) {
        dispatch(ADMIN_REQUEST_SUCCESS(data.rest))
        navigate("/admin-panel")
      } else {
        dispatch(ADMIN_REQUEST_FAILED(data.message))

      }

    } catch (error) {
      dispatch(ADMIN_REQUEST_FAILED(error.message))
    }
  }

  return (
    <>
      <main className='max-w-3xl border-2 mx-auto shadow-lg mt-[8rem]'>
        <header className='bg-[#f1f5f1] shadow-md py-5'>
          <h1 className='text-2xl font-semibold text-center text-gray-700 uppercase'>Iubat Computer Lab </h1>
        </header>

        <section className='p-8'>
          <form className='flex flex-col gap-3 max-w-xl mx-auto mt-5' onSubmit={handleSubmit}>
            <input className='p-3 border rounded-lg outline-slate-300 bg-white' onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" placeholder='Admin Email' />
            <input className='p-3 border rounded-lg outline-slate-300 bg-white' onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder='Admin Password' />
            <button disabled={isLoading} type='submit' className='p-3 bg-gray-700 hover:opacity-90 text-white uppercase rounded-lg'>{isLoading ? <Spinner /> : "Login"}</button>
            <Link to={"/sign-in"} className='text-xs hover:underline cursor-pointer'>Instructor Login</Link>
          </form>
          {error && <h5 className='text-sm text-red-600 text-center py-3'>{error}</h5>}
        </section>
      </main>
    </>
  )
}

export default AdminLogin



