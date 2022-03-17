import Head from 'next/head'
import swal from 'sweetalert';
import NavBar from '../NavBar'
// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
import { SET_MESSAGE } from '../../controllers/redux/actions/types'

// higher order component will contains the layout of every page 
//alert message

const Layout = ({ title, content, children }) => {
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()

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
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} />
            </Head>
            <NavBar />
            <div className="container">
                {children}
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