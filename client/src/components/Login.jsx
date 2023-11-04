import Header from './Header'
import Form from './Form'
import Students from './Students'

const Login = () => {
  
  return (
     <main className='w-4/6 max-md:w-full min-h-screen right-0 absolute p-3'>
     <Header/>
     <Form/>
     <Students/>
     </main>
  )
}

export default Login
