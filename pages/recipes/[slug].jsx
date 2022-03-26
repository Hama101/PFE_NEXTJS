import {useEffect , useState} from 'react';
import { useRouter } from 'next/router'
//hoc
import Layout from '../../components/layout'
//my controllers
import { fetchRecipeDetailsBySlug } from '../../controllers/api/Django/recpies'


//get server side props
export async function getServerSideProps(context) {
    try{
        const { slug } = context.query
        const recipe = await fetchRecipeDetailsBySlug(slug)
        return {
            props: {
                details: recipe,
            }
        }
    }catch(error){
        //redirect to 404
        return context.res.writeHead(302, {
            Location: '/404'
        })
    }
}


const RecipeDetailPage = ({details}) => {
    const [recipe , setRecipe] = useState(details)

    return (
        <Layout
            title={`I FOOD | ${recipe.name}`}
            description={`${recipe.name}`}
        >
            <h1>{recipe.name}</h1>
            <img src={recipe.thumbnail} alt={recipe.name} height={300} width={200} />
        </Layout>
    );
}

export default RecipeDetailPage;
