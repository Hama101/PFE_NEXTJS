import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

export default function ProfilePage() {
    return (
        <Layout
            title="Sea-of-Food | Profile"
            description="Profile page where you can find the best food around the world"
        >
            <div className='p-5 bg-dark rounded-3'>
                <div className='container-fluid py-3'>
                    <h1 className='display-5 fw-bold text-white'>Profile Page</h1>
                    <p className='fs-4 mt-3 text-white'>
                        Welcome to Sea of food.
                    </p>
                </div>
            </div>
        </Layout>
    )
}
