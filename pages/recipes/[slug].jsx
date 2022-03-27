import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
//hoc
import Layout from '../../components/layout'
//my components
import ImageSlider from '../../components/ImageSlider'

//my controllers
import { fetchRecipeDetailsBySlug } from '../../controllers/api/Django/recpies'


//get server side props
export async function getServerSideProps(context) {
    try {
        const { slug } = context.query
        const recipe = await fetchRecipeDetailsBySlug(slug)
        return {
            props: {
                details: recipe,
            }
        }
    } catch (error) {
        //redirect to 404
        return context.res.writeHead(302, {
            Location: '/404'
        })
    }
}


const RecipeDetailPage = ({ details }) => {
    const [recipe, setRecipe] = useState(details)

    return (
        <Layout
            title={`I FOOD | ${recipe.name}`}
            description={`${recipe.name}`}
        >
            <h1>{recipe.name}</h1>
            <ImageSlider slides={recipe.images} />
            <br />
            <div>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => {
                        return (
                            <li key={index}>{ingredient}</li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h2>Instructions</h2>
                <ol>
                    {recipe.instructions.map((instruction, index) => {
                        return (
                            <li key={index}>{instruction}</li>
                        )
                    })}
                </ol>
            </div>
            <div>
                <h3>Time : {recipe.time} </h3>
            </div>
        </Layout>
    );
}

export default RecipeDetailPage;
