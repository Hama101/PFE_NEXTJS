//my compents
import Layout from '../components/layout'
import MyLoader from '../components/MyLoader'
//3rd party components

// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
//my action and costum redux stuff
import { login, resetRegister } from '../controllers/redux/actions/auth'



const LoginPage = () => {
    const router = useRouter()

    const isAuthenticated = useSelector(state => state.auth.authenticated)
    const loading = useSelector(state => state.auth.loading)

    const dispatch = useDispatch()
    //initial state for the form data
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    //distructuring the form data
    const { username, password } = formData;

    // reset register
    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(resetRegister())
    }, [])

    //onchange event function for the form data
    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(login(username, password))
        }
    }

    console.log("is authenticated", isAuthenticated)
    if (isAuthenticated && typeof window !== 'undefined') {
        router.push('/')
    }

    return (
        <Layout
            title="Sea-of-Food | Login"
            description="Login page where you can Login for the website"
        >

            <div>
                <h1 className="display-4">Login Page</h1>
                {loading && <MyLoader />}
                {!loading &&
                    <form className="bg-dark p-5 mt-5 mb-5" onSubmit={onSubmit} >
                        <div className="form-group">
                            <label className="text-white form-label mt-3" htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" name="username" value={username} onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <label className="text-white form-label mt-3" htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} required />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                }
            </div>
        </Layout>
    );
}
export default LoginPage;