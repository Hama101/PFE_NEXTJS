import Head from 'next/head'
import swal from 'sweetalert';
import NavBar from '../NavBar'
import MyLoader from '../MyLoader'
// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// my actions
import { SET_MESSAGE } from '../../controllers/redux/actions/types'
import { refresh_tokens, check_auth_status } from '../../controllers/redux/actions/auth'
// higher order component will contains the layout of every page 
//alert message

const Layout = ({ title, content, children }) => {
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.loading)

    if (alert.message !== null) {
        const type = alert.type
        swal({
            title: alert.message,
            //text: "You clicked the button!",
            icon: alert.type,
            button: "OK",
        });
        dispatch({ type: SET_MESSAGE, payload: { message: null, type: null } })
        // if (type === 'success') {
        //     setTimeout(() => {
        //         router.push('/')
        //     }, 2000)
        // }
    }

    //call check_auth_status on component mount
    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            // when check_auth_status fails call refresh_tokens
            dispatch(check_auth_status()).catch(err => {
                if (err.response.status === 401) {
                    dispatch(refresh_tokens()).catch(err => {
                        if (err.response.status === 401) {
                            dispatch({ type: SET_MESSAGE, payload: { message: 'Your session has expired please login again', type: 'error' } })
                        }
                    })
                }
            })
        }
    }, [dispatch])

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} />
            </Head>
            <NavBar />
            <div className="container">
                {loading ? <MyLoader /> : children}
            </div>
        </>
    );
}
//set default props
Layout.defaultProps = {
    title: 'Sea-of-Food',
    content: 'A platfome where you can find the best food around the world'
}
export default Layout;