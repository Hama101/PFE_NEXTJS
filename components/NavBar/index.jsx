import Link from 'next/Link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'

//controllers
import { nextLogOutHandler } from '../../controllers/api/Next/logout';

const NavBar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.authenticated)
    const profile = useSelector(state => state.auth.profile)

    const handelLogOut = (event) => {
        event.preventDefault();
        nextLogOutHandler(dispatch);
    }


    const authLinks = (
        <div>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {profile && <img src={profile.avatar} alt={profile.name} width="30" height="30" className="rounded-circle" />}
                </a>
                <div>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Dashboard</a>
                        <a className="dropdown-item" href="#">Edit Profile</a>
                        <a className="dropdown-item"
                            onClick={(event) => {
                                handelLogOut(event)
                            }}
                        >Log Out</a>
                    </div>
                </div>
            </li>
        </div>
    );

    const guestLinks = (
        <>
            <li className='nav-item'>
                <Link href='/register'>
                    <a className={
                        router.pathname === '/register' ?
                            'nav-link active' : 'nav-link'
                    }>
                        Register
                    </a>
                </Link>
            </li>
            <li className='nav-item'>
                <Link href='/login'>
                    <a className={
                        router.pathname === '/login' ?
                            'nav-link active' : 'nav-link'
                    }>
                        Login
                    </a>
                </Link>
            </li>
        </>
    );
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-3 '>
            <div className='container-fluid'>
                <Link href='/' className='nav-item'>
                    <a className="nav-link" href="#">
                        <img src="https://res.cloudinary.com/after-code/image/upload/v1647779311/IFood_hfzqqn.png"
                            width="30" height="30" alt="logo" className="rounded-circle" />
                    </a>
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        {/* <li className='nav-item'>
                            <Link href='/'>
                                <a className={
                                    router.pathname === '/' ?
                                        'nav-link active' : 'nav-link'
                                }>
                                    Home
                                </a>
                            </Link>
                        </li> */}
                        <li className='nav-item'>
                            <Link href='/recipes'>
                                <a className={
                                    router.pathname === '/recipes' ?
                                        'nav-link active' : 'nav-link'
                                }>
                                    Recipes
                                </a>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link href='/resturants'>
                                <a className={
                                    router.pathname === '/resturants' ?
                                        'nav-link active' : 'nav-link'
                                }>
                                    Resturants
                                </a>
                            </Link>
                        </li>

                    </ul>
                </div>
                <div className='collapse navbar-collapse justify-content-end ' id='navbarNav'>
                    <ul className='navbar-nav'>
                        {
                            isAuthenticated ? authLinks : guestLinks
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;