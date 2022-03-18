import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
//my controllers


export default function HomePage() {
  const router = useRouter()

  const isAuthenticated = useSelector(state => state.auth.authenticated)
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  if (!isAuthenticated && typeof window !== 'undefined' && !loading) {
    router.push('/login')
  }

  console.log("the user is :", user)
  console.log("is authenticated :", isAuthenticated)

  return (
    <Layout
      title="Sea-of-Food | Home"
      description="Home page where you can find the best food around the world"
    >
      <div className='p-5 bg-dark rounded-3'>
        <div className='container-fluid py-3'>
          <h1 className='display-5 fw-bold text-white'>Home Page</h1>
          <p className='fs-4 mt-3 text-white'>
            Welcome to Sea of food <h3> {user && user.username}</h3>
          </p>
        </div>
      </div>
    </Layout>
  )
}
