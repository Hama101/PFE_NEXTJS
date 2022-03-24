import Layout from '../../components/layout'
//3rd party components
import { InfiniteScroll } from 'react-infinite-scroll-component'
// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
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
