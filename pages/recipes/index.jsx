import Layout from '../../components/layout'
//3rd party components
// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
//my controllers

//my components
import CartList from '../../components/CartList'
//gloabl functions

export default function HomePage() {

    //variables
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    return (
        <Layout
            title="I FOOD | Recipes"
            description="Recipes page where you can find the best food around the world"
        >
            <CartList username={user ? user.username : ''} />
        </Layout>
    )
}
