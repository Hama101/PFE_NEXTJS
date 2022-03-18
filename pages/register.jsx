//my compents
import Layout from '../components/layout'
//3rd party components
import swal from 'sweetalert';
// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
//my action and costum redux stuff
import { register } from '../controllers/redux/actions/auth'



const RegisterPage = () => {
    const register_success = useSelector(state => state.auth.register_success)

    const dispatch = useDispatch()
    //initial state for the form data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        re_password: '',
    });
    //distructuring the form data
    const { first_name, last_name, username, email, password, re_password } = formData;
    //onchange event function for the form data
    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        //console.log(formData);
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            if (password !== re_password) {
                swal({
                    title: "Passwords must match",
                    //text: "You clicked the button!",
                    icon: "error",
                    button: "OK",
                });
            }
            else {
                dispatch(register(first_name, last_name, username, email, password, re_password))
            }
        }
    }

    //alert message
    if (register_success && typeof window !== 'undefined') {
        setTimeout(() => {
            window.location = '/login'
        }, 2000)
    }
    return (
        <Layout
            title="Sea-of-Food | Register"
            description="Register page where you can register for the website"
        >

            <div>
                <h1 className="display-4">Register Page</h1>
                <form className="bg-dark p-5 mt-5 mb-5" onSubmit={onSubmit} >
                    <div className="form-group">
                        <label className="text-white form-label mt-3" htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" id="first_name" name="first_name" value={first_name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="text-white form-label mt-3" htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" id="last_name" name="last_name" value={last_name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="text-white form-label mt-3" htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={username} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="text-white form-label mt-3" htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="text-white form-label mt-3" htmlFor="password">Password</label>
                        <input minLength='8' type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="text-white form-label mt-3" htmlFor="re_password">Re-enter Password</label>
                        <input minLength='8' type="password" className="form-control" id="re_password" name="re_password" value={re_password} onChange={onChange} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    );
}
export default RegisterPage;