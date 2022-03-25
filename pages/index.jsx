import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
//my controllers
import { SET_AUTH_LOADING, REMOVE_AUTH_LOADING } from '../controllers/redux/actions/types'
import { uploadImageByAxios } from '../controllers/api/AI/predictImage'
//my components
import MyLoader from '../components/MyLoader'
//gloabl functions

export default function HomePage() {
  //variables
  const router = useRouter()
  const dispatch = useDispatch()
  //redux states
  const isAuthenticated = useSelector(state => state.auth.authenticated)
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  //local states
  const [file, setFile] = useState(null)
  const [fileLoading, setFileLoading] = useState(false)
  //functions
  if (!isAuthenticated && typeof window !== 'undefined' && !loading) {
    // router.push('/login')
  } else {
    // router.push('/recipes')
  }
  //handelClick
  const handelClick = async (event) => {
    setFileLoading(true)
    event.preventDefault()
    const apiPrecition = await uploadImageByAxios(file)
    console.table(apiPrecition);
    setFileLoading(false)
  }

  return (
    <Layout
      title="I FOOD | Home"
      description="Home page where you can find the best food around the world"
    >
      <div className='p-5 bg-dark rounded-3'>
        <div className='container-fluid py-3'>
          <h1 className='display-5 fw-bold text-white'>Home Page</h1>
          <p className='fs-4 mt-3 text-white'>
            Welcome to Sea of food <h3> {user && user.username}</h3>
            In this page you can upload any image of a unkown recipes for you and our AI model will ,
            try to predict it and gives you some related suggestions.
          </p>
        </div>

        <form >
          <div className='form-group'>
            {//a image preview
              file && <img src={URL.createObjectURL(file)} alt='preview' className='img-fluid' height={200} width={300} />
            }
            <br />
            <input required type="file" className='form-control-file mt-3'
              accept="image/*"
              onChange={(event) => {
                setFile(event.target.files[0])
              }}
            />
          </div>
          {
            !fileLoading && <button
              type='submit'
              className='btn btn-primary mt-3'
              onClick={(event) => handelClick(event)}
            >
              Upload
            </button>
          }
          {
            fileLoading && <MyLoader />
          }
        </form>
      </div>
    </Layout>
  )
}
