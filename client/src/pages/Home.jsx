import Form from '../components/Form'
import Header from '../components/Header'
import Registration from '../components/Registration'
import Students from '../components/Students'

const Home = () => {
  return (
    <>
    <Registration/>
    <main className='w-4/6 max-md:w-full min-h-screen right-0 absolute p-3'>
     <Header/>
     <Form/>
     <Students/>
     </main>
    </>
  )
}

export default Home
