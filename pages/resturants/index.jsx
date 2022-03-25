import Layout from '../../components/layout'
// react , redux and next stuff
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'

//my components
import ResturantList from '../../components/ResturantList'

//gloabl functions

export default function HomePage() {
    //variables
    return (
        <Layout
            title="I FOOD | Resturants"
            description="Resturants page where you can find the best food around the world"
        >
            <ResturantList />
        </Layout>
    )
}
